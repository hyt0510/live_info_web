"use client"

import { useEffect, useRef } from "react"

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let stars: { x: number; y: number; size: number; speed: number; opacity: number }[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    const initStars = () => {
      stars = []
      const numStars = Math.floor((canvas.width * canvas.height) / 3000)
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speed: Math.random() * 0.3 + 0.1,
          opacity: Math.random() * 0.8 + 0.2,
        })
      }
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 5, 16, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()

        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }

        star.opacity += (Math.random() - 0.5) * 0.02
        star.opacity = Math.max(0.2, Math.min(1, star.opacity))
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
