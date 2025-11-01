import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, X, Briefcase, GraduationCap, Award, ArrowRight, Save } from 'lucide-react'

interface ManualInputStepProps {
  skills: string[]
  experience: any[]
  onSkillsChange: (skills: string[]) => void
  onExperienceChange: (experience: any[]) => void
  onNext: () => void
}

export function ManualInputStep({
  skills,
  experience,
  onSkillsChange,
  onExperienceChange,
  onNext
}: ManualInputStepProps) {
  const [newSkill, setNewSkill] = useState('')
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    duration: '',
    description: ''
  })

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      onSkillsChange([...skills, newSkill.trim()])
      setNewSkill('')
    }
  }

  const removeSkill = (skillToRemove: string) => {
    onSkillsChange(skills.filter(skill => skill !== skillToRemove))
  }

  const addExperience = () => {
    if (newExperience.title && newExperience.company) {
      onExperienceChange([...experience, { ...newExperience, id: Date.now() }])
      setNewExperience({
        title: '',
        company: '',
        duration: '',
        description: ''
      })
    }
  }

  const removeExperience = (id: number) => {
    onExperienceChange(experience.filter(exp => exp.id !== id))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill()
    }
  }

  const canProceed = skills.length > 0 && experience.length > 0

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Tell Us About Your Experience
        </h2>
        <p className="text-slate-400 text-lg">
          Add your skills and work experience to help us find the perfect job matches
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Skills Section */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-indigo-400" />
            <h3 className="text-xl font-semibold text-white">Skills & Expertise</h3>
          </div>

          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a skill (e.g., JavaScript, Project Management, UX Design)"
                className="flex-1 px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={addSkill}
                disabled={!newSkill.trim()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:bg-slate-700 disabled:text-slate-400"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="group flex items-center gap-2 px-3 py-2 bg-indigo-600/20 text-indigo-300 rounded-lg border border-indigo-600/30"
                  >
                    <span className="text-sm">{skill}</span>
                    <button
                      onClick={() => removeSkill(skill)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3 hover:text-red-400" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}

            {skills.length === 0 && (
              <p className="text-sm text-slate-500 italic">
                Add at least 3-5 key skills for better job matches
              </p>
            )}
          </div>
        </div>

        {/* Experience Section */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="w-6 h-6 text-indigo-400" />
            <h3 className="text-xl font-semibold text-white">Work Experience</h3>
          </div>

          <div className="space-y-6">
            {/* Add New Experience Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-900/50 rounded-lg border border-slate-600">
              <input
                type="text"
                value={newExperience.title}
                onChange={(e) => setNewExperience({...newExperience, title: e.target.value})}
                placeholder="Job Title (e.g., Software Engineer)"
                className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <input
                type="text"
                value={newExperience.company}
                onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                placeholder="Company Name"
                className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <input
                type="text"
                value={newExperience.duration}
                onChange={(e) => setNewExperience({...newExperience, duration: e.target.value})}
                placeholder="Duration (e.g., 2020-2023, 2 years)"
                className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newExperience.description}
                  onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                  placeholder="Brief description of your role and achievements"
                  className="flex-1 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  onClick={addExperience}
                  disabled={!newExperience.title || !newExperience.company}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:bg-slate-700 disabled:text-slate-400"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Experience List */}
            {experience.length > 0 && (
              <div className="space-y-3">
                {experience.map((exp) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-4 bg-slate-900/50 rounded-lg border border-slate-600"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">{exp.title}</h4>
                        <p className="text-indigo-400">{exp.company}</p>
                        {exp.duration && (
                          <p className="text-sm text-slate-400 mt-1">{exp.duration}</p>
                        )}
                        {exp.description && (
                          <p className="text-sm text-slate-300 mt-2">{exp.description}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeExperience(exp.id)}
                        className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {experience.length === 0 && (
              <p className="text-sm text-slate-500 italic text-center py-8">
                Add your work experience to help us find relevant job opportunities
              </p>
            )}
          </div>
        </div>

        {/* Education Section (Optional) */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-6 h-6 text-indigo-400" />
            <h3 className="text-xl font-semibold text-white">Education (Optional)</h3>
          </div>

          <p className="text-sm text-slate-400">
            You can add your education details later in your profile settings. This step focuses on your skills and work experience for better job matching.
          </p>
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
            Continue to Preferences
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        ) : (
          <div className="text-center">
            <p className="text-slate-400 mb-4">
              Add at least one skill and one work experience to continue
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-700 text-slate-400 rounded-lg">
              <Save className="w-4 h-4" />
              Complete profile information to proceed
            </div>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700">
          <h4 className="font-medium text-white mb-3">💡 Pro Tips</h4>
          <ul className="text-sm text-slate-400 space-y-2">
            <li>• Be specific with your skills (e.g., "React.js" instead of just "JavaScript")</li>
            <li>• Include both technical skills and soft skills</li>
            <li>• Add quantifiable achievements in your experience descriptions</li>
            <li>• Focus on experience relevant to the jobs you're seeking</li>
          </ul>
        </div>
      </div>
    </div>
  )
}