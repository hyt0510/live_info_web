"use client"

import { motion, useInView } from "framer-motion"

import { useRef } from "react"

import { useTimetable, colorMap } from "@/hooks/use-timetable"

import type { TimetableItem } from "@/types/data"



interface TimetableSectionProps {

  activeDay: 1 | 2

}



export function TimetableSection({ activeDay }: TimetableSectionProps) {

  const ref = useRef(null)

  const isInView = useInView(ref, { once: true, margin: "-100px" })



  const { timetable } = useTimetable(activeDay)



  return (

    <section id="timetable" className="relative py-32 px-6">



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
