"use client"

import { motion, useInView } from "framer-motion"

import { useRef, useState } from "react"

import { useArtists, colorMap } from "@/hooks/use-artists"

import type { Artist } from "@/types/data"



interface ArtistsSectionProps {

  activeDay: 1 | 2

}



export function ArtistsSection({ activeDay }: ArtistsSectionProps) {

  const ref = useRef(null)

  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)



  const { artists } = useArtists(activeDay)



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
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/images/artists/no_image.png"
                    }}
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
