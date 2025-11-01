import { OpenAI } from 'openai'
import { supabaseClient, supabaseAdmin } from './supabase'
import {
  findSimilarJobs,
  getUserJobMatches,
  updateJobMatchStatus,
  matchUserWithJobs,
  createJobMatch
} from './database'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface UserProfile {
  userId: string
  skills: string[]
  experience: any[]
  preferences: UserPreferences
  profileEmbedding: number[]
}

export interface UserPreferences {
  jobRoles: string[]
  locations: string[]
  minSalary: number
  isRemote: boolean
}

export interface JobMatch {
  jobId: string
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
}

export interface MatchingCriteria {
  minSimilarityScore: number
  maxMatchesPerUser: number
  includeLocationFilter: boolean
  includeSalaryFilter: boolean
  includeRemoteFilter: boolean
}

export class AIMatchingEngine {
  private defaultCriteria: MatchingCriteria = {
    minSimilarityScore: 0.3,
    maxMatchesPerUser: 50,
    includeLocationFilter: true,
    includeSalaryFilter: true,
    includeRemoteFilter: true
  }

  constructor(private criteria: Partial<MatchingCriteria> = {}) {
    this.criteria = { ...this.defaultCriteria, ...criteria }
  }

  async findMatchesForUser(userId: string, customCriteria?: Partial<MatchingCriteria>): Promise<JobMatch[]> {
    const matchingCriteria = { ...this.criteria, ...customCriteria }

    try {
      // Get user profile and preferences
      const userProfile = await this.getUserProfile(userId)
      if (!userProfile) {
        throw new Error('User profile not found')
      }

      // Find similar jobs using vector similarity
      const similarJobs = await findSimilarJobs(
        userProfile.profileEmbedding,
        matchingCriteria.maxMatchesPerUser,
        matchingCriteria.minSimilarityScore
      )

      if (!similarJobs || similarJobs.length === 0) {
        return []
      }

      // Apply preference filtering
      const filteredJobs = await this.applyPreferenceFilters(
        similarJobs,
        userProfile.preferences,
        matchingCriteria
      )

      // Calculate match scores and generate relevance reasons
      const jobMatches: JobMatch[] = []
      for (const job of filteredJobs) {
        const matchScore = await this.calculateMatchScore(
          userProfile,
          job,
          matchingCriteria
        )

        const relevanceReason = await this.generateRelevanceReason(
          userProfile,
          job,
          matchScore
        )

        jobMatches.push({
          jobId: job.job_id,
          jobTitle: job.job_title,
          companyName: job.company_name,
          location: '', // Extract from job description or add to schema
          salary: '', // Extract from job description or add to schema
          type: '', // Extract from job description or add to schema
          description: job.rewritten_description || job.original_description,
          url: job.original_url,
          source: job.source,
          matchScore: matchScore.score,
          relevanceReason: relevanceReason.reason,
          scrapedAt: new Date().toISOString()
        })
      }

      // Sort by match score (highest first)
      jobMatches.sort((a, b) => b.matchScore - a.matchScore)

      // Store matches in database
      await this.storeJobMatches(userId, jobMatches)

      return jobMatches

    } catch (error) {
      console.error('Error finding matches for user:', error)
      throw error
    }
  }

  async batchMatchAllUsers(criteria?: Partial<MatchingCriteria>): Promise<{
    totalUsers: number
    matchedUsers: number
    totalMatches: number
    errors: string[]
  }> {
    const matchingCriteria = { ...this.criteria, ...criteria }
    const errors: string[] = []
    let totalUsers = 0
    let matchedUsers = 0
    let totalMatches = 0

    try {
      // Get all users with profiles
      const { data: users, error } = await supabaseAdmin
        .from('users')
        .select(`
          user_id,
          job_profiles!inner(
            profile_id,
            profile_embedding,
            skills,
            experience
          ),
          preferences!inner(
            preference_id,
            job_roles,
            locations,
            min_salary,
            is_remote
          )
        `)

      if (error) {
        throw error
      }

      if (!users || users.length === 0) {
        return { totalUsers: 0, matchedUsers: 0, totalMatches: 0, errors: [] }
      }

      totalUsers = users.length

      // Process each user
      for (const user of users) {
        try {
          const userProfile: UserProfile = {
            userId: user.user_id,
            skills: user.job_profiles.skills || [],
            experience: user.job_profiles.experience || [],
            preferences: {
              jobRoles: user.preferences.job_roles || [],
              locations: user.preferences.locations || [],
              minSalary: user.preferences.min_salary || 0,
              isRemote: user.preferences.is_remote || false
            },
            profileEmbedding: user.job_profiles.profile_embedding || []
          }

          if (!userProfile.profileEmbedding || userProfile.profileEmbedding.length === 0) {
            console.log(`Skipping user ${userProfile.userId} - no profile embedding`)
            continue
          }

          const matches = await this.findMatchesForUser(userProfile.userId, matchingCriteria)

          if (matches.length > 0) {
            matchedUsers++
            totalMatches += matches.length
            console.log(`Generated ${matches.length} matches for user ${userProfile.userId}`)
          }

        } catch (error) {
          console.error(`Error matching user ${user.user_id}:`, error)
          errors.push(`Failed to match user ${user.user_id}: ${error.message}`)
        }
      }

      return {
        totalUsers,
        matchedUsers,
        totalMatches,
        errors
      }

    } catch (error) {
      console.error('Error in batch matching:', error)
      errors.push(`Batch matching failed: ${error.message}`)
      return {
        totalUsers,
        matchedUsers,
        totalMatches,
        errors
      }
    }
  }

