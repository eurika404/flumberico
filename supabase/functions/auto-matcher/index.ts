import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the request body
    const { jobId, trigger } = await req.json()

    console.log(`Auto-matcher triggered: ${trigger}, jobId: ${jobId}`)

    if (trigger === 'new_job') {
      await matchNewJobWithUsers(jobId, supabaseClient)
    } else if (trigger === 'new_user') {
      await matchUserWithJobs(jobId, supabaseClient)
    } else if (trigger === 'batch_match') {
      await performBatchMatching(supabaseClient)
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Auto-matching completed successfully',
        trigger,
        jobId
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Auto-matcher error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})

async function matchNewJobWithUsers(jobId: string, supabaseClient: any) {
  try {
    console.log(`Matching new job ${jobId} with users...`)

    // Get the new job with embedding
    const { data: job, error: jobError } = await supabaseClient
      .from('job_posts')
      .select('*')
      .eq('job_id', jobId)
      .single()

    if (jobError || !job) {
      console.error('Job not found:', jobError)
      return
    }

    if (!job.job_embedding || job.job_embedding.length === 0) {
      console.log('Job has no embedding, skipping matching')
      return
    }

    // Get all users with profile embeddings
    const { data: users, error: usersError } = await supabaseClient
      .from('users')
      .select(`
        user_id,
        job_profiles!inner(
          profile_embedding,
          skills,
          experience
        ),
        preferences!inner(
          job_roles,
          locations,
          min_salary,
          is_remote
        )
      `)
      .eq('job_profiles.profile_embedding', (val: any) => val !== null)

    if (usersError) {
      console.error('Error fetching users:', usersError)
      return
    }

    if (!users || users.length === 0) {
      console.log('No users with profiles found')
      return
    }

    let matchesCreated = 0

    // Match job with each user
    for (const user of users) {
      try {
        // Calculate similarity
        const similarity = await calculateCosineSimilarity(
          job.job_embedding,
          user.job_profiles.profile_embedding
        )

        // Apply minimum similarity threshold
        if (similarity < 0.3) {
          continue
        }

        // Apply preference filters
        const isGoodMatch = await applyPreferenceFilters(
          job,
          user.preferences
        )

        if (!isGoodMatch) {
          continue
        }

        // Calculate final match score (0-100)
        const matchScore = Math.round(similarity * 100)

        // Generate relevance reason
        const relevanceReason = await generateRelevanceReason(
          user.job_profiles.skills,
          user.job_profiles.experience,
          user.preferences.job_roles,
          job
        )

        // Check if match already exists
        const { data: existingMatch } = await supabaseClient
          .from('job_matches')
          .select('match_id')
          .eq('user_id', user.user_id)
          .eq('job_id', jobId)
          .single()

        if (existingMatch) {
          continue
        }

        // Create the match
        const { error: insertError } = await supabaseClient
          .from('job_matches')
          .insert({
            user_id: user.user_id,
            job_id: jobId,
            match_score: matchScore,
            relevance_reason: relevanceReason,
            is_viewed: false,
            is_saved: false,
            is_applied: false
          })

        if (insertError) {
          console.error('Error creating match:', insertError)
          continue
        }

        matchesCreated++
        console.log(`Created match for user ${user.user_id} with score ${matchScore}`)

      } catch (error) {
        console.error(`Error matching user ${user.user_id}:`, error)
        continue
      }
    }

    console.log(`Created ${matchesCreated} matches for new job ${jobId}`)

  } catch (error) {
    console.error('Error in matchNewJobWithUsers:', error)
  }
}

