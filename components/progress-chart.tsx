"use client"

import { useMemo, useState } from "react"
import {
  LIFE_AREAS,
  type ValoracionHistoryEntry,
} from "@/lib/valoracion"
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Scatter,
} from "recharts"

interface ProgressChartProps {
  history: ValoracionHistoryEntry[]
}

export function ProgressChart({ history }: ProgressChartProps) {
  const [selectedArea, setSelectedArea] = useState<string | "all">("all")

  const chartData = useMemo(() => {
    if (history.length === 0) return []

    // Parse dates and get timestamps
    const entriesWithTimestamp = history.map((entry) => {
      const [datePart, timePart] = entry.date.split(", ")
      const [day, month, year] = datePart.split("/").map(Number)
      const [hours, minutes] = (timePart || "00:00").split(":").map(Number)
      const timestamp = new Date(year, month - 1, day, hours || 0, minutes || 0).getTime()
      return { ...entry, timestamp, dateOnly: `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}` }
    })

    // Get date range
    const sortedByTime = [...entriesWithTimestamp].sort((a, b) => a.timestamp - b.timestamp)
    const firstDate = new Date(sortedByTime[0].timestamp)
    const lastDate = new Date(sortedByTime[sortedByTime.length - 1].timestamp)
    
    // Reset to start of day
    firstDate.setHours(0, 0, 0, 0)
    lastDate.setHours(23, 59, 59, 999)

    // Generate all dates in range
    const allDates: string[] = []
    const currentDate = new Date(firstDate)
    while (currentDate <= lastDate) {
      const day = currentDate.getDate().toString().padStart(2, "0")
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0")
      allDates.push(`${day}/${month}`)
      currentDate.setDate(currentDate.getDate() + 1)
    }

    // For each date and area, get only the most recent valoracion
    const latestByDateAndArea = new Map<string, ValoracionHistoryEntry>()
    
    // Sort by timestamp ascending so later entries overwrite earlier ones
    entriesWithTimestamp.sort((a, b) => a.timestamp - b.timestamp).forEach((entry) => {
      const areaData = LIFE_AREAS.find(
        (a) => a.name === entry.selectedArea || a.key === entry.selectedArea
      )
      const areaKey = areaData?.key || entry.selectedArea
      const key = `${entry.dateOnly}-${areaKey}`
      latestByDateAndArea.set(key, entry)
    })

    // Build chart data with all dates
    const data = allDates.map((date) => {
      const dataPoint: Record<string, number | string> = { date }
      
      LIFE_AREAS.forEach((area) => {
        const key = `${date}-${area.key}`
        const entry = latestByDateAndArea.get(key)
        // If no entry, value is 0
        dataPoint[area.key] = entry ? entry.predominantValue : 0
      })

      return dataPoint
    })

    return data
  }, [history])

  const areasToShow = selectedArea === "all" 
    ? LIFE_AREAS 
    : LIFE_AREAS.filter((a) => a.key === selectedArea)

  // Check which areas have any data
  const areasWithData = LIFE_AREAS.filter((area) =>
    history.some((h) => {
      const areaData = LIFE_AREAS.find(
        (a) => a.name === h.selectedArea || a.key === h.selectedArea
      )
      return areaData?.key === area.key
    })
  )

  if (history.length === 0) {
    return null
  }

  return (
    <div className="p-4 md:p-6 rounded-3xl bg-card border border-border/50">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-foreground mb-1">
          Progreso
        </h2>
        <p className="text-sm text-muted-foreground">
          Tu evolucion dia a dia. Los dias sin valoracion muestran nivel 0.
        </p>
      </div>

      {/* Area Filter */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedArea("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            selectedArea === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          Todas
        </button>
        {areasWithData.map((area) => (
          <button
            key={area.key}
            onClick={() => setSelectedArea(area.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all inline-flex items-center gap-1.5`}
            style={{
              backgroundColor: selectedArea === area.key ? area.color : `${area.color}20`,
              color: selectedArea === area.key ? "white" : area.color,
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: selectedArea === area.key ? "white" : area.color }}
            />
            {area.name.split(" ")[0]}
          </button>
        ))}
      </div>

      <div className="h-[300px] md:h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 20, right: 10, bottom: 40, left: 0 }}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(var(--border))" 
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--muted-foreground))"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              angle={-45}
              textAnchor="end"
              height={50}
              interval={chartData.length > 10 ? Math.floor(chartData.length / 8) : 0}
            />
            <YAxis
              domain={[0, 1000]}
              stroke="hsl(var(--muted-foreground))"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              ticks={[0, 200, 400, 600, 800, 1000]}
              width={35}
            />
            
            {/* Reference line at 200 (Courage) */}
            <ReferenceLine 
              y={200} 
              stroke="hsl(var(--primary))" 
              strokeDasharray="5 5" 
              strokeOpacity={0.5}
            />

            <Tooltip
              cursor={{ fill: 'hsl(var(--muted))', fillOpacity: 0.3 }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const activePayloads = payload.filter((p) => (p.value as number) > 0)
                  if (activePayloads.length === 0) {
                    return (
                      <div className="p-3 rounded-xl bg-card border border-border shadow-lg text-sm">
                        <p className="font-medium text-foreground mb-1">{label}</p>
                        <p className="text-xs text-muted-foreground">Sin valoraciones</p>
                      </div>
                    )
                  }
                  return (
                    <div className="p-3 rounded-xl bg-card border border-border shadow-lg text-sm max-w-[220px]">
                      <p className="font-medium text-foreground mb-2">{label}</p>
                      <div className="space-y-1">
                        {activePayloads.map((p) => {
                          const area = LIFE_AREAS.find((a) => a.key === p.dataKey)
                          return (
                            <div key={p.dataKey} className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-1.5">
                                <div 
                                  className="w-2 h-2 rounded-full shrink-0"
                                  style={{ backgroundColor: area?.color }}
                                />
                                <span className="text-xs text-muted-foreground truncate">
                                  {area?.name.split(" ")[0]}
                                </span>
                              </div>
                              <span 
                                className="font-semibold text-xs"
                                style={{ color: area?.color }}
                              >
                                {p.value}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />

            {/* Vertical bars from 0 to value for each area */}
            {areasToShow.map((area) => (
              <Bar
                key={`bar-${area.key}`}
                dataKey={area.key}
                fill={`${area.color}30`}
                stroke={area.color}
                strokeWidth={1}
                barSize={selectedArea === "all" ? 4 : 12}
                radius={[2, 2, 0, 0]}
              />
            ))}

            {/* Lines connecting points */}
            {areasToShow.map((area) => (
              <Line
                key={`line-${area.key}`}
                type="linear"
                dataKey={area.key}
                stroke={area.color}
                strokeWidth={2}
                dot={{ fill: area.color, strokeWidth: 2, stroke: "white", r: 4 }}
                activeDot={{ r: 6, stroke: "white", strokeWidth: 2 }}
                connectNulls={false}
              />
            ))}

            {/* Scatter points for emphasis */}
            {areasToShow.map((area) => (
              <Scatter
                key={`scatter-${area.key}`}
                dataKey={area.key}
                fill={area.color}
                shape="circle"
              />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      {selectedArea === "all" && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {areasWithData.map((area) => (
              <div
                key={area.key}
                className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px]"
                style={{ backgroundColor: `${area.color}15` }}
              >
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: area.color }}
                />
                <span style={{ color: area.color }}>{area.name.split(" ")[0]}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reference */}
      <div className="mt-3 text-[10px] text-muted-foreground">
        Linea punteada = Valentia (200), punto de inflexion en la escala de Hawkins
      </div>
    </div>
  )
}
