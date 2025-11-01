import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          user_id: string
          clerk_id: string
          email: string
          name: string
          created_at: string
        }
        Insert: {
          user_id?: string
          clerk_id: string
          email: string
          name: string
          created_at?: string
        }
        Update: {
          user_id?: string
          clerk_id?: string
          email?: string
          name?: string
          created_at?: string
        }
      }
      job_profiles: {
        Row: {
          profile_id: string
          user_id: string
          skills: string[]
          experience: any[]
          profile_embedding: number[]
          last_updated: string
        }
        Insert: {
          profile_id?: string
          user_id: string
          skills: string[]
          experience: any[]
          profile_embedding?: number[]
          last_updated?: string
        }
        Update: {
          profile_id?: string
          user_id?: string
          skills?: string[]
          experience?: any[]
          profile_embedding?: number[]
          last_updated?: string
        }
      }
      preferences: {
        Row: {
          preference_id: string
          user_id: string
          job_roles: string[]
          locations: string[]
          min_salary: number
          is_remote: boolean
        }
        Insert: {
          preference_id?: string
          user_id: string
          job_roles: string[]
          locations: string[]
          min_salary: number
          is_remote: boolean
        }
        Update: {
          preference_id?: string
          user_id?: string
          job_roles?: string[]
          locations?: string[]
          min_salary?: number
          is_remote?: boolean
        }
      }
      job_posts: {
        Row: {
          job_id: string
          original_url: string
          job_title: string
          company_name: string
          original_description: string
          rewritten_description: string
          job_embedding: number[]
          source: string
          scrape_date: string
        }
        Insert: {
          job_id?: string
          original_url: string
          job_title: string
          company_name: string
          original_description: string
          rewritten_description?: string
          job_embedding?: number[]
          source: string
          scrape_date?: string
        }
        Update: {
          job_id?: string
          original_url?: string
          job_title?: string
          company_name?: string
          original_description?: string
          rewritten_description?: string
          job_embedding?: number[]
          source?: string
          scrape_date?: string
        }
      }
      job_matches: {
        Row: {
          match_id: string
          user_id: string
          job_id: string
          match_score: number
          relevance_reason: string
          is_viewed: boolean
          is_applied: boolean
          matched_at: string
        }
        Insert: {
          match_id?: string
          user_id: string
          job_id: string
          match_score: number
          relevance_reason: string
          is_viewed?: boolean
          is_applied?: boolean
          matched_at?: string
        }
        Update: {
          match_id?: string
          user_id?: string
          job_id?: string
          match_score?: number
          relevance_reason?: string
          is_viewed?: boolean
          is_applied?: boolean
          matched_at?: string
        }
      }
      scrape_logs: {
        Row: {
          log_id: string
          source: string
          status: string
          start_time: string
          end_time: string
          jobs_processed: number
        }
        Insert: {
          log_id?: string
          source: string
          status: string
          start_time: string
          end_time?: string
          jobs_processed?: number
        }
        Update: {
          log_id?: string
          source?: string
          status?: string
          start_time?: string
          end_time?: string
          jobs_processed?: number
        }
      }
    }
  }
}