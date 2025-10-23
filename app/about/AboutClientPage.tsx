"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { CheckCircle } from "lucide-react"

export default function AboutClientPage() {
  const values = [
    { title: "Job Search Automation", description: "AI-powered applications to 200+ jobs while you sleep" },
    { title: "ATS Optimization", description: "94% match accuracy to beat applicant tracking systems" },
    { title: "Interview Guarantee", description: "30-day promise with $500 payout if no interviews secured" },
    { title: "Stealth Mode", description: "Privacy-focused job hunting for current professionals" },
  ]

  const team = [
    { name: "Alex Chen", role: "Founder & CEO", bio: "Former recruiter turned AI entrepreneur" },
    { name: "Sarah Johnson", role: "CTO", bio: "ML engineer with 10+ years experience" },
    { name: "Marcus Williams", role: "Head of Product", bio: "Product leader from top tech companies" },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            About <span className="text-cyan">Flumberico</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            AI job search automation that applies to 200+ dream jobs while you sleep. Land interviews with our 30-day
            guarantee or get $500.
          </p>
          <div className="flex justify-center gap-8 text-sm text-muted-foreground">
            <div>✓ 83% Success Rate</div>
            <div>✓ 94% ATS Match Accuracy</div>
            <div>✓ 3,800+ Users</div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-4xl font-bold mb-6">Why We Built Flumberico</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Tired of spending 40 hours a week on job applications only to face 75% rejection rates from ATS systems?
                Our founder experienced this pain firsthand as both a recruiter and job seeker.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                We created Flumberico to eliminate the "spray and pray" burnout that affects millions of professionals.
                Our AI automation applies to 200+ perfectly-matched jobs monthly with custom resumes that beat 94% of
                ATS filters.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Join 3,800+ professionals who've transformed their job search from rejection emails to interview
                requests. With our 30-day interview guarantee, you either land interviews or we pay you $500.
              </p>
            </div>
            <div className="animate-slide-in-right">
              <div className="bg-card border border-border rounded-lg p-8 animate-glow-pulse">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-cyan rounded-full flex items-center justify-center text-midnight font-bold">
                      40
                    </div>
                    <div>
                      <p className="font-semibold">Hours Saved Weekly</p>
                      <p className="text-sm text-muted-foreground">From manual applications</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-cyan rounded-full flex items-center justify-center text-midnight font-bold">
                      200+
                    </div>
                    <div>
                      <p className="font-semibold">AI Applications Monthly</p>
                      <p className="text-sm text-muted-foreground">With custom resumes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-cyan rounded-full flex items-center justify-center text-midnight font-bold">
                      83%
                    </div>
                    <div>
                      <p className="font-semibold">Success Rate</p>
                      <p className="text-sm text-muted-foreground">Users land interviews</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">AI Job Search Solutions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-card border border-border rounded-lg p-6 animate-slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-cyan flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={member.name}
                className="bg-card border border-border rounded-lg p-6 text-center hover:border-cyan transition-smooth animate-slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-cyan to-cyan-dark rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-cyan mb-3">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
