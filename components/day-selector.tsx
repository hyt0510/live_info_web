"use client"

import { cn } from "@/lib/utils"

interface DaySelectorProps {
  activeDay: 1 | 2
  onDayChange: (day: 1 | 2) => void
  className?: string
  scrollToSection?: () => void
}

export function DaySelector({ activeDay, onDayChange, className, scrollToSection }: DaySelectorProps) {
  return (
    <div className={cn("flex justify-center gap-4", className)}>
      {[1, 2].map((day) => (
        <button
          key={day}
          type="button"
          onClick={() => {
            onDayChange(day as 1 | 2)
            scrollToSection?.()
          }}
          className={cn(
            "relative px-8 py-3 font-mono text-sm tracking-wider rounded-lg transition-all duration-300 border",
            activeDay === day
              ? "border-primary text-primary"
              : "border-border text-muted-foreground hover:border-muted-foreground"
          )}
          style={{
            background:
              activeDay === day
                ? "linear-gradient(135deg, oklch(0.75 0.18 200 / 0.15) 0%, transparent 100%)"
                : "transparent",
            boxShadow: activeDay === day ? "0 0 20px oklch(0.75 0.18 200 / 0.3)" : "none",
          }}
        >
          <span className="relative z-10">DAY {day}</span>
          <span className="block text-xs mt-1 opacity-60">
            {day === 1 ? "3.7 SAT" : "3.8 SUN"}
          </span>
        </button>
      ))}
    </div>
  )
}
