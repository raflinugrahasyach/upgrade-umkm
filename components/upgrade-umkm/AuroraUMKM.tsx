"use client"

import { useEffect, useRef } from "react"

export default function AuroraUMKM() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const draw = () => {
      time += 0.005
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient aurora effect
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.3 + Math.sin(time) * 100,
        canvas.height * 0.4 + Math.cos(time * 0.7) * 50,
        0,
        canvas.width * 0.3,
        canvas.height * 0.4,
        canvas.width * 0.6
      )
      gradient1.addColorStop(0, "rgba(251, 201, 4, 0.15)")
      gradient1.addColorStop(0.5, "rgba(249, 115, 22, 0.08)")
      gradient1.addColorStop(1, "rgba(251, 201, 4, 0)")

      ctx.fillStyle = gradient1
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.7 + Math.cos(time * 0.8) * 80,
        canvas.height * 0.6 + Math.sin(time * 0.5) * 60,
        0,
        canvas.width * 0.7,
        canvas.height * 0.6,
        canvas.width * 0.5
      )
      gradient2.addColorStop(0, "rgba(249, 115, 22, 0.12)")
      gradient2.addColorStop(0.5, "rgba(251, 201, 4, 0.06)")
      gradient2.addColorStop(1, "rgba(249, 115, 22, 0)")

      ctx.fillStyle = gradient2
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const gradient3 = ctx.createRadialGradient(
        canvas.width * 0.5 + Math.sin(time * 1.2) * 120,
        canvas.height * 0.3 + Math.cos(time * 0.9) * 40,
        0,
        canvas.width * 0.5,
        canvas.height * 0.3,
        canvas.width * 0.4
      )
      gradient3.addColorStop(0, "rgba(251, 201, 4, 0.1)")
      gradient3.addColorStop(1, "rgba(251, 201, 4, 0)")

      ctx.fillStyle = gradient3
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: "linear-gradient(180deg, #FAFAFA 0%, #FEF7E6 50%, #FAFAFA 100%)" }}
    />
  )
}
