"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Settings,
  MapPin,
  DollarSign,
  Briefcase,
  Home,
  Plus,
  X,
  Save,
  RotateCcw,
  Bell,
  Shield
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface UserPreferencesProps {
  userId: string
}

interface Preferences {
  jobRoles: string[]
  locations: string[]
  minSalary: number
  isRemote: boolean
  notifications: {
    newMatches: boolean
    applicationReminders: boolean
    weeklyDigest: boolean
  }
}

export function UserPreferences({ userId }: UserPreferencesProps) {
  const [preferences, setPreferences] = useState<Preferences>({
    jobRoles: [],
    locations: [],
    minSalary: 50000,
    isRemote: false,
    notifications: {
      newMatches: true,
      applicationReminders: true,
      weeklyDigest: false
    }
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [newJobRole, setNewJobRole] = useState('')
  const [newLocation, setNewLocation] = useState('')

  useEffect(() => {
    fetchPreferences()
  }, [userId])

  const fetchPreferences = async () => {
    try {
      const response = await fetch(`/api/user/preferences?userId=${userId}`)
      if (response.ok) {
        const data = await response.json()
        setPreferences(data.preferences)
      }
    } catch (error) {
      console.error('Error fetching preferences:', error)
    } finally {
      setLoading(false)
    }
  }

  const savePreferences = async () => {
    try {
      setSaving(true)
      const response = await fetch('/api/user/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          preferences
        })
      })

      if (!response.ok) throw new Error('Failed to save preferences')

    } catch (error) {
      console.error('Error saving preferences:', error)
    } finally {
      setSaving(false)
    }
  }

  const addJobRole = () => {
    if (newJobRole.trim() && !preferences.jobRoles.includes(newJobRole.trim())) {
      setPreferences({
        ...preferences,
        jobRoles: [...preferences.jobRoles, newJobRole.trim()]
      })
      setNewJobRole('')
    }
  }

  const removeJobRole = (role: string) => {
    setPreferences({
      ...preferences,
      jobRoles: preferences.jobRoles.filter(r => r !== role)
    })
  }

  const addLocation = () => {
    if (newLocation.trim() && !preferences.locations.includes(newLocation.trim())) {
      setPreferences({
        ...preferences,
        locations: [...preferences.locations, newLocation.trim()]
      })
      setNewLocation('')
    }
  }

  const removeLocation = (location: string) => {
    setPreferences({
      ...preferences,
      locations: preferences.locations.filter(l => l !== location)
    })
  }

  const resetPreferences = () => {
    setPreferences({
      jobRoles: [],
      locations: [],
      minSalary: 50000,
      isRemote: false,
      notifications: {
        newMatches: true,
        applicationReminders: true,
        weeklyDigest: false
      }
    })
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="bg-slate-800/50 border-slate-700 p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-slate-700 rounded w-1/3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-700 rounded w-5/6"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Job Preferences</h2>
          <p className="text-slate-400">
            Manage your job search preferences to get better matches
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={resetPreferences}
            className="text-slate-400 hover:text-white"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>

          <Button
            onClick={savePreferences}
            disabled={saving}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            {saving ? (
              'Saving...'
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Job Roles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-semibold text-white">Desired Job Roles</h3>
          </div>

          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Add a job role (e.g., Senior Software Engineer)"
                value={newJobRole}
                onChange={(e) => setNewJobRole(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addJobRole()}
                className="flex-1 bg-slate-900 border-slate-600 text-white placeholder-slate-400"
              />
              <Button
                onClick={addJobRole}
                disabled={!newJobRole.trim()}
                variant="outline"
                className="text-slate-400 hover:text-white"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {preferences.jobRoles.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {preferences.jobRoles.map((role, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-indigo-600/20 text-indigo-300 border-indigo-600/30 px-3 py-1"
                  >
                    {role}
                    <button
                      onClick={() => removeJobRole(role)}
                      className="ml-2 hover:text-indigo-100"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Locations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-semibold text-white">Preferred Locations</h3>
          </div>

          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Add a location (e.g., San Francisco, CA)"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addLocation()}
                className="flex-1 bg-slate-900 border-slate-600 text-white placeholder-slate-400"
              />
              <Button
                onClick={addLocation}
                disabled={!newLocation.trim()}
                variant="outline"
                className="text-slate-400 hover:text-white"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {preferences.locations.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {preferences.locations.map((location, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-indigo-600/20 text-indigo-300 border-indigo-600/30 px-3 py-1"
                  >
                    {location}
                    <button
                      onClick={() => removeLocation(location)}
                      className="ml-2 hover:text-indigo-100"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Salary and Remote Work */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Minimum Salary */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-semibold text-white">Minimum Salary</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">$</span>
                  <Input
                    type="number"
                    value={preferences.minSalary}
                    onChange={(e) => setPreferences({
                      ...preferences,
                      minSalary: parseInt(e.target.value) || 0
                    })}
                    className="flex-1 bg-slate-900 border-slate-600 text-white"
                  />
                  <span className="text-slate-400">/year</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {['50000', '75000', '100000', '150000'].map((salary) => (
                    <Button
                      key={salary}
                      variant="outline"
                      size="sm"
                      onClick={() => setPreferences({
                        ...preferences,
                        minSalary: parseInt(salary)
                      })}
                      className={`text-slate-400 hover:text-white ${
                        preferences.minSalary === parseInt(salary)
                          ? 'bg-indigo-600/20 border-indigo-600 text-indigo-400'
                          : ''
                      }`}
                    >
                      ${parseInt(salary).toLocaleString()}+
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Remote Work */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Home className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-semibold text-white">Remote Work</h3>
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-600 cursor-pointer hover:bg-slate-900/70">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={preferences.isRemote}
                      onChange={(e) => setPreferences({
                        ...preferences,
                        isRemote: e.target.checked
                      })}
                      className="w-5 h-5 text-indigo-600 bg-slate-800 border-slate-600 rounded focus:ring-indigo-500"
                    />
                    <div>
                      <p className="font-medium text-white">Open to remote work</p>
                      <p className="text-sm text-slate-400">Include remote opportunities</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-slate-800/50 border-slate-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-semibold text-white">Notification Preferences</h3>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-600 cursor-pointer hover:bg-slate-900/70">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={preferences.notifications.newMatches}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    notifications: {
                      ...preferences.notifications,
                      newMatches: e.target.checked
                    }
                  })}
                  className="w-5 h-5 text-indigo-600 bg-slate-800 border-slate-600 rounded focus:ring-indigo-500"
                />
                <div>
                  <p className="font-medium text-white">New Job Matches</p>
                  <p className="text-sm text-slate-400">Get notified about new matching jobs</p>
                </div>
              </div>
            </label>

            <label className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-600 cursor-pointer hover:bg-slate-900/70">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={preferences.notifications.applicationReminders}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    notifications: {
                      ...preferences.notifications,
                      applicationReminders: e.target.checked
                    }
                  })}
                  className="w-5 h-5 text-indigo-600 bg-slate-800 border-slate-600 rounded focus:ring-indigo-500"
                />
                <div>
                  <p className="font-medium text-white">Application Reminders</p>
                  <p className="text-sm text-slate-400">Remind me to follow up on applications</p>
                </div>
              </div>
            </label>

            <label className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-600 cursor-pointer hover:bg-slate-900/70">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={preferences.notifications.weeklyDigest}
                  onChange={(e) => setPreferences({
                    ...preferences,
                    notifications: {
                      ...preferences.notifications,
                      weeklyDigest: e.target.checked
                    }
                  })}
                  className="w-5 h-5 text-indigo-600 bg-slate-800 border-slate-600 rounded focus:ring-indigo-500"
                />
                <div>
                  <p className="font-medium text-white">Weekly Digest</p>
                  <p className="text-sm text-slate-400">Weekly summary of job matches</p>
                </div>
              </div>
            </label>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}