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
    router.push(`/valoracion/entrevista?area=${encodeURIComponent(area.key)}`)
  }

  return (
    <button
      onClick={handleClick}
      className="group relative flex flex-col items-center justify-center p-4 md:p-6 rounded-2xl md:rounded-3xl bg-card border border-border/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-transparent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 min-h-[140px] md:min-h-[160px] overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ 
          background: `linear-gradient(135deg, ${area.color}15 0%, ${area.color}05 100%)` 
        }}
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ 
          boxShadow: `inset 0 0 0 1px ${area.color}40`
        }}
      />
      <div
        className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl mb-3 md:mb-4 transition-all duration-300 group-hover:scale-110"
        style={{ 
          background: `linear-gradient(135deg, ${area.color}25 0%, ${area.color}10 100%)` 
        }}
      >
        <Icon
          className="w-6 h-6 md:w-7 md:h-7 transition-transform duration-300 group-hover:scale-110"
          style={{ color: area.color }}
        />
      </div>
      <span className="relative text-xs md:text-sm font-medium text-foreground text-center leading-tight px-1">
        {area.name}
      </span>
    </button>
  )
}
