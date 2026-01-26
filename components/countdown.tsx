"use client"

import { motion } from "framer-motion"
import { useCountdown } from "@/hooks/use-countdown"

export function Countdown() {
  const targetDate = new Date("2026-03-07T18:00:00")
  const timeRemaining = useCountdown(targetDate)


  // 各軌道の進行度を計算（0-1）
  const secondsProgress = (timeRemaining.seconds % 60) / 60
  const minutesProgress = (timeRemaining.minutes % 60) / 60
  const hoursProgress = (timeRemaining.hours % 24) / 24
  const daysProgress = timeRemaining.days > 0 ? Math.min(timeRemaining.days / 100, 1) : 0

  // 7日以内かどうかで視覚効果を変更
  const isWeekAway = timeRemaining.days <= 7
  const is24HoursAway = timeRemaining.days === 0

  // イベント終了時の処理
  if (timeRemaining.total <= 0) {
    return (
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="text-2xl font-mono tracking-widest">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(90deg, oklch(0.75 0.18 200), oklch(0.65 0.25 300), oklch(0.8 0.2 130))",
            }}
          >
            EVENT IS LIVE!
          </span>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="mt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
    >

      {/* 軌道カウントダウン */}
      <div className="relative flex items-center justify-center">
        <svg
          viewBox="0 0 400 400"
          className="w-full max-w-md"
          style={{
            filter: "drop-shadow(0 0 20px rgba(0, 242, 255, 0.3))",
          }}
        >
          {/* Days - Outer Ring */}
          <OrbitRing
            radius={180}
            progress={1 - daysProgress}
            color="oklch(0.8 0.2 130)"
            strokeWidth={isWeekAway ? 3 : 2}
            isPulsing={isWeekAway}
          />

          {/* Hours - Second Ring */}
          <OrbitRing
            radius={140}
            progress={1 - hoursProgress}
            color="oklch(0.75 0.18 200)"
            strokeWidth={is24HoursAway ? 3 : 2}
            isPulsing={is24HoursAway}
          />

          {/* Minutes - Third Ring */}
          <OrbitRing
            radius={100}
            progress={1 - minutesProgress}
            color="oklch(0.65 0.25 300)"
            strokeWidth={is24HoursAway ? 3 : 2}
            isPulsing={is24HoursAway}
          />

          {/* Seconds - Inner Ring */}
          <OrbitRing
            radius={60}
            progress={1 - secondsProgress}
            color="oklch(0.75 0.18 200)"
            strokeWidth={is24HoursAway ? 3 : 2}
            isPulsing={is24HoursAway}
          />

          {/* 中央のロゴエリア */}
        </svg>

        {/* 中央のカウントダウン数値 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="grid grid-cols-4 gap-4 text-center">
            <CountdownUnit value={timeRemaining.days} label="DAYS" />
            <CountdownUnit value={timeRemaining.hours} label="HRS" />
            <CountdownUnit value={timeRemaining.minutes} label="MIN" />
            <CountdownUnit value={timeRemaining.seconds} label="SEC" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

interface OrbitRingProps {
  radius: number
  progress: number
  color: string
  strokeWidth: number
  isPulsing: boolean
}

function OrbitRing({ radius, progress, color, strokeWidth, isPulsing }: OrbitRingProps) {
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - progress)

  return (
    <>
      {/* 背景の軌道 */}
      <circle
        cx="200"
        cy="200"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        opacity={0.2}
      />
      {/* 進行中の軌道 */}
      <motion.circle
        cx="200"
        cy="200"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{
          transformOrigin: "center",
          transform: "rotate(-90deg)",
        }}
        animate={
          isPulsing
            ? {
                opacity: [0.6, 1, 0.6],
              }
            : {}
        }
        transition={
          isPulsing
            ? {
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }
            : {}
        }
      />
      {/* 惑星（光の球） */}
      <motion.circle
        cx="200"
        cy={200 - radius}
        r="6"
        fill={color}
        style={{
          filter: `drop-shadow(0 0 8px ${color})`,
        }}
        animate={{
          rotate: progress * 360,
        }}
        transition={{
          duration: 0.3,
          ease: "linear",
        }}
      />
    </>
  )
}

interface CountdownUnitProps {
  value: number
  label: string
}

function CountdownUnit({ value, label }: CountdownUnitProps) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="font-mono text-xl md:text-2xl font-bold"
        key={value}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        style={{
          color: "oklch(0.75 0.18 200)",
          textShadow: "0 0 10px oklch(0.75 0.18 200 / 0.5)",
        }}
      >
        {value.toString().padStart(2, "0")}
      </motion.div>
      <div className="font-mono text-xs text-muted-foreground tracking-widest mt-1">
        {label}
      </div>
    </div>
  )
}
