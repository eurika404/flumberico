<<<<<<< HEAD
=======
"use client"

>>>>>>> 87c15452b50e1e50ab1b328fee0291f5f69d2d83
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowRight, Zap, Target, CheckCircle, Rocket } from "lucide-react"
import Link from "next/link"

<<<<<<< HEAD
export const metadata = {
  title: "How Flumberico Works - AI Job Search Automation | 4-Step Process",
  description: "Discover how Flumberico's AI applies to 200+ jobs while you sleep. Our 4-step automated job search process includes ATS optimization, custom resumes, and 30-day interview guarantee.",
  keywords: "how Flumberico works, AI job search process, automated job applications, ATS optimization, resume automation, job search steps, AI job matching, automated applications, job hunting automation, career advancement",
  openGraph: {
    title: "How Flumberico Works - AI Job Search Automation",
    description: "4-step process: AI applies to 200+ jobs with custom resumes while you sleep. 83% success rate.",
    type: "website",
  },
}

=======
>>>>>>> 87c15452b50e1e50ab1b328fee0291f5f69d2d83
export default function HowItWorks() {
  const steps = [
    {
      number: "01",
<<<<<<< HEAD
      title: "Add Your Experience",
      description:
        "Tell Flumberico about your skills, experience, and dream job preferences. Optionally add your LinkedIn profile for enhanced AI matching. Takes 2 minutes.",
=======
      title: "Profile Setup",
      description:
        "Create a complete profile with your resume, experience, and job preferences. Our AI analyzes your data to understand your skills and career goals.",
>>>>>>> 87c15452b50e1e50ab1b328fee0291f5f69d2d83
      icon: Target,
      delay: "stagger-1",
    },
    {
      number: "02",
      title: "AI Job Matching",
      description:
<<<<<<< HEAD
        "Our AI scans 200+ job opportunities monthly, matching your profile with 94% ATS accuracy. We find positions that align with your skills and salary goals.",
=======
        "Our algorithm scans over 200+ job opportunities each month from thousands of leading companies worldwide to find your best matches.",
>>>>>>> 87c15452b50e1e50ab1b328fee0291f5f69d2d83
      icon: Zap,
      delay: "stagger-2",
    },
    {
      number: "03",
<<<<<<< HEAD
      title: "Custom Resume Creation",
      description:
        "For each matched job, Flumberico crafts a personalized resume optimized for ATS systems and job descriptions. No more generic applications.",
=======
      title: "Optimized Applications",
      description:
        "For each matched job, our AI crafts a personalized resume and cover letter to increase your chances of getting shortlisted.",
>>>>>>> 87c15452b50e1e50ab1b328fee0291f5f69d2d83
      icon: CheckCircle,
      delay: "stagger-3",
    },
    {
      number: "04",
<<<<<<< HEAD
      title: "Automated Applications",
      description:
        "AI submits 200+ applications automatically while you sleep. Stealth mode keeps your job search private from current employers. Track everything in real-time.",
      icon: Rocket,
      delay: "stagger-4",
    },
=======
      title: "Automatic Submissions",
      description:
        "Your applications are submitted automatically at the most strategic times — maximizing visibility with recruiters.",
      icon: Rocket,
      delay: "stagger-4",
    },
    {
      number: "05",
      title: "Interview Preparation",
      description: "Access personalized interview prep guides tailored to the company and role you're applying for.",
      icon: Target,
      delay: "stagger-5",
    },
>>>>>>> 87c15452b50e1e50ab1b328fee0291f5f69d2d83
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-slide-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
              How <span className="text-cyan">Flumberico</span> Works
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
<<<<<<< HEAD
              4-step AI job search automation that applies to 200+ jobs while you sleep. 83% success rate with 30-day interview guarantee.
            </p>
            <div className="flex justify-center gap-8 text-sm text-muted-foreground">
              <div>⚡ 200+ Applications Monthly</div>
              <div>🎯 94% ATS Accuracy</div>
              <div>💰 $500 Guarantee</div>
            </div>
=======
              A simple 5-step process to land your dream job in under 30 days.
            </p>
>>>>>>> 87c15452b50e1e50ab1b328fee0291f5f69d2d83
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className={`animate-slide-in-up ${step.delay} flex gap-8 items-start`}>
                  {/* Step Number */}
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan/20 to-cyan/5 border border-cyan/30 glow-cyan">
                      <span className="text-3xl font-bold text-cyan">{step.number}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className="w-6 h-6 text-cyan" />
                      <h3 className="text-2xl font-bold">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed">{step.description}</p>
                  </div>

                  {/* Arrow */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex flex-col items-center gap-2 ml-4">
                      <ArrowRight className="w-6 h-6 text-cyan/50 rotate-90" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-midnight-light/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
<<<<<<< HEAD
            Flumberico <span className="text-cyan">Advantages</span>
=======
            Key <span className="text-cyan">Features</span>
>>>>>>> 87c15452b50e1e50ab1b328fee0291f5f69d2d83
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
<<<<<<< HEAD
                title: "ATS Optimization",
                description:
                  "94% match accuracy beats applicant tracking systems. Your custom resumes get seen by recruiters, not filtered out.",
                icon: "🎯",
              },
              {
                title: "200+ Monthly Applications",
                description:
                  "AI submits applications while you sleep. Save 40 hours weekly and increase your interview chances dramatically.",
                icon: "⚡",
              },
              {
                title: "Stealth Mode",
                description:
                  "Privacy-first job hunting. Your current employer won't know you're exploring opportunities. Complete discretion guaranteed.",
                icon: "🛡️",
              },
              {
                title: "30-Day Interview Guarantee",
                description: "Land interviews in 30 days or we pay you $500. No-risk job search with proven 83% success rate.",
                icon: "💰",
              },
              {
                title: "Custom Resume AI",
                description: "Every application gets a tailored resume. No more generic 'one-size-fits-all' submissions that get rejected.",
                icon: "📄",
              },
              {
                title: "Real-time Analytics",
                description: "Track applications, view responses, and optimize your job search strategy with live data insights.",
                icon: "📊",
              },
=======
                title: "AI-Powered Matching",
                description:
                  "Our machine learning technology understands your preferences and finds the perfect job for you.",
                icon: "🤖",
              },
              {
                title: "Personalized Resume",
                description:
                  "Each resume is tailored to match specific job descriptions — boosting your ATS score and interview chances.",
                icon: "📄",
              },
              {
                title: "24/7 Automation",
                description:
                  "Your applications are automatically submitted even while you sleep. Zero manual effort needed.",
                icon: "⚡",
              },
              {
                title: "Interview Coaching",
                description: "Get tailored interview strategies and talking points for every company you apply to.",
                icon: "🎯",
              },
              {
                title: "Real-time Tracking",
                description: "Monitor your application status live and get notified instantly for every update.",
                icon: "📊",
              },
              {
                title: "30-Day Guarantee",
                description: "If you don't land a job within 30 days, we'll refund you $500 — no questions asked.",
                icon: "✅",
              },
