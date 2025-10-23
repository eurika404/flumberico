"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

export default function FAQPage() {
  const [expandedItems, setExpandedItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setExpandedItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const faqItems = [
    {
      question: "What is Flumberico and how does it work?",
      answer: "Flumberico is AI job search automation that applies to 200+ jobs while you sleep. Our 4-step process: 1) Add your experience and LinkedIn profile, 2) AI matches you with 200+ jobs monthly with 94% ATS accuracy, 3) Creates custom resumes for each application, 4) Submits applications automatically with stealth mode privacy."
    },
    {
      question: "What does the 30-day interview guarantee mean?",
      answer: "If you don't land any interviews within 30 days of using Flumberico, we'll pay you $500. Our proven system has an 83% success rate, meaning most users land interviews well within the 30-day period. This guarantee makes our service completely risk-free."
    },
    {
      question: "How does Flumberico apply to 200+ jobs automatically?",
      answer: "Our AI continuously scans job boards and matches your profile with relevant positions. For each match, Flumberico creates a custom resume optimized for that specific job's ATS system and job description. Applications are submitted strategically while you sleep, maximizing your chances without manual effort."
    },
    {
      question: "Is Flumberico safe to use while currently employed?",
      answer: "Yes! Stealth mode ensures your current employer won't discover your job search. We use privacy-first technology that keeps your job hunting completely confidential. Your applications and personal information are secure and never shared with your current employer."
    },
    {
      question: "What's the difference between waitlist and founding member access?",
      answer: "Waitlist access is free early access before our March 2025 launch. Founding members lock in a special $97/month rate (vs $199 future pricing) and get enhanced features like unlimited applications, priority support, and a $1,000 guarantee instead of $500."
    },
    {
      question: "How accurate is Flumberico's job matching?",
      answer: "Flumberico achieves 94% ATS match accuracy, meaning your resumes are optimized to pass through 94% of applicant tracking systems. Our AI analyzes job descriptions and your experience to create perfect matches, dramatically increasing your interview chances compared to manual applications."
    },
    {
      question: "What types of jobs does Flumberico help with?",
      answer: "Flumberico works across 15+ career categories including Product Management, UX/Design, Data/Analytics, Marketing, Engineering, Sales, HR/Recruiting, Finance, Customer Service, Operations, Consulting, Healthcare, Education, Legal, and Real Estate. We have 90+ job role combinations."
    },
    {
      question: "How much time will Flumberico save me?",
      answer: "Flumberico saves you approximately 40 hours per week - the time most professionals spend on job applications. Instead of manually crafting resumes and filling out applications, you can focus on interview preparation, networking, or your current job while our AI handles the heavy lifting."
    },
    {
      question: "Do I need to be technical to use Flumberico?",
      answer: "Not at all! Flumberico is designed for all professionals, regardless of technical skills. Our simple 4-step onboarding takes just 2 minutes. Just tell us about your experience and preferences, and our AI handles everything else automatically."
    },
    {
      question: "What happens after I join the waitlist?",
      answer: "After joining the waitlist, you'll get early access to Flumberico before our public launch. You'll be able to complete your profile, start receiving AI-matched job opportunities, and begin automated applications immediately. You'll also get priority customer support and exclusive founding member pricing options."
    },
    {
      question: "Can I customize my job preferences?",
      answer: "Yes! During onboarding, you can specify your preferred industries, job titles, salary ranges, locations, and other preferences. Our AI will only apply to positions that match your criteria, ensuring you get relevant opportunities that align with your career goals."
    },
    {
      question: "How does Flumberico compare to traditional job searching?",
      answer: "Traditional job hunting typically involves 40 hours weekly applying to 10-20 jobs with a 2-5% response rate. Flumberico applies to 200+ jobs automatically with an 83% success rate, saving you time while dramatically increasing your chances. Plus, our custom resumes beat ATS systems that reject 75% of applications."
    }
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Frequently Asked <span className="text-cyan">Questions</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Everything you need to know about Flumberico's AI job search automation, 30-day guarantee, and how we help you land your dream job.
          </p>
          <div className="flex justify-center gap-8 text-sm text-muted-foreground">
            <div>🎯 83% Success Rate</div>
            <div>⚡ 200+ Applications Monthly</div>
            <div>💰 $500 Guarantee</div>
          </div>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-cyan/50"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-midnight-light/50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-foreground pr-4">{item.question}</h3>
                  <div className="flex-shrink-0">
                    {expandedItems.includes(index) ? (
                      <ChevronUp className="w-5 h-5 text-cyan" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-cyan" />
                    )}
                  </div>
                </button>

                {expandedItems.includes(index) && (
                  <div className="px-6 pb-4 animate-slide-in-up">
                    <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Still Have Questions?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Our team is here to help you transform your job search with AI automation.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/contact"
              className="px-8 py-3 bg-cyan text-midnight font-semibold rounded-full hover:bg-cyan-dark transition-smooth"
            >
              Contact Support
            </a>
            <a
              href="/onboarding"
              className="px-8 py-3 border border-cyan text-cyan font-semibold rounded-full hover:bg-cyan/10 transition-smooth"
            >
              Try Flumberico
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
