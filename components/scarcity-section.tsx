"use client"
import { useEffect, useState } from "react"

<<<<<<< HEAD
// Custom animations
const customAnimations = `
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(200%);
    }
  }

  @keyframes glow {
    0%, 100% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-shimmer {
    animation: shimmer 2s infinite;
  }

  .animate-glow {
    animation: glow 2s ease-in-out infinite;
  }

  .animate-fade-in {
    animation: fade-in 0.5s ease-out;
  }
`

=======
>>>>>>> 87c15452b50e1e50ab1b328fee0291f5f69d2d83
export default function ScarcitySection() {
  const filledSpots = 7847
  const totalSpots = 10000
  const targetPercentage = (filledSpots / totalSpots) * 100

  // State untuk animasi progres
  const [animatedPercentage, setAnimatedPercentage] = useState(0)
<<<<<<< HEAD
  const [animatedFilledSpots, setAnimatedFilledSpots] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showPulse, setShowPulse] = useState(false)

  // Custom number formatting to avoid hydration mismatches
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US')
  }

  // Inject custom CSS animations
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = customAnimations
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  useEffect(() => {
    let start = 0
    let spotsStart = 0
    const duration = 2500 // Enhanced duration 2.5 seconds
=======

  useEffect(() => {
    let start = 0
    const duration = 1500 // durasi animasi 1.5 detik
>>>>>>> 87c15452b50e1e50ab1b328fee0291f5f69d2d83
    const startTime = performance.now()

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
<<<<<<< HEAD

      // Enhanced easing function - custom ease-in-out with bounce
      const easedProgress = progress < 0.5
        ? 4 * progress * progress * progress // ease-in cubic
        : 1 - Math.pow(-2 * progress + 2, 3) / 2 // ease-out cubic

      // Add slight overshoot and settle back
      const overshootProgress = progress < 0.9
        ? easedProgress
        : targetPercentage + (Math.sin((progress - 0.9) * Math.PI * 10) * (targetPercentage - easedProgress) * 0.1)

      const current = Math.min(start + (targetPercentage - start) * overshootProgress, targetPercentage)
      const currentSpots = Math.floor(spotsStart + (filledSpots - spotsStart) * easedProgress)

      setAnimatedPercentage(current)
      setAnimatedFilledSpots(currentSpots)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        // Trigger completion effects
        setIsComplete(true)
        setTimeout(() => setShowPulse(true), 100)
=======
      const easedProgress = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      const current = start + (targetPercentage - start) * easedProgress

      setAnimatedPercentage(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
>>>>>>> 87c15452b50e1e50ab1b328fee0291f5f69d2d83
      }
    }

    requestAnimationFrame(animate)
<<<<<<< HEAD
  }, [targetPercentage, filledSpots])
=======
  }, [targetPercentage])
>>>>>>> 87c15452b50e1e50ab1b328fee0291f5f69d2d83

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

<<<<<<< HEAD
          {/* Progress Bar with Enhanced Animation */}
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              {/* Main progress bar container */}
              <div className="relative">
                {/* Background track with subtle gradient */}
                <div className="w-full bg-gradient-to-r from-midnight via-midnight to-midnight-light rounded-full h-4 border-2 border-border overflow-hidden shadow-inner">
                  {/* Animated progress fill */}
                  <div
                    className={`h-full bg-gradient-to-r from-cyan via-cyan-light to-cyan relative overflow-hidden transition-all duration-300 ease-out
                      ${isComplete ? 'shadow-lg shadow-cyan/50' : ''}
                      ${showPulse ? 'animate-pulse' : ''}`}
                    style={{
                      width: `${animatedPercentage}%`,
                      boxShadow: isComplete ? '0 0 20px rgba(0, 255, 255, 0.5)' : 'none'
                    }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>

                    {/* Glow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan/30 to-transparent animate-glow"></div>
                  </div>

                  {/* Percentage indicator */}
                  <div
                    className="absolute -top-8 text-cyan font-bold text-sm transition-all duration-300"
                    style={{
                      left: `${Math.min(animatedPercentage, 95)}%`,
                      transform: 'translateX(-50%)'
                    }}
                  >
                    {animatedPercentage.toFixed(0)}%
                  </div>
                </div>

                {/* Spots remaining indicator */}
                <div className="mt-6 flex justify-between items-center text-sm">
                  <span className="text-cyan font-semibold transition-all duration-300"
                    style={{
                      transform: `scale(${1 + (animatedPercentage / 100) * 0.1})`,
                      opacity: animatedPercentage / 100
                    }}
                  >
                    {formatNumber(animatedFilledSpots)} spots filled
                  </span>
                  <span className="text-muted-foreground transition-all duration-300"
                    style={{
                      opacity: 1 - (animatedPercentage / 100) * 0.3
                    }}
                  >
                    {formatNumber(totalSpots - animatedFilledSpots)} remaining
                  </span>
                </div>
              </div>

              {/* Status messages */}
              <div className="mt-4 h-6">
                {isComplete && (
                  <div className="text-cyan font-medium animate-fade-in">
                    ⚠️ Limited spots available - Act fast!
                  </div>
                )}
              </div>
            </div>
=======
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
>>>>>>> 87c15452b50e1e50ab1b328fee0291f5f69d2d83
          </div>
        </div>
      </div>
    </section>
  )
}
