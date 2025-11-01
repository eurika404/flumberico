import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Sparkles, ArrowRight, Loader2, AlertCircle, RefreshCw } from 'lucide-react'

interface CompletionStepProps {
  profileData: any
  onComplete: () => void
  isProcessing: boolean
}

export function CompletionStep({ profileData, onComplete, isProcessing }: CompletionStepProps) {
  const [error, setError] = useState<string | null>(null)

  const handleComplete = async () => {
    setError(null)
    await onComplete()
  }

  const getMethodDisplay = (method: string) => {
    switch (method) {
      case 'cv':
        return 'CV Upload'
      case 'linkedin':
        return 'LinkedIn Profile'
      case 'manual':
        return 'Manual Input'
      default:
        return 'Unknown'
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-10 h-10 text-white" />
        </motion.div>

        <h2 className="text-3xl font-bold text-white mb-4">
          Your Profile is Ready!
        </h2>
        <p className="text-slate-400 text-lg">
          Review your profile information and complete the setup to start getting job matches
        </p>
      </div>

      {/* Profile Summary */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 space-y-6">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            Profile Summary
          </h3>

          {/* Profile Method */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-slate-400 mb-2">Profile Creation Method</h4>
              <p className="text-white capitalize">{getMethodDisplay(profileData.inputMethod)}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-slate-400 mb-2">Skills & Experience</h4>
              <p className="text-white">
                {profileData.skills?.length || 0} skills, {profileData.experience?.length || 0} positions
              </p>
            </div>
          </div>

          {/* Skills Preview */}
          {profileData.skills && profileData.skills.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-slate-400 mb-3">Top Skills</h4>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.slice(0, 8).map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-600/20 text-indigo-400 rounded-full text-sm border border-indigo-600/30"
                  >
                    {skill}
                  </span>
                ))}
                {profileData.skills.length > 8 && (
                  <span className="px-3 py-1 bg-slate-700 text-slate-400 rounded-full text-sm">
                    +{profileData.skills.length - 8} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Job Preferences */}
          <div>
            <h4 className="text-sm font-medium text-slate-400 mb-3">Job Preferences</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500 mb-1">Desired Roles</p>
                <div className="flex flex-wrap gap-1">
                  {profileData.preferences.jobRoles.slice(0, 3).map((role: string, index: number) => (
                    <span key={index} className="text-sm text-white">
                      {role}{index < Math.min(2, profileData.preferences.jobRoles.length - 1) && ', '}
                    </span>
                  ))}
                  {profileData.preferences.jobRoles.length > 3 && (
                    <span className="text-sm text-slate-400">
                      +{profileData.preferences.jobRoles.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-500 mb-1">Locations</p>
                <div className="flex flex-wrap gap-1">
                  {profileData.preferences.locations.slice(0, 3).map((location: string, index: number) => (
                    <span key={index} className="text-sm text-white">
                      {location}{index < Math.min(2, profileData.preferences.locations.length - 1) && ', '}
                    </span>
                  ))}
                  {profileData.preferences.locations.length > 3 && (
                    <span className="text-sm text-slate-400">
                      +{profileData.preferences.locations.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Salary and Remote */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-500 mb-1">Minimum Salary</p>
              <p className="text-white">
                {profileData.preferences.minSalary > 0
                  ? `$${profileData.preferences.minSalary.toLocaleString()}/year`
                  : 'No minimum set'
                }
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500 mb-1">Remote Work</p>
              <p className="text-white">
                {profileData.preferences.isRemote ? 'Open to remote opportunities' : 'On-site only'}
              </p>
            </div>
          </div>
        </div>

        {/* AI Processing Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-indigo-600/20 to-cyan-600/20 rounded-xl p-6 border border-indigo-600/30"
        >
          <div className="flex items-start gap-3">
            <Sparkles className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-white mb-2">What's Next?</h4>
              <p className="text-slate-300 mb-3">
                Once you complete setup, our AI will:
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5" />
                  <span>Analyze your profile and generate intelligent embeddings</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5" />
                  <span>Match you with relevant job opportunities using semantic search</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5" />
                  <span>Provide personalized recommendations with match scores</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5" />
                  <span>Continuously learn from your feedback to improve matches</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-red-900/20 border border-red-700 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <div>
                <p className="text-red-400 font-medium">Setup Failed</p>
                <p className="text-sm text-slate-300">{error}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleComplete}
          disabled={isProcessing}
          className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
            isProcessing
              ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white hover:from-indigo-700 hover:to-cyan-700'
          }`}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Setting up your profile...
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6" />
              Complete Setup & Go to Dashboard
              <ArrowRight className="w-6 h-6" />
            </>
          )}
        </motion.button>

        {isProcessing && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-slate-400 text-center"
          >
            This may take a few moments while we process your profile and generate matches...
          </motion.p>
        )}

        <div className="text-center">
          <p className="text-sm text-slate-500">
            You can always update your profile information later in settings
          </p>
        </div>
      </div>
    </div>
  )
}