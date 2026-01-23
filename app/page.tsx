"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { InfoSection } from "@/components/info-section"
import { TimetableSection } from "@/components/timetable-section"
import { ArtistsSection } from "@/components/artists-section"
import { Footer } from "@/components/footer"
import { Starfield } from "@/components/starfield"
import { Earth } from "@/components/earth"

export default function Page() {
  const [activeDay, setActiveDay] = useState<1 | 2>(1)

  return (
    <>
      <Starfield />
      <Navigation />
      <main className="relative">
        <HeroSection />
        <TimetableSection activeDay={activeDay} setActiveDay={setActiveDay} />
        <ArtistsSection activeDay={activeDay} setActiveDay={setActiveDay} />
        <InfoSection />
      </main>
      <Footer />
    </>
  )
}
