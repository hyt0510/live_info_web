"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { useArtists, colorMap } from "@/hooks/use-artists"
import type { Artist, ArtistLink } from "@/types/data"

// 画像エラーを追跡してonerrorの無限ループを防止
const imageErrorMap = new Map<string, boolean>()

// SNSアイコンを返すヘルパー関数
function getLinkIcon(type: ArtistLink['type']) {
  const iconProps = {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "white",
    style: { filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))" }
  }

  switch (type) {
    case 'instagram':
      return (
        <svg {...iconProps}>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    case 'tiktok':
      return (
        <svg {...iconProps}>
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      )
    case 'twitter':
      return (
        <svg {...iconProps}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    case 'youtube':
      return (
        <svg {...iconProps}>
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    case 'website':
      return (
        <svg {...iconProps}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      )
    case 'bandcamp':
      return (
        <svg {...iconProps}>
          <path d="M0 18.75h7.475L15.025 5.25H24l-7.475 13.5H0z"/>
        </svg>
      )
    default:
      return null
  }
}

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
            // 新しいlinks配列を優先、なければ従来のinstagramを使用
            const hasLinks = !!(artist.links && artist.links.length > 0)
            const hasInstagram = !!artist.instagram
            const hasAnyLink = hasLinks || hasInstagram
            
            const cardContent = (
              <>
                {/* Artist Card */}
                <div
                  className={`relative aspect-square rounded-full overflow-hidden transition-all duration-500 ${
                    (hasInstagram && !hasLinks) ? 'cursor-pointer' : ''
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
                      const imageKey = `${activeDay}-${artist.name}`
                      // 無限ループ防止：各画像は1回のみフォールバック
                      if (!imageErrorMap.has(imageKey)) {
                        imageErrorMap.set(imageKey, true)
                        target.src = "/images/artists/no_image.png"
                      }
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
                    className="absolute inset-0 flex items-end justify-center pb-3"
                    style={{
                      background: hoveredIndex === index
                        ? `linear-gradient(to top, ${colors.bg}, transparent 60%)`
                        : `linear-gradient(to top, oklch(0 0 0 / 0.8), transparent 60%)`,
                    }}
                  >
                    <div className="flex flex-col items-center gap-1.5 w-full px-3">
                      <h3
                        className={`font-mono font-bold tracking-wide text-center leading-tight ${
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
                      
                      {/* リンクボタン (バンド名の下) */}
                      {hasLinks ? (
                        <div className="flex gap-1.5 z-10">
                          {artist.links?.map((link, linkIndex) => (
                            <button
                              key={linkIndex}
                              className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-black/70 backdrop-blur-sm hover:bg-black/90 active:scale-95 transition-all cursor-pointer"
                              style={{ 
                                pointerEvents: 'auto',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                                WebkitTapHighlightColor: 'transparent'
                              }}
                              onClick={(e) => {
                                e.stopPropagation()
                                try {
                                  const url = new URL(link.url)
                                  if (url.protocol === 'https:' || url.protocol === 'http:') {
                                    window.open(url.href, '_blank', 'noopener,noreferrer')
                                  } else {
                                    console.error('Invalid protocol: Only http/https allowed')
                                  }
                                } catch (error) {
                                  console.error('Invalid URL format:', link.url)
                                }
                              }}
                              aria-label={`${artist.name}の${link.type}を開く`}
                            >
                              <div className="scale-[0.65] md:scale-75">
                                {getLinkIcon(link.type)}
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : hasInstagram ? (
                        <button
                          className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-black/70 backdrop-blur-sm hover:bg-black/90 active:scale-95 transition-all cursor-pointer z-10"
                          style={{ 
                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                            WebkitTapHighlightColor: 'transparent'
                          }}
                          onClick={(e) => {
                            e.stopPropagation()
                            if (artist.instagram) {
                              try {
                                const url = new URL(artist.instagram)
                                if (url.protocol === 'https:' || url.protocol === 'http:') {
                                  window.open(url.href, '_blank', 'noopener,noreferrer')
                                }
                              } catch (error) {
                                console.error('Invalid URL format:', artist.instagram)
                              }
                            }
                          }}
                          aria-label={`${artist.name}のInstagramを開く`}
                        >
                          <div className="scale-[0.65] md:scale-75">
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
                        </button>
                      ) : null}
                    </div>
                  </div>
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
                  // linksがある場合はカード全体のクリックを無効化（個別のアイコンをクリック）
                  if (!hasLinks && hasInstagram && artist.instagram) {
                    // URL検証：HTTPSのみ許可してXSS攻撃を防ぐ
                    try {
                      const url = new URL(artist.instagram)
                      if (url.protocol === 'https:' || url.protocol === 'http:') {
                        window.open(url.href, '_blank', 'noopener,noreferrer')
                      } else {
                        console.error('Invalid protocol: Only http/https allowed')
                      }
                    } catch (e) {
                      console.error('Invalid URL format:', artist.instagram)
                    }
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
