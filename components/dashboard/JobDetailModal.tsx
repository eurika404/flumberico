"use client"

import { motion } from 'framer-motion'
import {
  X,
  ExternalLink,
  Bookmark,
  MapPin,
  DollarSign,
  Clock,
  Building,
  Calendar,
  Share2,
  Briefcase,
  Star,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface JobDetailModalProps {
  job: any
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  onApply: () => void
}

export function JobDetailModal({ job, isOpen, onClose, onSave, onApply }: JobDetailModalProps) {
  if (!isOpen) return null

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400'
    if (score >= 75) return 'text-blue-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-slate-400'
  }

  const getMatchScoreBackground = (score: number) => {
    if (score >= 90) return 'bg-green-900/20 border-green-800'
    if (score >= 75) return 'bg-blue-900/20 border-blue-800'
    if (score >= 60) return 'bg-yellow-900/20 border-yellow-800'
    return 'bg-slate-900/20 border-slate-800'
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: job.jobTitle,
          text: `Check out this ${job.jobTitle} position at ${job.companyName}`,
          url: window.location.href
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(job.url)
      alert('Job link copied to clipboard!')
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* Match Score */}
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border mb-4 ${getMatchScoreBackground(job.matchScore)}`}>
                  <Star className="w-3 h-3" />
                  <span className={getMatchScoreColor(job.matchScore)}>
                    {job.matchScore}% Match
                  </span>
                </div>

                {/* Job Title */}
                <h1 className="text-2xl font-bold text-white mb-2">
                  {job.jobTitle}
                </h1>

                {/* Company Info */}
                <div className="flex flex-wrap items-center gap-4 text-slate-400">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    <span>{job.companyName}</span>
                  </div>

                  {job.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                  )}

                  {job.salary && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Posted {new Date(job.scrapedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {/* AI Relevance Reason */}
            <div className="mb-8 p-6 bg-gradient-to-r from-indigo-600/20 to-cyan-600/20 rounded-xl border border-indigo-600/30">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Why this job matches you
                  </h3>
                  <p className="text-slate-300 italic">
                    "{job.relevanceReason}"
                  </p>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">
                Job Description
              </h2>
              <div className="prose prose-invert max-w-none">
                <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {job.description}
                </div>
              </div>
            </div>

            {/* Job Requirements (if available) */}
            {job.requirements && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Requirements
                </h2>
                <ul className="list-disc list-inside text-slate-300 space-y-2">
                  {job.requirements.map((req: string, index: number) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits (if available) */}
            {job.benefits && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Benefits
                </h2>
                <div className="flex flex-wrap gap-2">
                  {job.benefits.map((benefit: string, index: number) => (
                    <Badge key={index} variant="secondary" className="bg-slate-700 text-slate-300">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Source Information */}
            <div className="p-4 bg-slate-900/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-400">
                  Source: <span className="text-white">{job.source}</span>
                </div>
                <div className="text-sm text-slate-400">
                  Job ID: <span className="text-white">{job.id}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="sticky bottom-0 bg-slate-800 border-t border-slate-700 p-6">
            <div className="flex gap-4">
              {/* Primary Action - Apply */}
              <Button
                size="lg"
                onClick={onApply}
                disabled={job.isApplied}
                className={`flex-1 ${job.isApplied ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
              >
                {job.isApplied ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Applied
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Apply Now
                  </>
                )}
              </Button>

              {/* Save Job */}
              <Button
                size="lg"
                variant="outline"
                onClick={onSave}
                className={job.isSaved ? 'text-yellow-400 border-yellow-600' : ''}
              >
                <Bookmark className={`w-5 h-5 ${job.isSaved ? 'fill-current' : ''}`} />
              </Button>

              {/* Share */}
              <Button
                size="lg"
                variant="outline"
                onClick={handleShare}
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Application Note */}
            {job.isApplied && (
              <div className="mt-4 p-4 bg-green-900/20 border border-green-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-green-400 font-medium">Application Submitted!</p>
                    <p className="text-slate-400 text-sm">
                      You can track your application status in your dashboard.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}