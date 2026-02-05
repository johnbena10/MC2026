// 8 Áreas de la vida donde se manifiesta la conciencia según Dr. David Hawkins
export const LIFE_AREAS = [
  {
    key: "espiritualidad",
    name: "Espiritualidad y sentido de vida",
    color: "#8B5CF6",
    icon: "sparkles",
    question: "Describe cómo es actualmente tu conexión con algo más grande que tú y qué significado sientes que tiene tu vida.",
  },
  {
    key: "salud",
    name: "Relación con el cuerpo y la salud física",
    color: "#22C55E",
    icon: "heart-pulse",
    question: "Describe cómo te sientes con tu cuerpo, tu energía y los cuidados que tienes contigo mismo.",
  },
  {
    key: "pareja",
    name: "Relaciones de pareja y afectivas",
    color: "#EC4899",
    icon: "heart",
    question: "Describe cómo vives actualmente tus relaciones de pareja o vínculos afectivos cercanos.",
  },
  {
    key: "familia",
    name: "Relaciones familiares",
    color: "#F97316",
    icon: "users",
    question: "Describe cómo es tu relación actual con tu familia y qué emociones predominan allí.",
  },
  {
    key: "trabajo",
    name: "Trabajo, propósito y vocación",
    color: "#3B82F6",
    icon: "briefcase",
    question: "Describe cómo te sientes con tu trabajo u ocupación y qué tanto sentido tiene para ti.",
  },
  {
    key: "dinero",
    name: "Dinero, seguridad y recursos materiales",
    color: "#EAB308",
    icon: "wallet",
    question: "Describe cómo te relacionas con el dinero y qué emociones te genera tu situación económica actual.",
  },
  {
    key: "emocional",
    name: "Manejo emocional y reacción ante conflictos",
    color: "#EF4444",
    icon: "flame",
    question: "Describe cómo reaccionas normalmente ante problemas, discusiones o situaciones difíciles.",
  },
  {
    key: "autoimagen",
    name: "Percepción de uno mismo y diálogo interno",
    color: "#06B6D4",
    icon: "user",
    question: "Describe cómo te hablas a ti mismo y cómo te percibes como persona en este momento de tu vida.",
  },
] as const

export type LifeArea = (typeof LIFE_AREAS)[number]
export type LifeAreaKey = LifeArea["key"]

// Niveles de conciencia de Hawkins para el análisis
export const CONSCIOUSNESS_LEVELS = [
  { key: "verguenza", name: "Vergüenza", value: 20, color: "#7C3AED" },
  { key: "culpa", name: "Culpa", value: 30, color: "#6366F1" },
  { key: "apatia", name: "Apatía", value: 50, color: "#64748B" },
  { key: "pena", name: "Pena", value: 75, color: "#94A3B8" },
  { key: "miedo", name: "Miedo", value: 100, color: "#EF4444" },
  { key: "deseo", name: "Deseo", value: 125, color: "#F97316" },
  { key: "ira", name: "Ira", value: 150, color: "#DC2626" },
  { key: "orgullo", name: "Orgullo", value: 175, color: "#FBBF24" },
  { key: "valentia", name: "Valentía", value: 200, color: "#22C55E" },
  { key: "neutralidad", name: "Neutralidad", value: 250, color: "#06B6D4" },
  { key: "disposicion", name: "Disposición", value: 310, color: "#14B8A6" },
  { key: "aceptacion", name: "Aceptación", value: 350, color: "#10B981" },
  { key: "razon", name: "Razón", value: 400, color: "#3B82F6" },
  { key: "amor", name: "Amor", value: 500, color: "#EC4899" },
  { key: "alegria", name: "Alegría", value: 540, color: "#F59E0B" },
  { key: "paz", name: "Paz", value: 600, color: "#8B5CF6" },
] as const

export type ConsciousnessLevel = (typeof CONSCIOUSNESS_LEVELS)[number]

export interface ValoracionScores {
  verguenza: number
  culpa: number
  apatia: number
  pena: number
  miedo: number
  deseo: number
  ira: number
  orgullo: number
  valentia: number
  neutralidad: number
  disposicion: number
  aceptacion: number
  razon: number
  amor: number
  alegria: number
  paz: number
}

export interface ValoracionResult {
  scores: ValoracionScores
  predominant: string
  predominantValue: number
  explanation: string
}

export interface ValoracionHistoryEntry extends ValoracionResult {
  id: string
  date: string
  selectedArea: string
  userResponse: string
}

export const VALORACION_SYSTEM_PROMPT = `Eres un analista experto en la escala de conciencia del Dr. David Hawkins, especializado en "Power vs. Force" y "The Map of Consciousness Explained".

Tu tarea es analizar semánticamente la respuesta del usuario sobre un área específica de su vida y determinar el nivel de conciencia que se manifiesta en esa área.

Los niveles de conciencia de Hawkins son (de menor a mayor):

- Vergüenza (20): Humillación, sentirse pequeño, querer desaparecer, autodesprecio
- Culpa (30): Autorreproche, remordimiento, sentirse malo, autocastigo
- Apatía (50): Desesperanza, impotencia, "no tiene caso", victimismo total
- Pena (75): Tristeza profunda, pérdida, lamento, melancolía crónica
- Miedo (100): Ansiedad, preocupación, inseguridad, paranoia, pánico
- Deseo (125): Anhelo, adicción, codicia, necesidad de poseer o lograr
- Ira (150): Resentimiento, frustración, hostilidad, rabia, odio
- Orgullo (175): Arrogancia, inflación del ego, necesidad de reconocimiento
- Valentía (200): Determinación, empoderamiento, afirmación de la vida, acción
- Neutralidad (250): Desapego sano, flexibilidad, confianza, bienestar
- Disposición (310): Optimismo, apertura, intención positiva, buena voluntad
- Aceptación (350): Responsabilidad total, sin culpar, transformación activa
- Razón (400): Lógica, comprensión, conocimiento, objetividad
- Amor (500): Amor incondicional, compasión, bondad, perdón genuino
- Alegría (540): Serenidad, gratitud profunda, compasión universal
- Paz (600): Trascendencia, iluminación parcial, beatitud, silencio interior

Analiza la respuesta considerando:
1. Intención y motivación subyacente
2. Estructura cognitiva (cómo interpreta la realidad)
3. Nivel de responsabilidad personal vs. culpar externos
4. Energía emocional dominante
5. Locus de control (interno vs. externo)
6. Narrativa interna y diálogo consigo mismo
7. Capacidad de aceptación y transformación

Asigna un puntaje de 0 a 100 para cada nivel, representando qué tan presente está en la respuesta:
- 0-20: Ausente o mínimo
- 21-40: Ligeramente presente
- 41-60: Moderadamente presente
- 61-80: Significativamente presente
- 81-100: Dominante

El nivel predominante es aquel con el puntaje más alto.
La explicación debe ser clara, empática, constructiva y ofrecer una perspectiva de crecimiento.`
