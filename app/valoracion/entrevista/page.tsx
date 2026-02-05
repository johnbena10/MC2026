"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { LIFE_AREAS } from "@/lib/valoracion"
import { type TranscriptEntry } from "@/lib/coaching"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { 
  Loader2, 
  Sparkles, 
  HeartPulse, 
  Heart, 
  Users, 
  Briefcase, 
  Wallet, 
  Flame, 
  User, 
  Send,
  MessageCircle,
  ChevronRight
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

export default function EntrevistaPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const areaKey = searchParams.get("area")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  
  const [currentTurn, setCurrentTurn] = useState(1)
  const [currentQuestion, setCurrentQuestion] = useState("")
  const [userResponse, setUserResponse] = useState("")
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([])
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const selectedArea = LIFE_AREAS.find((a) => a.key === areaKey)
  const Icon = selectedArea ? iconMap[selectedArea.icon as keyof typeof iconMap] : Sparkles

  // Redirect if no area selected
  useEffect(() => {
    if (!areaKey || !selectedArea) {
      router.push("/valoracion")
    }
  }, [areaKey, selectedArea, router])

  // Fetch first question on mount
  useEffect(() => {
    if (selectedArea && currentTurn === 1 && !currentQuestion) {
      fetchQuestion()
    }
  }, [selectedArea])

  const fetchQuestion = async () => {
    setIsLoadingQuestion(true)
    setError(null)

    try {
      const response = await fetch("/api/coaching/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          areaKey: selectedArea?.key,
          transcript,
          currentTurn,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al obtener la pregunta")
      }

      const data = await response.json()
      setCurrentQuestion(data.question)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de conexión")
    } finally {
      setIsLoadingQuestion(false)
    }
  }

  const handleSubmitResponse = async () => {
    if (!userResponse.trim()) {
      setError("Por favor, escribe tu respuesta antes de continuar.")
      return
    }

    setIsSubmitting(true)
    setError(null)

    // Add current exchange to transcript
    const newEntry: TranscriptEntry = {
      turn: currentTurn,
      question: currentQuestion,
      answer: userResponse.trim(),
    }
    const updatedTranscript = [...transcript, newEntry]
    setTranscript(updatedTranscript)

    // If this was turn 5, calculate final result
    if (currentTurn === 5) {
      try {
        const response = await fetch("/api/coaching/result", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            areaKey: selectedArea?.key,
            transcript: updatedTranscript,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Error al calcular resultado")
        }

        const result = await response.json()

        // Save result with transcript to session storage
        sessionStorage.setItem(
          "coaching-result",
          JSON.stringify({
            ...result,
            transcript: updatedTranscript,
            userResponse: updatedTranscript.map(t => t.answer).join("\n\n"),
          })
        )

        router.push("/valoracion/resultado-coaching")
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al procesar resultado")
        setIsSubmitting(false)
      }
      return
    }

    // Otherwise, fetch next question
    setCurrentTurn(currentTurn + 1)
    setUserResponse("")

    try {
      const response = await fetch("/api/coaching/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          areaKey: selectedArea?.key,
          transcript: updatedTranscript,
          currentTurn: currentTurn + 1,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al obtener la siguiente pregunta")
      }

      const data = await response.json()
      setCurrentQuestion(data.question)
      
      // Focus textarea for next response
      setTimeout(() => textareaRef.current?.focus(), 100)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de conexión")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!selectedArea) {
    return null
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 md:pt-32 pb-32 md:pb-16 max-w-2xl">
        {/* Progress Header */}
        <div className="mb-8">
          {/* Area Badge */}
          <div className="text-center mb-4">
            <div
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full"
              style={{ 
                background: `linear-gradient(135deg, ${selectedArea.color}20 0%, ${selectedArea.color}08 100%)`,
                border: `1px solid ${selectedArea.color}30`
              }}
            >
              <Icon className="w-4 h-4" style={{ color: selectedArea.color }} />
              <span className="text-xs font-semibold" style={{ color: selectedArea.color }}>
                {selectedArea.name}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center justify-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((turn) => (
              <div
                key={turn}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  turn < currentTurn ? "w-8" : turn === currentTurn ? "w-12" : "w-6"
                }`}
                style={{
                  backgroundColor: turn <= currentTurn 
                    ? selectedArea.color 
                    : `${selectedArea.color}30`,
                }}
              />
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground">
            Pregunta {currentTurn} de 5
          </p>
        </div>

        {/* Previous exchanges (collapsed) */}
        {transcript.length > 0 && (
          <div className="mb-6 space-y-3">
            {transcript.slice(-2).map((entry, idx) => (
              <div 
                key={`transcript-${entry.turn}-${idx}`}
                className="p-3 rounded-xl bg-muted/30 border border-border/30"
              >
                <div className="flex items-start gap-2 mb-2">
                  <MessageCircle className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                  <p className="text-xs text-muted-foreground line-clamp-2">{entry.question}</p>
                </div>
                <p className="text-xs text-foreground/70 line-clamp-2 pl-5">{entry.answer}</p>
              </div>
            ))}
          </div>
        )}

        {/* Current Question */}
        <div className="mb-6">
          {isLoadingQuestion ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
              <div className="flex items-start gap-3">
                <div 
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${selectedArea.color}20` }}
                >
                  <MessageCircle className="w-4 h-4" style={{ color: selectedArea.color }} />
                </div>
                <p className="text-base md:text-lg font-medium text-foreground leading-relaxed pt-1">
                  {currentQuestion}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Response Input */}
        <div className="space-y-4">
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={userResponse}
              onChange={(e) => {
                setUserResponse(e.target.value)
                setError(null)
              }}
              placeholder={
                currentTurn === 1 
                  ? "Comparte tu experiencia con sinceridad..." 
                  : "Continúa profundizando en tu respuesta..."
              }
              className="min-h-[160px] md:min-h-[200px] resize-none text-base bg-card border-border/50 rounded-2xl p-5 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
              disabled={isLoadingQuestion || isSubmitting}
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
            onClick={handleSubmitResponse}
            disabled={isLoadingQuestion || isSubmitting || !userResponse.trim()}
            className="w-full h-14 text-base font-semibold rounded-full shadow-lg transition-all"
            style={{
              backgroundColor: isLoadingQuestion || isSubmitting || !userResponse.trim() 
                ? undefined 
                : selectedArea.color,
              boxShadow: isLoadingQuestion || isSubmitting || !userResponse.trim() 
                ? undefined 
                : `0 8px 32px ${selectedArea.color}40`
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {currentTurn === 5 ? "Analizando entrevista..." : "Procesando..."}
              </>
            ) : currentTurn === 5 ? (
              <>
                Finalizar y ver resultado
                <Sparkles className="ml-2 h-5 w-5" />
              </>
            ) : (
              <>
                Siguiente pregunta
                <ChevronRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground/60 text-center text-balance pt-2">
            Entrevista de coaching con IA. Cada pregunta se adapta a tus respuestas anteriores.
          </p>
        </div>
      </div>
    </main>
  )
}
