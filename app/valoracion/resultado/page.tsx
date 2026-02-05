"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  CONSCIOUSNESS_LEVELS,
  LIFE_AREAS,
  type ValoracionHistoryEntry,
  type ValoracionScores,
} from "@/lib/valoracion"
import { ConsciousnessRadarChart } from "@/components/consciousness-radar-chart"
import { ProgressChart } from "@/components/progress-chart"
import { SuggestionNotification } from "@/components/suggestion-notification"
import { Button } from "@/components/ui/button"
import { Clock, History, RotateCcw, TrendingUp, Check, ChevronRight } from "lucide-react"

interface SessionResult {
  scores: ValoracionScores
  predominant: string
  predominantValue: number
  explanation: string
  selectedArea: string
  selectedAreaKey: string
  userResponse: string
}

export default function ResultadoPage() {
  const router = useRouter()
  const [result, setResult] = useState<SessionResult | null>(null)
  const [history, setHistory] = useState<ValoracionHistoryEntry[]>([])
  const hasSaved = useRef(false)

  useEffect(() => {
    const storedResult = sessionStorage.getItem("valoracion-result")
    if (storedResult) {
      try {
        setResult(JSON.parse(storedResult))
      } catch {
        router.push("/valoracion")
      }
    } else {
      router.push("/valoracion")
    }

    const storedHistory = localStorage.getItem("valoracion-history")
    if (storedHistory) {
      try {
        setHistory(JSON.parse(storedHistory))
      } catch {
        // Invalid data
      }
    }
  }, [router])

  // Auto-save result when it loads
  useEffect(() => {
    if (result && !hasSaved.current) {
      hasSaved.current = true
      const currentDate = new Date().toLocaleString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })

      const newEntry: ValoracionHistoryEntry = {
        id: Date.now().toString(),
        date: currentDate,
        scores: result.scores,
        predominant: result.predominant,
        predominantValue: result.predominantValue,
        explanation: result.explanation,
        selectedArea: result.selectedArea,
        userResponse: result.userResponse,
      }

      setHistory((prev) => {
        const updated = [newEntry, ...prev]
        localStorage.setItem("valoracion-history", JSON.stringify(updated))
        return updated
      })
    }
  }, [result])

  const handleNewValoracion = () => {
    sessionStorage.removeItem("valoracion-result")
    router.push("/valoracion")
  }

  if (!result) {
    return null
  }

  const currentDate = new Date().toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  const predominantLevel = CONSCIOUSNESS_LEVELS.find(
    (l) => l.name.toLowerCase() === result.predominant.toLowerCase()
  )

  const selectedAreaData = LIFE_AREAS.find(
    (a) => a.key === result.selectedAreaKey
  )

  const topScores = CONSCIOUSNESS_LEVELS
    .map((level) => ({
      ...level,
      score: result.scores[level.key as keyof ValoracionScores] || 0,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 md:pt-32 pb-32 md:pb-16 max-w-4xl">
        {/* Result Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground mb-4">
            <Clock className="h-3.5 w-3.5" />
            {currentDate}
            <span className="inline-flex items-center gap-1 ml-2 text-green-600">
              <Check className="h-3 w-3" />
              Guardado
            </span>
          </div>

          {selectedAreaData && (
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ 
                background: `linear-gradient(135deg, ${selectedAreaData.color}20 0%, ${selectedAreaData.color}08 100%)`,
                border: `1px solid ${selectedAreaData.color}30`
              }}
            >
              <span
                className="text-sm font-medium"
                style={{ color: selectedAreaData.color }}
              >
                {selectedAreaData.name}
              </span>
            </div>
          )}

          {/* Main Result */}
          <div
            className="inline-flex flex-col items-center p-8 rounded-3xl"
            style={{
              background: predominantLevel
                ? `linear-gradient(135deg, ${predominantLevel.color}15 0%, ${predominantLevel.color}05 100%)`
                : "var(--muted)",
              border: `1px solid ${predominantLevel?.color}30`
            }}
          >
            <span
              className="text-6xl md:text-7xl font-bold"
              style={{ color: predominantLevel?.color }}
            >
              {result.predominantValue}
            </span>
            <span
              className="text-2xl font-semibold mt-2"
              style={{ color: predominantLevel?.color }}
            >
              {result.predominant}
            </span>
            <span className="text-xs text-muted-foreground mt-1">
              Escala de Hawkins
            </span>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="p-6 rounded-3xl bg-card border border-border/50 mb-6">
          <ConsciousnessRadarChart scores={result.scores} />
        </div>

        {/* Top Scores */}
        <div className="p-6 rounded-3xl bg-card border border-border/50 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">
              Niveles mas presentes
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {topScores.map((level, index) => (
              <div
                key={level.key}
                className="flex flex-col items-center p-3 rounded-xl transition-all"
                style={{
                  background: index === 0 ? `${level.color}15` : 'var(--muted)',
                  border: index === 0 ? `1px solid ${level.color}30` : '1px solid transparent'
                }}
              >
                <span
                  className="text-2xl font-bold"
                  style={{ color: level.color }}
                >
                  {level.score}
                </span>
                <span className="text-xs text-muted-foreground text-center">
                  {level.name}
                </span>
                <span className="text-[10px] text-muted-foreground/60">
                  {level.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Explanation */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50 mb-6">
          <p className="text-sm font-semibold text-foreground mb-3">
            Analisis
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {result.explanation}
          </p>
        </div>

        {/* Progress Chart */}
        <div className="mb-8">
          <ProgressChart history={history} />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <Button
            onClick={handleNewValoracion}
            className="flex-1 h-14 text-base font-semibold rounded-full shadow-lg shadow-primary/20"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Nueva valoracion
          </Button>
          <Link href="/evolucion" className="flex-1">
            <Button
              variant="outline"
              className="w-full h-14 text-base font-semibold rounded-full bg-transparent"
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              Ver evolucion
            </Button>
          </Link>
        </div>

        {/* Link to Evolution */}
        <Link 
          href="/evolucion"
          className="flex items-center justify-between p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all group mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Ver mi evolucion completa</p>
              <p className="text-xs text-muted-foreground">Grafica de todas tus valoraciones</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </Link>

        {/* History Section */}
        {history.length > 0 && (
          <div className="p-6 rounded-3xl bg-card border border-border/50">
            <div className="flex items-center gap-2 mb-4">
              <History className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold text-foreground">
                Historial ({history.length})
              </span>
            </div>
            <div className="space-y-2">
              {history.slice(0, 5).map((entry) => {
                const entryLevel = CONSCIOUSNESS_LEVELS.find(
                  (l) => l.name.toLowerCase() === entry.predominant.toLowerCase()
                )
                const areaData = LIFE_AREAS.find(
                  (a) => a.name === entry.selectedArea || a.key === entry.selectedArea
                )
                return (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-1 h-10 rounded-full"
                        style={{ backgroundColor: areaData?.color }}
                      />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {areaData?.name.split(" ")[0] || entry.selectedArea}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {entry.date}
                        </p>
                      </div>
                    </div>
                    <span
                      className="text-lg font-bold"
                      style={{ color: entryLevel?.color }}
                    >
                      {entry.predominantValue}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Suggestion Notification */}
      <SuggestionNotification history={history} />
    </main>
  )
}
