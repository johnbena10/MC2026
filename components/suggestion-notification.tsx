"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, Lightbulb } from "lucide-react"
import { LIFE_AREAS, type ValoracionHistoryEntry } from "@/lib/valoracion"

interface SuggestionNotificationProps {
  history: ValoracionHistoryEntry[]
}

export function SuggestionNotification({ history }: SuggestionNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [suggestion, setSuggestion] = useState<{
    area: typeof LIFE_AREAS[number]
    reason: "not_evaluated" | "low_score"
    score?: number
  } | null>(null)

  useEffect(() => {
    // Wait a bit before showing
    const timer = setTimeout(() => {
      const suggestedArea = getSuggestion(history)
      if (suggestedArea) {
        setSuggestion(suggestedArea)
        setIsVisible(true)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [history])

  const getSuggestion = (hist: ValoracionHistoryEntry[]) => {
    // Find areas not evaluated
    const evaluatedAreas = new Set(
      hist.map((h) => {
        const area = LIFE_AREAS.find(
          (a) => a.name === h.selectedArea || a.key === h.selectedArea
        )
        return area?.key
      })
    )

    const notEvaluatedAreas = LIFE_AREAS.filter((a) => !evaluatedAreas.has(a.key))
    
    if (notEvaluatedAreas.length > 0) {
      // Suggest a random non-evaluated area
      const randomIndex = Math.floor(Math.random() * notEvaluatedAreas.length)
      return {
        area: notEvaluatedAreas[randomIndex],
        reason: "not_evaluated" as const,
      }
    }

    // Find area with lowest most recent score
    const latestByArea = new Map<string, ValoracionHistoryEntry>()
    
    // Sort by timestamp descending
    const sortedHist = [...hist].sort((a, b) => parseInt(b.id) - parseInt(a.id))
    
    sortedHist.forEach((entry) => {
      const area = LIFE_AREAS.find(
        (a) => a.name === entry.selectedArea || a.key === entry.selectedArea
      )
      if (area && !latestByArea.has(area.key)) {
        latestByArea.set(area.key, entry)
      }
    })

    // Find lowest score
    let lowestScore = Infinity
    let lowestArea: typeof LIFE_AREAS[number] | null = null

    latestByArea.forEach((entry, areaKey) => {
      if (entry.predominantValue < lowestScore) {
        lowestScore = entry.predominantValue
        lowestArea = LIFE_AREAS.find((a) => a.key === areaKey) || null
      }
    })

    if (lowestArea && lowestScore < 200) {
      return {
        area: lowestArea,
        reason: "low_score" as const,
        score: lowestScore,
      }
    }

    return null
  }

  if (!isVisible || !suggestion) return null

  return (
    <div 
      className="fixed bottom-24 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-40 animate-in slide-in-from-bottom-4 fade-in duration-300"
    >
      <div 
        className="p-4 rounded-2xl shadow-lg border backdrop-blur-sm"
        style={{
          backgroundColor: `${suggestion.area.color}10`,
          borderColor: `${suggestion.area.color}30`,
        }}
      >
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-3 pr-6">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${suggestion.area.color}20` }}
          >
            <Lightbulb className="h-5 w-5" style={{ color: suggestion.area.color }} />
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground mb-1">
              {suggestion.reason === "not_evaluated" 
                ? "Area por explorar" 
                : "Area para trabajar"}
            </p>
            <p className="text-xs text-muted-foreground mb-3">
              {suggestion.reason === "not_evaluated" 
                ? `Aun no has valorado "${suggestion.area.name.split(" ")[0]}".`
                : `Tu ultimo nivel en "${suggestion.area.name.split(" ")[0]}" fue ${suggestion.score}. Una nueva valoracion puede ayudarte.`}
            </p>
            
            <Link
              href={`/valoracion/pregunta?area=${suggestion.area.key}`}
              onClick={() => setIsVisible(false)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-white transition-all hover:opacity-90"
              style={{ backgroundColor: suggestion.area.color }}
            >
              Valorar ahora
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
