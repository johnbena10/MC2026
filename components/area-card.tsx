"use client"

import { useRouter } from "next/navigation"
import type { LifeArea } from "@/lib/valoracion"
import {
  Sparkles,
  HeartPulse,
  Heart,
  Users,
  Briefcase,
  Wallet,
  Flame,
  User,
} from "lucide-react"

const iconMap = {
  sparkles: Sparkles,
  "heart-pulse": HeartPulse,
  heart: Heart,
  users: Users,
  briefcase: Briefcase,
  wallet: Wallet,
  flame: Flame,
  user: User,
}

interface AreaCardProps {
  area: LifeArea
}

export function AreaCard({ area }: AreaCardProps) {
  const router = useRouter()
  const Icon = iconMap[area.icon as keyof typeof iconMap] || Sparkles

  const handleClick = () => {
    router.push(`/valoracion/pregunta?area=${encodeURIComponent(area.key)}`)
  }

  return (
    <button
      onClick={handleClick}
      className="group relative flex flex-col items-center justify-center p-6 rounded-xl border border-border bg-card transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-h-[160px]"
      style={{
        borderColor: `${area.color}40`,
      }}
    >
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
        style={{ backgroundColor: area.color }}
      />
      <div
        className="flex items-center justify-center w-14 h-14 rounded-full mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${area.color}20` }}
      >
        <Icon
          className="w-7 h-7"
          style={{ color: area.color }}
        />
      </div>
      <span className="text-sm font-medium text-foreground text-center leading-tight px-2">
        {area.name}
      </span>
    </button>
  )
}
