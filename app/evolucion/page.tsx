"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  CONSCIOUSNESS_LEVELS,
  LIFE_AREAS,
  type ValoracionHistoryEntry,
} from "@/lib/valoracion"
import { Button } from "@/components/ui/button"
import { Clock, History, Trash2, TrendingUp, Compass } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Scatter,
  ScatterChart,
  ZAxis,
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

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem("valoracion-history")
  }

  // Prepare scatter plot data - each valoracion is a point
  const scatterData = [...history].reverse().map((entry, index) => {
    const areaData = LIFE_AREAS.find(
      (a) => a.name === entry.selectedArea || a.key === entry.selectedArea
    )
    return {
      x: index,
      y: entry.predominantValue,
      date: entry.date,
      levelName: entry.predominant,
      area: areaData?.name || entry.selectedArea,
      areaKey: areaData?.key || entry.selectedArea,
      color: areaData?.color || "#888",
      id: entry.id,
      explanation: entry.explanation,
    }
  })

  // Get unique areas with data
  const areasWithData = LIFE_AREAS.filter((area) =>
    history.some((h) => h.selectedArea === area.name || h.selectedArea === area.key)
  )

  // Group data by date for better X axis
  const dateLabels = scatterData.map((d, i) => ({
    index: i,
    label: d.date.split(",")[0],
  }))

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
                  Cada punto representa una valoracion. Colores por area de vida.
                </p>
              </div>

              <div className="h-[350px] md:h-[400px] w-full -ml-2 md:ml-0">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 10, bottom: 60, left: 0 }}>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke="hsl(var(--border))" 
                      vertical={false}
                    />
                    <XAxis
                      type="number"
                      dataKey="x"
                      domain={[0, Math.max(scatterData.length - 1, 1)]}
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      tickFormatter={(value) => {
                        const label = dateLabels.find((d) => d.index === value)
                        return label?.label || ""
                      }}
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
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      ticks={[20, 100, 200, 310, 400, 500, 600]}
                      width={35}
                    />
                    <ZAxis range={[100, 100]} />
                    
                    {/* Reference line at 200 (Courage) */}
                    <ReferenceLine 
                      y={200} 
                      stroke="hsl(var(--primary))" 
                      strokeDasharray="5 5" 
                      strokeOpacity={0.5}
                    />
                    
                    <Tooltip
                      cursor={{ strokeDasharray: '3 3' }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="p-3 rounded-xl bg-card border border-border shadow-lg text-sm">
                              <div className="flex items-center gap-2 mb-2">
                                <div 
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: data.color }}
                                />
                                <span className="font-medium text-foreground">{data.area}</span>
                              </div>
                              <div className="space-y-1">
                                <p className="text-muted-foreground">
                                  Nivel: <span className="font-semibold text-foreground">{data.y}</span> - {data.levelName}
                                </p>
                                <p className="text-xs text-muted-foreground">{data.date}</p>
                              </div>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    
                    <Scatter data={scatterData} shape="circle">
                      {scatterData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          stroke={entry.color}
                          strokeWidth={2}
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
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <History className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-semibold text-foreground">
                    Historial ({history.length})
                  </span>
                </div>
                <button
                  onClick={clearHistory}
                  className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                >
                  Limpiar todo
                </button>
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
