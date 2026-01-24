"use client"

import { motion } from "framer-motion"
import { Earth } from "./earth"
import { OrbitalRings } from "./orbital-rings"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <OrbitalRings />
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="font-mono text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, oklch(0.75 0.18 200), oklch(0.65 0.25 300), oklch(0.8 0.2 130))",
              }}
            >
              multi-orbit
            </span>
          </h1>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-sm md:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex flex-col items-center">
            <span className="font-mono text-muted-foreground tracking-widest text-xs mb-1">
              DATE
            </span>
            <span className="font-mono text-foreground font-semibold">day1 : 2026.3.7 SAT</span>
          </div>
          <div className="hidden md:block w-px h-8 bg-border" />
          <div className="flex flex-col items-center">
            <span className="font-mono text-muted-foreground tracking-widest text-xs mb-1">
              OPEN / START
            </span>
            <span className="font-mono text-foreground font-semibold">17:00 / 18:00</span>
          </div>
        </motion.div>

        {/* Day2 情報 */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-sm md:text-base mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex flex-col items-center">
            <span className="font-mono text-muted-foreground tracking-widest text-xs mb-1 invisible">
              DATE
            </span>
            <span className="font-mono text-foreground font-semibold">day2 : 2026.3.8 SUN</span>
          </div>
          <div className="hidden md:block w-px h-8 bg-border" />
          <div className="flex flex-col items-center">
            <span className="font-mono text-muted-foreground tracking-widest text-xs mb-1 invisible">
              OPEN / START
            </span>
            <span className="font-mono text-foreground font-semibold">17:00 / 18:00</span>
          </div>
        </motion.div>

        {/* 会場情報 */}
        <motion.div
          className="flex flex-col items-center mt-8 text-sm md:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
        >
          <span className="font-mono text-muted-foreground tracking-widest text-xs mb-1">
            会場
          </span>
          <span className="font-mono text-foreground font-semibold">鈴鹿SOUNDSTAGE</span>
        </motion.div>

      </div>
    </section>
  )
}
