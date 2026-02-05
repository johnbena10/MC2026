import { generateText, Output } from 'ai'
import { z } from 'zod'
import { VALORACION_SYSTEM_PROMPT, CONSCIOUSNESS_LEVELS } from '@/lib/valoracion'

const valoracionResponseSchema = z.object({
  scores: z.object({
    verguenza: z.number().min(0).max(100).describe('Puntaje de Vergüenza (0-100)'),
    culpa: z.number().min(0).max(100).describe('Puntaje de Culpa (0-100)'),
    apatia: z.number().min(0).max(100).describe('Puntaje de Apatía (0-100)'),
    pena: z.number().min(0).max(100).describe('Puntaje de Pena (0-100)'),
    miedo: z.number().min(0).max(100).describe('Puntaje de Miedo (0-100)'),
    deseo: z.number().min(0).max(100).describe('Puntaje de Deseo (0-100)'),
    ira: z.number().min(0).max(100).describe('Puntaje de Ira (0-100)'),
    orgullo: z.number().min(0).max(100).describe('Puntaje de Orgullo (0-100)'),
    valentia: z.number().min(0).max(100).describe('Puntaje de Valentía (0-100)'),
    neutralidad: z.number().min(0).max(100).describe('Puntaje de Neutralidad (0-100)'),
    disposicion: z.number().min(0).max(100).describe('Puntaje de Disposición (0-100)'),
    aceptacion: z.number().min(0).max(100).describe('Puntaje de Aceptación (0-100)'),
    razon: z.number().min(0).max(100).describe('Puntaje de Razón (0-100)'),
    amor: z.number().min(0).max(100).describe('Puntaje de Amor (0-100)'),
    alegria: z.number().min(0).max(100).describe('Puntaje de Alegría (0-100)'),
    paz: z.number().min(0).max(100).describe('Puntaje de Paz (0-100)'),
  }).describe('Puntajes de 0 a 100 para cada nivel de conciencia de Hawkins'),
  predominant: z.string().describe('Nombre del nivel predominante (el de mayor puntaje)'),
  predominantValue: z.number().describe('Valor numérico en la escala de Hawkins del nivel predominante'),
  explanation: z.string().describe('Explicación empática y constructiva del análisis con perspectiva de crecimiento'),
})

export async function POST(req: Request) {
  try {
    const { userText, selectedArea } = await req.json()

    if (!userText || typeof userText !== 'string' || userText.trim().length === 0) {
      return Response.json(
        { error: 'Por favor, escribe una respuesta para analizar.' },
        { status: 400 }
      )
    }

    const { output } = await generateText({
      model: 'openai/gpt-4o',
      output: Output.object({
        schema: valoracionResponseSchema,
      }),
      system: VALORACION_SYSTEM_PROMPT,
      prompt: `El usuario está reflexionando sobre el área de su vida: "${selectedArea}"

Su respuesta es:
"""
${userText}
"""

Analiza esta respuesta y determina qué niveles de conciencia de la escala de Hawkins se manifiestan en esta área de su vida. Asigna puntajes de 0 a 100 para cada uno de los 16 niveles de conciencia. Identifica el nivel predominante con su valor numérico en la escala y proporciona una explicación constructiva.`,
    })

    // Verify predominantValue matches the level
    const predominantLevel = CONSCIOUSNESS_LEVELS.find(
      l => l.name.toLowerCase() === output?.predominant?.toLowerCase()
    )
    
    const result = {
      ...output,
      predominantValue: predominantLevel?.value || output?.predominantValue || 0
    }

    return Response.json(result)
  } catch (error) {
    console.error('Error analyzing valoracion:', error)
    return Response.json(
      { error: 'Error al analizar la respuesta. Por favor, intenta de nuevo.' },
      { status: 500 }
    )
  }
}
