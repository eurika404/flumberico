"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, ArrowLeft } from "lucide-react"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const totalSteps = 6

  const handleClose = () => {
    window.location.href = "https://www.flumbericoco.com/"
  }

  const handleNext = () => {
    if (step === 2 && !selectedOption) return
    if (step === 4) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setStep(step + 1)
      }, 3000)
    } else {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
    else handleClose()
  }

  // Random job list
  const randomJobs = [
    { title: "AI Product Manager", match: 94 },
    { title: "Data Analyst", match: 89 },
    { title: "UX Researcher", match: 92 },
    { title: "Software Engineer", match: 96 },
    { title: "AI Prompt Engineer", match: 91 },
  ]

  const jobs = randomJobs.sort(() => 0.5 - Math.random()).slice(0, 3)

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
        {/* STEP 1 */}
        {step === 1 && (
          <motion.div key="s1" {...fadeSlide} className="max-w-xl text-center">
            <motion.h1
              className="text-5xl font-extrabold mb-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Welcome to <span className="text-cyan">Flumbericoco</span>
            </motion.h1>
            <p className="text-muted-foreground mb-10 text-lg">
              Let’s discover your perfect career path with AI-powered insights.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="px-8 py-4 bg-cyan text-midnight font-semibold rounded-full text-lg shadow-md hover:shadow-cyan/30 transition-all"
            >
              Get Started
            </motion.button>
          </motion.div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <motion.div key="s2" {...fadeSlide} className="max-w-xl text-center">
            <h2 className="text-3xl font-bold mb-8">What matters most to you?</h2>
            <div className="grid grid-cols-2 gap-4 mb-10">
              {["High Salary", "Career Growth", "Work-Life Balance", "Remote Flexibility"].map((opt) => (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  key={opt}
                  onClick={() => setSelectedOption(opt)}
                  className={`p-5 border rounded-2xl transition-all ${
                    selectedOption === opt
                      ? "bg-cyan text-midnight font-semibold shadow-lg"
                      : "bg-[#0e1a34] hover:bg-midnight-light border-gray-700"
                  }`}
                >
                  {opt}
                </motion.button>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={!selectedOption}
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                selectedOption
                  ? "bg-cyan text-midnight hover:bg-cyan-dark"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </motion.div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <motion.div key="s3" {...fadeSlide} className="max-w-xl text-center">
            <h2 className="text-3xl font-bold mb-8">Do you already have a resume?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleNext}
                className="px-8 py-3 bg-cyan text-midnight rounded-full font-semibold hover:bg-cyan-dark transition-all"
              >
                Yes, upload it
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleNext}
                className="px-8 py-3 border border-gray-600 rounded-full hover:bg-midnight-light transition-all"
              >
                No, help me build one
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* STEP 4 - Loading / Scanning */}
        {step === 4 && (
          <motion.div key="s4" {...fadeSlide} className="text-center max-w-xl">
            <h2 className="text-3xl font-bold mb-6">🔍 Analyzing Your Profile...</h2>
            <p className="text-muted-foreground mb-8">AI is scanning your skills and job preferences.</p>

            {isLoading ? (
              <motion.div
                className="relative flex justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="absolute w-28 h-28 rounded-full border-4 border-cyan/40 animate-ping" />
                <Loader2 className="animate-spin text-cyan w-10 h-10 relative z-10" />
              </motion.div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleNext}
                className="mt-10 px-8 py-3 bg-cyan text-midnight font-semibold rounded-full hover:bg-cyan-dark transition-all"
              >
                View My AI Dashboard
              </motion.button>
            )}
          </motion.div>
        )}

        {/* STEP 5 - Dashboard */}
        {step === 5 && (
          <motion.div key="s5" {...fadeSlide} className="text-center max-w-2xl">
            <h2 className="text-3xl font-bold mb-6">🎯 Your Personalized Dashboard</h2>
            <p className="text-muted-foreground mb-8">
              Based on your goals, here’s what fits you best:
            </p>
            <div className="grid gap-4">
              {jobs.map((job, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="border border-gray-700 bg-[#111a36] p-5 rounded-xl flex justify-between items-center"
                >
                  <span>{job.title}</span>
                  <span className="text-cyan font-semibold">{job.match}% Match</span>
                </motion.div>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleNext}
              className="mt-10 px-8 py-3 bg-cyan text-midnight font-semibold rounded-full hover:bg-cyan-dark transition-all"
            >
              Continue
            </motion.button>
          </motion.div>
        )}

        {/* STEP 6 - Final Funnel CTA */}
        {step === 6 && (
          <motion.div key="s6" {...fadeSlide} className="text-center max-w-xl">
            <h2 className="text-4xl font-bold mb-6">🚀 You’re Almost There!</h2>
            <p className="text-muted-foreground mb-10 text-lg">
              Join the official early access campaign and secure your spot in the next-gen career platform.
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="https://upvir.al/166486/Flumberico"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <button className="px-10 py-4 bg-[#bcff00] text-[#0a1428] font-extrabold rounded-full text-lg hover:opacity-90 transition-all shadow-[0_0_20px_rgba(188,255,0,0.3)]">
                Join the Early Access Campaign
              </button>
            </motion.a>
            <p className="mt-6 text-sm text-muted-foreground">
              or{" "}
              <button
                onClick={handleClose}
                className="underline hover:text-cyan transition-all"
              >
                return to homepage
              </button>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back Button */}
      {step > 1 && step < 6 && (
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
