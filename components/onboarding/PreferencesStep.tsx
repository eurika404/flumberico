import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, DollarSign, Briefcase, Home, Plus, X, ArrowRight } from 'lucide-react'

interface PreferencesStepProps {
  preferences: {
    jobRoles: string[]
    locations: string[]
    minSalary: number
    isRemote: boolean
  }
  onPreferencesChange: (preferences: any) => void
  onNext: () => void
}

export function PreferencesStep({
  preferences,
  onPreferencesChange,
  onNext
}: PreferencesStepProps) {
  const [newJobRole, setNewJobRole] = useState('')
  const [newLocation, setNewLocation] = useState('')

  const commonJobRoles = [
    'Software Engineer', 'Product Manager', 'UX Designer', 'Data Scientist',
    'Marketing Manager', 'Sales Representative', 'Project Manager', 'Business Analyst',
    'DevOps Engineer', 'Full Stack Developer', 'Frontend Developer', 'Backend Developer'
  ]

  const commonLocations = [
    'New York, NY', 'San Francisco, CA', 'Austin, TX', 'Seattle, WA',
    'Boston, MA', 'Los Angeles, CA', 'Chicago, IL', 'Remote', 'Denver, CO'
  ]

  const salaryRanges = [
    { label: 'Under $50k', value: 0 },
    { label: '$50k - $75k', value: 50000 },
    { label: '$75k - $100k', value: 75000 },
    { label: '$100k - $150k', value: 100000 },
    { label: '$150k - $200k', value: 150000 },
    { label: 'Over $200k', value: 200000 }
  ]

  const addJobRole = (role: string) => {
    if (role.trim() && !preferences.jobRoles.includes(role.trim())) {
      onPreferencesChange({
        ...preferences,
        jobRoles: [...preferences.jobRoles, role.trim()]
      })
    }
  }

  const removeJobRole = (roleToRemove: string) => {
    onPreferencesChange({
      ...preferences,
      jobRoles: preferences.jobRoles.filter(role => role !== roleToRemove)
    })
  }

  const addLocation = (location: string) => {
    if (location.trim() && !preferences.locations.includes(location.trim())) {
      onPreferencesChange({
        ...preferences,
        locations: [...preferences.locations, location.trim()]
      })
    }
  }

  const removeLocation = (locationToRemove: string) => {
    onPreferencesChange({
      ...preferences,
      locations: preferences.locations.filter(location => location !== locationToRemove)
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent, field: 'jobRole' | 'location') => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (field === 'jobRole') {
        addJobRole(newJobRole)
        setNewJobRole('')
      } else {
        addLocation(newLocation)
        setNewLocation('')
      }
    }
  }

  const canProceed = preferences.jobRoles.length > 0 && preferences.locations.length > 0

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Set Your Job Preferences
        </h2>
        <p className="text-slate-400 text-lg">
          Help us find the most relevant job opportunities for you
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Job Roles */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="w-6 h-6 text-indigo-400" />
            <h3 className="text-xl font-semibold text-white">Desired Job Roles</h3>
          </div>

          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newJobRole}
                onChange={(e) => setNewJobRole(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, 'jobRole')}
                placeholder="Add a job role (e.g., Senior Software Engineer)"
                className="flex-1 px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={() => {
                  addJobRole(newJobRole)
                  setNewJobRole('')
                }}
                disabled={!newJobRole.trim()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:bg-slate-700 disabled:text-slate-400"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Select Common Roles */}
            <div className="space-y-2">
              <p className="text-sm text-slate-400">Quick add common roles:</p>
              <div className="flex flex-wrap gap-2">
                {commonJobRoles.map((role) => (
                  <button
                    key={role}
                    onClick={() => addJobRole(role)}
                    disabled={preferences.jobRoles.includes(role)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      preferences.jobRoles.includes(role)
                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                        : 'bg-slate-700 text-slate-300 hover:bg-indigo-600/20 hover:text-indigo-400'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Roles */}
            {preferences.jobRoles.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {preferences.jobRoles.map((role, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="group flex items-center gap-2 px-3 py-2 bg-indigo-600/20 text-indigo-300 rounded-lg border border-indigo-600/30"
                  >
                    <span className="text-sm">{role}</span>
                    <button
                      onClick={() => removeJobRole(role)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3 hover:text-red-400" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Locations */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-6 h-6 text-indigo-400" />
            <h3 className="text-xl font-semibold text-white">Preferred Locations</h3>
          </div>

          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, 'location')}
                placeholder="Add a location (e.g., San Francisco, CA)"
                className="flex-1 px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={() => {
                  addLocation(newLocation)
                  setNewLocation('')
                }}
                disabled={!newLocation.trim()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:bg-slate-700 disabled:text-slate-400"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Select Common Locations */}
            <div className="space-y-2">
              <p className="text-sm text-slate-400">Quick add common locations:</p>
              <div className="flex flex-wrap gap-2">
                {commonLocations.map((location) => (
                  <button
                    key={location}
                    onClick={() => addLocation(location)}
                    disabled={preferences.locations.includes(location)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      preferences.locations.includes(location)
                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                        : 'bg-slate-700 text-slate-300 hover:bg-indigo-600/20 hover:text-indigo-400'
                    }`}
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Locations */}
            {preferences.locations.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {preferences.locations.map((location, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="group flex items-center gap-2 px-3 py-2 bg-indigo-600/20 text-indigo-300 rounded-lg border border-indigo-600/30"
                  >
                    <span className="text-sm">{location}</span>
                    <button
                      onClick={() => removeLocation(location)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3 hover:text-red-400" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Remote Work */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <Home className="w-6 h-6 text-indigo-400" />
            <h3 className="text-xl font-semibold text-white">Remote Work</h3>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-600 cursor-pointer hover:bg-slate-900/70 transition-colors">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={preferences.isRemote}
                  onChange={(e) => onPreferencesChange({
                    ...preferences,
                    isRemote: e.target.checked
                  })}
                  className="w-5 h-5 text-indigo-600 bg-slate-800 border-slate-600 rounded focus:ring-indigo-500 focus:ring-2"
                />
                <div>
                  <p className="font-medium text-white">Open to remote work</p>
                  <p className="text-sm text-slate-400">Include remote opportunities in your job matches</p>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Salary Expectations */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="w-6 h-6 text-indigo-400" />
            <h3 className="text-xl font-semibold text-white">Minimum Salary Expectation</h3>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {salaryRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => onPreferencesChange({
                    ...preferences,
                    minSalary: range.value
                  })}
                  className={`p-3 rounded-lg border transition-colors ${
                    preferences.minSalary === range.value
                      ? 'bg-indigo-600/20 border-indigo-600 text-indigo-400'
                      : 'bg-slate-900/50 border-slate-600 text-slate-300 hover:bg-slate-900/70'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Custom minimum salary (optional)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">$</span>
                <input
                  type="number"
                  value={preferences.minSalary}
                  onChange={(e) => onPreferencesChange({
                    ...preferences,
                    minSalary: parseInt(e.target.value) || 0
                  })}
                  placeholder="50000"
                  className="flex-1 px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <span className="text-slate-400">per year</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center">
        {canProceed ? (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onNext}
            className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Review Profile
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        ) : (
          <div className="text-center">
            <p className="text-slate-400 mb-4">
              Add at least one job role and one location to continue
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 text-slate-400 rounded-lg">
              Complete your preferences to proceed
            </div>
          </div>
        )}
      </div>
    </div>
  )
}