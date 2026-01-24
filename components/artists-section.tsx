"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import artistsData from "@/data/artists.json"
import type { Artist } from "@/types/data"

const day1Artists = artistsData.day1 as Artist[]
const day2Artists = artistsData.day2 as Artist[]

const colorMap = {
  cyan: {
    border: "oklch(0.75 0.18 200)",
    glow: "oklch(0.75 0.18 200 / 0.5)",
    bg: "oklch(0.75 0.18 200 / 0.1)",
  },
  purple: {
    border: "oklch(0.65 0.25 300)",
    glow: "oklch(0.65 0.25 300 / 0.5)",
    bg: "oklch(0.65 0.25 300 / 0.1)",
  },
  lime: {
    border: "oklch(0.8 0.2 130)",
    glow: "oklch(0.8 0.2 130 / 0.5)",
    bg: "oklch(0.8 0.2 130 / 0.1)",
  },
}

interface ArtistsSectionProps {
  activeDay: 1 | 2
  setActiveDay: (day: 1 | 2) => void
}

export function ArtistsSection({ activeDay, setActiveDay }: ArtistsSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const artists = activeDay === 1 ? day1Artists : day2Artists

  return (
    <section id="artists" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-mono text-xs tracking-[0.3em] text-primary mb-4">ARTIST LINEUP</h2>
          <div className="w-16 h-px bg-primary mb-12" />
        </motion.div>

        {/* Day Tabs - Centered */}
        <motion.div
          className="flex justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
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
                {day === 1 ? "3.7 SAT" : "3.8 SUN"}
              </span>
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {artists.map((artist, index) => {
            const colors = colorMap[artist.color as keyof typeof colorMap]
            return (
              <motion.div
                key={`${activeDay}-${artist.name}`}
                className="group relative"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                {/* Artist Card */}
                <div
                  className="relative aspect-square rounded-full overflow-hidden transition-all duration-500"
                  style={{
                    border: `2px solid ${colors.border}`,
                    boxShadow:
                      hoveredIndex === index
                        ? `0 0 40px ${colors.glow}, inset 0 0 40px ${colors.bg}`
                        : `0 0 20px ${colors.glow}`,
                  }}
                >
                  {/* Artist Image */}
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className={`w-full h-full transition-transform duration-500 ${
                      artist.objectFit === "contain" ? "object-contain p-4" : "object-cover"
                    }`}
                    style={{
                      transform: hoveredIndex === index ? "scale(1.05)" : "scale(1)",
                      filter: hoveredIndex === index ? "brightness(1.1)" : "brightness(0.9)",
                      objectPosition: "center",
                    }}
                  />
                  
                  {/* Artist Name Overlay */}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      background: hoveredIndex === index
                        ? `linear-gradient(to top, ${colors.bg}, transparent 60%)`
                        : `linear-gradient(to top, oklch(0 0 0 / 0.8), transparent 60%)`,
                    }}
                  >
                    <h3
                      className={`font-mono font-bold tracking-wide absolute bottom-4 px-4 text-center leading-tight ${
                        artist.name.length > 12 ? 'text-sm md:text-base' : 'text-lg md:text-xl'
                      }`}
                      style={{
                        color: hoveredIndex === index ? colors.border : "oklch(0.95 0 0)",
                        textShadow: "0 2px 8px oklch(0 0 0 / 0.5)",
                        maxWidth: "90%",
                        wordBreak: "break-word",
                        hyphens: "auto",
                      }}
                    >
                      {artist.name}
                    </h3>
                  </div>
                </div>

                {/* Orbit Line Animation */}
                {hoveredIndex === index && (
                  <motion.div
                    className="fixed inset-0 pointer-events-none z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <svg className="w-full h-full" style={{ position: "absolute" }}>
                      <ellipse
                        cx="50%"
                        cy="50%"
                        rx="30%"
                        ry="15%"
                        fill="none"
                        stroke={colors.border}
                        strokeWidth="1"
                        opacity="0.3"
                        style={{
                          transform: `rotate(${index * 30}deg)`,
                          transformOrigin: "center",
                        }}
                      />
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
