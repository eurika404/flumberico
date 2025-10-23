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
                Flumberico applies to <span className="text-cyan">200+ dream jobs</span> — while you sleep.
              </h1>
              <p className="text-xl text-muted-foreground">
                Wake up to interviews, not rejection emails.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/onboarding">
                <button className="px-8 py-4 bg-cyan text-midnight font-bold rounded-full text-lg hover:bg-cyan-dark transition-smooth glow-cyan hover:glow-cyan-lg animate-glow-pulse">
                  Join Waitlist
                </button>
              </Link>
              <button className="px-8 py-4 border-2 border-cyan text-cyan font-bold rounded-full text-lg hover:bg-cyan/10 transition-smooth">
                How It Works
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-4">
              <span className="animate-slide-in-up stagger-1">✓ No credit card required</span>
              <span className="animate-slide-in-up stagger-2">✓ 83% success rate</span>
              <span className="animate-slide-in-up stagger-3">✓ 3,800+ early users</span>
            </div>
          </div>

          {/* Right Visual - AI working while person sleeps */}
          <div className="relative h-96 bg-gradient-to-br from-midnight-light to-midnight rounded-2xl border border-border overflow-hidden animate-slide-in-right">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="text-6xl animate-float">🤖</div>
                <p className="text-cyan font-semibold">AI applying to jobs</p>
                <p className="text-muted-foreground">200+ custom resumes per month</p>
                <div className="text-4xl animate-float-slow" style={{animationDelay: "1s"}}>😴</div>
                <p className="text-muted-foreground">While you sleep peacefully</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan/10 to-transparent animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
