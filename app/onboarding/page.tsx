"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, ArrowLeft, Upload, User } from "lucide-react"

// Custom scrollbar styles
const customScrollbarStyle = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(0, 255, 255, 0.3);
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 255, 255, 0.5);
  }
`

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [linkedInUrl, setLinkedInUrl] = useState("")
  const [resumeUploaded, setResumeUploaded] = useState(false)
  const [experience, setExperience] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const totalSteps = 4

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = customScrollbarStyle
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  const handleClose = () => {
    window.location.href = "https://www.flumbericoco.com/"
  }

  const handleNext = () => {
    if (step === 1 && (!name || !email)) return
    if (step === 2 && !experience.trim()) return

    if (step === 3) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setStep(step + 1)
      }, 2000)
    } else {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
    else handleClose()
  }

  // Generate AI-matched jobs based on user experience
  const generateAiJobs = (userExperience: string) => {
    const exp = userExperience.toLowerCase()

    // Product Management roles
    if (exp.includes("product") || exp.includes("pm") || exp.includes("manager")) {
      return [
        { title: "Senior Product Manager", match: 95, salary: "$140K-190K" },
        { title: "Product Marketing Manager", match: 92, salary: "$115K-145K" },
        { title: "Technical Product Manager", match: 90, salary: "$130K-170K" },
        { title: "Growth Product Manager", match: 88, salary: "$125K-165K" },
        { title: "Product Operations Manager", match: 85, salary: "$110K-150K" },
        { title: "Associate Product Manager", match: 82, salary: "$95K-130K" },
      ]
    }

    // UX/Design roles
    if (exp.includes("ux") || exp.includes("design") || exp.includes("ui") || exp.includes("designer")) {
      return [
        { title: "Senior UX Designer", match: 94, salary: "$120K-160K" },
        { title: "UX Researcher", match: 91, salary: "$100K-140K" },
        { title: "Product Designer", match: 89, salary: "$110K-150K" },
        { title: "UI Designer", match: 87, salary: "$95K-135K" },
        { title: "Content Strategist", match: 86, salary: "$90K-130K" },
        { title: "Design Systems Lead", match: 84, salary: "$115K-155K" },
      ]
    }

    // Data/Analytics roles
    if (exp.includes("data") || exp.includes("analytics") || exp.includes("analysis") || exp.includes("scientist")) {
      return [
        { title: "Senior Data Scientist", match: 96, salary: "$140K-190K" },
        { title: "Data Analytics Lead", match: 93, salary: "$105K-145K" },
        { title: "Machine Learning Engineer", match: 91, salary: "$135K-180K" },
        { title: "Business Intelligence Analyst", match: 87, salary: "$95K-135K" },
        { title: "Data Engineer", match: 86, salary: "$120K-165K" },
        { title: "Data Analyst", match: 84, salary: "$85K-125K" },
      ]
    }

    // Marketing roles
    if (exp.includes("marketing") || exp.includes("growth") || exp.includes("content") || exp.includes("seo") || exp.includes("social")) {
      return [
        { title: "Growth Marketing Manager", match: 92, salary: "$95K-135K" },
        { title: "Performance Marketing Manager", match: 90, salary: "$100K-140K" },
        { title: "Content Marketing Lead", match: 88, salary: "$85K-125K" },
        { title: "Digital Marketing Manager", match: 86, salary: "$90K-130K" },
        { title: "SEO Specialist", match: 84, salary: "$75K-115K" },
        { title: "Social Media Manager", match: 82, salary: "$70K-110K" },
      ]
    }

    // Engineering roles
    if (exp.includes("engineer") || exp.includes("developer") || exp.includes("software") || exp.includes("frontend") || exp.includes("backend")) {
      return [
        { title: "Senior Software Engineer", match: 94, salary: "$150K-200K" },
        { title: "Staff Software Engineer", match: 92, salary: "$170K-220K" },
        { title: "Full Stack Developer", match: 89, salary: "$120K-170K" },
        { title: "Frontend Developer", match: 87, salary: "$110K-160K" },
        { title: "Backend Developer", match: 86, salary: "$115K-165K" },
        { title: "DevOps Engineer", match: 85, salary: "$125K-175K" },
        { title: "Engineering Manager", match: 83, salary: "$140K-190K" },
      ]
    }

    // Sales roles
    if (exp.includes("sales") || exp.includes("account") || exp.includes("business development") || exp.includes("revenue")) {
      return [
        { title: "Account Executive", match: 91, salary: "$80K-120K" },
        { title: "Sales Manager", match: 89, salary: "$95K-140K" },
        { title: "Business Development Representative", match: 86, salary: "$60K-90K" },
        { title: "Customer Success Manager", match: 84, salary: "$75K-115K" },
        { title: "Sales Operations Analyst", match: 82, salary: "$70K-110K" },
      ]
    }

    // HR/Recruiting roles
    if (exp.includes("hr") || exp.includes("recruiting") || exp.includes("talent") || exp.includes("human resources")) {
      return [
        { title: "Senior Technical Recruiter", match: 90, salary: "$85K-125K" },
        { title: "HR Business Partner", match: 88, salary: "$90K-130K" },
        { title: "Talent Acquisition Manager", match: 86, salary: "$95K-135K" },
        { title: "People Operations Manager", match: 84, salary: "$80K-120K" },
        { title: "Recruiting Coordinator", match: 82, salary: "$55K-85K" },
      ]
    }

    // Finance roles
    if (exp.includes("finance") || exp.includes("accounting") || exp.includes("financial") || exp.includes("controller")) {
      return [
        { title: "Financial Analyst", match: 91, salary: "$85K-125K" },
        { title: "Senior Accountant", match: 89, salary: "$75K-115K" },
        { title: "Finance Manager", match: 87, salary: "$105K-145K" },
        { title: "Controller", match: 85, salary: "$120K-160K" },
        { title: "Accounts Receivable Specialist", match: 82, salary: "$60K-90K" },
      ]
    }

    // Customer Service roles
    if (exp.includes("customer") || exp.includes("support") || exp.includes("service") || exp.includes("success")) {
      return [
        { title: "Customer Success Manager", match: 88, salary: "$75K-115K" },
        { title: "Customer Support Lead", match: 86, salary: "$65K-95K" },
        { title: "Technical Support Specialist", match: 84, salary: "$60K-90K" },
        { title: "Customer Experience Manager", match: 82, salary: "$80K-120K" },
        { title: "Support Representative", match: 80, salary: "$45K-75K" },
      ]
    }

    // Operations roles
    if (exp.includes("operations") || exp.includes("operational") || exp.includes("logistics") || exp.includes("supply chain")) {
      return [
        { title: "Operations Manager", match: 90, salary: "$90K-130K" },
        { title: "Supply Chain Analyst", match: 87, salary: "$75K-115K" },
        { title: "Logistics Coordinator", match: 85, salary: "$60K-90K" },
        { title: "Process Improvement Specialist", match: 83, salary: "$80K-120K" },
        { title: "Operations Analyst", match: 81, salary: "$70K-110K" },
      ]
    }

    // Consulting roles
    if (exp.includes("consultant") || exp.includes("consulting") || exp.includes("advisory")) {
      return [
        { title: "Management Consultant", match: 92, salary: "$120K-170K" },
        { title: "Strategy Consultant", match: 89, salary: "$130K-180K" },
        { title: "IT Consultant", match: 87, salary: "$100K-150K" },
        { title: "Business Analyst Consultant", match: 85, salary: "$85K-125K" },
        { title: "Process Consultant", match: 82, salary: "$90K-140K" },
      ]
    }

    // Healthcare roles
    if (exp.includes("healthcare") || exp.includes("medical") || exp.includes("health") || exp.includes("nurse") || exp.includes("doctor")) {
      return [
        { title: "Healthcare Administrator", match: 88, salary: "$85K-125K" },
        { title: "Medical Office Manager", match: 86, salary: "$65K-95K" },
        { title: "Health Information Manager", match: 84, salary: "$75K-115K" },
        { title: "Clinical Research Coordinator", match: 82, salary: "$70K-110K" },
        { title: "Healthcare Consultant", match: 80, salary: "$90K-140K" },
      ]
    }

    // Education roles
    if (exp.includes("education") || exp.includes("teacher") || exp.includes("training") || exp.includes("learning") || exp.includes("instructional")) {
      return [
        { title: "Instructional Designer", match: 89, salary: "$75K-115K" },
        { title: "Training Manager", match: 87, salary: "$85K-125K" },
        { title: "Curriculum Developer", match: 85, salary: "$70K-110K" },
        { title: "Learning & Development Specialist", match: 83, salary: "$80K-120K" },
        { title: "Education Coordinator", match: 81, salary: "$60K-90K" },
      ]
    }

    // Legal roles
    if (exp.includes("legal") || exp.includes("lawyer") || exp.includes("attorney") || exp.includes("paralegal")) {
      return [
        { title: "Corporate Attorney", match: 91, salary: "$150K-250K" },
        { title: "Legal Counsel", match: 89, salary: "$130K-200K" },
        { title: "Senior Paralegal", match: 86, salary: "$75K-115K" },
        { title: "Legal Operations Manager", match: 84, salary: "$95K-145K" },
        { title: "Compliance Officer", match: 82, salary: "$85K-125K" },
      ]
    }

    // Real Estate roles
    if (exp.includes("real estate") || exp.includes("property") || exp.includes("realtor") || exp.includes("leasing")) {
      return [
        { title: "Real Estate Broker", match: 88, salary: "$80K-150K" },
        { title: "Property Manager", match: 86, salary: "$65K-95K" },
        { title: "Real Estate Analyst", match: 84, salary: "$75K-115K" },
        { title: "Leasing Consultant", match: 82, salary: "$50K-80K" },
        { title: "Property Development Coordinator", match: 80, salary: "$70K-110K" },
      ]
    }

    // Default fallback roles
    return [
      { title: "Operations Manager", match: 85, salary: "$90K-130K" },
      { title: "Business Analyst", match: 83, salary: "$85K-125K" },
      { title: "Project Manager", match: 82, salary: "$95K-135K" },
      { title: "Program Coordinator", match: 80, salary: "$70K-110K" },
      { title: "Administrative Manager", match: 78, salary: "$65K-95K" },
      { title: "Team Lead", match: 76, salary: "$75K-115K" },
    ]
  }

  const aiJobs = generateAiJobs(experience)

  // Animasi varian
  const fadeSlide = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.6, ease: "easeOut" },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1428] to-[#0e1a34] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">

      {/* Progress Bar */}
      <motion.div
        className="absolute top-0 left-0 h-1 bg-cyan"
        initial={{ width: 0 }}
        animate={{ width: `${(step / totalSteps) * 100}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 text-gray-400 hover:text-white text-2xl font-bold transition-all"
      >
        ✕
      </button>

      {/* Step Container */}
      <AnimatePresence mode="wait">
        {/* STEP 1: Name + Email */}
        {step === 1 && (
          <motion.div key="s1" {...fadeSlide} className="max-w-md w-full">
            <motion.h1
              className="text-4xl font-bold mb-2 text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Join <span className="text-cyan">Flumberico</span>
            </motion.h1>
            <p className="text-muted-foreground mb-8 text-center">
              Let AI hunt your dream job while you sleep
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-midnight-light border border-border rounded-lg focus:border-cyan focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-midnight-light border border-border rounded-lg focus:border-cyan focus:outline-none transition-colors"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                disabled={!name || !email}
                className={`w-full py-3 rounded-full font-semibold transition-all ${
                  name && email
                    ? "bg-cyan text-midnight hover:bg-cyan-dark"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
              >
                Continue
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: Add Your Experience & LinkedIn Profile */}
        {step === 2 && (
          <motion.div key="s2" {...fadeSlide} className="max-w-md w-full">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Add Your <span className="text-cyan">Experience</span> & <span className="text-cyan">LinkedIn</span>
            </h2>
            <p className="text-muted-foreground mb-6 text-center">
              Tell Flumberico about your skills and optionally add your LinkedIn for better matches
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Your Experience *</label>
                <textarea
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="e.g., Marketing Manager, UX Design, Data Analysis, Software Engineering, Product Management"
                  className="w-full px-4 py-3 bg-midnight-light border border-border rounded-lg focus:border-cyan focus:outline-none transition-colors resize-none"
                  rows={4}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Be specific about your skills and past roles for better matches
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">LinkedIn Profile URL (Optional)</label>
                <input
                  type="url"
                  value={linkedInUrl}
                  onChange={(e) => setLinkedInUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/johndoe"
                  className="w-full px-4 py-3 bg-midnight-light border border-border rounded-lg focus:border-cyan focus:outline-none transition-colors"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Optional - helps Flumberico find even better matches
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                disabled={!experience.trim()}
                className={`w-full py-3 rounded-full font-semibold transition-all ${
                  experience.trim()
                    ? "bg-cyan text-midnight hover:bg-cyan-dark"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
              >
                Get My AI Matches
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: AI Analysis -> Auto-show Results */}
        {step === 3 && (
          <motion.div key="s3" {...fadeSlide} className="text-center max-w-2xl">
            {!isLoading ? (
              <>
                <h2 className="text-3xl font-bold mb-6">
                  🎯 Your <span className="text-cyan">AI-Matched</span> Jobs
                </h2>
                <p className="text-muted-foreground mb-8">
                  Based on your experience in {experience || "your field"}, here are your top {aiJobs.length} matches:
                </p>

                <div className="grid gap-4 mb-8 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                  {aiJobs.slice(0, 8).map((job, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      whileHover={{ scale: 1.02 }}
                      className="border border-border bg-midnight-light p-5 rounded-xl flex justify-between items-center"
                    >
                      <div className="text-left">
                        <p className="font-semibold text-white">{job.title}</p>
                        <p className="text-sm text-muted-foreground">{job.salary}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-cyan font-bold text-lg">{job.match}%</p>
                        <p className="text-xs text-muted-foreground">Match</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {aiJobs.length > 8 && (
                  <p className="text-sm text-muted-foreground mb-6">
                    Showing 8 of {aiJobs.length} matches. Join waitlist to see all opportunities!
                  </p>
                )}

                <div className="space-y-4">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href="https://upvir.al/166486/Flumberico"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <button className="w-full px-8 py-4 bg-cyan text-midnight font-bold rounded-full text-lg hover:bg-cyan-dark transition-all">
                      Join Waitlist - Get Early Access
                    </button>
                  </motion.a>

                  <button
                    onClick={handleClose}
                    className="block w-full text-cyan hover:text-cyan-light transition-colors"
                  >
                    Learn More First
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-6">
                  <span className="text-cyan">AI</span> is Finding Your Dream Jobs
                </h2>
                <p className="text-muted-foreground mb-8">
                  Analyzing your experience and matching you with perfect opportunities...
                </p>

                <motion.div
                  className="relative flex justify-center items-center mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="absolute w-28 h-28 rounded-full border-4 border-cyan/40 animate-ping" />
                  <Loader2 className="animate-spin text-cyan w-10 h-10 relative z-10" />
                </motion.div>

                <div className="space-y-3">
                  <div className="h-4 bg-midnight-light rounded-full animate-pulse"></div>
                  <div className="h-4 bg-midnight-light rounded-full animate-pulse delay-75"></div>
                  <div className="h-4 bg-midnight-light rounded-full animate-pulse delay-150"></div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back Button */}
      {step > 1 && step < 5 && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleBack}
          className="absolute bottom-6 left-6 flex items-center gap-2 text-gray-400 hover:text-white transition-all"
        >
          <ArrowLeft size={18} /> Back
        </motion.button>
      )}
    </div>
  )
}
