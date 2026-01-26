"use client"

import { useMemo } from "react"
import artistsData from "@/data/artists.json"
import type { Artist } from "@/types/data"

export const colorMap = {
  cyan: {
    border: "oklch(0.75 0.18 200)",
    glow: "oklch(0.75 0.18 200 / 0.5)",
    bg: "oklch(0.75 0.18 200 / 0.1)",
  },
  purple: {
    border: "oklch(0.65 0.25 300)",
    glow: "oklch(0.65 0.25 300 / 0.5)",
    bg: "oklch(0.65 0.25 300 / 0.1)",
  },
  lime: {
    border: "oklch(0.8 0.2 130)",
    glow: "oklch(0.8 0.2 130 / 0.5)",
    bg: "oklch(0.8 0.2 130 / 0.1)",
  },
}

const day1Artists = artistsData.day1 as Artist[]
const day2Artists = artistsData.day2 as Artist[]

export const useArtists = (day: 1 | 2) => {
  const artists = useMemo(() => (day === 1 ? day1Artists : day2Artists), [day])

  return { artists }
}
