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

        <motion.p
          className="font-sans text-lg md:text-xl text-muted-foreground mb-8 tracking-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          それぞれの軌道が交差し、共鳴する場所
        </motion.p>

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
            <span className="font-mono text-foreground font-semibold">2026.03.15 SAT</span>
          </div>
          <div className="hidden md:block w-px h-8 bg-border" />
          <div className="flex flex-col items-center">
            <span className="font-mono text-muted-foreground tracking-widest text-xs mb-1">
              OPEN / START
            </span>
            <span className="font-mono text-foreground font-semibold">17:00 / 18:00</span>
          </div>
          <div className="hidden md:block w-px h-8 bg-border" />
          <div className="flex flex-col items-center">
            <span className="font-mono text-muted-foreground tracking-widest text-xs mb-1">
              VENUE
            </span>
            <span className="font-mono text-foreground font-semibold">学園祭メインステージ</span>
          </div>
        </motion.div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <a
            href="#info"
            className="group relative inline-flex items-center gap-2 px-8 py-4 font-mono text-sm tracking-widest text-primary-foreground bg-primary rounded-full overflow-hidden transition-all hover:scale-105"
          >
            <span className="relative z-10">ENTRY</span>
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.75 0.18 200), oklch(0.65 0.25 300))",
              }}
            />
            <span className="absolute inset-0 animate-pulse opacity-30 bg-primary rounded-full" />
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-muted-foreground flex justify-center pt-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          <div className="w-1 h-2 rounded-full bg-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  )
}
