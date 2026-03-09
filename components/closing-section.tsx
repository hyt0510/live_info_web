"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Particle {
  id: number
  left: number
  top: number
  duration: number
  delay: number
}

export function ClosingSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    setIsVisible(true)
    // クライアント側でのみ粒子を生成
    setParticles(
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 5,
      }))
    )
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* 背景のグラデーション */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-primary/5 to-background" />
      
      {/* 輝く粒子エフェクト */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Thank You メッセージ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1 className="font-mono text-6xl md:text-8xl font-bold mb-8 tracking-wider">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400">
              THANK YOU
            </span>
          </h1>
        </motion.div>

        {/* イベント名 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-mono text-2xl md:text-4xl text-primary mb-4">
            MULTI ORBIT 2026
          </h2>
          <div className="w-32 h-px bg-primary mx-auto" />
        </motion.div>

        {/* 感謝メッセージ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="space-y-6 mb-16"
        >
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            ご来場いただいた全ての皆様、
            <br />
            出演してくださったアーティストの皆様、
            <br />
            そして関わってくださった全ての方々に
            <br />
            心より感謝申し上げます。
          </p>
          
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block"
          >
            <p className="text-2xl md:text-3xl font-bold text-primary">
              ありがとうございました！
            </p>
          </motion.div>
        </motion.div>

        {/* 卒業生へのメッセージ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="p-8 md:p-12 rounded-2xl bg-primary/5 backdrop-blur-sm border border-primary/20"
        >
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-4xl md:text-5xl mb-6"
          >
            
          </motion.div>
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            卒業生の皆さん
          </h3>
          <p className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-purple-400 to-pink-400 mb-2">
            ご卒業おめでとうございます！
          </p>
          <p className="text-sm md:text-base text-muted-foreground mt-4">
            新たな旅立ちを応援しています
          </p>
        </motion.div>
      </div>
    </section>
  )
}
