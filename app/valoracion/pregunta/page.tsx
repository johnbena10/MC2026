"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { LIFE_AREAS, type ValoracionResult } from "@/lib/valoracion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Loader2, Sparkles, HeartPulse, Heart, Users, Briefcase, Wallet, Flame, User } from "lucide-react"
import Link from "next/link"

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

export default function PreguntaPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const areaKey = searchParams.get("area")
  
  const [userResponse, setUserResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const selectedArea = LIFE_AREAS.find((a) => a.key === areaKey)
  const Icon = selectedArea ? iconMap[selectedArea.icon as keyof typeof iconMap] : Sparkles

  useEffect(() => {
    if (!areaKey || !selectedArea) {
      router.push("/valoracion")
    }
  }, [areaKey, selectedArea, router])

  if (!selectedArea) {
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
          selectedArea: selectedArea.name,
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
          selectedArea: selectedArea.name,
          selectedAreaKey: selectedArea.key,
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
              className="inline-flex items-center justify-center gap-3 px-5 py-3 rounded-full mx-auto mb-4"
              style={{ backgroundColor: `${selectedArea.color}15` }}
            >
              <Icon
                className="w-6 h-6"
                style={{ color: selectedArea.color }}
              />
              <span
                className="text-base font-medium"
                style={{ color: selectedArea.color }}
              >
                {selectedArea.name}
              </span>
            </div>
            <CardTitle className="text-xl font-normal text-foreground text-balance">
              {selectedArea.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Textarea
              value={userResponse}
              onChange={(e) => {
                setUserResponse(e.target.value)
                setError(null)
              }}
              placeholder="Escribe aquí tu respuesta con sinceridad..."
              className="min-h-[200px] resize-none text-base bg-background border-border focus:ring-2 focus:ring-ring"
              disabled={isLoading}
            />

            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}

            <Button
              onClick={handleAnalyze}
              disabled={isLoading || !userResponse.trim()}
              className="w-full h-12 text-base font-medium text-white"
              style={{
                backgroundColor: selectedArea.color,
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

            <p className="text-xs text-muted-foreground text-center text-balance">
              Tu respuesta será analizada usando inteligencia artificial para 
              determinar el nivel de conciencia que se manifiesta en esta área de tu vida.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
