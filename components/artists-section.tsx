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
            const hasInstagram = !!artist.instagram
            
            const cardContent = (
              <>
                {/* Artist Card */}
                <div
                  className={`relative aspect-square rounded-full overflow-hidden transition-all duration-500 ${
                    hasInstagram ? 'cursor-pointer' : ''
                  }`}
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
                  
                  {/* Instagram Icon (Instagramがある場合のみ) */}
                  {hasInstagram && (
                    <div className="absolute top-3 right-3 opacity-80 hover:opacity-100 transition-opacity">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="white"
                        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }}
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                  )}
                </div>
              </>
            )
            
            return (
              <motion.div
                key={`${activeDay}-${artist.name}`}
                className="group relative"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                onClick={() => {
                  if (hasInstagram && artist.instagram) {
                    window.open(artist.instagram, '_blank', 'noopener,noreferrer')
                  }
                }}
              >
                {cardContent}

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
