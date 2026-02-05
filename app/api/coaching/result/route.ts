import { generateText, Output } from 'ai'
import { z } from 'zod'
import { COACHING_RESULT_PROMPT, type TranscriptEntry } from '@/lib/coaching'
import { LIFE_AREAS, CONSCIOUSNESS_LEVELS } from '@/lib/valoracion'

const resultResponseSchema = z.object({
  score: z.number().min(0).max(1000).describe('Puntaje de 0 a 1000 en la escala de Hawkins'),
  dominantLevel: z.string().describe('Nombre del nivel de conciencia dominante (ej: Valentía, Miedo, Aceptación)'),
  dominantEmotion: z.string().describe('La emoción o estado emocional principal observado'),
  textualSignals: z.array(z.string()).min(3).max(6).describe('3 a 6 señales textuales específicas: frases o ideas del usuario que evidencian el nivel'),
  explanation: z.string().describe('Explicación de por qué ese puntaje encaja con la escala de Hawkins, basada en el transcript'),
  recommendation: z.string().describe('UNA recomendación accionable y simple para los próximos 7 días para subir el nivel en esta área'),
})

export async function POST(req: Request) {
  try {
    const { areaKey, transcript } = await req.json() as {
      areaKey: string
      transcript: TranscriptEntry[]
    }

    const area = LIFE_AREAS.find(a => a.key === areaKey)
    if (!area) {
      return Response.json({ error: 'Área no válida' }, { status: 400 })
    }

    if (transcript.length < 5) {
      return Response.json({ error: 'Se requieren las 5 respuestas completas' }, { status: 400 })
    }

    const transcriptText = transcript
      .map(t => `TURNO ${t.turn}:\nPregunta: ${t.question}\nRespuesta del usuario: ${t.answer}`)
      .join('\n\n---\n\n')

    const { output } = await generateText({
      model: 'openai/gpt-4o',
      output: Output.object({
        schema: resultResponseSchema,
      }),
      system: COACHING_RESULT_PROMPT,
      prompt: `ÁREA EVALUADA: ${area.name}

TRANSCRIPT COMPLETO DE LA ENTREVISTA DE COACHING:

${transcriptText}

---

INSTRUCCIONES PARA EL ANÁLISIS:

1. PUNTAJE (0-1000): Determina el nivel de conciencia basándote EXCLUSIVAMENTE en lo que el usuario reveló en las 5 respuestas. No asumas, no agregues, solo analiza lo que dijo.

2. NIVEL DOMINANTE: Identifica cuál de los niveles de Hawkins (Vergüenza, Culpa, Apatía, Pena, Miedo, Deseo, Ira, Orgullo, Valentía, Neutralidad, Disposición, Aceptación, Razón, Amor, Alegría, Paz) se manifiesta con más fuerza.

3. EMOCIÓN DOMINANTE: La emoción o estado emocional que más aparece en sus palabras.

4. SEÑALES TEXTUALES: Cita 3-6 frases LITERALES o ideas ESPECÍFICAS del usuario que evidencian por qué asignaste ese nivel. No parafrasees en exceso, usa sus propias palabras.

5. EXPLICACIÓN: Explica con claridad por qué ese puntaje encaja con Hawkins. Sé directo y honesto, no complaciente. Si el nivel es bajo, dilo con respeto pero sin endulzar.

6. RECOMENDACIÓN: UN solo paso concreto, simple y accionable que el usuario puede hacer en los próximos 7 días para subir su nivel de conciencia en esta área. Debe ser específico, no genérico como "reflexiona más" o "sé más consciente".

IMPORTANTE: 
- Basa tu análisis SOLO en el transcript, no en suposiciones
- El tono debe ser de coach: claro, honesto, directo, no complaciente pero siempre respetuoso
- Si observas autoengaño o incongruencias en el transcript, menciónalas en la explicación`,
    })

    if (!output) {
      return Response.json({ error: 'Error al procesar el resultado' }, { status: 500 })
    }

    // Find the consciousness level that matches the score
    const sortedLevels = [...CONSCIOUSNESS_LEVELS].sort((a, b) => b.value - a.value)
    const matchedLevel = sortedLevels.find(l => output.score >= l.value) || CONSCIOUSNESS_LEVELS[0]

    const result = {
      area: area.name,
      areaKey: area.key,
      score: output.score,
      dominantLevel: output.dominantLevel,
      dominantEmotion: output.dominantEmotion,
      textualSignals: output.textualSignals,
      explanation: output.explanation,
      recommendation: output.recommendation,
      hawkinsLevel: matchedLevel.name,
      hawkinsValue: matchedLevel.value,
    }

    return Response.json(result)
  } catch (error) {
    console.error('Error calculating coaching result:', error)
    return Response.json(
      { error: 'Error al calcular el resultado. Por favor, intenta de nuevo.' },
      { status: 500 }
    )
  }
}
