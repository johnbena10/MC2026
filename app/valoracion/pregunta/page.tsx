"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { VALORACION_LEVELS, VALORACION_QUESTION, type ValoracionResult } from "@/lib/valoracion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

export default function PreguntaPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const nivelKey = searchParams.get("nivel")
  
  const [userResponse, setUserResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const selectedLevel = VALORACION_LEVELS.find((l) => l.key === nivelKey)

  useEffect(() => {
    if (!nivelKey || !selectedLevel) {
      router.push("/valoracion")
    }
  }, [nivelKey, selectedLevel, router])

  if (!selectedLevel) {
    return null
  }

  const handleAnalyze = async () => {
    if (!userResponse.trim()) {
      setError("Por favor, escribe tu respuesta antes de continuar.")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/valoracion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userText: userResponse,
          selectedLevel: selectedLevel.name,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error en el análisis")
      }

      const result: ValoracionResult = await response.json()

      // Store result and user data in sessionStorage for the results page
      sessionStorage.setItem(
        "valoracion-result",
        JSON.stringify({
          ...result,
          selectedLevel: selectedLevel.name,
          userResponse: userResponse,
        })
      )

      router.push("/valoracion/resultado")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al analizar la respuesta")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link
          href="/valoracion"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a selección
        </Link>

        <Card className="border-0 shadow-sm bg-card">
          <CardHeader className="text-center pb-6">
            <div
              className="inline-flex items-center justify-center gap-3 px-4 py-2 rounded-full mx-auto mb-4"
              style={{ backgroundColor: `${selectedLevel.color}15` }}
            >
              <span
                className="text-2xl font-light"
                style={{ color: selectedLevel.color }}
              >
                {selectedLevel.value}
              </span>
              <span
                className="text-lg font-medium"
                style={{ color: selectedLevel.color }}
              >
                {selectedLevel.name}
              </span>
            </div>
            <CardTitle className="text-xl font-normal text-foreground">
              {VALORACION_QUESTION}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Textarea
              value={userResponse}
              onChange={(e) => {
                setUserResponse(e.target.value)
                setError(null)
              }}
              placeholder="Escribe aquí tu experiencia..."
              className="min-h-[200px] resize-none text-base bg-background border-border focus:ring-2 focus:ring-ring"
              disabled={isLoading}
            />

            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}

            <Button
              onClick={handleAnalyze}
              disabled={isLoading || !userResponse.trim()}
              className="w-full h-12 text-base font-medium"
              style={{
                backgroundColor: selectedLevel.color,
                color: "#ffffff",
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analizando...
                </>
              ) : (
                "Analizar mi valoración"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
