"use client"

import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-slide-in-left">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-balance">
                Your Dream Job in <span className="text-cyan">30 Days</span> or Flumberico Pays You{" "}
                <span className="text-cyan">$500</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Flumberico AI applies to 200+ perfect-fit jobs per month with custom resumes — while you sleep.
              </p>
            </div>

            <Link href="/onboarding">
              <button className="px-8 py-4 bg-cyan text-midnight font-bold rounded-full text-lg hover:bg-cyan-dark transition-smooth glow-cyan hover:glow-cyan-lg inline-block animate-glow-pulse">
                Skip the Line – Refer 3 Friends & Get Instant Access
              </button>
            </Link>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-4">
              <span className="animate-slide-in-up stagger-1">✓ No credit card</span>
              <span className="animate-slide-in-up stagger-2">✓ Launching March 1, 2025</span>
              <span className="animate-slide-in-up stagger-3">✓ Limited to 10,000 spots</span>
              <span className="animate-slide-in-up stagger-4">✓ 83% success rate</span>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative h-96 bg-gradient-to-br from-midnight-light to-midnight rounded-2xl border border-border overflow-hidden animate-slide-in-right">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4 animate-float">
                <div className="text-6xl">😰</div>
                <p className="text-muted-foreground">Applied to 427 jobs</p>
                <p className="text-muted-foreground">Got 3 interviews</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan/10 to-transparent animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
