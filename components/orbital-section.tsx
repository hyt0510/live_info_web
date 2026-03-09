"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function OrbitalSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* 背景のグラデーション */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-primary/10 to-background" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* 装飾的なオービットリング - 派手バージョン */}
        <motion.div
          className="relative w-80 h-80 md:w-96 md:h-96 mx-auto mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          {/* 外側の大きなリング群 */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`outer-${i}`}
              className="absolute inset-0 border-2 rounded-full"
              style={{
                borderColor: i % 3 === 0 ? '#00ffff80' : i % 3 === 1 ? '#a855f780' : '#bef26480',
                inset: `${i * 25}px`,
                opacity: 0.4 - i * 0.05,
                boxShadow: 
                  i % 3 === 0 
                    ? '0 0 15px rgba(0, 255, 255, 0.3)'
                    : i % 3 === 1
                    ? '0 0 15px rgba(168, 85, 247, 0.3)'
                    : '0 0 15px rgba(190, 242, 100, 0.3)'
              }}
              animate={{
                rotate: [0, i % 2 === 0 ? 360 : -360],
              }}
              transition={{
                duration: 30 + i * 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}

          {/* 回転する光の点 */}
          {[...Array(6)].map((_, i) => {
            const angle = (i * Math.PI * 2) / 6
            const radius = 120
            return (
              <motion.div
                key={`dot-${i}`}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  background: i % 3 === 0 ? '#00ffff' : i % 3 === 1 ? '#a855f7' : '#bef264',
                  boxShadow: 
                    i % 3 === 0
                      ? '0 0 10px #00ffff'
                      : i % 3 === 1
                      ? '0 0 10px #a855f7'
                      : '0 0 10px #bef264',
                }}
                animate={{
                  x: [
                    Math.cos(angle) * radius,
                    Math.cos(angle + Math.PI) * radius,
                  ],
                  y: [
                    Math.sin(angle) * radius,
                    Math.sin(angle + Math.PI) * radius,
                  ],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
              />
            )
          })}

          {/* パルスリング */}
          <motion.div
            className="absolute inset-0 border-2 rounded-full"
            style={{
              borderColor: '#a855f780',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
          
          {/* 中央の光 */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              opacity: [0.5, 0.7, 0.5],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 blur-xl" />
          </motion.div>

          {/* 追加の輝き */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute w-1.5 h-1.5"
                style={{
                  left: '50%',
                  top: '50%',
                  background: '#ffffff',
                  boxShadow: '0 0 10px #ffffff',
                  clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                }}
                animate={{
                  x: Math.cos((i * Math.PI * 2) / 3) * 90,
                  y: Math.sin((i * Math.PI * 2) / 3) * 90,
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.7,
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* フッターメッセージ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-center space-y-4"
        >
          <p className="text-sm md:text-base text-muted-foreground">
          </p>
          <p className="font-mono text-xs text-muted-foreground/60">
            2026.03.07 - 2026.03.08
          </p>
        </motion.div>

        {/* SNSシェアボタン */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-12 flex gap-4 justify-center"
        >
          <a
            href="https://twitter.com/intent/tweet?text=MULTI%20ORBIT%202026%20%E3%81%AB%E5%8F%82%E5%8A%A0%E3%81%97%E3%81%BE%E3%81%97%E3%81%9F%EF%BC%81&url=https://multi-orbit.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full border border-primary/50 hover:bg-primary/10 transition-colors text-sm font-mono"
          >
            思い出をシェア
          </a>
        </motion.div>
      </div>
    </section>
  )
}
