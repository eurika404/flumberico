"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { CheckCircle } from "lucide-react"

export default function AboutPage() {
  const values = [
    { title: "Innovation", description: "Leveraging cutting-edge AI to revolutionize job hunting" },
    { title: "Transparency", description: "Clear metrics and honest results with our 30-day guarantee" },
    { title: "Empowerment", description: "Giving job seekers the tools to land their dream roles" },
    { title: "Community", description: "Building a network of successful professionals" },
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
            We're on a mission to transform job hunting with AI-powered applications and personalized career guidance.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Flumberico was born from frustration. Our founder spent months applying to jobs manually, only to face
                rejection after rejection. We knew there had to be a better way.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                By combining advanced AI algorithms with deep industry knowledge, we created a system that applies to
                hundreds of perfectly-matched jobs automatically, with personalized resumes for each application.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, thousands of professionals use Flumberico to land their dream jobs faster than ever before.
              </p>
            </div>
            <div className="animate-slide-in-right">
              <div className="bg-card border border-border rounded-lg p-8 animate-glow-pulse">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-cyan rounded-full flex items-center justify-center text-midnight font-bold">
                      5K+
                    </div>
                    <div>
                      <p className="font-semibold">Users Placed</p>
                      <p className="text-sm text-muted-foreground">In their dream jobs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-cyan rounded-full flex items-center justify-center text-midnight font-bold">
                      200+
                    </div>
                    <div>
                      <p className="font-semibold">Applications/Month</p>
                      <p className="text-sm text-muted-foreground">Per user average</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-cyan rounded-full flex items-center justify-center text-midnight font-bold">
                      30
                    </div>
                    <div>
                      <p className="font-semibold">Day Guarantee</p>
                      <p className="text-sm text-muted-foreground">Or we pay you $500</p>
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
          <h2 className="text-4xl font-bold mb-12 text-center">Our Values</h2>
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