  private async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabaseAdmin
        .from('users')
        .select(`
          user_id,
          job_profiles!inner(
            profile_id,
            profile_embedding,
            skills,
            experience
          ),
          preferences!inner(
            preference_id,
            job_roles,
            locations,
            min_salary,
            is_remote
          )
        `)
        .eq('user_id', userId)
        .single()

      if (error || !data) {
        return null
      }

      return {
        userId: data.user_id,
        skills: data.job_profiles.skills || [],
        experience: data.job_profiles.experience || [],
        preferences: {
          jobRoles: data.preferences.job_roles || [],
          locations: data.preferences.locations || [],
          minSalary: data.preferences.min_salary || 0,
          isRemote: data.preferences.is_remote || false
        },
        profileEmbedding: data.job_profiles.profile_embedding || []
      }

    } catch (error) {
      console.error('Error getting user profile:', error)
      return null
    }
  }

  private async applyPreferenceFilters(
    jobs: any[],
    preferences: UserPreferences,
    criteria: MatchingCriteria
  ): Promise<any[]> {
    let filteredJobs = [...jobs]

    // Apply location filter
    if (criteria.includeLocationFilter && preferences.locations.length > 0) {
      filteredJobs = filteredJobs.filter(job => {
        // This is a simple implementation - in practice, you'd parse job locations
        const jobLocation = job.location || ''
        return preferences.locations.some(location =>
          jobLocation.toLowerCase().includes(location.toLowerCase()) ||
          location.toLowerCase().includes(jobLocation.toLowerCase())
        ) || preferences.isRemote
      })
    }

    // Apply remote work filter
    if (criteria.includeRemoteFilter && preferences.isRemote) {
      // Keep remote jobs and jobs in preferred locations
      filteredJobs = filteredJobs.filter(job => {
        const jobLocation = job.location || ''
        const isRemoteJob = jobLocation.toLowerCase().includes('remote') ||
                          job.type?.toLowerCase().includes('remote')

        return isRemoteJob || preferences.locations.some(location =>
          jobLocation.toLowerCase().includes(location.toLowerCase())
        )
      })
    }

    // Apply job role filter
    if (preferences.jobRoles.length > 0) {
      filteredJobs = filteredJobs.filter(job => {
        const jobTitle = job.job_title || ''
        return preferences.jobRoles.some(role =>
          jobTitle.toLowerCase().includes(role.toLowerCase()) ||
          role.toLowerCase().includes(jobTitle.toLowerCase())
        )
      })
    }

    return filteredJobs
  }

  private async calculateMatchScore(
    userProfile: UserProfile,
    job: any,
    criteria: MatchingCriteria
  ): Promise<{ score: number; breakdown: any }> {
    let score = 0
    const breakdown: any = {}

    // Base similarity score (60% weight)
    const similarityScore = job.similarity_score || 0
    breakdown.similarity = similarityScore * 0.6
    score += breakdown.similarity

    // Skills match (25% weight)
    const skillsMatch = this.calculateSkillsMatch(userProfile.skills, job.job_title, job.description)
    breakdown.skills = skillsMatch * 0.25
    score += breakdown.skills

    // Experience relevance (10% weight)
    const experienceMatch = this.calculateExperienceMatch(userProfile.experience, job.job_title)
    breakdown.experience = experienceMatch * 0.1
    score += breakdown.experience

    // Preferences match (5% weight)
    const preferencesMatch = this.calculatePreferencesMatch(userProfile.preferences, job)
    breakdown.preferences = preferencesMatch * 0.05
    score += breakdown.preferences

    // Convert to 0-100 scale
    const finalScore = Math.round(score * 100)

    return {
      score: Math.min(100, Math.max(0, finalScore)),
      breakdown
    }
  }

  private calculateSkillsMatch(userSkills: string[], jobTitle: string, jobDescription: string): number {
    if (userSkills.length === 0) return 0

    const jobText = `${jobTitle} ${jobDescription}`.toLowerCase()
    const matchingSkills = userSkills.filter(skill =>
      jobText.includes(skill.toLowerCase())
    )

    return matchingSkills.length / userSkills.length
  }

  private calculateExperienceMatch(userExperience: any[], jobTitle: string): number {
    if (userExperience.length === 0) return 0

    const jobTitleWords = jobTitle.toLowerCase().split(' ')
    let matchCount = 0

    userExperience.forEach(exp => {
      const expTitle = (exp.title || '').toLowerCase()
      const hasRelevantExperience = jobTitleWords.some(word =>
        word.length > 3 && expTitle.includes(word)
      )
      if (hasRelevantExperience) matchCount++
    })

    return matchCount / userExperience.length
  }

  private calculatePreferencesMatch(preferences: UserPreferences, job: any): number {
    let score = 0
    let factors = 0

    // Job role match
    if (preferences.jobRoles.length > 0) {
      const jobTitle = job.job_title.toLowerCase()
      const roleMatch = preferences.jobRoles.some(role =>
        jobTitle.includes(role.toLowerCase())
      )
      score += roleMatch ? 1 : 0
      factors++
    }

    // Location match
    if (preferences.locations.length > 0) {
      const jobLocation = (job.location || '').toLowerCase()
      const locationMatch = preferences.locations.some(location =>
        jobLocation.includes(location.toLowerCase())
      )
      score += locationMatch || preferences.isRemote ? 1 : 0
      factors++
    }

    return factors > 0 ? score / factors : 0
  }

  private async generateRelevanceReason(
    userProfile: UserProfile,
    job: any,
    matchScore: { score: number; breakdown: any }
  ): Promise<{ reason: string }> {
    try {
      const topSkills = userProfile.skills.slice(0, 5).join(', ')
      const recentExperience = userProfile.experience[0]?.title || 'your experience'

      const prompt = `Generate a concise, personalized one-sentence explanation (max 100 characters) for why this job is a good match.

User Profile:
- Top Skills: ${topSkills}
- Recent Experience: ${recentExperience}
- Seeking: ${userProfile.preferences.jobRoles.slice(0, 2).join(', ')}

Job Details:
- Title: ${job.job_title}
- Company: ${job.company_name}
- Description: ${job.rewritten_description || job.description?.slice(0, 200)}

Match Score: ${matchScore.score}%

Focus on the strongest match factors from the user's background. Be specific and encouraging.`

      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an expert career advisor who provides concise, personalized job match explanations. Always return exactly one sentence under 100 characters."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      })

      const reason = completion.choices[0].message.content?.trim() ||
        `Great match based on your ${topSkills.split(', ')[0]} experience and skills.`

      return { reason: reason.slice(0, 150) }

    } catch (error) {
      console.error('Error generating relevance reason:', error)
      return {
        reason: `Strong match (${matchScore.score}%) based on your skills and experience alignment.`
      }
    }
  }

  private async storeJobMatches(userId: string, jobMatches: JobMatch[]): Promise<void> {
    try {
      for (const match of jobMatches) {
        await createJobMatch({
          user_id: userId,
          job_id: match.jobId,
          match_score: match.matchScore,
          relevance_reason: match.relevanceReason,
          is_viewed: false,
          is_applied: false
        })
      }

      console.log(`Stored ${jobMatches.length} job matches for user ${userId}`)

    } catch (error) {
      console.error('Error storing job matches:', error)
      throw error
    }
  }

  async updateUserMatchStatus(userId: string, matchId: string, updates: {
    isViewed?: boolean
    isSaved?: boolean
    isApplied?: boolean
  }): Promise<void> {
    try {
      await updateJobMatchStatus(matchId, {
        is_viewed: updates.isViewed,
        is_saved: updates.isSaved,
        is_applied: updates.isApplied
      })

    } catch (error) {
      console.error('Error updating match status:', error)
      throw error
    }
  }

  async getUserMatches(
    userId: string,
    limit: number = 20,
    offset: number = 0,
    filters?: {
      viewedOnly?: boolean
      savedOnly?: boolean
      appliedOnly?: boolean
    }
  ): Promise<JobMatch[]> {
    try {
      const matches = await getUserJobMatches(userId, limit, offset, filters?.viewedOnly)

      return matches.map(match => ({
        jobId: match.job_posts.job_id,
        jobTitle: match.job_posts.job_title,
        companyName: match.job_posts.company_name,
        location: '', // Would need to extract from job data
        salary: '', // Would need to extract from job data
        type: '', // Would need to extract from job data
        description: match.job_posts.rewritten_description || match.job_posts.original_description,
        url: match.job_posts.original_url,
        source: match.job_posts.source,
        matchScore: match.match_score,
        relevanceReason: match.relevance_reason,
        scrapedAt: match.job_posts.scrape_date,
        isViewed: match.is_viewed,
        isSaved: match.is_saved,
        isApplied: match.is_applied
      })) as JobMatch[]

    } catch (error) {
      console.error('Error getting user matches:', error)
      return []
    }
  }

  setCriteria(criteria: Partial<MatchingCriteria>): void {
    this.criteria = { ...this.criteria, ...criteria }
  }

  getCriteria(): MatchingCriteria {
    return { ...this.criteria }
  }
}