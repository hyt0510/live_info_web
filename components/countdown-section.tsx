"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Countdown } from "./countdown"

export function CountdownSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="countdown" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-mono text-xs tracking-[0.3em] text-primary mb-4">COUNTDOWN</h2>
          <div className="w-16 h-px bg-primary mb-12 mx-auto" />
        </motion.div>

        <Countdown />
      </div>
    </section>
  )
}
