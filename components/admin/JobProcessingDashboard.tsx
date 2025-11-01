"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, RefreshCw, AlertCircle, CheckCircle, Clock, BarChart3, Database, Settings } from 'lucide-react'

interface ScrapeLog {
  log_id: string
  source: string
  status: 'running' | 'completed' | 'failed'
  start_time: string
  end_time: string | null
  jobs_processed: number
  error_message?: string
}

interface ProcessingStats {
  totalJobs: number
  activeJobs: number
  recentScrapes: number
  lastScrapeTime: string | null
}

export function JobProcessingDashboard() {
  const [logs, setLogs] = useState<ScrapeLog[]>([])
  const [stats, setStats] = useState<ProcessingStats>({
    totalJobs: 0,
    activeJobs: 0,
    recentScrapes: 0,
    lastScrapeTime: null
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchLogs()
    fetchStats()
  }, [])

  const fetchLogs = async () => {
    try {
      const response = await fetch('/api/admin/process-jobs')
      if (!response.ok) throw new Error('Failed to fetch logs')

      const data = await response.json()
      setLogs(data.logs || [])
    } catch (err) {
      console.error('Error fetching logs:', err)
      setError('Failed to fetch logs')
    }
  }

  const fetchStats = async () => {
    try {
      // Fetch job statistics
      const jobsResponse = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/job_posts?select=count`, {
        headers: {
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          'Content-Type': 'application/json'
        }
      })

      const activeJobsResponse = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/job_posts?select=count&status=eq.active`, {
        headers: {
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          'Content-Type': 'application/json'
        }
      })

      if (jobsResponse.ok && activeJobsResponse.ok) {
        const jobsData = await jobsResponse.json()
        const activeJobsData = await activeJobsResponse.json()

        setStats(prev => ({
          ...prev,
          totalJobs: jobsData[0]?.count || 0,
          activeJobs: activeJobsData[0]?.count || 0
        }))
      }

    } catch (err) {
      console.error('Error fetching stats:', err)
    } finally {
      setLoading(false)
    }
  }

  const startJobProcessing = async () => {
    setIsProcessing(true)
    setError(null)

    try {
      const response = await fetch('/api/admin/process-jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })

      if (!response.ok) throw new Error('Failed to start job processing')

      const result = await response.json()

      // Refresh logs and stats
      await fetchLogs()
      await fetchStats()

      console.log('Job processing completed:', result)

    } catch (err) {
      console.error('Error starting job processing:', err)
      setError('Failed to process jobs')
    } finally {
      setIsProcessing(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-400" />
      default:
        return <Clock className="w-4 h-4 text-slate-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-blue-900/20 text-blue-400 border-blue-800'
      case 'completed':
        return 'bg-green-900/20 text-green-400 border-green-800'
      case 'failed':
        return 'bg-red-900/20 text-red-400 border-red-800'
      default:
        return 'bg-slate-900/20 text-slate-400 border-slate-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const calculateDuration = (startTime: string, endTime: string | null) => {
    if (!endTime) return 'Running...'

    const start = new Date(startTime)
    const end = new Date(endTime)
    const duration = Math.round((end.getTime() - start.getTime()) / 1000) // seconds

    if (duration < 60) return `${duration}s`
    if (duration < 3600) return `${Math.round(duration / 60)}m`
    return `${Math.round(duration / 3600)}h`
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Job Processing Dashboard</h1>
            <p className="text-slate-400 mt-2">Monitor and manage automated job scraping and processing</p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>

            <button
              onClick={startJobProcessing}
              disabled={isProcessing}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${
                isProcessing
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Start Job Processing
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-900/20 border border-red-700 rounded-lg p-4 flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-400">{error}</p>
          </motion.div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800/50 rounded-xl p-6 border border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <Database className="w-8 h-8 text-indigo-400" />
              <span className="text-2xl font-bold text-white">{stats.totalJobs.toLocaleString()}</span>
            </div>
            <p className="text-slate-400">Total Jobs</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/50 rounded-xl p-6 border border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <span className="text-2xl font-bold text-white">{stats.activeJobs.toLocaleString()}</span>
            </div>
            <p className="text-slate-400">Active Jobs</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800/50 rounded-xl p-6 border border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">{logs.length}</span>
            </div>
            <p className="text-slate-400">Recent Scrapes</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-slate-800/50 rounded-xl p-6 border border-slate-700"
          >
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-purple-400" />
              <span className="text-sm font-medium text-white">
                {logs[0]?.start_time ? formatDate(logs[0].start_time) : 'Never'}
              </span>
            </div>
            <p className="text-slate-400">Last Scrape</p>
          </motion.div>
        </div>

        {/* Processing Logs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-800/50 rounded-xl border border-slate-700"
        >
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-xl font-semibold text-white flex items-center gap-3">
              <Settings className="w-5 h-5 text-indigo-400" />
              Processing Logs
            </h2>
          </div>

          <div className="overflow-x-auto">
            {logs.length > 0 ? (
              <table className="w-full">
                <thead className="bg-slate-900/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Start Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Jobs Processed
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Error
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {logs.map((log, index) => (
                    <motion.tr
                      key={log.log_id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-slate-700/30 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(log.status)}`}>
                          {getStatusIcon(log.status)}
                          {log.status}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                        {log.source}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                        {formatDate(log.start_time)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                        {calculateDuration(log.start_time, log.end_time)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-white">
                          {log.jobs_processed.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {log.error_message ? (
                          <span className="text-red-400">{log.error_message}</span>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-12 text-center">
                <BarChart3 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">No processing logs found</p>
                <p className="text-sm text-slate-500 mt-2">
                  Start a job processing task to see logs here
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}