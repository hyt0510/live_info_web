"use client"

import { useMemo } from "react"
import timetableData from "@/data/timetable.json"
import type { TimetableItem } from "@/types/data"

export const colorMap = {
  cyan: "oklch(0.75 0.18 200)",
  purple: "oklch(0.65 0.25 300)",
  lime: "oklch(0.8 0.2 130)",
  muted: "oklch(0.4 0.02 260)",
}

const day1Timetable = timetableData.day1 as TimetableItem[]
const day2Timetable = timetableData.day2 as TimetableItem[]

export const useTimetable = (day: 1 | 2) => {
  const timetable = useMemo(() => (day === 1 ? day1Timetable : day2Timetable), [day])

  return { timetable }
}