>>>>>>> 87c15452b50e1e50ab1b328fee0291f5f69d2d83
            ].map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg bg-card border border-border hover:border-cyan/50 transition-all duration-300 animate-slide-in-up ${
                  ["stagger-1", "stagger-2", "stagger-3", "stagger-4", "stagger-5"][index % 5]
                }`}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
<<<<<<< HEAD
          <h2 className="text-4xl font-bold mb-6">Stop Applying, Start Interviewing</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join 3,800+ professionals who've transformed their job search from 40 hours weekly to automated AI success. Limited to 10,000 spots - 78% filled.
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <div className="text-sm text-muted-foreground">
              ✓ No Credit Card Required
            </div>
            <div className="text-sm text-muted-foreground">
              ✓ 30-Day Interview Guarantee
            </div>
            <div className="text-sm text-muted-foreground">
              ✓ Skip Line with 3 Referrals
            </div>
          </div>
          <Link href="/onboarding">
            <button className="px-8 py-4 bg-cyan text-midnight font-bold rounded-full hover:bg-cyan-dark transition-smooth glow-cyan hover:glow-cyan-lg animate-glow-pulse text-lg">
              Join Waitlist & Skip Line
=======
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of professionals who have already landed their dream jobs with Flumberico.
          </p>
          <Link href="/onboarding">
            <button className="px-8 py-4 bg-cyan text-midnight font-bold rounded-full hover:bg-cyan-dark transition-smooth glow-cyan hover:glow-cyan-lg animate-glow-pulse text-lg">
              Get Started
>>>>>>> 87c15452b50e1e50ab1b328fee0291f5f69d2d83
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