async function matchUserWithJobs(userId: string, supabaseClient: any) {
  try {
    console.log(`Matching user ${userId} with existing jobs...`)

    // Get user profile and preferences
    const { data: user, error: userError } = await supabaseClient
      .from('users')
      .select(`
        user_id,
        job_profiles!inner(
          profile_embedding,
          skills,
          experience
        ),
        preferences!inner(
          job_roles,
          locations,
          min_salary,
          is_remote
        )
      `)
      .eq('user_id', userId)
      .single()

    if (userError || !user) {
      console.error('User not found:', userError)
      return
    }

    if (!user.job_profiles.profile_embedding || user.job_profiles.profile_embedding.length === 0) {
      console.log('User has no profile embedding, skipping matching')
      return
    }

    // Use the existing database function
    const { data, error } = await supabaseClient.rpc('match_user_with_jobs', {
      p_user_id: userId,
      limit_count: 50
    })

    if (error) {
      console.error('Error in database matching function:', error)
      return
    }

    console.log(`Created ${data || 0} matches for user ${userId}`)

  } catch (error) {
    console.error('Error in matchUserWithJobs:', error)
  }
}

async function performBatchMatching(supabaseClient: any) {
  try {
    console.log('Performing batch matching for all users...')

    // Get all users with profile embeddings
    const { data: users, error: usersError } = await supabaseClient
      .from('users')
      .select(`
        user_id,
        job_profiles!inner(
          profile_embedding
        )
      `)
      .eq('job_profiles.profile_embedding', (val: any) => val !== null)

    if (usersError) {
      console.error('Error fetching users:', usersError)
      return
    }

    if (!users || users.length === 0) {
      console.log('No users with profiles found')
      return
    }

    let totalMatches = 0

    // Match each user with jobs
    for (const user of users) {
      try {
        const { data: matches } = await supabaseClient.rpc('match_user_with_jobs', {
          p_user_id: user.user_id,
          limit_count: 50
        })

        totalMatches += matches || 0
        console.log(`Generated ${matches || 0} matches for user ${user.user_id}`)

      } catch (error) {
        console.error(`Error matching user ${user.user_id}:`, error)
      }
    }

    console.log(`Batch matching completed. Total matches: ${totalMatches}`)

  } catch (error) {
    console.error('Error in performBatchMatching:', error)
  }
}

async function calculateCosineSimilarity(vec1: number[], vec2: number[]): Promise<number> {
  if (!vec1 || !vec2 || vec1.length !== vec2.length) {
    return 0
  }

  let dotProduct = 0
  let norm1 = 0
  let norm2 = 0

  for (let i = 0; i < vec1.length; i++) {
    dotProduct += vec1[i] * vec2[i]
    norm1 += vec1[i] * vec1[i]
    norm2 += vec2[i] * vec2[i]
  }

  if (norm1 === 0 || norm2 === 0) {
    return 0
  }

  return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2))
}

async function applyPreferenceFilters(job: any, preferences: any): Promise<boolean> {
  // Job role filter
  if (preferences.job_roles && preferences.job_roles.length > 0) {
    const jobTitle = job.job_title.toLowerCase()
    const hasRoleMatch = preferences.job_roles.some((role: string) =>
      jobTitle.includes(role.toLowerCase())
    )
    if (!hasRoleMatch) return false
  }

  // Location filter
  if (preferences.locations && preferences.locations.length > 0) {
    // This is a simplified implementation
    // In practice, you'd parse job locations more intelligently
    const isRemoteMatch = preferences.is_remote &&
      (job.job_title.toLowerCase().includes('remote') || job.description.toLowerCase().includes('remote'))

    if (!isRemoteMatch) {
      // Would need more sophisticated location matching here
      return true // For now, assume location matches
    }
  }

  return true
}

async function generateRelevanceReason(
  skills: string[],
  experience: any[],
  jobRoles: string[],
  job: any
): Promise<string> {
  const topSkills = skills.slice(0, 3).join(', ')
  const recentExp = experience[0]?.title || 'your experience'

  // Simple reason generation - in production, you'd use OpenAI for this
  const reasons = [
    `Great match based on your ${topSkills} skills and ${recentExp} background`,
    `Strong alignment with your experience in ${recentExp} and skill set`,
    `Perfect fit for your ${jobRoles[0]} preferences and technical expertise`,
    `Excellent match considering your background and career goals`
  ]

  return reasons[Math.floor(Math.random() * reasons.length)]
}