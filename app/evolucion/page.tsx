"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import {
  CONSCIOUSNESS_LEVELS,
  LIFE_AREAS,
  type ValoracionHistoryEntry,
} from "@/lib/valoracion"
import { Button } from "@/components/ui/button"
import { Clock, History, Trash2, TrendingUp, Compass } from "lucide-react"
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts"

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

  const deleteFromHistory = (id: string) => {
    setHistory((prev) => {
      const newHistory = prev.filter((entry) => entry.id !== id)
      localStorage.setItem("valoracion-history", JSON.stringify(newHistory))
      if (newHistory.length === 0) {
        localStorage.removeItem("valoracion-history")
      }
      return newHistory
    })
  }

  // Get unique dates and prepare chart data
  // For the chart: only show the most recent valoracion per area
  const chartData = useMemo(() => {
    // Group by area and get most recent for each
    const latestByArea = new Map<string, ValoracionHistoryEntry>()
    
    // Sort by date descending to get most recent first
    const sortedHistory = [...history].sort((a, b) => {
      return parseInt(b.id) - parseInt(a.id)
    })

    sortedHistory.forEach((entry) => {
      const areaKey = LIFE_AREAS.find(
        (a) => a.name === entry.selectedArea || a.key === entry.selectedArea
      )?.key || entry.selectedArea

      if (!latestByArea.has(areaKey)) {
        latestByArea.set(areaKey, entry)
      }
    })

    // Get all unique dates from history, sorted chronologically
    const allDates = [...new Set(history.map((h) => h.date.split(",")[0]))].sort((a, b) => {
      const [dayA, monthA, yearA] = a.split("/").map(Number)
      const [dayB, monthB, yearB] = b.split("/").map(Number)
      const dateA = new Date(yearA, monthA - 1, dayA)
      const dateB = new Date(yearB, monthB - 1, dayB)
      return dateA.getTime() - dateB.getTime()
    })

    // Create data points for each entry, grouped by date
    const points: Array<{
      x: number
      y: number
      date: string
      fullDate: string
      levelName: string
      area: string
      areaKey: string
      color: string
      id: string
    }> = []

    history.forEach((entry) => {
      const dateOnly = entry.date.split(",")[0]
      const dateIndex = allDates.indexOf(dateOnly)
      const areaData = LIFE_AREAS.find(
        (a) => a.name === entry.selectedArea || a.key === entry.selectedArea
      )

      points.push({
        x: dateIndex,
        y: entry.predominantValue,
        date: dateOnly,
        fullDate: entry.date,
        levelName: entry.predominant,
        area: areaData?.name || entry.selectedArea,
        areaKey: areaData?.key || entry.selectedArea,
        color: areaData?.color || "#888",
        id: entry.id,
      })
    })

    return { points, allDates }
  }, [history])

  // Get unique areas with data
  const areasWithData = LIFE_AREAS.filter((area) =>
    history.some((h) => h.selectedArea === area.name || h.selectedArea === area.key)
  )

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 md:pt-32 pb-32 md:pb-16 max-w-5xl">
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 mb-6">
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tu Evolucion
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Visualiza como ha evolucionado tu nivel de conciencia en cada area de tu vida
          </p>
        </header>

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
            {/* Chart Card */}
            <div className="p-4 md:p-6 rounded-3xl bg-card border border-border/50 mb-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-foreground mb-1">
                  Grafica de Evolucion
                </h2>
                <p className="text-sm text-muted-foreground">
                  Cada columna es una fecha. Los puntos verticales muestran el nivel de cada area evaluada ese dia.
                </p>
              </div>

              <div className="h-[350px] md:h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 10 }}>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke="hsl(var(--border))" 
                      vertical={true}
                    />
                    <XAxis
                      type="number"
                      dataKey="x"
                      domain={[-0.5, Math.max(chartData.allDates.length - 0.5, 0.5)]}
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={11}
                      tickLine={false}
                      axisLine={{ stroke: 'hsl(var(--border))' }}
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      tickFormatter={(value) => {
                        const date = chartData.allDates[Math.round(value)]
                        return date || ""
                      }}
                      ticks={chartData.allDates.map((_, i) => i)}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis
                      type="number"
                      dataKey="y"
                      domain={[0, 700]}
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={11}
                      tickLine={false}
                      axisLine={{ stroke: 'hsl(var(--border))' }}
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      ticks={[20, 100, 200, 310, 400, 500, 600]}
                      width={40}
                    />
                    
                    {/* Reference line at 200 (Courage - point of power) */}
                    <ReferenceLine 
                      y={200} 
                      stroke="hsl(var(--primary))" 
                      strokeDasharray="5 5" 
                      strokeOpacity={0.6}
                      label={{ 
                        value: "Valentia (200)", 
                        position: "right",
                        fill: "hsl(var(--primary))",
                        fontSize: 10
                      }}
                    />
                    
                    <Tooltip
                      cursor={{ strokeDasharray: '3 3', stroke: 'hsl(var(--border))' }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="p-3 rounded-xl bg-card border border-border shadow-lg text-sm max-w-[200px]">
                              <div className="flex items-center gap-2 mb-2">
                                <div 
                                  className="w-3 h-3 rounded-full shrink-0"
                                  style={{ backgroundColor: data.color }}
                                />
                                <span className="font-medium text-foreground truncate">{data.area}</span>
                              </div>
                              <div className="space-y-1">
                                <p className="text-muted-foreground">
                                  Nivel: <span className="font-semibold text-foreground">{data.y}</span> - {data.levelName}
                                </p>
                                <p className="text-xs text-muted-foreground">{data.fullDate}</p>
                              </div>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    
                    <Scatter data={chartData.points} shape="circle">
                      {chartData.points.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          stroke="white"
                          strokeWidth={2}
                          r={8}
                        />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-3">
                  Areas evaluadas:
                </p>
                <div className="flex flex-wrap gap-2">
                  {areasWithData.map((area) => (
                    <div
                      key={area.key}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
                      style={{ 
                        backgroundColor: `${area.color}15`,
                        color: area.color 
                      }}
                    >
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: area.color }}
                      />
                      {area.name.split(" ")[0]}
                    </div>
                  ))}
                </div>
              </div>

              {/* Reference Levels */}
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">
                  Niveles de referencia:
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {[
                    { value: 200, name: "Valentia", note: "punto de inflexion" },
                    { value: 310, name: "Disposicion" },
                    { value: 400, name: "Razon" },
                    { value: 500, name: "Amor" },
                    { value: 600, name: "Paz" },
                  ].map((ref) => (
                    <span
                      key={ref.value}
                      className="px-2 py-1 rounded-md bg-muted text-muted-foreground"
                    >
                      <span className="font-semibold">{ref.value}</span> {ref.name}
                      {ref.note && <span className="opacity-60"> ({ref.note})</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* History List */}
            <div className="p-4 md:p-6 rounded-3xl bg-card border border-border/50">
              <div className="flex items-center gap-2 mb-4">
                <History className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold text-foreground">
                  Historial ({history.length})
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
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span className="hidden sm:inline">{entry.date}</span>
                              <span className="sm:hidden">{entry.date.split(",")[0]}</span>
                            </span>
                            <button
                              onClick={() => deleteFromHistory(entry.id)}
                              className="p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded-lg hover:bg-muted"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
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
    </main>
  )
}
