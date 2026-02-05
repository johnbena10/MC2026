import { generateText, Output } from 'ai'
import { z } from 'zod'
import { COACHING_QUESTION_PROMPT, COACHING_TECHNIQUES, type TranscriptEntry } from '@/lib/coaching'
import { LIFE_AREAS } from '@/lib/valoracion'

const questionResponseSchema = z.object({
  question: z.string().describe('La siguiente pregunta de coaching, personalizada según el transcript'),
})

export async function POST(req: Request) {
  try {
    const { areaKey, transcript, currentTurn } = await req.json() as {
      areaKey: string
      transcript: TranscriptEntry[]
      currentTurn: number
    }

    const area = LIFE_AREAS.find(a => a.key === areaKey)
    if (!area) {
      return Response.json({ error: 'Área no válida' }, { status: 400 })
    }

    // Turno 1: Usa la pregunta inicial del área
    if (currentTurn === 1) {
      return Response.json({ question: area.question })
    }

    // Turnos 2-5: Genera pregunta adaptativa basada en el transcript
    const technique = COACHING_TECHNIQUES[currentTurn as keyof typeof COACHING_TECHNIQUES]
    
    const transcriptText = transcript
      .map(t => `TURNO ${t.turn}:\nPregunta: ${t.question}\nRespuesta del usuario: ${t.answer}`)
      .join('\n\n---\n\n')

    const { output } = await generateText({
      model: 'openai/gpt-4o',
      output: Output.object({
        schema: questionResponseSchema,
      }),
      system: COACHING_QUESTION_PROMPT,
      prompt: `ÁREA DE EXPLORACIÓN: ${area.name}

TRANSCRIPT HASTA AHORA:
${transcriptText}

---

TURNO ACTUAL: ${currentTurn} de 5
TÉCNICA A APLICAR: ${technique}

${currentTurn === 2 ? `
Analiza la primera respuesta e identifica un PATRÓN que el usuario mencionó o insinuó. 
Cita algo específico que dijo y pregunta cuándo más se repite eso en su vida.
` : ''}

${currentTurn === 3 ? `
Busca una INCOHERENCIA o PUNTO CIEGO en lo que el usuario ha compartido.
Puede ser algo que dice pero sus acciones contradicen, algo que minimiza, o algo que evita ver.
Señálalo con empatía pero directamente. Por ejemplo: "Mencionaste X pero también dijiste Y... ¿cómo conviven esas dos cosas?"
` : ''}

${currentTurn === 4 ? `
Conecta lo que ha revelado con sus VALORES y PROPÓSITO.
Llévalo a una decisión o elección clara. Por ejemplo: "Con todo esto que has compartido... ¿qué estás eligiendo realmente y qué costo tiene?"
` : ''}

${currentTurn === 5 ? `
Esta es la pregunta FINAL de síntesis.
Debe ser directa y pedir honestidad brutal. Por ejemplo: "Si fueras completamente honesto contigo mismo, sin justificaciones ni historias... ¿dónde estás realmente en esta área y qué sería lo primero que cambiarías si de verdad quisieras?"
` : ''}

Genera LA SIGUIENTE PREGUNTA que:
1. Cite algo ESPECÍFICO de la última respuesta del usuario ("mencionaste que...", "dijiste que...")
2. Aplique la técnica del turno actual
3. Empuje un nivel más profundo en autoconocimiento
4. Sea conversacional pero directa, sin rodeos
5. No sea genérica ni pudiera aplicarse a cualquier persona

IMPORTANTE: Si la última respuesta fue superficial o evasiva, primero pide un ejemplo concreto específico y luego profundiza.`,
    })

    return Response.json({ question: output?.question || '' })
  } catch (error) {
    console.error('Error generating coaching question:', error)
    return Response.json(
      { error: 'Error al generar la pregunta. Por favor, intenta de nuevo.' },
      { status: 500 }
    )
  }
}
