"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface SearchAndFilterProps {
  onSearch: (query: string) => void
  onFilter?: (filters: FilterState) => void
}

interface FilterState {
  jobType: string[]
  location: string[]
  salaryRange: string
  remoteOnly: boolean
  minScore: number
}

export function SearchAndFilter({ onSearch, onFilter }: SearchAndFilterProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    jobType: [],
    location: [],
    salaryRange: '',
    remoteOnly: false,
    minScore: 50
  })

  const jobTypes = [
    'Full-time', 'Part-time', 'Contract', 'Remote', 'Internship'
  ]

  const locations = [
    'New York', 'San Francisco', 'Austin', 'Seattle', 'Boston', 'Remote'
  ]

  const salaryRanges = [
    { label: 'Any Salary', value: '' },
    { label: '$50k+', value: '50000' },
    { label: '$75k+', value: '75000' },
    { label: '$100k+', value: '100000' },
    { label: '$150k+', value: '150000' }
  ]

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    onSearch(query)
  }

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilter?.(newFilters)
  }

  const toggleJobType = (type: string) => {
    const currentTypes = filters.jobType
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type]
    handleFilterChange('jobType', newTypes)
  }

  const toggleLocation = (location: string) => {
    const currentLocations = filters.location
    const newLocations = currentLocations.includes(location)
      ? currentLocations.filter(l => l !== location)
      : [...currentLocations, location]
    handleFilterChange('location', newLocations)
  }

  const clearFilters = () => {
    const defaultFilters: FilterState = {
      jobType: [],
      location: [],
      salaryRange: '',
      remoteOnly: false,
      minScore: 50
    }
    setFilters(defaultFilters)
    onFilter?.(defaultFilters)
  }

  const activeFilterCount = [
    filters.jobType.length,
    filters.location.length,
    filters.salaryRange ? 1 : 0,
    filters.remoteOnly ? 1 : 0,
    filters.minScore !== 50 ? 1 : 0
  ].reduce((a, b) => a + b, 0)

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
        <Input
          type="text"
          placeholder="Search jobs by title, company, or keywords..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-4 py-3 bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      {/* Filter toggle */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 ${
            showFilters
              ? 'bg-indigo-600/20 border-indigo-600 text-indigo-400'
              : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
          }`}
        >
          <Filter className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
          <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </Button>

        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4 mr-1" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Filter panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Job Type Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Job Type
                </label>
                <div className="space-y-2">
                  {jobTypes.map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.jobType.includes(type)}
                        onChange={() => toggleJobType(type)}
                        className="w-4 h-4 text-indigo-600 bg-slate-700 border-slate-600 rounded focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-sm text-slate-300">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Location
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {locations.map((location) => (
                    <label key={location} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.location.includes(location)}
                        onChange={() => toggleLocation(location)}
                        className="w-4 h-4 text-indigo-600 bg-slate-700 border-slate-600 rounded focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-sm text-slate-300">{location}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Salary Range Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Minimum Salary
                </label>
                <select
                  value={filters.salaryRange}
                  onChange={(e) => handleFilterChange('salaryRange', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {salaryRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Additional Filters */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Additional Filters
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.remoteOnly}
                      onChange={(e) => handleFilterChange('remoteOnly', e.target.checked)}
                      className="w-4 h-4 text-indigo-600 bg-slate-700 border-slate-600 rounded focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-slate-300">Remote Only</span>
                  </label>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Min Match Score: {filters.minScore}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={filters.minScore}
                      onChange={(e) => handleFilterChange('minScore', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}