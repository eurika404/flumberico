"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Upload, FileText, Linkedin, Edit3, Sparkles, Check } from 'lucide-react'
import { StepIndicator } from './StepIndicator'
import { ProfileInputMethod } from './ProfileInputMethod'
import { CVUploadStep } from './CVUploadStep'
import { LinkedInStep } from './LinkedInStep'
import { ManualInputStep } from './ManualInputStep'
import { PreferencesStep } from './PreferencesStep'
import { CompletionStep } from './CompletionStep'

interface OnboardingFlowProps {
  userId: string
}

export function OnboardingFlow({ userId }: OnboardingFlowProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [profileData, setProfileData] = useState({
    inputMethod: '' as 'cv' | 'linkedin' | 'manual',
    cvFile: null as File | null,
    linkedInUrl: '',
    skills: [] as string[],
    experience: [] as any[],
    preferences: {
      jobRoles: [] as string[],
      locations: [] as string[],
      minSalary: 50000,
      isRemote: false
    }
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const totalSteps = 5

  const handleNext = async () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleComplete = async () => {
    setIsProcessing(true)
    try {
      // Save all profile data to database
      const response = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          profileData
        })
      })

      if (response.ok) {
        router.push('/dashboard')
      } else {
        throw new Error('Failed to save profile')
      }
    } catch (error) {
      console.error('Error completing onboarding:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const updateProfileData = (updates: Partial<typeof profileData>) => {
    setProfileData(prev => ({ ...prev, ...updates }))
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return profileData.inputMethod !== ''
      case 2:
        if (profileData.inputMethod === 'cv') return profileData.cvFile !== null
        if (profileData.inputMethod === 'linkedin') return profileData.linkedInUrl !== ''
        if (profileData.inputMethod === 'manual') return profileData.skills.length > 0 && profileData.experience.length > 0
        return false
      case 3:
        return profileData.preferences.jobRoles.length > 0 && profileData.preferences.locations.length > 0
      default:
        return true
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">AutoJobMatch</h1>
            </div>

            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            )}
          </div>

          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && (
                <ProfileInputMethod
                  selectedMethod={profileData.inputMethod}
                  onMethodSelect={(method) => updateProfileData({ inputMethod: method })}
                  onNext={handleNext}
                />
              )}

              {currentStep === 2 && profileData.inputMethod === 'cv' && (
                <CVUploadStep
                  file={profileData.cvFile}
                  onFileSelect={(file) => updateProfileData({ cvFile: file })}
                  onNext={handleNext}
                />
              )}

              {currentStep === 2 && profileData.inputMethod === 'linkedin' && (
                <LinkedInStep
                  url={profileData.linkedInUrl}
                  onUrlChange={(url) => updateProfileData({ linkedInUrl: url })}
                  onNext={handleNext}
                />
              )}

              {currentStep === 2 && profileData.inputMethod === 'manual' && (
                <ManualInputStep
                  skills={profileData.skills}
                  experience={profileData.experience}
                  onSkillsChange={(skills) => updateProfileData({ skills })}
                  onExperienceChange={(experience) => updateProfileData({ experience })}
                  onNext={handleNext}
                />
              )}

              {currentStep === 3 && (
                <PreferencesStep
                  preferences={profileData.preferences}
                  onPreferencesChange={(preferences) => updateProfileData({ preferences })}
                  onNext={handleNext}
                />
              )}

              {currentStep === 4 && (
                <CompletionStep
                  profileData={profileData}
                  onComplete={handleComplete}
                  isProcessing={isProcessing}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Navigation */}
      <div className="p-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="text-sm text-slate-400">
            Step {currentStep} of {totalSteps}
          </div>

          <div className="flex gap-3">
            {currentStep < totalSteps && (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${
                  canProceed()
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-slate-800 text-slate-400 cursor-not-allowed'
                }`}
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}