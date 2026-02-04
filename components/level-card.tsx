"use client"

import { useRouter } from "next/navigation"
import type { ValoracionLevel } from "@/lib/valoracion"

interface LevelCardProps {
  level: ValoracionLevel
}

export function LevelCard({ level }: LevelCardProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/valoracion/pregunta?nivel=${encodeURIComponent(level.key)}`)
  }

  return (
    <button
      onClick={handleClick}
      className="group relative flex flex-col items-center justify-center p-6 rounded-xl border border-border bg-card transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      style={{
        borderColor: level.color,
        boxShadow: `0 0 0 1px ${level.color}20`,
      }}
    >
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
        style={{ backgroundColor: level.color }}
      />
      <span
        className="text-4xl font-light mb-2"
        style={{ color: level.color }}
      >
        {level.value}
      </span>
      <span className="text-base font-medium text-foreground">
        {level.name}
      </span>
    </button>
  )
}
