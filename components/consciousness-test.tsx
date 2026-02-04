"use client"

import { useState, useEffect } from "react"
import { HAWKINS_QUESTION } from "@/lib/hawkins"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Trash2, Clock, History } from "lucide-react"

interface AnalysisResult {
  level: number
  emotion: string
  explanation: string
}

interface HistoryEntry extends AnalysisResult {
  id: string
  date: string
  userResponse: string
}

export function ConsciousnessTest() {
  const [userResponse, setUserResponse] = useState("")
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [history, setHistory] = useState<HistoryEntry[]>([])

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("consciousness-test-history")
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory))
      } catch {
        // Invalid data, ignore
      }
    }
  }, [])

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("consciousness-test-history", JSON.stringify(history))
    }
  }, [history])

  const handleAnalyze = async () => {
    if (!userResponse.trim()) {
      setError("Por favor, escribe una respuesta antes de analizar.")
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userText: userResponse }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al analizar la respuesta")
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setUserResponse("")
    setResult(null)
    setError(null)
  }

  const saveToHistory = () => {
    if (result) {
      const newEntry: HistoryEntry = {
        id: Date.now().toString(),
        date: new Date().toLocaleString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        level: result.level,
        emotion: result.emotion,
        explanation: result.explanation,
        userResponse: userResponse,
      }
      setHistory((prev) => [newEntry, ...prev])
    }
  }

  const deleteFromHistory = (id: string) => {
    setHistory((prev) => {
      const newHistory = prev.filter((entry) => entry.id !== id)
      if (newHistory.length === 0) {
        localStorage.removeItem("consciousness-test-history")
      }
      return newHistory
    })
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem("consciousness-test-history")
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {!result ? (
        <Card className="border-0 shadow-sm bg-card">
          <CardHeader className="space-y-4 pb-6">
            <CardTitle className="text-lg font-medium text-foreground leading-relaxed">
              {HAWKINS_QUESTION}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Textarea
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              placeholder="Escribe tu respuesta aquí..."
              className="min-h-[200px] resize-none text-base leading-relaxed border-muted focus:border-foreground/20"
              disabled={isLoading}
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <Button
              onClick={handleAnalyze}
              disabled={isLoading || !userResponse.trim()}
              className="w-full h-12 text-base font-medium"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analizando...
                </>
              ) : (
                "Analizar mi nivel de conciencia"
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-0 shadow-sm bg-card">
          <CardHeader className="text-center pb-2">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
              Nivel de Conciencia
            </p>
            <CardTitle className="text-7xl font-light text-foreground">
              {result.level}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="text-center">
              <p className="text-sm uppercase tracking-wider text-muted-foreground mb-1">
                Emoción Dominante
              </p>
              <p className="text-xl font-medium text-foreground">
                {result.emotion}
              </p>
            </div>
            <div className="border-t border-border pt-6">
              <p className="text-sm uppercase tracking-wider text-muted-foreground mb-3">
                Análisis
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                {result.explanation}
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={saveToHistory}
                className="flex-1 h-12 text-base font-medium"
              >
                Guardar en historial
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="flex-1 h-12 text-base font-medium bg-transparent"
              >
                Nuevo análisis
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* History Section */}
      {history.length > 0 && (
        <Card className="border-0 shadow-sm bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div className="flex items-center gap-2">
              <History className="h-5 w-5 text-muted-foreground" />
              <CardTitle className="text-lg font-medium text-foreground">
                Historial de Resultados
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
            {history.map((entry) => (
              <div
                key={entry.id}
                className="flex items-start justify-between p-4 rounded-lg bg-muted/50 border border-border/50"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-light text-foreground">
                      {entry.level}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {entry.emotion}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {entry.date}
                      </div>
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
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
