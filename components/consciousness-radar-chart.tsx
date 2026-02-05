"use client"

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import { CONSCIOUSNESS_LEVELS, type ValoracionScores } from "@/lib/valoracion"

interface ConsciousnessRadarChartProps {
  scores: ValoracionScores
}

export function ConsciousnessRadarChart({ scores }: ConsciousnessRadarChartProps) {
  const keyLevels = [
    "verguenza",
    "miedo",
    "ira",
    "orgullo",
    "valentia",
    "aceptacion",
    "amor",
    "paz",
  ]

  const data = CONSCIOUSNESS_LEVELS
    .filter((level) => keyLevels.includes(level.key))
    .map((level) => ({
      level: level.name,
      value: scores[level.key as keyof ValoracionScores] || 0,
      fullMark: 100,
      color: level.color,
    }))

  return (
    <div className="w-full h-[280px] md:h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid 
            stroke="hsl(var(--border))" 
            strokeOpacity={0.5}
          />
          <PolarAngleAxis
            dataKey="level"
            tick={{ 
              fill: "hsl(var(--muted-foreground))", 
              fontSize: 10 
            }}
            tickLine={false}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ 
              fill: "hsl(var(--muted-foreground))", 
              fontSize: 9 
            }}
            tickCount={5}
            axisLine={false}
          />
          <Radar
            name="Puntaje"
            dataKey="value"
            stroke="hsl(var(--primary))"
            fill="hsl(var(--primary))"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload
                return (
                  <div className="p-2.5 rounded-xl bg-card border border-border shadow-lg text-sm">
                    <p className="font-medium text-foreground">{data.level}</p>
                    <p className="text-muted-foreground">
                      Puntaje: <span className="font-semibold text-foreground">{data.value}</span>/100
                    </p>
                  </div>
                )
              }
              return null
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
