import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Linkedin, ExternalLink, AlertCircle, Check, Loader2, ArrowRight, Shield } from 'lucide-react'

interface LinkedInStepProps {
  url: string
  onUrlChange: (url: string) => void
  onNext: () => void
}

export function LinkedInStep({ url, onUrlChange, onNext }: LinkedInStepProps) {
  const [isImporting, setIsImporting] = useState(false)
  const [importStatus, setImportStatus] = useState<'idle' | 'importing' | 'success' | 'error'>('idle')
  const [importedData, setImportedData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const validateLinkedInUrl = (url: string) => {
    const linkedInRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/i
    return linkedInRegex.test(url)
  }

  const handleImport = async () => {
    if (!validateLinkedInUrl(url)) {
      setError('Please enter a valid LinkedIn profile URL')
      return
    }

    setError(null)
    setImportStatus('importing')
    setIsImporting(true)

    try {
      const response = await fetch('/api/onboarding/import-linkedin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ linkedInUrl: url })
      })

      if (!response.ok) {
        throw new Error('Failed to import LinkedIn profile')
      }

      const result = await response.json()
      setImportedData(result.data)
      setImportStatus('success')
    } catch (err) {
      console.error('Error importing LinkedIn:', err)
      setError('Failed to import LinkedIn profile. Please check the URL and try again.')
      setImportStatus('error')
    } finally {
      setIsImporting(false)
    }
  }

  const handleNext = () => {
    if (importedData) {
      onNext()
    }
  }

  const isValidUrl = validateLinkedInUrl(url)
  const canImport = url.length > 0 && isValidUrl

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Import Your LinkedIn Profile
        </h2>
        <p className="text-slate-400 text-lg">
          Connect your LinkedIn profile to automatically import your professional experience
        </p>
      </div>

      {/* URL Input */}
      <div className="max-w-2xl mx-auto">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              LinkedIn Profile URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Linkedin className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="url"
                value={url}
                onChange={(e) => onUrlChange(e.target.value)}
                placeholder="https://linkedin.com/in/johndoe"
                className={`w-full pl-10 pr-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
                  url && !isValidUrl ? 'border-red-500' : 'border-slate-600'
                }`}
              />
            </div>
            {url && !isValidUrl && (
              <p className="mt-2 text-sm text-red-400">
                Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/johndoe)
              </p>
            )}
          </div>

          {/* Import Button */}
          {!importedData && (
            <button
              onClick={handleImport}
              disabled={!canImport || isImporting}
              className={`w-full flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-medium transition-colors ${
                canImport && !isImporting
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-slate-700 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isImporting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Importing profile...
                </>
              ) : (
                <>
                  <Linkedin className="w-5 h-5" />
                  Import LinkedIn Profile
                </>
              )}
            </button>
          )}
        </div>

        {/* Import Status */}
        <AnimatePresence mode="wait">
          {importStatus === 'importing' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 bg-slate-800/50 rounded-xl p-6 border border-slate-700"
            >
              <div className="flex items-center gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
                <div>
                  <p className="text-white font-medium">Importing your LinkedIn profile...</p>
                  <p className="text-slate-400 text-sm">This may take a few seconds</p>
                </div>
              </div>
            </motion.div>
          )}

          {importStatus === 'success' && importedData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 bg-slate-800/50 rounded-xl p-6 border border-slate-700"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-white" />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Profile imported successfully!
                  </h3>
                  <p className="text-slate-400 mb-4">
                    We've imported your profile information from LinkedIn
                  </p>

                  {/* Imported Data Preview */}
                  <div className="bg-slate-900/50 rounded-lg p-4 space-y-3">
                    {importedData.headline && (
                      <div>
                        <h4 className="text-sm font-medium text-slate-400 mb-1">Headline</h4>
                        <p className="text-white">{importedData.headline}</p>
                      </div>
                    )}

                    {importedData.skills && importedData.skills.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-slate-400 mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {importedData.skills.slice(0, 8).map((skill: string, index: number) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                          {importedData.skills.length > 8 && (
                            <span className="px-3 py-1 bg-slate-700 text-slate-400 rounded-full text-sm">
                              +{importedData.skills.length - 8} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {importedData.experience && importedData.experience.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-slate-400 mb-2">Recent Experience</h4>
                        <div className="space-y-2">
                          {importedData.experience.slice(0, 2).map((exp: any, index: number) => (
                            <div key={index} className="text-sm text-slate-300">
                              <span className="font-medium">{exp.title}</span> at {exp.company}
                              {exp.duration && <span className="text-slate-500"> • {exp.duration}</span>}
                            </div>
                          ))}
                          {importedData.experience.length > 2 && (
                            <div className="text-sm text-slate-500">
                              +{importedData.experience.length - 2} more positions
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleNext}
                    className="mt-6 flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Continue to Preferences
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {importStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 bg-red-900/20 border border-red-700 rounded-xl p-6"
            >
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Failed to import profile
                  </h3>
                  <p className="text-slate-300 mb-4">
                    {error || 'We couldn\'t import your LinkedIn profile. Please check the URL and try again.'}
                  </p>
                  <div className="space-y-3">
                    <p className="text-sm text-slate-400">
                      Make sure:
                    </p>
                    <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
                      <li>Your LinkedIn profile is set to public</li>
                      <li>The URL is correct and complete</li>
                      <li>You have a stable internet connection</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Help Section */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-white mb-2">Privacy & Security</h4>
              <p className="text-sm text-slate-400">
                We only access publicly available information from your LinkedIn profile.
                Your data is encrypted and used solely for finding relevant job matches.
                You can update or delete your information at any time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Alternative Options */}
      <div className="text-center">
        <p className="text-sm text-slate-500 mb-4">
          Don't have LinkedIn or prefer manual input?
        </p>
        <button
          onClick={() => window.location.reload()}
          className="text-indigo-400 hover:text-indigo-300 font-medium text-sm transition-colors"
        >
          Switch to manual profile input
        </button>
      </div>
    </div>
  )
}