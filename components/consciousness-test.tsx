"use client"

import { useState } from "react"
import { HAWKINS_QUESTION } from "@/lib/hawkins"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface AnalysisResult {
  level: number
  emotion: string
  explanation: string
}

export function ConsciousnessTest() {
  const [userResponse, setUserResponse] = useState("")
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
            <Button
              onClick={handleReset}
              variant="outline"
              className="w-full h-12 text-base font-medium mt-4 bg-transparent"
            >
              Realizar nuevo análisis
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
