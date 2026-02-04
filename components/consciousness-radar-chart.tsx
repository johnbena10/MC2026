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
import { VALORACION_LEVELS, type ValoracionScores } from "@/lib/valoracion"

interface ConsciousnessRadarChartProps {
  scores: ValoracionScores
}

export function ConsciousnessRadarChart({ scores }: ConsciousnessRadarChartProps) {
  const data = VALORACION_LEVELS.map((level) => ({
    level: level.name,
    value: scores[level.key as keyof ValoracionScores],
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
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
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
            stroke="#22C55E"
            fill="#22C55E"
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
