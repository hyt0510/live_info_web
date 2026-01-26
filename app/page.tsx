"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { CountdownSection } from "@/components/countdown-section"
import { InfoSection } from "@/components/info-section"
import { ScheduleExplorer } from "@/components/schedule-explorer"
import { Footer } from "@/components/footer"
import { Starfield } from "@/components/starfield"

export default function Page() {
  return (
    <>
      <Starfield />
      <Navigation />
      <main className="relative">
        <HeroSection />
        <CountdownSection />
        <ScheduleExplorer />
        <InfoSection />
      </main>
      <Footer />
    </>
  )
}
