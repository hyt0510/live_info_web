"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

const day1Timetable = [
  { time: "16:00", event: "OPEN", color: "muted" },
  { time: "16:30", artist: "NOVA", color: "cyan" },
  { time: "17:10", artist: "Stellar Echo", color: "purple" },
  { time: "17:50", event: "BREAK", color: "muted" },
  { time: "18:10", artist: "Orbit Collective", color: "lime" },
  { time: "18:50", artist: "LUNA", color: "cyan" },
  { time: "19:30", artist: "Cosmic Riders", color: "purple" },
  { time: "20:10", event: "CLOSE", color: "muted" },
]

const day2Timetable = [
  { time: "16:00", event: "OPEN", color: "muted" },
  { time: "16:30", artist: "Nebula", color: "lime" },
  { time: "17:10", artist: "Andromeda", color: "cyan" },
  { time: "17:50", event: "BREAK", color: "muted" },
  { time: "18:10", artist: "Solar Flare", color: "purple" },
  { time: "18:50", artist: "Gravity Wave", color: "lime" },
  { time: "19:30", artist: "Supernova", color: "cyan" },
  { time: "20:10", artist: "Event Horizon", color: "purple" },
  { time: "20:50", event: "CLOSE", color: "muted" },
]

const colorMap = {
  cyan: "oklch(0.75 0.18 200)",
  purple: "oklch(0.65 0.25 300)",
  lime: "oklch(0.8 0.2 130)",
  muted: "oklch(0.4 0.02 260)",
}

interface TimetableSectionProps {
  activeDay: 1 | 2
  setActiveDay: (day: 1 | 2) => void
}

export function TimetableSection({ activeDay, setActiveDay }: TimetableSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const timetable = activeDay === 1 ? day1Timetable : day2Timetable

  return (
    <section id="timetable" className="relative py-32 px-6">
      {/* Day Tabs - Centered */}
      <motion.div
        className="flex justify-center gap-4 mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {[1, 2].map((day) => (
          <button
            key={day}
            type="button"
            onClick={() => setActiveDay(day as 1 | 2)}
            className={`
              relative px-8 py-3 font-mono text-sm tracking-wider rounded-lg
              transition-all duration-300 border
              ${activeDay === day 
                ? "border-primary text-primary" 
                : "border-border text-muted-foreground hover:border-muted-foreground"
              }
            `}
            style={{
              background: activeDay === day 
                ? "linear-gradient(135deg, oklch(0.75 0.18 200 / 0.15) 0%, transparent 100%)"
                : "transparent",
              boxShadow: activeDay === day 
                ? "0 0 20px oklch(0.75 0.18 200 / 0.3)"
                : "none",
            }}
          >
            <span className="relative z-10">
              DAY {day}
            </span>
            <span className="block text-xs mt-1 opacity-60">
              {day === 1 ? "11.15 SAT" : "11.16 SUN"}
            </span>
          </button>
        ))}
      </motion.div>

      <div className="max-w-2xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-mono text-xs tracking-[0.3em] text-primary mb-4">TIMETABLE</h2>
          <div className="w-16 h-px bg-primary mb-8" />
        </motion.div>

        <div className="relative">
          {/* Glowing Timeline Line */}
          <div
            className="absolute left-[60px] md:left-[80px] top-0 bottom-0 w-px"
            style={{
              background: `linear-gradient(180deg, 
                oklch(0.75 0.18 200) 0%, 
                oklch(0.65 0.25 300) 50%, 
                oklch(0.8 0.2 130) 100%)`,
              boxShadow: `0 0 10px oklch(0.75 0.18 200 / 0.5)`,
            }}
          />

          {/* Timeline Items */}
          <div className="space-y-0">
            {timetable.map((item, index) => {
              const color = colorMap[item.color as keyof typeof colorMap]
              return (
                <motion.div
                  key={`${activeDay}-${index}`}
                  className="relative flex items-center gap-6 md:gap-8 py-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  {/* Time */}
                  <div className="w-[50px] md:w-[60px] text-right">
                    <span className="font-mono text-sm text-muted-foreground">{item.time}</span>
                  </div>

                  {/* Station Point */}
                  <div
                    className="relative w-4 h-4 rounded-full z-10"
                    style={{
                      backgroundColor: color,
                      boxShadow: `0 0 15px ${color}`,
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: color }}
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, delay: index * 0.2 }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {item.artist ? (
                      <div
                        className="px-6 py-4 rounded-lg backdrop-blur-sm border transition-all hover:scale-[1.02]"
                        style={{
                          borderColor: `${color}`,
                          background: `linear-gradient(135deg, ${color}10 0%, transparent 100%)`,
                        }}
                      >
                        <h3 className="font-mono text-lg font-bold" style={{ color }}>
                          {item.artist}
                        </h3>
                      </div>
                    ) : (
                      <div className="px-6 py-3">
                        <span className="font-mono text-sm text-muted-foreground tracking-widest">
                          {item.event}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
