import { supabaseClient, supabaseAdmin, Database } from './supabase'

// User operations
export async function createUser(userData: Database['public']['Tables']['users']['Insert']) {
  const { data, error } = await supabaseAdmin
    .from('users')
    .insert(userData)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getUserByClerkId(clerkId: string) {
  const { data, error } = await supabaseClient
    .from('users')
    .select('*')
    .eq('clerk_id', clerkId)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

// Job profile operations
export async function createJobProfile(profileData: Database['public']['Tables']['job_profiles']['Insert']) {
  const { data, error } = await supabaseClient
    .from('job_profiles')
    .insert(profileData)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabaseClient
    .from('job_profiles')
    .select('*')
    .eq('user_id', userId)
    .order('last_updated', { ascending: false })
    .limit(1)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

export async function updateUserProfile(
  profileId: string,
  updateData: Database['public']['Tables']['job_profiles']['Update']
) {
  const { data, error } = await supabaseClient
    .from('job_profiles')
    .update(updateData)
    .eq('profile_id', profileId)
    .select()
    .single()

  if (error) throw error
  return data
}

// Preference operations
export async function createUserPreferences(preferenceData: Database['public']['Tables']['preferences']['Insert']) {
  const { data, error } = await supabaseClient
    .from('preferences')
    .insert(preferenceData)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getUserPreferences(userId: string) {
  const { data, error } = await supabaseClient
    .from('preferences')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

export async function updateUserPreferences(
  preferenceId: string,
  updateData: Database['public']['Tables']['preferences']['Update']
) {
  const { data, error } = await supabaseClient
    .from('preferences')
    .update(updateData)
    .eq('preference_id', preferenceId)
    .select()
    .single()

  if (error) throw error
  return data
}

// Job post operations
export async function createJobPost(jobData: Database['public']['Tables']['job_posts']['Insert']) {
  const { data, error } = await supabaseAdmin
    .from('job_posts')
    .insert(jobData)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getJobPosts(limit = 50, offset = 0) {
  const { data, error } = await supabaseClient
    .from('job_posts')
    .select('*')
    .eq('status', 'active')
    .order('scrape_date', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) throw error
  return data
}

// Job matching operations
export async function findSimilarJobs(
  profileEmbedding: number[],
  limit = 10,
  minScore = 0.5
) {
  const { data, error } = await supabaseClient
    .rpc('find_similar_jobs', {
      profile_embedding: profileEmbedding,
      limit_count: limit,
      min_score: minScore
    })

  if (error) throw error
  return data
}

export async function matchUserWithJobs(userId: string, limit = 50) {
  const { data, error } = await supabaseAdmin
    .rpc('match_user_with_jobs', {
      p_user_id: userId,
      limit_count: limit
    })

  if (error) throw error
  return data
}

export async function getUserJobMatches(
  userId: string,
  limit = 20,
  offset = 0,
  viewedOnly = false
) {
  let query = supabaseClient
    .from('job_matches')
    .select(`
      *,
      job_posts (
        job_id,
        job_title,
        company_name,
        rewritten_description,
        original_url,
        source,
        scrape_date
      )
    `)
    .eq('user_id', userId)

  if (viewedOnly) {
    query = query.eq('is_viewed', true)
  }

  const { data, error } = await query
    .order('match_score', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) throw error
  return data
}

export async function updateJobMatchStatus(
  matchId: string,
  updateData: Partial<Database['public']['Tables']['job_matches']['Update']>
) {
  const { data, error } = await supabaseClient
    .from('job_matches')
    .update(updateData)
    .eq('match_id', matchId)
    .select()
    .single()

  if (error) throw error
  return data
}

// Scrape log operations
export async function createScrapeLog(logData: Database['public']['Tables']['scrape_logs']['Insert']) {
  const { data, error } = await supabaseAdmin
    .from('scrape_logs')
    .insert(logData)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateScrapeLog(
  logId: string,
  updateData: Database['public']['Tables']['scrape_logs']['Update']
) {
  const { data, error } = await supabaseAdmin
    .from('scrape_logs')
    .update(updateData)
    .eq('log_id', logId)
    .select()
    .single()

  if (error) throw error
  return data
}

// Vector similarity calculation
export async function calculateCosineSimilarity(vec1: number[], vec2: number[]) {
  const { data, error } = await supabaseClient
    .rpc('cosine_similarity', {
      vec1: vec1,
      vec2: vec2
    })

  if (error) throw error
  return data
}