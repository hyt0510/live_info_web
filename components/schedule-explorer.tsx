"use client"

import { useState } from "react"
import { ArtistsSection } from "./artists-section"
import { TimetableSection } from "./timetable-section"
import { DaySelector } from "./day-selector"
import { motion } from "framer-motion"

export function ScheduleExplorer() {
  const [activeDay, setActiveDay] = useState<1 | 2>(1)

  const scrollToTimetable = () => {
    const element = document.getElementById('timetable')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToArtists = () => {
    setTimeout(() => {
      const element = document.getElementById('artists')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <DaySelector
          activeDay={activeDay}
          onDayChange={setActiveDay}
          className="mb-12"
          scrollToSection={scrollToTimetable}
        />
      </motion.div>
      <TimetableSection activeDay={activeDay} />
      <DaySelector
          activeDay={activeDay}
          onDayChange={setActiveDay}
          className="mb-12"
          scrollToSection={scrollToArtists}
        />
      <ArtistsSection activeDay={activeDay} />
    </>
  )
}
