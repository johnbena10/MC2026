"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  CONSCIOUSNESS_LEVELS,
  LIFE_AREAS,
  type ValoracionHistoryEntry,
} from "@/lib/valoracion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, History, Trash2, TrendingUp } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function EvolucionPage() {
  const [history, setHistory] = useState<ValoracionHistoryEntry[]>([])

  useEffect(() => {
    const storedHistory = localStorage.getItem("valoracion-history")
    if (storedHistory) {
      try {
        setHistory(JSON.parse(storedHistory))
      } catch {
        // Invalid data, ignore
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

  // Prepare chart data - reverse to show chronological order (oldest first)
  const chartData = [...history].reverse().map((entry) => {
    const areaData = LIFE_AREAS.find(
      (a) => a.name === entry.selectedArea || a.key === entry.selectedArea
    )
    return {
      date: entry.date.split(",")[0], // Only date part
      fullDate: entry.date,
      level: entry.predominantValue,
      levelName: entry.predominant,
      area: areaData?.name || entry.selectedArea,
      areaKey: areaData?.key || entry.selectedArea,
      areaColor: areaData?.color || "#888",
      id: entry.id,
    }
  })

  // Group data by area for the line chart
  const areaGroups = LIFE_AREAS.map((area) => {
    const areaEntries = chartData.filter(
      (d) => d.areaKey === area.key || d.area === area.name
    )
    return {
      ...area,
      entries: areaEntries,
      hasData: areaEntries.length > 0,
    }
  }).filter((a) => a.hasData)

  // Prepare data for multi-line chart
  const allDates = [...new Set(chartData.map((d) => d.fullDate))].sort()
  const multiLineData = allDates.map((date) => {
    const point: Record<string, string | number | undefined> = { date: date.split(",")[0], fullDate: date }
    LIFE_AREAS.forEach((area) => {
      const entry = chartData.find(
        (d) => d.fullDate === date && (d.areaKey === area.key || d.area === area.name)
      )
      if (entry) {
        point[area.key] = entry.level
      }
    })
    return point
  })

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
            <TrendingUp className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-3xl font-light tracking-tight text-foreground mb-2">
            Evolución de Conciencia
          </h1>
          <p className="text-muted-foreground">
            Visualiza cómo ha evolucionado tu nivel de conciencia en cada área
          </p>
        </header>

        {history.length === 0 ? (
          <Card className="border-0 shadow-sm bg-card">
            <CardContent className="py-16 text-center">
              <History className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
              <h2 className="text-lg font-medium text-foreground mb-2">
                Sin valoraciones guardadas
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Realiza tu primera valoración para ver tu evolución aquí.
              </p>
              <Link href="/valoracion">
                <Button>Comenzar Valoración</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Evolution Chart */}
            <Card className="border-0 shadow-sm bg-card mb-8">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-foreground">
                  Evolución por Área de Vida
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Nivel de conciencia (20-600) a lo largo del tiempo
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={multiLineData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="date"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        domain={[0, 700]}
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        ticks={[20, 100, 200, 310, 400, 500, 600]}
                        tickFormatter={(value) => {
                          const level = CONSCIOUSNESS_LEVELS.find((l) => l.value === value)
                          return level ? `${value}` : `${value}`
                        }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          fontSize: "12px",
                        }}
                        labelStyle={{ color: "hsl(var(--foreground))" }}
                        formatter={(value: number, name: string) => {
                          const area = LIFE_AREAS.find((a) => a.key === name)
                          const level = CONSCIOUSNESS_LEVELS.find(
                            (l) => l.value === value || Math.abs(l.value - value) < 30
                          )
                          return [
                            `${value} - ${level?.name || ""}`,
                            area?.name || name,
                          ]
                        }}
                      />
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        formatter={(value: string) => {
                          const area = LIFE_AREAS.find((a) => a.key === value)
                          return (
                            <span style={{ color: "hsl(var(--muted-foreground))", fontSize: "11px" }}>
                              {area?.name.split(" ")[0] || value}
                            </span>
                          )
                        }}
                      />
                      {areaGroups.map((area) => (
                        <Line
                          key={area.key}
                          type="monotone"
                          dataKey={area.key}
                          stroke={area.color}
                          strokeWidth={2}
                          dot={{ fill: area.color, strokeWidth: 0, r: 4 }}
                          activeDot={{ r: 6, strokeWidth: 0 }}
                          connectNulls
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Reference Levels */}
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-3">
                    Niveles de referencia en la escala de Hawkins:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: 200, name: "Valentía", note: "punto de inflexión" },
                      { value: 310, name: "Disposición", note: "" },
                      { value: 400, name: "Razón", note: "" },
                      { value: 500, name: "Amor", note: "" },
                      { value: 600, name: "Paz", note: "" },
                    ].map((ref) => (
                      <div
                        key={ref.value}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-xs"
                      >
                        <span className="font-medium text-foreground">
                          {ref.value}
                        </span>
                        <span className="text-muted-foreground">
                          {ref.name}
                          {ref.note && (
                            <span className="text-muted-foreground/60">
                              {" "}({ref.note})
                            </span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* History List */}
            <Card className="border-0 shadow-sm bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div className="flex items-center gap-2">
                  <History className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-lg font-medium text-foreground">
                    Historial de Valoraciones
                  </CardTitle>
                  <span className="text-sm text-muted-foreground">
                    ({history.length})
                  </span>
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
              <CardContent className="space-y-3">
                {history.map((entry) => {
                  const entryLevel = CONSCIOUSNESS_LEVELS.find(
                    (l) =>
                      l.name.toLowerCase() === entry.predominant.toLowerCase()
                  )
                  const areaData = LIFE_AREAS.find(
                    (a) =>
                      a.name === entry.selectedArea ||
                      a.key === entry.selectedArea
                  )
                  return (
                    <div
                      key={entry.id}
                      className="flex items-start justify-between p-4 rounded-lg bg-muted/50 border border-border/50"
                    >
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-1 h-12 rounded-full"
                              style={{ backgroundColor: areaData?.color }}
                            />
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                {areaData?.name || entry.selectedArea}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span
                                  className="text-lg font-light"
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
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {entry.date}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 pl-4">
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
                  )
                })}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </main>
  )
}
