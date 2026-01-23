"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { MapPin, Calendar, Clock, Ticket } from "lucide-react"

export function InfoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="info" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-mono text-xs tracking-[0.3em] text-primary mb-4">INFORMATION</h2>
          <div className="w-16 h-px bg-primary mb-12" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Info Cards */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Venue */}
            <div
              className="p-6 rounded-xl backdrop-blur-md border border-border"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.15 0.03 260 / 0.8) 0%, oklch(0.1 0.02 260 / 0.6) 100%)",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="p-3 rounded-lg"
                  style={{ background: "oklch(0.8 0.2 130 / 0.2)" }}
                >
                  <MapPin className="w-5 h-5" style={{ color: "oklch(0.8 0.2 130)" }} />
                </div>
                <div>
                  <h3 className="font-mono text-sm text-muted-foreground mb-1">会場</h3>
                  <p className="font-sans text-lg text-foreground">鈴鹿SOUNDSTAGE</p>
                  <p className="font-sans text-sm text-muted-foreground mt-1">
                   〒510-0256 三重県鈴鹿市磯山1-9-8
                  </p>
                </div>
              </div>
            </div>

            {/* Ticket */}
            <div
              className="p-6 rounded-xl backdrop-blur-md border border-border"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.15 0.03 260 / 0.8) 0%, oklch(0.1 0.02 260 / 0.6) 100%)",
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="p-3 rounded-lg"
                  style={{ background: "oklch(0.75 0.18 200 / 0.2)" }}
                >
                  <Ticket className="w-5 h-5" style={{ color: "oklch(0.75 0.18 200)" }} />
                </div>
                <div>
                  <h3 className="font-mono text-sm text-muted-foreground mb-1">TICKET</h3>
                  <p className="font-sans text-lg text-foreground"></p>
                  <p className="font-sans text-sm text-muted-foreground mt-1">
                    
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div
              className="h-full min-h-[400px] rounded-xl overflow-hidden border border-border"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.15 0.03 260 / 0.8) 0%, oklch(0.1 0.02 260 / 0.6) 100%)",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6551.603995941095!2d136.566309!3d34.810923!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600475b248e3eacd%3A0x2194f14becbc0971!2z5pel5pys44CB44CSNTEwLTAyNTYg5LiJ6YeN55yM6Yi06bm_5biC56Ov5bGx77yR5LiB55uu77yZ4oiS77yR77yQ!5e0!3m2!1sja!2sus!4v1769172527977!5m2!1sja!2sus"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "invert(90%) hue-rotate(180deg) contrast(0.9) brightness(0.8)",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="会場地図"
              />
            </div>
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button
            type="button"
            className="group relative inline-flex items-center gap-3 px-12 py-5 font-mono text-base tracking-widest rounded-full overflow-hidden transition-all hover:scale-105"
            style={{
              background: "linear-gradient(90deg, oklch(0.75 0.18 200), oklch(0.65 0.25 300))",
              color: "oklch(0.05 0.02 260)",
            }}
          >
            <span className="relative z-10 font-bold">ENTRY</span>
            <motion.span
              className="absolute inset-0 opacity-50"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.65 0.25 300), oklch(0.75 0.18 200), oklch(0.8 0.2 130))",
              }}
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
                ease: "linear",
              }}
            />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
