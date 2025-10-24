"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Check, X } from "lucide-react"
import Link from "next/link"

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      period: "/month",
      description: "Perfect for beginners — get full access for free by sharing Flumberico.",
      features: [
        { text: "50 applications per month", included: true },
        { text: "Resume optimization", included: true },
        { text: "Basic AI job matching", included: true },
        { text: "Email support", included: true },
        { text: "Interview prep", included: false },
        { text: "Priority support", included: false },
        { text: "30-day guarantee", included: false },
      ],
      cta: "Join Free (Share Required)",
      highlighted: true,
    },
    {
      name: "Professional",
      price: "$199",
      period: "/month",
      description: "Best choice for professionals who want faster, smarter results.",
      features: [
        { text: "200 applications per month", included: true },
        { text: "Advanced resume optimization", included: true },
        { text: "AI-powered job matching", included: true },
        { text: "Priority email support", included: true },
        { text: "Interview prep & coaching", included: true },
        { text: "Priority recruiter visibility", included: true },
        { text: "30-day success guarantee", included: true },
      ],
      cta: "Upgrade Plan",
      highlighted: false,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Ideal for large teams and organizations looking for scalable hiring solutions.",
      features: [
        { text: "Unlimited job applications", included: true },
        { text: "Resume optimization", included: true },
        { text: "Custom AI matching model", included: true },
        { text: "Dedicated account manager", included: true },
        { text: "Advanced interview prep", included: true },
        { text: "24/7 enterprise support", included: true },
        { text: "Custom performance guarantee", included: true },
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
            Simple & <span className="text-cyan">Transparent Pricing</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Get started completely free — all we ask is that you share Flumberico with your network.
          </p>
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
                    Currently Free
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>

                <Link href={plan.name === "Starter" ? "https://upvir.al/166486/Flumberico" : "/onboarding"}>
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
                q: "Is Flumberico really free?",
                a: "Yes! You can access the full platform for free by simply sharing Flumberico using your personal invite link.",
              },
              {
                q: "Do I need a credit card?",
                a: "No credit card is required to join the free Starter plan.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Absolutely. You can stop using the service anytime with no hidden fees or penalties.",
              },
              {
                q: "What if I want more features?",
                a: "You can upgrade to Professional or Enterprise anytime for more power, automation, and support.",
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
          <h2 className="text-4xl font-bold mb-6">Start Your Career Growth Today — For Free</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of professionals using Flumberico to find better jobs faster. It's free for now — just share
            to unlock full access.
          </p>
          <Link href="https://upvir.al/166486/Flumberico">
            <button className="px-8 py-4 bg-cyan text-midnight font-bold rounded-full hover:bg-cyan-dark transition-smooth glow-cyan hover:glow-cyan-lg animate-glow-pulse text-lg">
              Get Free Access
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
