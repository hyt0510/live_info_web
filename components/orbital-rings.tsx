"use client"

import { motion } from "framer-motion"
import { Earth } from "./earth"

const orbits = [
  { size: 400, duration: 25, color: "cyan", delay: 0 },
  { size: 600, duration: 30, color: "lime", delay: 1 },
  { size: 800, duration: 35, color: "purple", delay: 2 },
]

// 地球が軌道を回る設定
const earthOrbit = { size: 600, duration: 30, delay: 0 }
const earthSize = 500 // 地球のサイズ
const earthRotationSpeed = 0.005 // 地球の自転速度（デフォルト: 0.001）数値を大きくすると速くなる

export function OrbitalRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
      {orbits.map((orbit, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full border opacity-30"
          style={{
            width: orbit.size,
            height: orbit.size * 0.4,
            borderColor:
              orbit.color === "cyan"
                ? "oklch(0.75 0.18 200)"
                : orbit.color === "purple"
                  ? "oklch(0.65 0.25 300)"
                  : "oklch(0.8 0.2 130)",
            boxShadow:
              orbit.color === "cyan"
                ? "0 0 20px oklch(0.75 0.18 200 / 0.5), inset 0 0 20px oklch(0.75 0.18 200 / 0.3)"
                : orbit.color === "purple"
                  ? "0 0 20px oklch(0.65 0.25 300 / 0.5), inset 0 0 20px oklch(0.65 0.25 300 / 0.3)"
                  : "0 0 20px oklch(0.8 0.2 130 / 0.5), inset 0 0 20px oklch(0.8 0.2 130 / 0.3)",
          }}
          initial={{ rotateX: 60, rotateZ: 45 }}
        />
      ))}

      {/* 地球を軌道上に配置 */}
      <motion.div
        className="absolute"
        style={{
          width: earthSize,
          height: earthSize,
        }}
        animate={{
          x: Array.from({ length: 361 }, (_, i) => {
            const angle = (i * Math.PI) / 180;
            const x = (earthOrbit.size / 2) * Math.cos(angle);
            const y = (earthOrbit.size * 0.2) * Math.sin(angle);
            // 45度回転
            const rotated = x * 0.7071 - y * 0.7071;
            return rotated;
          }),
          y: Array.from({ length: 361 }, (_, i) => {
            const angle = (i * Math.PI) / 180;
            const x = (earthOrbit.size / 2) * Math.cos(angle);
            const y = (earthOrbit.size * 0.2) * Math.sin(angle);
            // 45度回転
            const rotated = x * 0.7071 + y * 0.7071;
            return rotated;
          }),
        }}
        transition={{
          duration: earthOrbit.duration,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          delay: earthOrbit.delay,
        }}
      >
        <div className="pointer-events-auto">
          <Earth size={earthSize} rotationSpeed={earthRotationSpeed} />
        </div>
      </motion.div>
    </div>
  )
}
