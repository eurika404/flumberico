"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  Filter,
  Bell,
  Settings,
  User,
  Briefcase,
  BookOpen,
  BarChart3,
  Menu,
  X,
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle,
  Eye,
  Bookmark
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { JobRecommendations } from './JobRecommendations'
import { UserStats } from './UserStats'
import { UserPreferences } from './UserPreferences'
import { SearchAndFilter } from './SearchAndFilter'

interface DashboardLayoutProps {
  userId: string
}

export function DashboardLayout({ userId }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('recommendations')
  const [stats, setStats] = useState({
    totalMatches: 0,
    viewedJobs: 0,
    savedJobs: 0,
    appliedJobs: 0
  })

  useEffect(() => {
    fetchUserStats()
  }, [userId])

  const fetchUserStats = async () => {
    try {
      const response = await fetch(`/api/matching/user-stats?userId=${userId}`)
      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Error fetching user stats:', error)
    }
  }

  const navigation = [
    { name: 'Recommendations', icon: Sparkles, id: 'recommendations' },
    { name: 'Viewed', icon: Eye, id: 'viewed' },
    { name: 'Saved', icon: Bookmark, id: 'saved' },
    { name: 'Applied', icon: CheckCircle, id: 'applied' },
    { name: 'Analytics', icon: BarChart3, id: 'analytics' },
    { name: 'Preferences', icon: Settings, id: 'preferences' },
  ]

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 z-50 w-64 h-full bg-slate-800 border-r border-slate-700
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-0
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 p-6 border-b border-slate-700">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AutoJobMatch</h1>
              <p className="text-xs text-slate-400">AI-Powered Job Search</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id)
                      setSidebarOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      isActive
                        ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-600/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                    {item.id === 'recommendations' && stats.totalMatches > 0 && (
                      <span className="ml-auto bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                        {stats.totalMatches}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-slate-700">
            <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
              <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-slate-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Your Profile</p>
                <p className="text-xs text-slate-400">Manage settings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-slate-800/95 backdrop-blur-sm border-b border-slate-700">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-slate-400 hover:text-white"
              >
                <Menu className="w-6 h-6" />
              </button>

              {/* Search bar */}
              <div className="flex-1 max-w-2xl mx-4">
                <SearchAndFilter onSearch={(query) => console.log('Search:', query)} />
              </div>

              {/* Right side actions */}
              <div className="flex items-center gap-4">
                <button className="p-2 text-slate-400 hover:text-white relative">
                  <Bell className="w-5 h-5" />
                  {stats.totalMatches > 0 && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-600 rounded-full" />
                  )}
                </button>
                <button className="p-2 text-slate-400 hover:text-white">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Welcome section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-white mb-2">
              Welcome back! 👋
            </h2>
            <p className="text-slate-400">
              Here are your personalized job recommendations based on your profile and preferences.
            </p>
          </motion.div>

          {/* Stats overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <Sparkles className="w-8 h-8 text-indigo-400" />
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white">{stats.totalMatches}</div>
              <div className="text-sm text-slate-400">Total Matches</div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <Eye className="w-8 h-8 text-blue-400" />
                <Clock className="w-4 h-4 text-slate-400" />
              </div>
              <div className="text-2xl font-bold text-white">{stats.viewedJobs}</div>
              <div className="text-sm text-slate-400">Jobs Viewed</div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <Bookmark className="w-8 h-8 text-yellow-400" />
                <span className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full">New</span>
              </div>
              <div className="text-2xl font-bold text-white">{stats.savedJobs}</div>
              <div className="text-sm text-slate-400">Jobs Saved</div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
                <span className="text-xs bg-green-400/20 text-green-400 px-2 py-1 rounded-full">Active</span>
              </div>
              <div className="text-2xl font-bold text-white">{stats.appliedJobs}</div>
              <div className="text-sm text-slate-400">Applications</div>
            </div>
          </motion.div>

          {/* Tab content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
                <TabsTrigger value="recommendations">For You</TabsTrigger>
                <TabsTrigger value="viewed">Viewed</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
                <TabsTrigger value="applied">Applied</TabsTrigger>
              </TabsList>

              <TabsContent value="recommendations" className="space-y-6">
                <JobRecommendations userId={userId} filter="all" />
              </TabsContent>

              <TabsContent value="viewed" className="space-y-6">
                <JobRecommendations userId={userId} filter="viewed" />
              </TabsContent>

              <TabsContent value="saved" className="space-y-6">
                <JobRecommendations userId={userId} filter="saved" />
              </TabsContent>

              <TabsContent value="applied" className="space-y-6">
                <JobRecommendations userId={userId} filter="applied" />
              </TabsContent>
            </Tabs>
          </motion.div>
        </main>
      </div>
    </div>
  )
}