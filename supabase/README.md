# Supabase Database Setup Guide

This directory contains the database schema and setup instructions for the AutoJobMatch platform.

## Prerequisites

1. Create a Supabase project at [https://supabase.com](https://supabase.com)
2. Get your project URL and anon key from the Supabase dashboard
3. Enable the pgvector extension in your Supabase project

## Setup Instructions

### 1. Environment Variables

Copy the following environment variables to your `.env.local` file:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 2. Database Schema

The database schema is defined in `schema.sql` and includes:

- **users**: User profiles linked to Clerk authentication
- **job_profiles**: Structured CV/LinkedIn data with embeddings
- **preferences**: User job search preferences
- **job_posts**: Scraped job postings with AI-processed descriptions
- **job_matches**: Matching results with similarity scores
- **scrape_logs**: Monitoring for job scraping operations

### 3. Key Features

#### Vector Embeddings
- Uses pgvector extension for storing OpenAI embeddings (1536 dimensions)
- Supports cosine similarity search for semantic matching
- Optimized indexes for fast similarity queries

#### Row Level Security (RLS)
- Users can only access their own data
- Job posts are publicly readable
- System-only access for scrape logs

#### Database Functions
- `find_similar_jobs()`: Find jobs similar to a profile embedding
- `cosine_similarity()`: Calculate similarity between two vectors
- `match_user_with_jobs()`: Automatically match user with relevant jobs

### 4. Running the Setup

You can run the database setup using the provided script:

```bash
npm run setup:database
```

Or manually execute the schema in the Supabase SQL editor:

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `schema.sql`
4. Click "Run" to execute the schema

### 5. Verification

After setup, verify the database is working:

```sql
-- Check if pgvector is enabled
SELECT * FROM pg_extension WHERE extname = 'vector';

-- Check if tables exist
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_type = 'BASE TABLE';

-- Test vector similarity
SELECT cosine_similarity('[0.1,0.2,0.3]'::vector, '[0.1,0.2,0.3]'::vector);
```

## Tables Overview

### users
- Primary user table linked to Clerk authentication
- Stores basic user information (email, name)

### job_profiles
- Stores structured data from CVs/LinkedIn profiles
- Contains vector embeddings for semantic matching
- Supports multiple profiles per user

### preferences
- User job search preferences
- Includes job roles, locations, salary requirements
- Supports remote work preferences

### job_posts
- Scraped job postings from various sources
- Contains original and AI-rewritten descriptions
- Includes vector embeddings for matching

### job_matches
- Results of profile-job matching
- Stores similarity scores and relevance reasons
- Tracks user interaction status (viewed, saved, applied)

### scrape_logs
- Monitoring for job scraping operations
- Tracks success/failure rates and processing times
- Helps with debugging and optimization

## Performance Considerations

1. **Vector Indexes**: Uses IVFFlat indexes for efficient similarity search
2. **Regular Indexes**: Optimized indexes on frequently queried columns
3. **Query Optimization**: Functions are optimized for performance
4. **Connection Pooling**: Supabase handles connection pooling automatically

## Security

1. **Row Level Security**: Users can only access their own data
2. **API Keys**: Use appropriate keys (anon vs service role)
3. **Input Validation**: All inputs are validated at the database level
4. **Encryption**: All data is encrypted at rest and in transit

## Troubleshooting

### Common Issues

1. **pgvector extension not found**
   - Ensure pgvector is enabled in your Supabase project
   - Contact Supabase support if needed

2. **Permission denied errors**
   - Check your RLS policies
   - Ensure you're using the correct API key

3. **Vector dimension mismatches**
   - Ensure all vectors have 1536 dimensions (OpenAI text-embedding-3-large)
   - Check your embedding generation code

4. **Performance issues**
   - Check your query patterns
   - Consider adding more indexes if needed
   - Monitor your Supabase usage metrics

### Getting Help

- Check the Supabase documentation: https://supabase.com/docs
- Review the database schema in `schema.sql`
- Check the application logs for detailed error messages
- Contact support if you encounter persistent issues