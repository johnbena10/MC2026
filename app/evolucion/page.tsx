"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  CONSCIOUSNESS_LEVELS,
  LIFE_AREAS,
  type ValoracionHistoryEntry,
} from "@/lib/valoracion"
import { ProgressChart } from "@/components/progress-chart"
import { SuggestionNotification } from "@/components/suggestion-notification"
import { Button } from "@/components/ui/button"
import { Clock, History, Compass, Sparkles, ArrowUp } from "lucide-react"

export default function EvolucionPage() {
  const [history, setHistory] = useState<ValoracionHistoryEntry[]>([])

  useEffect(() => {
    const storedHistory = localStorage.getItem("valoracion-history")
    if (storedHistory) {
      try {
        setHistory(JSON.parse(storedHistory))
      } catch {
        // Invalid data
      }
    }
  }, [])

  // Get unique areas with data
  const areasWithData = LIFE_AREAS.filter((area) =>
    history.some((h) => {
      const areaData = LIFE_AREAS.find(
        (a) => a.name === h.selectedArea || a.key === h.selectedArea
      )
      return areaData?.key === area.key
    })
  )

  // Calculate last day average
  const getLastDayAverage = () => {
    if (history.length === 0) return null
    
    // Get the most recent date
    const sortedHistory = [...history].sort((a, b) => {
      const dateA = new Date(a.date.split(",")[0].split("/").reverse().join("-"))
      const dateB = new Date(b.date.split(",")[0].split("/").reverse().join("-"))
      return dateB.getTime() - dateA.getTime()
    })
    
    const lastDate = sortedHistory[0].date.split(",")[0].trim()
    const lastDayEntries = history.filter(h => h.date.split(",")[0].trim() === lastDate)
    
    if (lastDayEntries.length === 0) return null
    
    const average = Math.round(
      lastDayEntries.reduce((acc, h) => acc + h.predominantValue, 0) / lastDayEntries.length
    )
    
    return { average, date: lastDate, count: lastDayEntries.length }
  }

  const lastDayData = getLastDayAverage()

  return (
    <main className="min-h-screen bg-background">
      {/* Motivational Banner */}
      {lastDayData && (
        <div className="fixed top-16 md:top-20 left-0 right-0 z-40 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 py-2.5 px-4 rounded-full bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 backdrop-blur-sm text-xs md:text-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
              <span className="text-muted-foreground">
                Tu promedio del <span className="font-medium text-foreground">{lastDayData.date}</span> fue{" "}
                <span className="font-bold text-primary">{lastDayData.average}</span>
              </span>
              <span className="text-muted-foreground/60">|</span>
              <span className="text-foreground font-medium flex items-center gap-1">
                <ArrowUp className="h-3 w-3 text-accent" />
                Hoy puedes calibrar mas alto
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 pt-32 md:pt-40 pb-32 md:pb-16 max-w-5xl">

        {history.length === 0 ? (
          <div className="text-center py-20 px-6 rounded-3xl bg-card border border-border/50">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6">
              <History className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Sin valoraciones aun
            </h2>
            <p className="text-sm text-muted-foreground mb-8 max-w-sm mx-auto">
              Realiza tu primera valoracion para comenzar a visualizar tu evolucion.
            </p>
            <Link href="/valoracion">
              <Button className="h-12 px-6 rounded-full font-semibold">
                <Compass className="mr-2 h-5 w-5" />
                Comenzar Valoracion
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Progress Chart */}
            <div className="mb-6">
              <ProgressChart history={history} />
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="p-4 rounded-2xl bg-card border border-border/50 text-center">
                <span className="text-2xl font-bold text-foreground">{history.length}</span>
                <p className="text-xs text-muted-foreground mt-1">Valoraciones</p>
              </div>
              <div className="p-4 rounded-2xl bg-card border border-border/50 text-center">
                <span className="text-2xl font-bold text-foreground">{areasWithData.length}</span>
                <p className="text-xs text-muted-foreground mt-1">Areas evaluadas</p>
              </div>
              <div className="p-4 rounded-2xl bg-card border border-border/50 text-center">
                <span className="text-2xl font-bold text-foreground">
                  {history.length > 0 ? Math.max(...history.map(h => h.predominantValue)) : 0}
                </span>
                <p className="text-xs text-muted-foreground mt-1">Nivel mas alto</p>
              </div>
              <div className="p-4 rounded-2xl bg-card border border-border/50 text-center">
                <span className="text-2xl font-bold text-foreground">
                  {history.length > 0 ? Math.round(history.reduce((acc, h) => acc + h.predominantValue, 0) / history.length) : 0}
                </span>
                <p className="text-xs text-muted-foreground mt-1">Promedio</p>
              </div>
            </div>

            {/* Upgrade CTA */}
            <Link href="/vsl" className="block mb-4">
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

            {/* History List */}
            <div className="p-4 md:p-6 rounded-3xl bg-card border border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <History className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold text-foreground">
                  Historial completo ({history.length})
                </span>
              </div>

              <div className="space-y-2">
                {history.map((entry) => {
                  const entryLevel = CONSCIOUSNESS_LEVELS.find(
                    (l) => l.name.toLowerCase() === entry.predominant.toLowerCase()
                  )
                  const areaData = LIFE_AREAS.find(
                    (a) => a.name === entry.selectedArea || a.key === entry.selectedArea
                  )
                  return (
                    <div
                      key={entry.id}
                      className="flex items-start gap-3 p-3 md:p-4 rounded-xl bg-muted/50 border border-border/30"
                    >
                      <div
                        className="w-1 h-full min-h-[60px] rounded-full shrink-0"
                        style={{ backgroundColor: areaData?.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {areaData?.name || entry.selectedArea}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span
                                className="text-lg font-bold"
                                style={{ color: entryLevel?.color }}
                              >
                                {entry.predominantValue}
                              </span>
                              <span
                                className="text-sm"
                                style={{ color: entryLevel?.color }}
                              >
                                {entry.predominant}
                              </span>
                            </div>
                          </div>
                          <span className="text-[10px] text-muted-foreground flex items-center gap-1 shrink-0">
                            <Clock className="h-3 w-3" />
                            <span className="hidden sm:inline">{entry.date}</span>
                            <span className="sm:hidden">{entry.date.split(",")[0]}</span>
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {entry.explanation}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>


          </>
        )}
      </div>

      {/* Suggestion Notification */}
      <SuggestionNotification history={history} />
    </main>
  )
}
