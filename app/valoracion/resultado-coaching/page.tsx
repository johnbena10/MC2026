"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { LIFE_AREAS, CONSCIOUSNESS_LEVELS, type ValoracionHistoryEntry } from "@/lib/valoracion"
import { type TranscriptEntry } from "@/lib/coaching"
import { Button } from "@/components/ui/button"
import { ProgressChart } from "@/components/progress-chart"
import {
  Sparkles,
  HeartPulse,
  Heart,
  Users,
  Briefcase,
  Wallet,
  Flame,
  User,
  TrendingUp,
  Quote,
  Target,
  Check,
  ChevronRight,
  RotateCcw,
  ArrowUp,
  MessageCircle,
} from "lucide-react"

const iconMap = {
  sparkles: Sparkles,
  "heart-pulse": HeartPulse,
  heart: Heart,
  users: Users,
  briefcase: Briefcase,
  wallet: Wallet,
  flame: Flame,
  user: User,
}

interface CoachingResult {
  area: string
  areaKey: string
  score: number
  dominantLevel: string
  dominantEmotion: string
  textualSignals: string[]
  explanation: string
  recommendation: string
  hawkinsLevel: string
  hawkinsValue: number
  transcript: TranscriptEntry[]
  userResponse: string
}

export default function ResultadoCoachingPage() {
  const router = useRouter()
  const [result, setResult] = useState<CoachingResult | null>(null)
  const [history, setHistory] = useState<ValoracionHistoryEntry[]>([])
  const [showTranscript, setShowTranscript] = useState(false)
  const hasSaved = useRef(false)

  useEffect(() => {
    // Load result from session storage
    const storedResult = sessionStorage.getItem("coaching-result")
    if (storedResult) {
      try {
        const parsed = JSON.parse(storedResult)
        setResult(parsed)
      } catch {
        router.push("/valoracion")
      }
    } else {
      router.push("/valoracion")
    }

    // Load history
    const storedHistory = localStorage.getItem("valoracion-history")
    if (storedHistory) {
      try {
        setHistory(JSON.parse(storedHistory))
      } catch {
        // Invalid data
      }
    }
  }, [router])

  // Auto-save to history
  useEffect(() => {
    if (result && !hasSaved.current) {
      hasSaved.current = true
      saveToHistory()
    }
  }, [result])

  const saveToHistory = () => {
    if (!result) return

    const area = LIFE_AREAS.find(a => a.key === result.areaKey)
    
    // Create scores object compatible with history
    const scores = Object.fromEntries(
      CONSCIOUSNESS_LEVELS.map(level => [level.key, 0])
    ) as Record<string, number>
    
    // Set the dominant level score
    const dominantLevelKey = CONSCIOUSNESS_LEVELS.find(
      l => l.name.toLowerCase() === result.dominantLevel.toLowerCase()
    )?.key
    if (dominantLevelKey) {
      scores[dominantLevelKey] = 100
    }

    const newEntry: ValoracionHistoryEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      scores,
      predominant: result.dominantLevel,
      predominantValue: result.score,
      explanation: result.explanation,
      selectedArea: result.area,
      userResponse: result.userResponse,
    }

    const storedHistory = localStorage.getItem("valoracion-history")
    let existingHistory: ValoracionHistoryEntry[] = []
    if (storedHistory) {
      try {
        existingHistory = JSON.parse(storedHistory)
      } catch {
        // Invalid data
      }
    }

    const updatedHistory = [newEntry, ...existingHistory]
    localStorage.setItem("valoracion-history", JSON.stringify(updatedHistory))
    setHistory(updatedHistory)
  }

  if (!result) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Cargando resultado...</div>
      </main>
    )
  }

  const area = LIFE_AREAS.find(a => a.key === result.areaKey)
  const Icon = area ? iconMap[area.icon as keyof typeof iconMap] : Sparkles
  const areaColor = area?.color || "#8B5CF6"

  // Determine level color based on score
  const getLevelColor = (score: number) => {
    if (score >= 500) return "#EC4899" // Amor+
    if (score >= 350) return "#10B981" // Aceptación+
    if (score >= 200) return "#22C55E" // Valentía+
    if (score >= 100) return "#EF4444" // Miedo+
    return "#7C3AED" // Below 100
  }

  const levelColor = getLevelColor(result.score)

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 md:pt-32 pb-32 md:pb-16 max-w-3xl space-y-6">
        
        {/* Score Card */}
        <div 
          className="p-6 md:p-8 rounded-3xl relative overflow-hidden"
          style={{ 
            background: `linear-gradient(135deg, ${areaColor}15 0%, ${areaColor}05 100%)`,
            border: `1px solid ${areaColor}30`
          }}
        >
          {/* Saved Badge */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/20 text-green-600 text-xs font-medium">
            <Check className="w-3 h-3" />
            Guardado
          </div>

          {/* Area Badge */}
          <div className="flex items-center gap-2 mb-6">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${areaColor}20` }}
            >
              <Icon className="w-5 h-5" style={{ color: areaColor }} />
            </div>
            <span className="text-sm font-semibold text-foreground">{result.area}</span>
          </div>

          {/* Score Display */}
          <div className="text-center mb-6">
            <div 
              className="text-7xl md:text-8xl font-light mb-2"
              style={{ color: levelColor }}
            >
              {result.score}
            </div>
            <div className="flex items-center justify-center gap-2">
              <span 
                className="px-4 py-1.5 rounded-full text-sm font-semibold"
                style={{ 
                  backgroundColor: `${levelColor}20`,
                  color: levelColor 
                }}
              >
                {result.dominantLevel}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Emoción dominante: <span className="font-medium text-foreground">{result.dominantEmotion}</span>
            </p>
          </div>

          {/* Scale Reference */}
          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <span>0</span>
            <div className="flex-1 h-1.5 rounded-full bg-muted/50 max-w-[200px] relative overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ 
                  width: `${Math.min(result.score / 10, 100)}%`,
                  backgroundColor: levelColor 
                }}
              />
            </div>
            <span>1000</span>
          </div>
        </div>

        {/* Textual Signals */}
        <div className="p-5 md:p-6 rounded-2xl bg-card border border-border/50">
          <div className="flex items-center gap-2 mb-4">
            <Quote className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">Senales observadas en tu entrevista</span>
          </div>
          <ul className="space-y-2">
            {result.textualSignals.map((signal, idx) => (
              <li 
                key={`signal-${idx}`}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <div 
                  className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                  style={{ backgroundColor: areaColor }}
                />
                <span>"{signal}"</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Explanation */}
        <div className="p-5 md:p-6 rounded-2xl bg-card border border-border/50">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">Analisis segun Hawkins</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {result.explanation}
          </p>
        </div>

        {/* Recommendation */}
        <div 
          className="p-5 md:p-6 rounded-2xl"
          style={{ 
            background: `linear-gradient(135deg, ${areaColor}10 0%, ${areaColor}05 100%)`,
            border: `1px solid ${areaColor}25`
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-4 h-4" style={{ color: areaColor }} />
            <span className="text-sm font-semibold text-foreground">Tu paso para los proximos 7 dias</span>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            {result.recommendation}
          </p>
        </div>

        {/* Transcript Toggle */}
        <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="w-full flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium text-foreground">Ver entrevista completa</span>
            </div>
            <ChevronRight 
              className={`w-4 h-4 text-muted-foreground transition-transform ${showTranscript ? "rotate-90" : ""}`}
            />
          </button>
          
          {showTranscript && result.transcript && (
            <div className="mt-4 pt-4 border-t border-border/30 space-y-4">
              {result.transcript.map((entry, idx) => (
                <div key={`transcript-view-${entry.turn}-${idx}`} className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    Pregunta {entry.turn}:
                  </p>
                  <p className="text-sm text-foreground/80 italic">{entry.question}</p>
                  <p className="text-sm text-foreground pl-3 border-l-2" style={{ borderColor: areaColor }}>
                    {entry.answer}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Progress Chart */}
        {history.length > 0 && (
          <div className="p-5 md:p-6 rounded-3xl bg-card border border-border/50">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-semibold text-foreground">Tu Progreso</span>
            </div>
            <ProgressChart history={history} />
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/valoracion" className="flex-1">
            <Button 
              className="w-full h-14 rounded-full font-semibold"
              style={{ 
                backgroundColor: areaColor,
                boxShadow: `0 8px 32px ${areaColor}40`
              }}
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              Nueva valoracion
            </Button>
          </Link>
          <Link href="/evolucion" className="flex-1">
            <Button 
              variant="outline"
              className="w-full h-14 rounded-full font-semibold bg-transparent"
            >
              Ver evolucion
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Upgrade CTA */}
        <Link href="/vsl" className="block">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 hover:border-primary/40 transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Eleva tu nivel de conciencia</p>
                <p className="text-xs text-muted-foreground">Descubre como transformar vidas desde el escenario</p>
              </div>
            </div>
            <ArrowUp className="w-4 h-4 text-primary group-hover:translate-y-[-2px] transition-transform" />
          </div>
        </Link>
      </div>
    </main>
  )
}
