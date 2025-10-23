"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Check, X } from "lucide-react"
import Link from "next/link"

export default function PricingClient() {
  const plans = [
    {
      name: "Waitlist Access",
      price: "Free",
      period: "Limited Time",
      description:
        "Join 3,800+ professionals waiting for AI job search automation. Get early access before March 1, 2025 launch.",
      features: [
        { text: "200+ AI applications monthly", included: true },
        { text: "94% ATS match accuracy", included: true },
        { text: "Custom resume creation", included: true },
        { text: "Stealth mode privacy", included: true },
        { text: "30-day interview guarantee", included: true },
        { text: "Priority recruiter visibility", included: true },
        { text: "$500 payout guarantee", included: true },
      ],
      cta: "Join Waitlist (Limited Spots)",
      highlighted: true,
    },
    {
      name: "Founding Member",
      price: "$97",
      period: "/month (Future)",
      description:
        "Lock in lifetime discount. Exclusive for first 1,000 users. Full AI automation with premium support.",
      features: [
        { text: "Unlimited AI applications", included: true },
        { text: "Priority AI job matching", included: true },
        { text: "Advanced resume optimization", included: true },
        { text: "Salary negotiation scripts", included: true },
        { text: "Priority support & coaching", included: true },
        { text: "Early feature access", included: true },
        { text: "Enhanced $1,000 guarantee", included: true },
      ],
      cta: "Reserve Founding Spot",
      highlighted: false,
    },
    {
      name: "Enterprise Teams",
      price: "Custom",
      period: "Contact Us",
      description: "AI job search automation for teams and organizations. Volume pricing and dedicated support.",
      features: [
        { text: "Team management dashboard", included: true },
        { text: "Unlimited user accounts", included: true },
        { text: "Custom AI matching models", included: true },
        { text: "Dedicated account manager", included: true },
        { text: "Custom integrations", included: true },
        { text: "SLA guarantees", included: true },
        { text: "Team performance analytics", included: true },
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center animate-slide-in-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Limited <span className="text-cyan">Waitlist Access</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join 3,800+ professionals waiting for AI job search automation. Apply to 200+ jobs while you sleep with
            30-day interview guarantee.
          </p>
          <div className="flex justify-center gap-8 text-sm text-muted-foreground">
            <div>🎯 83% Success Rate</div>
            <div>⚡ Save 40 Hours/Week</div>
            <div>💰 $500 Guarantee</div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`animate-slide-in-up ${
                ["stagger-1", "stagger-2", "stagger-3"][index]
              } relative rounded-2xl border transition-all duration-300 overflow-hidden ${
                plan.highlighted
                  ? "border-cyan bg-gradient-to-br from-cyan/10 to-transparent glow-cyan lg:scale-105"
                  : "border-border bg-card hover:border-cyan/50"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan/0 via-cyan to-cyan/0"></div>
              )}

              <div className="p-8">
                {plan.highlighted && (
                  <div className="inline-block px-3 py-1 bg-cyan/20 border border-cyan/50 rounded-full text-cyan text-sm font-semibold mb-4">
                    78% Filled - Only 2,200 Spots Left
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>

                <Link href={plan.name === "Waitlist Access" ? "https://upvir.al/166486/Flumberico" : "/onboarding"}>
                  <button
                    className={`w-full py-3 rounded-full font-semibold transition-smooth mb-8 ${
                      plan.highlighted
                        ? "bg-cyan text-midnight hover:bg-cyan-dark glow-cyan"
                        : "bg-midnight-light text-cyan border border-cyan hover:bg-cyan/10"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </Link>

                <div className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-cyan flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      )}
                      <span className={feature.included ? "text-foreground" : "text-muted-foreground"}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-midnight-light/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Frequently Asked <span className="text-cyan">Questions</span>
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "What does the 30-day interview guarantee mean?",
                a: "If you don't land any interviews within 30 days of using Flumberico, we'll pay you $500. Our 83% success rate shows this works.",
              },
              {
                q: "How does Flumberico apply to 200+ jobs automatically?",
                a: "Our AI creates custom resumes for each position and submits applications while you sleep. Stealth mode keeps your job search private.",
              },
              {
                q: "What's the difference between waitlist and founding member access?",
                a: "Waitlist is free early access before March 2025. Founding members lock in $97/month pricing (vs $199 future price) and get enhanced features.",
              },
              {
                q: "Is Flumberico safe to use while employed?",
                a: "Yes! Stealth mode ensures your current employer won't discover your job search. We prioritize your privacy and security.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-card border border-border hover:border-cyan/50 transition-all duration-300 animate-slide-in-up"
              >
                <h3 className="text-lg font-bold mb-2 text-cyan">{item.q}</h3>
                <p className="text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Stop Job Hunting, Start Getting Interviews</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Limited to 10,000 spots total. Join 3,800+ professionals who've already secured their place in the AI job
            search revolution.
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <div className="text-sm text-muted-foreground">✓ No Credit Card Required</div>
            <div className="text-sm text-muted-foreground">✓ Early Access Before March 2025</div>
            <div className="text-sm text-muted-foreground">✓ Refer 3 Friends to Skip Line</div>
          </div>
          <Link href="https://upvir.al/166486/Flumberico">
            <button className="px-8 py-4 bg-cyan text-midnight font-bold rounded-full hover:bg-cyan-dark transition-smooth glow-cyan hover:glow-cyan-lg animate-glow-pulse text-lg">
              Join Waitlist Before It's Full
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
