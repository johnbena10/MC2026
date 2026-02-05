"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  CONSCIOUSNESS_LEVELS,
  LIFE_AREAS,
  type ValoracionHistoryEntry,
  type ValoracionScores,
} from "@/lib/valoracion"
import { ConsciousnessRadarChart } from "@/components/consciousness-radar-chart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Clock, History, Trash2, Save, RotateCcw, TrendingUp } from "lucide-react"
import Link from "next/link"

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
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    // Load result from sessionStorage
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

    // Load history from localStorage
    const storedHistory = localStorage.getItem("valoracion-history")
    if (storedHistory) {
      try {
        setHistory(JSON.parse(storedHistory))
      } catch {
        // Invalid data, ignore
      }
    }
  }, [router])

  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("valoracion-history", JSON.stringify(history))
    }
  }, [history])

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

  const saveToHistory = () => {
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
    setHistory((prev) => [newEntry, ...prev])
    setIsSaved(true)
  }

  const deleteFromHistory = (id: string) => {
    setHistory((prev) => {
      const newHistory = prev.filter((entry) => entry.id !== id)
      if (newHistory.length === 0) {
        localStorage.removeItem("valoracion-history")
      }
      return newHistory
    })
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem("valoracion-history")
  }

  const handleNewValoracion = () => {
    sessionStorage.removeItem("valoracion-result")
    router.push("/valoracion")
  }

  // Get top 5 scores for display
  const topScores = CONSCIOUSNESS_LEVELS
    .map((level) => ({
      ...level,
      score: result.scores[level.key as keyof ValoracionScores] || 0,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link
          href="/valoracion"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a selección
        </Link>

        {/* Current Result */}
        <Card className="border-0 shadow-sm bg-card mb-8">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
              <Clock className="h-4 w-4" />
              {currentDate}
            </div>
            <CardTitle className="text-2xl font-light text-foreground">
              Resultado de tu Valoración
            </CardTitle>
            {selectedAreaData && (
              <div
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full mx-auto mt-3"
                style={{ backgroundColor: `${selectedAreaData.color}15` }}
              >
                <span
                  className="text-sm font-medium"
                  style={{ color: selectedAreaData.color }}
                >
                  {selectedAreaData.name}
                </span>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Predominant Level */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Nivel de conciencia predominante
              </p>
              <div
                className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl"
                style={{
                  backgroundColor: predominantLevel
                    ? `${predominantLevel.color}15`
                    : "hsl(var(--muted))",
                }}
              >
                <span
                  className="text-4xl font-light"
                  style={{ color: predominantLevel?.color }}
                >
                  {result.predominantValue || predominantLevel?.value || "—"}
                </span>
                <div className="text-left">
                  <span
                    className="text-xl font-medium block"
                    style={{ color: predominantLevel?.color }}
                  >
                    {result.predominant}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    en la escala de Hawkins
                  </span>
                </div>
              </div>
            </div>

            {/* Radar Chart */}
            <ConsciousnessRadarChart scores={result.scores} />

            {/* Top 5 Levels */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  Niveles más presentes
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                {topScores.map((level, index) => (
                  <div
                    key={level.key}
                    className="flex items-center justify-between p-3 rounded-lg border border-border"
                    style={{
                      borderColor: index === 0 ? level.color : undefined,
                      backgroundColor: index === 0 ? `${level.color}10` : undefined,
                    }}
                  >
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">
                        {level.value}
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {level.name}
                      </span>
                    </div>
                    <span
                      className="text-lg font-semibold"
                      style={{ color: level.color }}
                    >
                      {level.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Explanation */}
            <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
              <p className="text-sm font-medium text-foreground mb-2">
                Análisis
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {result.explanation}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={saveToHistory}
                disabled={isSaved}
                className="flex-1 h-12 text-base font-medium"
              >
                <Save className="mr-2 h-4 w-4" />
                {isSaved ? "Guardado" : "Guardar en historial"}
              </Button>
              <Button
                onClick={handleNewValoracion}
                variant="outline"
                className="flex-1 h-12 text-base font-medium bg-transparent"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Nueva valoración
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* History Section */}
        {history.length > 0 && (
          <Card className="border-0 shadow-sm bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div className="flex items-center gap-2">
                <History className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg font-medium text-foreground">
                  Historial de Valoraciones
                </CardTitle>
              </div>
              <Button
                onClick={clearHistory}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Limpiar todo
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {history.map((entry) => {
                const entryLevel = CONSCIOUSNESS_LEVELS.find(
                  (l) =>
                    l.name.toLowerCase() === entry.predominant.toLowerCase()
                )
                return (
                  <div
                    key={entry.id}
                    className="flex items-start justify-between p-4 rounded-lg bg-muted/50 border border-border/50"
                  >
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span
                            className="text-2xl font-light"
                            style={{ color: entryLevel?.color }}
                          >
                            {entry.predominantValue || entryLevel?.value || "—"}
                          </span>
                          <div>
                            <p
                              className="text-sm font-medium"
                              style={{ color: entryLevel?.color }}
                            >
                              {entry.predominant}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {entry.selectedArea}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {entry.date}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {entry.explanation}
                      </p>
                    </div>
                    <Button
                      onClick={() => deleteFromHistory(entry.id)}
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive shrink-0 ml-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}
