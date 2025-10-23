"use client"

import Header from "@/components/header"
import TopBanner from "@/components/top-banner"
import HeroSection from "@/components/hero-section"
import ProblemSection from "@/components/problem-section"
import SolutionSection from "@/components/solution-section"
import SocialProof from "@/components/social-proof"
import ScarcitySection from "@/components/scarcity-section"
import ReferralSection from "@/components/referral-section"
import FAQSection from "@/components/faq-section"
import FinalCTA from "@/components/final-cta"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <TopBanner />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <SocialProof />
      <ScarcitySection />
      <ReferralSection />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </main>
  )
}
