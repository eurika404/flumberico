"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  ExternalLink,
  Bookmark,
  Eye,
  CheckCircle,
  Star,
  TrendingUp,
  Calendar,
  Building,
  Heart,
  Share2,
  Filter,
  Grid,
  List
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { JobDetailModal } from './JobDetailModal'

interface JobRecommendationsProps {
  userId: string
  filter: 'all' | 'viewed' | 'saved' | 'applied'
}

interface JobMatch {
  id: string
  jobTitle: string
  companyName: string
  location: string
  salary?: string
  type?: string
  description: string
  url: string
  source: string
  matchScore: number
  relevanceReason: string
  scrapedAt: string
  isViewed: boolean
  isSaved: boolean
  isApplied: boolean
}

export function JobRecommendations({ userId, filter }: JobRecommendationsProps) {
  const [jobs, setJobs] = useState<JobMatch[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedJob, setSelectedJob] = useState<JobMatch | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'score' | 'date' | 'company'>('score')
  const [updatingJobs, setUpdatingJobs] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchJobs()
  }, [userId, filter, sortBy])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      setError(null)

      const filterParams = new URLSearchParams({
        limit: '50',
        ...(filter === 'viewed' && { viewedOnly: 'true' }),
        ...(filter === 'saved' && { savedOnly: 'true' }),
        ...(filter === 'applied' && { appliedOnly: 'true' })
      })

      const response = await fetch(`/api/matching/user-matches?${filterParams}`)
      if (!response.ok) throw new Error('Failed to fetch jobs')

      const data = await response.json()
      let jobList = data.matches || []

      // Sort jobs
      jobList = sortJobs(jobList, sortBy)

      setJobs(jobList)
    } catch (err) {
      console.error('Error fetching jobs:', err)
      setError('Failed to load job recommendations')
    } finally {
      setLoading(false)
    }
  }

  const sortJobs = (jobList: JobMatch[], method: string) => {
    const sorted = [...jobList]
    switch (method) {
      case 'score':
        return sorted.sort((a, b) => b.matchScore - a.matchScore)
      case 'date':
        return sorted.sort((a, b) => new Date(b.scrapedAt).getTime() - new Date(a.scrapedAt).getTime())
      case 'company':
        return sorted.sort((a, b) => a.companyName.localeCompare(b.companyName))
      default:
        return sorted
    }
  }

  const updateJobStatus = async (jobId: string, updates: any) => {
    try {
      setUpdatingJobs(prev => new Set(prev).add(jobId))

      const response = await fetch('/api/matching/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          matchId: jobId,
          updates
        })
      })

      if (!response.ok) throw new Error('Failed to update job status')

      // Update local state
      setJobs(prev => prev.map(job =>
        job.id === jobId ? { ...job, ...updates } : job
      ))

    } catch (error) {
      console.error('Error updating job status:', error)
    } finally {
      setUpdatingJobs(prev => {
        const newSet = new Set(prev)
        newSet.delete(jobId)
        return newSet
      })
    }
  }

  const handleViewJob = (job: JobMatch) => {
    if (!job.isViewed) {
      updateJobStatus(job.id, { isViewed: true })
    }
    setSelectedJob(job)
    setShowModal(true)
  }

  const handleSaveJob = (job: JobMatch) => {
    updateJobStatus(job.id, { isSaved: !job.isSaved })
  }

  const handleApplyJob = (job: JobMatch) => {
    // Open job application URL in new tab
    window.open(job.url, '_blank')
    if (!job.isApplied) {
      updateJobStatus(job.id, { isApplied: true })
    }
  }

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="bg-slate-800/50 border-slate-700 p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-slate-700 rounded w-3/4"></div>
              <div className="h-3 bg-slate-700 rounded w-1/2"></div>
              <div className="space-y-2">
                <div className="h-3 bg-slate-700 rounded"></div>
                <div className="h-3 bg-slate-700 rounded w-5/6"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-slate-400 mb-4">{error}</div>
        <Button onClick={fetchJobs} variant="outline">
          Try Again
        </Button>
      </div>
    )
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <Briefcase className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">
          {filter === 'all' ? 'No job matches yet' : `No ${filter} jobs`}
        </h3>
        <p className="text-slate-400 mb-6">
          {filter === 'all'
            ? 'We\'re still finding the perfect matches for you. Check back soon!'
            : `You haven't ${filter} any jobs yet.`
          }
        </p>
        {filter !== 'all' && (
          <Button onClick={() => window.location.reload()} variant="outline">
            View All Recommendations
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-slate-400">
            {jobs.length} jobs found
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-indigo-500"
          >
            <option value="score">Sort by Match Score</option>
            <option value="date">Sort by Date</option>
            <option value="company">Sort by Company</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Job Cards */}
      <div className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
      }>
        {jobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className={`bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-200 ${
              viewMode === 'list' ? 'p-6' : 'p-6'
            }`}>
              {/* Match Score Badge */}
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border mb-4 ${getMatchScoreBackground(job.matchScore)}`}>
                <Star className="w-3 h-3" />
                <span className={getMatchScoreColor(job.matchScore)}>
                  {job.matchScore}% Match
                </span>
              </div>

              {/* Job Header */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-white mb-2 line-clamp-1">
                  {job.jobTitle}
                </h3>
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                  <Building className="w-4 h-4" />
                  <span>{job.companyName}</span>
                </div>

                {job.location && (
                  <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                )}

                {job.salary && (
                  <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                    <DollarSign className="w-4 h-4" />
                    <span>{job.salary}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-slate-500 text-xs">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(job.scrapedAt)}</span>
                  {job.isViewed && <Eye className="w-3 h-3 ml-auto" />}
                  {job.isSaved && <Bookmark className="w-3 h-3 ml-auto text-yellow-400" />}
                  {job.isApplied && <CheckCircle className="w-3 h-3 ml-auto text-green-400" />}
                </div>
              </div>

              {/* Relevance Reason */}
              <div className="mb-4 p-3 bg-slate-900/50 rounded-lg">
                <p className="text-sm text-slate-300 italic">
                  "{job.relevanceReason}"
                </p>
              </div>

              {/* Description Preview */}
              <div className="mb-6">
                <p className="text-slate-400 text-sm line-clamp-3">
                  {job.description}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleViewJob(job)}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                >
                  View Details
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleSaveJob(job)}
                  disabled={updatingJobs.has(job.id)}
                  className={job.isSaved ? 'text-yellow-400 border-yellow-600' : ''}
                >
                  <Bookmark className={`w-4 h-4 ${job.isSaved ? 'fill-current' : ''}`} />
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleApplyJob(job)}
                  disabled={job.isApplied || updatingJobs.has(job.id)}
                  className={job.isApplied ? 'text-green-400 border-green-600' : ''}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={() => handleSaveJob(selectedJob)}
          onApply={() => handleApplyJob(selectedJob)}
        />
      )}
    </div>
  )
}