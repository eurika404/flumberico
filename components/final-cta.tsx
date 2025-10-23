"use client"

import Link from "next/link"

export default function FinalCTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-midnight-light">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
<<<<<<< HEAD
          Ready to let AI apply to your <span className="text-cyan">dream jobs</span> while you sleep?
        </h2>

        <p className="text-xl text-muted-foreground mb-8">
          Join 3,800+ job seekers on the waitlist today.
=======
          Ready for Flumberico to Hunt Your <span className="text-cyan">Dream Job?</span>
        </h2>

        <p className="text-xl text-muted-foreground mb-8">
          Join 3,847+ job seekers on the waitlist. Get instant access by referring 3 friends.
>>>>>>> 87c15452b50e1e50ab1b328fee0291f5f69d2d83
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/onboarding">
            <button className="px-8 py-4 bg-cyan text-midnight font-bold rounded-full text-lg hover:bg-cyan-dark transition-smooth glow-cyan">
<<<<<<< HEAD
              Join the Waitlist
            </button>
          </Link>
          <button
            onClick={() => window.open("https://upvir.al/166486/Flumberico", "_blank")}
            className="px-8 py-4 border-2 border-cyan text-cyan font-bold rounded-full text-lg hover:bg-cyan/10 transition-smooth"
          >
            Refer 3 Friends to Skip the Line
          </button>
        </div>

        {/* Launch Info */}
        <div className="mb-8">
          <p className="text-cyan font-semibold text-lg">
            🚀 Launching March 1, 2025
          </p>
=======
              Refer 3 Friends & Unlock Flumberico
            </button>
          </Link>
        <button
  onClick={() => window.open("https://upvir.al/166486/Flumberico", "_blank")}
  className="px-8 py-4 border-2 border-cyan text-cyan font-bold rounded-full text-lg hover:bg-cyan/10 transition-smooth"
>
  Join the Waitlist Anyway
</button>
>>>>>>> 87c15452b50e1e50ab1b328fee0291f5f69d2d83
        </div>

        {/* Guarantee Badge */}
        <div className="inline-block px-6 py-3 bg-midnight border border-cyan rounded-full">
          <p className="font-semibold text-cyan">🏆 30-Day Interview Promise — Get an Interview or We Pay You $500</p>
        </div>
<<<<<<< HEAD

        {/* Final Trust Elements */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <span>✓ No credit card required</span>
          <span>✓ Limited to 10,000 spots</span>
          <span>✓ 83% success rate</span>
          <span>✓ Stealth Mode available</span>
        </div>
=======
>>>>>>> 87c15452b50e1e50ab1b328fee0291f5f69d2d83
      </div>
    </section>
  )
}
