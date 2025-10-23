"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "Is Flumberico a job board?",
<<<<<<< HEAD
      answer: "No. We apply for you using AI-powered resumes, scanning 1M+ jobs and submitting tailored applications automatically.",
    },
    {
      question: "Can I stay hidden from my current employer?",
      answer: "Yes. Stealth Mode keeps your job search confidential from your current employer.",
    },
    {
      question: "What if I don't get interviews?",
      answer: "We pay you $500 under the 30-Day Guarantee. No interview in 30 days = $500 from us.",
    },
    {
      question: "How many jobs does Flumberico apply to?",
      answer: "200+ perfect-fit jobs per month, all with custom-tailored resumes.",
    },
    {
      question: "When does Flumberico launch?",
      answer: "March 1, 2025. Refer 3 friends to get instant early access.",
    },
    {
      question: "Is there a credit card required?",
      answer: "No. Join the waitlist for free. No credit card required.",
=======
      answer:
        "Nope. Flumberico applies for you using AI-powered resumes. We scan 1M+ jobs and automatically submit tailored applications on your behalf.",
    },
    {
      question: "Can I stay hidden from my current employer?",
      answer:
        "Yes, via Stealth Mode. Flumberico has a built-in privacy feature that keeps your job search confidential from your current employer.",
    },
    {
      question: "What if I don't get interviews?",
      answer:
        "Flumberico pays $500 under the 30-Day Guarantee. If you don't get at least one interview within 30 days, we refund you $500.",
    },
    {
      question: "How many jobs does Flumberico apply to?",
      answer:
        "Flumberico applies to 200+ perfect-fit jobs per month, all with custom-tailored resumes based on your profile and preferences.",
    },
    {
      question: "When does Flumberico launch?",
      answer:
        "Flumberico launches March 1, 2025. Early-access users who refer 3 friends get instant access before the official launch.",
    },
    {
      question: "Is there a credit card required?",
      answer: "No credit card required. Join the waitlist for free and get instant access once you refer 3 friends.",
>>>>>>> 87c15452b50e1e50ab1b328fee0291f5f69d2d83
    },
  ]

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-balance">
          Got Questions About <span className="text-cyan">Flumberico?</span>
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-border rounded-lg overflow-hidden transition-smooth">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between bg-midnight-light hover:bg-midnight transition-smooth"
              >
                <span className="font-semibold text-left">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`flex-shrink-0 text-cyan transition-transform ${openIndex === idx ? "rotate-180" : ""}`}
                />
              </button>
              {openIndex === idx && (
                <div className="px-6 py-4 bg-midnight border-t border-border text-muted-foreground">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
