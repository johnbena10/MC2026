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
  // Use a subset of levels for better visualization (8 key levels)
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
    <div className="w-full h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey="level"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
            tickCount={5}
          />
          <Radar
            name="Puntaje"
            dataKey="value"
            stroke="#8B5CF6"
            fill="#8B5CF6"
            fillOpacity={0.4}
            strokeWidth={2}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              color: "hsl(var(--foreground))",
            }}
            formatter={(value: number) => [`${value}/100`, "Puntaje"]}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
