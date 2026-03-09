"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { CountdownSection } from "@/components/countdown-section"
import { InfoSection } from "@/components/info-section"
import { ScheduleExplorer } from "@/components/schedule-explorer"
import { ClosingSection } from "@/components/closing-section"
import { OrbitalSection } from "@/components/orbital-section"
import { LiveReport } from "@/components/live-report"
import { Footer } from "@/components/footer"
import { Starfield } from "@/components/starfield"

export default function Page() {
  return (
    <>
      <Starfield />
      <Navigation />
      <main className="relative">
        <HeroSection />
        <ClosingSection />
        <OrbitalSection />
        <LiveReport />
        <ScheduleExplorer />
        <InfoSection />
      </main>
      <Footer />
    </>
  )
}
