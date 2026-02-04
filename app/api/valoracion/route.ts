import { generateText, Output } from 'ai'
import { z } from 'zod'
import { VALORACION_SYSTEM_PROMPT } from '@/lib/valoracion'

const valoracionResponseSchema = z.object({
  scores: z.object({
    verguenza: z.number().min(0).max(100).describe('Puntaje de Vergüenza (0-100)'),
    culpa: z.number().min(0).max(100).describe('Puntaje de Culpa (0-100)'),
    miedo: z.number().min(0).max(100).describe('Puntaje de Miedo (0-100)'),
    deseo: z.number().min(0).max(100).describe('Puntaje de Deseo (0-100)'),
    ira: z.number().min(0).max(100).describe('Puntaje de Ira (0-100)'),
    orgullo: z.number().min(0).max(100).describe('Puntaje de Orgullo (0-100)'),
    valentia: z.number().min(0).max(100).describe('Puntaje de Valentía (0-100)'),
    neutralidad: z.number().min(0).max(100).describe('Puntaje de Neutralidad (0-100)'),
  }).describe('Puntajes de 0 a 100 para cada nivel de conciencia'),
  predominant: z.string().describe('Nombre del nivel predominante (el de mayor puntaje)'),
  explanation: z.string().describe('Explicación empática y constructiva del análisis'),
})

export async function POST(req: Request) {
  try {
    const { userText, selectedLevel } = await req.json()

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
      prompt: `El usuario seleccionó el nivel "${selectedLevel}" y escribió la siguiente respuesta:

"""
${userText}
"""

Analiza esta respuesta y asigna puntajes de 0 a 100 para cada uno de los ocho niveles de conciencia. Determina cuál es el nivel predominante y proporciona una explicación constructiva.`,
    })

    return Response.json(output)
  } catch (error) {
    console.error('Error analyzing valoracion:', error)
    return Response.json(
      { error: 'Error al analizar la respuesta. Por favor, intenta de nuevo.' },
      { status: 500 }
    )
  }
}
