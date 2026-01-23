"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function ConceptSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="concept" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-mono text-xs tracking-[0.3em] text-primary mb-4">CONCEPT</h2>
          <div className="w-16 h-px bg-primary mb-12" />
        </motion.div>

        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="font-sans text-2xl md:text-3xl font-light leading-relaxed text-foreground">
            学園祭テーマ「
            <span className="text-primary font-medium">orbit</span>
            」から生まれた、
            <br className="hidden md:block" />
            ライブイベント「
            <span
              className="font-medium bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, oklch(0.75 0.18 200), oklch(0.65 0.25 300))",
              }}
            >
              multi-orbit
            </span>
            」
          </p>

          <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed">
            普段はそれぞれの日常、それぞれのスタイルで、
            独自の「軌道」を描いて生きている私たち。
          </p>

          <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed">
            このイベントは、そんな多様な軌道が交差し、
            重なり合い、共鳴する宇宙的な瞬間。
            音楽と個性のレイヤーが織りなす、
            美しく複雑なハーモニーを体験してください。
          </p>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-1/2 right-0 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "oklch(0.75 0.18 200)" }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 0.1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: "oklch(0.65 0.25 300)" }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 0.1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
        />
      </div>
    </section>
  )
}
