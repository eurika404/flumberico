"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  Briefcase,
  Eye,
  Bookmark,
  CheckCircle,
  Calendar,
  Target,
  Zap,
  BarChart3
} from 'lucide-react'
import { Card } from '@/components/ui/card'

interface UserStatsProps {
  userId: string
}

interface Stats {
  totalMatches: number
  viewedJobs: number
  savedJobs: number
  appliedJobs: number
  weeklyActivity: Array<{ day: string; count: number }>
  topSkills: Array<{ skill: string; count: number }>
  applicationRate: number
  averageMatchScore: number
}

export function UserStats({ userId }: UserStatsProps) {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [userId])

  const fetchStats = async () => {
    try {
      const response = await fetch(`/api/dashboard/stats?userId=${userId}`)
      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-slate-800/50 border-slate-700 p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-slate-700 rounded w-1/2"></div>
              <div className="h-12 bg-slate-700 rounded w-3/4"></div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">No statistics available</p>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Matches',
      value: stats.totalMatches,
      icon: Target,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-600/10',
      trend: 'up',
      trendValue: '+12%'
    },
    {
      title: 'Jobs Viewed',
      value: stats.viewedJobs,
      icon: Eye,
      color: 'text-blue-400',
      bgColor: 'bg-blue-600/10',
      trend: 'up',
      trendValue: '+8%'
    },
    {
      title: 'Jobs Saved',
      value: stats.savedJobs,
      icon: Bookmark,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-600/10',
      trend: 'up',
      trendValue: '+5%'
    },
    {
      title: 'Applications',
      value: stats.appliedJobs,
      icon: CheckCircle,
      color: 'text-green-400',
      bgColor: 'bg-green-600/10',
      trend: 'up',
      trendValue: '+15%'
    }
  ]

  const applicationRate = stats.totalMatches > 0
    ? Math.round((stats.appliedJobs / stats.totalMatches) * 100)
    : 0

  return (
    <div className="space-y-8">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon
          const TrendIcon = card.trend === 'up' ? TrendingUp : TrendingDown

          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-slate-800/50 border-slate-700 p-6 hover:border-slate-600 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${card.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    card.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <TrendIcon className="w-4 h-4" />
                    <span>{card.trendValue}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-2xl font-bold text-white">
                    {card.value.toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-400">
                    {card.title}
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Application Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Application Rate</h3>
              <Zap className="w-5 h-5 text-indigo-400" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-white">{applicationRate}%</span>
                <span className="text-sm text-slate-400">
                  {stats.appliedJobs} of {stats.totalMatches} jobs
                </span>
              </div>

              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${applicationRate}%` }}
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Average Match Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Avg Match Score</h3>
              <BarChart3 className="w-5 h-5 text-blue-400" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-white">
                  {Math.round(stats.averageMatchScore)}%
                </span>
                <span className="text-sm text-green-400">+5%</span>
              </div>

              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${stats.averageMatchScore}%` }}
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Weekly Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Weekly Activity</h3>
              <Calendar className="w-5 h-5 text-green-400" />
            </div>

            <div className="space-y-3">
              {stats.weeklyActivity.slice(0, 5).map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">{day.day}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(day.count * 20, 100)}%` }}
                      />
                    </div>
                    <span className="text-sm text-white w-4 text-right">{day.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Top Skills (if available) */}
      {stats.topSkills && stats.topSkills.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Your Most Matched Skills</h3>
              <Briefcase className="w-5 h-5 text-purple-400" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.topSkills.slice(0, 6).map((skill, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                  <span className="text-white font-medium">{skill.skill}</span>
                  <span className="text-indigo-400 text-sm">{skill.count} matches</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  )
}