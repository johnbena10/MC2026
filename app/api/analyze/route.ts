import { generateText, Output } from 'ai'
import { z } from 'zod'
import { HAWKINS_SYSTEM_PROMPT } from '@/lib/hawkins'

const hawkinsResponseSchema = z.object({
  level: z.number().describe('Nivel de conciencia según la escala de Hawkins'),
  emotion: z.string().describe('Emoción dominante asociada al nivel'),
  explanation: z.string().describe('Explicación del análisis semántico realizado'),
})

export async function POST(req: Request) {
  try {
    const { userText } = await req.json()

    if (!userText || typeof userText !== 'string' || userText.trim().length === 0) {
      return Response.json(
        { error: 'Por favor, escribe una respuesta para analizar.' },
        { status: 400 }
      )
    }

    const { output } = await generateText({
      model: 'openai/gpt-4o',
      output: Output.object({
        schema: hawkinsResponseSchema,
      }),
      system: HAWKINS_SYSTEM_PROMPT,
      prompt: `Respuesta del usuario:
"""
${userText}
"""`,
    })

    return Response.json(output)
  } catch (error) {
    console.error('Error analyzing consciousness level:', error)
    return Response.json(
      { error: 'Error al analizar la respuesta. Por favor, intenta de nuevo.' },
      { status: 500 }
    )
  }
}
