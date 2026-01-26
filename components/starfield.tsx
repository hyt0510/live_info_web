"use client"

import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  z: number // 奥行き（0-1000）
  size: number
  speed: number
  opacity: number
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let stars: Star[] = []
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    const initStars = () => {
      stars = []
      const numStars = Math.floor((canvas.width * canvas.height) / 1500) // 星の数を増加
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: (Math.random() - 0.5) * canvas.width * 2,
          y: (Math.random() - 0.5) * canvas.height * 2,
          z: Math.random() * 1000, // 0-1000の奥行き
          size: Math.random() * 0.8 + 0.2, // より小さなサイズ（0.2-1.0）
          speed: Math.random() * 0.5 + 0.2,
          opacity: Math.random() * 0.6 + 0.3,
        })
      }
    }

    const draw = () => {
      // 背景をクリア（トレイルエフェクト）
      ctx.fillStyle = "rgba(0, 5, 16, 0.15)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 奥行き順にソート（遠いものから描画）
      stars.sort((a, b) => a.z - b.z)

      stars.forEach((star) => {
        // 3D→2D投影
        const k = 500 / (500 + star.z) // 遠近法係数
        const px = star.x * k + canvas.width / 2
        const py = star.y * k + canvas.height / 2

        // 画面外のチェック
        if (px < -50 || px > canvas.width + 50 || py < -50 || py > canvas.height + 50) {
          // 星をリセット（遠くに戻す）
          star.x = (Math.random() - 0.5) * canvas.width * 2
          star.y = (Math.random() - 0.5) * canvas.height * 2
          star.z = 1000
        }

        // 奥行きに基づいたサイズと明るさ
        const scale = k * 1.5
        const displaySize = star.size * scale
        const displayOpacity = star.opacity * scale * 0.8

        // 星を描画（より小さな粒子）
        ctx.beginPath()
        ctx.arc(px, py, Math.max(0.3, displaySize), 0, Math.PI * 2)
        
        // 奥行きに応じた色（近いほど明るく）
        const brightness = Math.floor(200 + 55 * scale)
        ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${Math.min(1, displayOpacity)})`
        ctx.fill()

        // グローエフェクト（明るい星のみ）
        if (displayOpacity > 0.7 && displaySize > 0.8) {
          ctx.beginPath()
          ctx.arc(px, py, displaySize * 2, 0, Math.PI * 2)
          const gradient = ctx.createRadialGradient(px, py, 0, px, py, displaySize * 2)
          gradient.addColorStop(0, `rgba(${brightness}, ${brightness}, ${brightness}, ${displayOpacity * 0.3})`)
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
          ctx.fillStyle = gradient
          ctx.fill()
        }

        // Z軸方向に移動（手前に向かって）
        star.z -= star.speed * 2
        if (star.z < 1) {
          star.z = 1000
        }

        // 微細な点滅効果
        star.opacity += (Math.random() - 0.5) * 0.03
        star.opacity = Math.max(0.3, Math.min(1, star.opacity))
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener("resize", resize)
    draw()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: "linear-gradient(180deg, #000000 0%, #000510 100%)" }}
    />
  )
}
