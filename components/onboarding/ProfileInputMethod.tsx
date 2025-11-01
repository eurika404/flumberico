import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Linkedin, Edit3, ArrowRight, FileText, User, Zap } from 'lucide-react'

interface ProfileInputMethodProps {
  selectedMethod: string
  onMethodSelect: (method: 'cv' | 'linkedin' | 'manual') => void
  onNext: () => void
}

export function ProfileInputMethod({ selectedMethod, onMethodSelect, onNext }: ProfileInputMethodProps) {
  const [hoveredMethod, setHoveredMethod] = useState<string | null>(null)

  const methods = [
    {
      id: 'cv',
      title: 'Upload CV/Resume',
      description: 'Upload your CV and let AI extract your skills and experience automatically',
      icon: Upload,
      features: ['AI-powered parsing', 'Supports PDF & DOCX', 'Automatic skill extraction'],
      color: 'from-blue-600 to-cyan-600'
    },
    {
      id: 'linkedin',
      title: 'LinkedIn Profile',
      description: 'Connect your LinkedIn profile to import your professional experience',
      icon: Linkedin,
      features: ['One-click import', 'Up-to-date information', 'Professional network'],
      color: 'from-blue-700 to-blue-600'
    },
    {
      id: 'manual',
      title: 'Manual Input',
      description: 'Manually enter your skills, experience, and preferences',
      icon: Edit3,
      features: ['Full control', 'Detailed customization', 'Instant setup'],
      color: 'from-purple-600 to-pink-600'
    }
  ]

  const handleMethodSelect = (methodId: 'cv' | 'linkedin' | 'manual') => {
    onMethodSelect(methodId)
  }

  const handleContinue = () => {
    if (selectedMethod) {
      onNext()
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          How would you like to create your profile?
        </h2>
        <p className="text-slate-400 text-lg">
          Choose the method that works best for you. All options use AI to find the perfect job matches.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {methods.map((method, index) => {
          const Icon = method.icon
          const isSelected = selectedMethod === method.id
          const isHovered = hoveredMethod === method.id

          return (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredMethod(method.id)}
              onMouseLeave={() => setHoveredMethod(null)}
              onClick={() => handleMethodSelect(method.id as 'cv' | 'linkedin' | 'manual')}
              className={`relative cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300 ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-600/10'
                  : isHovered
                  ? 'border-slate-600 bg-slate-800/50'
                  : 'border-slate-700 bg-slate-900/50'
              }`}
            >
              {/* Selection indicator */}
              {isSelected && (
                <motion.div
                  layoutId="selectedMethod"
                  className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-2xl opacity-20"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              <div className="relative">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${method.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-2">
                  {method.title}
                </h3>
                <p className="text-slate-400 mb-4">
                  {method.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {method.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      <span className="text-sm text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Hover effect */}
                {isHovered && !isSelected && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute -top-2 -right-2"
                  >
                    <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Selected method details */}
      {selectedMethod && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-5 h-5 text-indigo-400" />
            <h4 className="text-lg font-semibold text-white">
              You've selected: {methods.find(m => m.id === selectedMethod)?.title}
            </h4>
          </div>
          <p className="text-slate-400 mb-4">
            {methods.find(m => m.id === selectedMethod)?.description}
          </p>
          <button
            onClick={handleContinue}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Continue with this method
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* Help text */}
      <div className="text-center">
        <p className="text-sm text-slate-500">
          Don't worry! You can always update your profile information later.
        </p>
      </div>
    </div>
  )
}