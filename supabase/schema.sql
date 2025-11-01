-- Enable the pgvector extension for embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- Create custom types for better performance
CREATE TYPE job_status AS ENUM ('active', 'inactive', 'filled');
CREATE TYPE scrape_status AS ENUM ('running', 'completed', 'failed');
CREATE TYPE match_status AS ENUM ('pending', 'viewed', 'saved', 'applied');

-- Users table - linked to Clerk authentication
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clerk_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Job profiles - stores structured CV/LinkedIn data
CREATE TABLE job_profiles (
    profile_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    skills TEXT[] NOT NULL,
    experience JSONB NOT NULL,
    profile_embedding vector(1536), -- OpenAI text-embedding-3-large dimensions
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User preferences for job filtering
CREATE TABLE preferences (
    preference_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    job_roles TEXT[] NOT NULL,
    locations TEXT[] NOT NULL,
    min_salary NUMERIC(10,2) NOT NULL DEFAULT 0,
    is_remote BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Job postings scraped from various sources
CREATE TABLE job_posts (
    job_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    original_url TEXT NOT NULL,
    job_title VARCHAR(500) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    original_description TEXT NOT NULL,
    rewritten_description TEXT,
    job_embedding vector(1536),
    source VARCHAR(100) NOT NULL,
    status job_status DEFAULT 'active',
    scrape_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unique_job_url UNIQUE (original_url)
);

-- Job matching results
CREATE TABLE job_matches (
    match_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    job_id UUID REFERENCES job_posts(job_id) ON DELETE CASCADE,
    match_score NUMERIC(5,2) NOT NULL CHECK (match_score >= 0 AND match_score <= 100),
    relevance_reason TEXT NOT NULL,
    is_viewed BOOLEAN DEFAULT false,
    is_saved BOOLEAN DEFAULT false,
    is_applied BOOLEAN DEFAULT false,
    matched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unique_user_job UNIQUE (user_id, job_id)
);

-- Scrape logs for monitoring job scraping operations
CREATE TABLE scrape_logs (
    log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source VARCHAR(100) NOT NULL,
    status scrape_status NOT NULL,
    start_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    end_time TIMESTAMP WITH TIME ZONE,
    jobs_processed INTEGER DEFAULT 0,
    error_message TEXT
);

-- Indexes for performance
CREATE INDEX idx_job_profiles_user_id ON job_profiles(user_id);
CREATE INDEX idx_preferences_user_id ON preferences(user_id);
CREATE INDEX idx_job_posts_status ON job_posts(status);
CREATE INDEX idx_job_posts_scrape_date ON job_posts(scrape_date);
CREATE INDEX idx_job_matches_user_id ON job_matches(user_id);
CREATE INDEX idx_job_matches_match_score ON job_matches(match_score DESC);
CREATE INDEX idx_job_matches_matched_at ON job_matches(matched_at DESC);

-- Vector similarity index for job posts
CREATE INDEX idx_job_posts_embedding ON job_posts USING ivfflat (job_embedding vector_cosine_ops);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE scrape_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users can only access their own data
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid()::text = clerk_id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid()::text = clerk_id);

-- Job profiles policies
CREATE POLICY "Users can view own job profiles" ON job_profiles
    FOR SELECT USING (user_id IN (
        SELECT user_id FROM users WHERE clerk_id = auth.uid()::text
    ));

CREATE POLICY "Users can insert own job profiles" ON job_profiles
    FOR INSERT WITH CHECK (user_id IN (
        SELECT user_id FROM users WHERE clerk_id = auth.uid()::text
    ));

CREATE POLICY "Users can update own job profiles" ON job_profiles
    FOR UPDATE USING (user_id IN (
        SELECT user_id FROM users WHERE clerk_id = auth.uid()::text
    ));

CREATE POLICY "Users can delete own job profiles" ON job_profiles
    FOR DELETE USING (user_id IN (
        SELECT user_id FROM users WHERE clerk_id = auth.uid()::text
    ));

-- Preferences policies
CREATE POLICY "Users can view own preferences" ON preferences
    FOR SELECT USING (user_id IN (
        SELECT user_id FROM users WHERE clerk_id = auth.uid()::text
    ));

CREATE POLICY "Users can insert own preferences" ON preferences
    FOR INSERT WITH CHECK (user_id IN (
        SELECT user_id FROM users WHERE clerk_id = auth.uid()::text
    ));

CREATE POLICY "Users can update own preferences" ON preferences
    FOR UPDATE USING (user_id IN (
        SELECT user_id FROM users WHERE clerk_id = auth.uid()::text
    ));

-- Job matches policies
CREATE POLICY "Users can view own job matches" ON job_matches
    FOR SELECT USING (user_id IN (
        SELECT user_id FROM users WHERE clerk_id = auth.uid()::text
    ));

CREATE POLICY "Users can update own job matches" ON job_matches
    FOR UPDATE USING (user_id IN (
        SELECT user_id FROM users WHERE clerk_id = auth.uid()::text
    ));

-- Job posts are publicly readable but only system can write
CREATE POLICY "Job posts are publicly readable" ON job_posts
    FOR SELECT USING (status = 'active');

-- Scrape logs are system-only
CREATE POLICY "Scrape logs are system only" ON scrape_logs
    FOR ALL USING (false);

-- Functions for vector similarity search
CREATE OR REPLACE FUNCTION find_similar_jobs(
    profile_embedding vector(1536),
    limit_count INTEGER DEFAULT 10,
    min_score NUMERIC DEFAULT 0.5
)
RETURNS TABLE (
    job_id UUID,
    job_title VARCHAR(500),
    company_name VARCHAR(255),
    rewritten_description TEXT,
    similarity_score NUMERIC
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        jp.job_id,
        jp.job_title,
        jp.company_name,
        jp.rewritten_description,
        (1 - (jp.job_embedding <=> profile_embedding))::NUMERIC as similarity_score
    FROM job_posts jp
    WHERE jp.status = 'active'
        AND jp.job_embedding IS NOT NULL
        AND (1 - (jp.job_embedding <=> profile_embedding)) >= min_score
    ORDER BY jp.job_embedding <=> profile_embedding
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate cosine similarity
CREATE OR REPLACE FUNCTION cosine_similarity(
    vec1 vector,
    vec2 vector
)
RETURNS NUMERIC AS $$
BEGIN
    RETURN (1 - (vec1 <=> vec2))::NUMERIC;
END;
$$ LANGUAGE plpgsql;

-- Function to update user preferences timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update preferences timestamp
CREATE TRIGGER update_preferences_updated_at
    BEFORE UPDATE ON preferences
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically match user profile with jobs
CREATE OR REPLACE FUNCTION match_user_with_jobs(
    p_user_id UUID,
    limit_count INTEGER DEFAULT 50
)
RETURNS INTEGER AS $$
DECLARE
    matched_count INTEGER := 0;
    current_profile_embedding vector(1536);
BEGIN
    -- Get the user's latest profile embedding
    SELECT profile_embedding INTO current_profile_embedding
    FROM job_profiles
    WHERE user_id = p_user_id
    ORDER BY last_updated DESC
    LIMIT 1;

    IF current_profile_embedding IS NULL THEN
        RETURN 0;
    END IF;

    -- Find matching jobs and insert into job_matches
    INSERT INTO job_matches (user_id, job_id, match_score, relevance_reason)
    SELECT
        p_user_id,
        jp.job_id,
        (1 - (jp.job_embedding <=> current_profile_embedding))::NUMERIC * 100 as match_score,
        'Good match based on your skills and experience' as relevance_reason
    FROM job_posts jp
    WHERE jp.status = 'active'
        AND jp.job_embedding IS NOT NULL
        AND (1 - (jp.job_embedding <=> current_profile_embedding)) >= 0.3
        AND NOT EXISTS (
            SELECT 1 FROM job_matches jm
            WHERE jm.user_id = p_user_id AND jm.job_id = jp.job_id
        )
    ORDER BY jp.job_embedding <=> current_profile_embedding
    LIMIT limit_count;

    GET DIAGNOSTICS matched_count = ROW_COUNT;
    RETURN matched_count;
END;
$$ LANGUAGE plpgsql;