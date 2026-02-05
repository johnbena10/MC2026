"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { LIFE_AREAS, type ValoracionResult } from "@/lib/valoracion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Sparkles, HeartPulse, Heart, Users, Briefcase, Wallet, Flame, User, Send } from "lucide-react"

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
        throw new Error(errorData.error || "Error en el analisis")
      }

      const result: ValoracionResult = await response.json()

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
      <div className="container mx-auto px-4 pt-24 md:pt-32 pb-32 md:pb-16 max-w-2xl">
        {/* Area Badge */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center gap-3 px-5 py-3 rounded-full"
            style={{ 
              background: `linear-gradient(135deg, ${selectedArea.color}20 0%, ${selectedArea.color}08 100%)`,
              border: `1px solid ${selectedArea.color}30`
            }}
          >
            <Icon
              className="w-5 h-5"
              style={{ color: selectedArea.color }}
            />
            <span
              className="text-sm font-semibold"
              style={{ color: selectedArea.color }}
            >
              {selectedArea.name}
            </span>
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-8">
          <h1 className="text-xl md:text-2xl font-semibold text-foreground text-balance leading-relaxed">
            {selectedArea.question}
          </h1>
        </div>

        {/* Input Area */}
        <div className="space-y-4">
          <div className="relative">
            <Textarea
              value={userResponse}
              onChange={(e) => {
                setUserResponse(e.target.value)
                setError(null)
              }}
              placeholder="Escribe aqui tu respuesta con sinceridad..."
              className="min-h-[200px] md:min-h-[240px] resize-none text-base bg-card border-border/50 rounded-2xl p-5 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
              disabled={isLoading}
            />
            <div className="absolute bottom-4 right-4 text-xs text-muted-foreground">
              {userResponse.length} caracteres
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center">
              {error}
            </div>
          )}

          <Button
            onClick={handleAnalyze}
            disabled={isLoading || !userResponse.trim()}
            className="w-full h-14 text-base font-semibold rounded-full shadow-lg transition-all"
            style={{
              backgroundColor: isLoading || !userResponse.trim() ? undefined : selectedArea.color,
              boxShadow: isLoading || !userResponse.trim() ? undefined : `0 8px 32px ${selectedArea.color}40`
            }}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analizando con IA...
              </>
            ) : (
              <>
                Analizar mi valoracion
                <Send className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground/60 text-center text-balance pt-2">
            Tu respuesta sera analizada usando GPT-4o para determinar el nivel de conciencia.
          </p>
        </div>
      </div>
    </main>
  )
}
