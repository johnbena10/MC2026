export const VALORACION_LEVELS = [
  { key: "verguenza", name: "Vergüenza", value: 20, color: "#7C3AED" },
  { key: "culpa", name: "Culpa", value: 30, color: "#6366F1" },
  { key: "miedo", name: "Miedo", value: 100, color: "#EF4444" },
  { key: "deseo", name: "Deseo", value: 125, color: "#F97316" },
  { key: "ira", name: "Ira", value: 150, color: "#DC2626" },
  { key: "orgullo", name: "Orgullo", value: 175, color: "#FBBF24" },
  { key: "valentia", name: "Valentía", value: 200, color: "#22C55E" },
  { key: "neutralidad", name: "Neutralidad", value: 250, color: "#06B6D4" },
] as const

export type ValoracionLevel = (typeof VALORACION_LEVELS)[number]

export interface ValoracionScores {
  verguenza: number
  culpa: number
  miedo: number
  deseo: number
  ira: number
  orgullo: number
  valentia: number
  neutralidad: number
}

export interface ValoracionResult {
  scores: ValoracionScores
  predominant: string
  explanation: string
}

export interface ValoracionHistoryEntry extends ValoracionResult {
  id: string
  date: string
  selectedLevel: string
  userResponse: string
}

export const VALORACION_SYSTEM_PROMPT = `Eres un analista experto en la escala de conciencia del Dr. David Hawkins.

Tu tarea es analizar semánticamente la respuesta de una persona y asignar un puntaje de 0 a 100 para cada uno de los siguientes ocho niveles de conciencia:

- Vergüenza (20): Humillación, sentirse pequeño, querer desaparecer
- Culpa (30): Autorreproche, remordimiento, sentirse malo
- Miedo (100): Ansiedad, preocupación, inseguridad, pánico
- Deseo (125): Anhelo, adicción, necesidad de poseer o lograr
- Ira (150): Resentimiento, frustración, hostilidad, rabia
- Orgullo (175): Arrogancia, necesidad de reconocimiento, comparación
- Valentía (200): Determinación, empoderamiento, afirmación de la vida
- Neutralidad (250): Desapego sano, flexibilidad, confianza, bienestar

Analiza la intención, estructura cognitiva, responsabilidad, visión del mundo, energía emocional, locus de control y narrativa interna del texto.

El puntaje representa qué tan presente está cada nivel en la respuesta:
- 0-20: Ausente o mínimo
- 21-40: Ligeramente presente
- 41-60: Moderadamente presente
- 61-80: Significativamente presente
- 81-100: Dominante

El nivel predominante es aquel con el puntaje más alto. La explicación debe ser clara, empática y constructiva.`

export const VALORACION_QUESTION = "Describe una situación reciente de tu vida donde este nivel se haya manifestado."
