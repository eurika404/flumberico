import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, X, Check, AlertCircle, Loader2, ArrowRight } from 'lucide-react'

interface CVUploadStepProps {
  file: File | null
  onFileSelect: (file: File | null) => void
  onNext: () => void
}

export function CVUploadStep({ file, onFileSelect, onNext }: CVUploadStepProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [parsedData, setParsedData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0]
    if (!uploadedFile) return

    // Validate file type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword']
    if (!validTypes.includes(uploadedFile.type)) {
      setError('Please upload a PDF or Word document')
      return
    }

    // Validate file size (10MB max)
    if (uploadedFile.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB')
      return
    }

    setError(null)
    onFileSelect(uploadedFile)
    setUploadStatus('uploading')
    setIsUploading(true)

    try {
      // Create form data for file upload
      const formData = new FormData()
      formData.append('file', uploadedFile)

      // Upload and parse CV
      const response = await fetch('/api/onboarding/parse-cv', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Failed to parse CV')
      }

      const result = await response.json()
      setParsedData(result.data)
      setUploadStatus('success')
    } catch (err) {
      console.error('Error parsing CV:', err)
      setError('Failed to parse CV. Please try again or use manual input.')
      setUploadStatus('error')
    } finally {
      setIsUploading(false)
    }
  }, [onFileSelect])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc']
    },
    maxFiles: 1,
    disabled: isUploading
  })

  const removeFile = () => {
    onFileSelect(null)
    setParsedData(null)
    setUploadStatus('idle')
    setError(null)
  }

  const handleNext = () => {
    if (parsedData) {
      onNext()
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Upload Your CV
        </h2>
        <p className="text-slate-400 text-lg">
          Let AI extract your skills and experience from your resume
        </p>
      </div>

      {/* Upload Area */}
      <div className="max-w-2xl mx-auto">
        {!file ? (
          <motion.div
            {...getRootProps()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
              isDragActive
                ? 'border-indigo-600 bg-indigo-600/10'
                : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
            }`}
          >
            <input {...getInputProps()} />

            <div className="space-y-4">
              <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mx-auto">
                <Upload className="w-10 h-10 text-slate-400" />
              </div>

              <div>
                <p className="text-xl font-medium text-white mb-2">
                  {isDragActive ? 'Drop your CV here' : 'Click to upload or drag and drop'}
                </p>
                <p className="text-slate-400">
                  PDF or Word documents (MAX. 10MB)
                </p>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                  PDF
                </span>
                <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                  DOCX
                </span>
                <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm">
                  DOC
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 rounded-xl p-6 border border-slate-700"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {file.name}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                  <button
                    onClick={removeFile}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                    disabled={isUploading}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Upload Status */}
                <AnimatePresence mode="wait">
                  {isUploading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 py-3"
                    >
                      <Loader2 className="w-5 h-5 animate-spin text-indigo-400" />
                      <span className="text-slate-300">Parsing your CV with AI...</span>
                    </motion.div>
                  )}

                  {uploadStatus === 'success' && parsedData && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-2 py-3">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-green-400 font-medium">CV parsed successfully!</span>
                      </div>

                      {/* Parsed Data Preview */}
                      <div className="bg-slate-900/50 rounded-lg p-4 space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-slate-400 mb-2">Extracted Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {parsedData.skills?.slice(0, 8).map((skill: string, index: number) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-indigo-600/20 text-indigo-400 rounded-full text-sm"
                              >
                                {skill}
                              </span>
                            ))}
                            {parsedData.skills?.length > 8 && (
                              <span className="px-3 py-1 bg-slate-700 text-slate-400 rounded-full text-sm">
                                +{parsedData.skills.length - 8} more
                              </span>
                            )}
                          </div>
                        </div>

                        {parsedData.experience && parsedData.experience.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-slate-400 mb-2">Experience</h4>
                            <div className="space-y-2">
                              {parsedData.experience.slice(0, 2).map((exp: any, index: number) => (
                                <div key={index} className="text-sm text-slate-300">
                                  <span className="font-medium">{exp.title}</span> at {exp.company}
                                </div>
                              ))}
                              {parsedData.experience.length > 2 && (
                                <div className="text-sm text-slate-500">
                                  +{parsedData.experience.length - 2} more positions
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {uploadStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 py-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <div>
                        <p className="text-red-400 font-medium">Failed to parse CV</p>
                        <p className="text-sm text-slate-400">{error || 'Please try again or use manual input'}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center">
        {uploadStatus === 'success' && parsedData && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Continue to Preferences
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        )}

        {uploadStatus === 'error' && (
          <div className="space-y-4 text-center">
            <p className="text-slate-400">
              Having trouble? You can try uploading again or use manual input instead.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={removeFile}
                className="px-6 py-3 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Use Manual Input
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Help Text */}
      <div className="text-center">
        <p className="text-sm text-slate-500">
          Your CV is processed securely and deleted after parsing. We only extract the relevant information for job matching.
        </p>
      </div>
    </div>
  )
}