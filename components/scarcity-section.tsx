"use client"
import { useEffect, useState } from "react"

export default function ScarcitySection() {
  const filledSpots = 7847
  const totalSpots = 10000
  const targetPercentage = (filledSpots / totalSpots) * 100

  // State untuk animasi progres
  const [animatedPercentage, setAnimatedPercentage] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 1500 // durasi animasi 1.5 detik
    const startTime = performance.now()

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      const current = start + (targetPercentage - start) * easedProgress

      setAnimatedPercentage(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [targetPercentage])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-midnight-light rounded-2xl border border-border p-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Why Only 10,000 <span className="text-cyan">Flumberico Spots?</span>
          </h2>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            To maintain our 83% success rate, Flumberico limits access to ensure quality applications, AI + human
            review, and fair competition.
          </p>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <div className="w-full bg-midnight rounded-full h-3 border border-border overflow-hidden">
                <div
                  className="h-full bg-cyan glow-cyan transition-[width] duration-300 ease-out"
                  style={{ width: `${animatedPercentage}%` }}
                ></div>
              </div>
            </div>

            <p className="text-muted-foreground">
              {filledSpots.toLocaleString()} of {totalSpots.toLocaleString()} spots filled ({animatedPercentage.toFixed(0)}%)
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
