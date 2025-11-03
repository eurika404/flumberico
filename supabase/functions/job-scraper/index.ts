import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { OpenAI } from 'https://esm.sh/openai@4.28.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// --- CONFIGURATION ---
const SERPAPI_KEY = Deno.env.get('SERPAPI_KEY') ?? '1802b5ad8e530f5f3005db5fb59f85c148fb69c5d9345ca39003299f00bff87e'
const SERPAPI_BASE_URL = "https://serpapi.com/search.json"
const MAX_PAGES = 5
const MAX_RETRIES = 3

// Initial job search queries covering different roles and locations
const INITIAL_QUERIES = [
  { q: "Software Engineer Jakarta", location: "Jakarta, Indonesia", hl: "id", gl: "id" },
  { q: "Data Analyst Remote", ltype: "1", hl: "en", gl: "us" },
  { q: "UX Designer Bandung", location: "Bandung, Indonesia", hl: "id", gl: "id" },
  { q: "Product Manager Indonesia", location: "Indonesia", hl: "id", gl: "id" },
  { q: "Frontend Developer Remote", ltype: "1", hl: "en", gl: "us" },
]

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

    const openai = new OpenAI({
      apiKey: Deno.env.get('OPENAI_API_KEY') ?? '',
    })

    // Start scrape log with detailed tracking
    const { data: logData, error: logError } = await supabaseClient
      .from('scrape_logs')
      .insert({
        source: 'google-jobs-scraper',
        status: 'running',
        start_time: new Date().toISOString(),
        jobs_processed: 0
      })
      .select('log_id')
      .single()

    if (logError) {
      console.error('❌ Error creating scrape log:', logError)
      throw new Error(`Failed to create scrape log: ${logError.message}`)
    }

    const logId = logData.log_id
    console.log(`📝 Started scrape log: ${logId}`)
    let processedJobs = 0
    let scrapedJobs = []

    try {
      console.log(`🚀 AutoJobMatch Google Jobs Scraping Started`)

      // Scrape jobs from Google Jobs API via SerpApi
      for (const queryConfig of INITIAL_QUERIES) {
        try {
          console.log(`📋 Processing query: "${queryConfig.q}"`)
          const jobs = await fetchJobsFromGoogle(queryConfig)
          scrapedJobs.push(...jobs)
          console.log(`✅ Scraped ${jobs.length} jobs from query: "${queryConfig.q}"`)
        } catch (error) {
          console.error(`❌ Error scraping query "${queryConfig.q}":`, error)
        }
      }

      // Process and store jobs
      for (const job of scrapedJobs) {
        try {
          // Extract job data from Google Jobs API structure
          const originalUrl = job.share_link || job.apply_options?.[0]?.link || "N/A"

          // Check for duplicates using the original_url unique constraint
          const { data: existingJob, error: checkError } = await supabaseClient
            .from('job_posts')
            .select('job_id, job_title')
            .eq('original_url', originalUrl)
            .single()

          if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows returned
            console.error('❌ Error checking duplicate job:', checkError)
            continue
          }

          if (existingJob) {
            console.log(`⏭️ Job already exists: ${existingJob.job_title} (${job.title})`)
            continue
          }

          // Rewrite job description with AI
          const rewrittenDescription = await rewriteJobDescription(job.description, openai)

          // Generate embedding for the job using the rewritten description
          const embeddingText = `${job.title} ${job.company_name} ${rewrittenDescription}`
          const embedding = await generateEmbedding(embeddingText, openai)

          // Validate embedding before storing
          const validatedEmbedding = validateEmbedding(embedding)
          if (validatedEmbedding.length === 0) {
            console.warn(`⚠️ Skipping job due to embedding validation failure: ${job.title}`)
            continue
          }

          // Prepare job data according to schema
          const jobData = {
            original_url: originalUrl,
            job_title: job.title?.trim() || 'Unknown Position',
            company_name: job.company_name?.trim() || 'Unknown Company',
            location: job.location || 'Remote',
            original_description: job.description || '',
            rewritten_description: rewrittenDescription,
            job_embedding: validatedEmbedding,
            source: job.via || 'Google Jobs',
            status: 'active' as const,
            scrape_date: new Date().toISOString()
          }

          // Store job in database with proper error handling
          const { data: storedJob, error: storeError } = await supabaseClient
            .from('job_posts')
            .insert(jobData)
            .select('job_id, job_title, company_name')
            .single()

          if (storeError) {
            console.error('❌ Error storing job:', storeError)

            // Handle specific database errors
            if (storeError.code === '23505') { // Unique constraint violation
              console.log(`⚠️ Duplicate job URL skipped: ${originalUrl}`)
            } else if (storeError.code === '23514') { // Check constraint violation
              console.error(`❌ Data validation failed for job: ${job.title}`)
            } else {
              console.error(`❌ Database error (${storeError.code}): ${storeError.message}`)
            }
            continue
          }

          processedJobs++
          console.log(`💾 Stored job: ${storedJob.job_title} at ${storedJob.company_name}`)

        } catch (error) {
          console.error('❌ Error processing job:', error)
          continue
        }
      }

      // Update scrape log with success and detailed statistics
      const { error: updateError } = await supabaseClient
        .from('scrape_logs')
        .update({
          status: 'completed',
          end_time: new Date().toISOString(),
          jobs_processed: processedJobs
        })
        .eq('log_id', logId)

      if (updateError) {
        console.error('❌ Error updating scrape log:', updateError)
        // Don't throw here as the main operation was successful
      } else {
        console.log(`📊 Updated scrape log ${logId}: ${processedJobs} jobs processed`)
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: `🎉 AutoJobMatch scraping completed! Processed ${processedJobs} jobs from Google Jobs API.`,
          processedCount: processedJobs,
          totalScraped: scrapedJobs.length,
          queriesProcessed: INITIAL_QUERIES.length,
          timestamp: new Date().toISOString()
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json', 'X-Vibe-Check': 'Passed ✨' },
          status: 200,
        }
      )

    } catch (error) {
      // Update scrape log with error
      await supabaseClient
        .from('scrape_logs')
        .update({
          status: 'failed',
          end_time: new Date().toISOString(),
          jobs_processed: processedJobs,
          error_message: error.message
        })
        .eq('log_id', logId)

      throw error
    }

  } catch (error) {
    console.error('Job scraper error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})

/**
 * Fetches jobs from Google Jobs API via SerpApi with pagination support
 * This is the core job aggregation function with retry logic and error handling
 */
async function fetchJobsFromGoogle(
  queryConfig: { q: string, location?: string, ltype?: string, hl?: string, gl?: string }
): Promise<any[]> {
  const allJobs: any[] = []
  let nextPageToken: string | null = null
  let pagesFetched = 0

  try {
    // Paginate through all available job listings
    do {
      const { jobs, nextToken, status } = await fetchJobsPage(queryConfig, nextPageToken)

      if (status === "Error" && pagesFetched === 0) {
        console.error(`❌ Failed to initialize query: ${queryConfig.q}`)
        break
      }

      if (jobs.length > 0) {
        allJobs.push(...jobs)
        console.log(`📄 Page ${pagesFetched + 1}: Found ${jobs.length} jobs`)
      }

      nextPageToken = nextToken
      pagesFetched++

    } while (nextPageToken && pagesFetched < MAX_PAGES)

    console.log(`🎯 Query "${queryConfig.q}" completed. Total pages: ${pagesFetched}, Total jobs: ${allJobs.length}`)
    return allJobs

  } catch (error) {
    console.error(`❌ Fatal error processing query ${queryConfig.q}:`, error)
    return []
  }
}

/**
 * Fetches a single page of job results from SerpApi
 * Includes retry logic with exponential backoff
 */
async function fetchJobsPage(
  queryConfig: { q: string, location?: string, ltype?: string, hl?: string, gl?: string },
  nextPageToken: string | null = null,
  retryCount = 0
): Promise<{ jobs: any[], nextToken: string | null, status: string }> {
  const params = new URLSearchParams({
    engine: "google_jobs",
    api_key: SERPAPI_KEY,
    output: "json",
    ...queryConfig,
  })

  // Add pagination token if available
  if (nextPageToken) {
    params.append("next_page_token", nextPageToken)
  }

  const url = `${SERPAPI_BASE_URL}?${params.toString()}`

  try {
    console.log(`🔍 Fetching: ${queryConfig.q} - Token: ${nextPageToken ? nextPageToken.substring(0, 10) + "..." : "START"}`)

    const response = await fetch(url)

    if (response.status !== 200) {
      if (retryCount < MAX_RETRIES) {
        const delay = Math.pow(2, retryCount) * 1000 // Exponential backoff: 1s, 2s, 4s
        console.warn(`⚠️ Status ${response.status}. Retrying in ${delay}ms... (Attempt ${retryCount + 1}/${MAX_RETRIES})`)
        await new Promise(resolve => setTimeout(resolve, delay))
        return fetchJobsPage(queryConfig, nextPageToken, retryCount + 1)
      }
      throw new Error(`Failed after ${MAX_RETRIES} retries. API status: ${response.status}`)
    }

    const data = await response.json()

    const jobsResults = data.jobs_results || []
    const nextToken = data.serpapi_pagination?.next_page_token || null

    console.log(`✅ Success: ${jobsResults.length} jobs found. Next token: ${nextToken ? "YES" : "NO"}`)

    return {
      jobs: jobsResults,
      nextToken: nextToken,
      status: data.search_metadata?.status || "Success"
    }

  } catch (error) {
    console.error(`💥 Fatal error fetching SerpApi data: ${error.message}`)
    return { jobs: [], nextToken: null, status: "Error" }
  }
}

async function rewriteJobDescription(originalDescription: string, openai: OpenAI): Promise<string> {
  // Early return for empty or too short descriptions
  if (!originalDescription || originalDescription.trim().length < 50) {
    console.log(`⚠️ Description too short, skipping rewrite: ${originalDescription?.substring(0, 50)}...`)
    return originalDescription || "No description available"
  }

  try {
    console.log(`🔄 Starting AI rewrite for description (${originalDescription.length} chars)`)

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are an expert Job Description Rewriter and Summarizer for a sophisticated AI-powered job matching engine called "AutoJobMatch." Your primary goal is to transform raw, noisy, and potentially verbose job descriptions (JD) into a clean, concise, standardized text suitable for high-quality vector embedding.

Constraint & Output Format:

Strict Length Limit: The output summary MUST be between 250 and 300 words.
Format: Output must be a single, cohesive paragraph of text, using professional and objective language. DO NOT use bullet points, numbered lists, or unnecessary formatting like bolding or markdown headers.

Core Task Priorities:

Extract Core Responsibilities (The 'What'): Identify and clearly state the top 3-5 core duties and technical challenges of the role.
Identify Required Skills & Tech Stack (The 'How'): List the essential programming languages, frameworks, cloud platforms (AWS, Azure, GCP, etc.), tools, and specific methodologies (Agile, Scrum, CI/CD) mentioned.
Define Qualifications (The 'Who'): Summarize the required academic degree (if specified) and the minimum years of relevant professional experience.
Filter Noise: Aggressively filter out promotional company fluff, excessive emotional language, duplicate information, legal disclaimers, and unnecessary jargon.

Example Internal Structure (Do not output these headers, just follow this flow in a single paragraph):

Sentence 1-2: The primary function and role title (e.g., "This role is for a Senior Software Engineer focused on...")
Sentence 3-5: Core day-to-day responsibilities and project scope.
Sentence 6-8: The mandatory technical stack and key tools required.
Sentence 9-10: Required professional experience, educational background, and expected soft skills (e.g., teamwork, communication).

Final Output Requirement: The entire output must be a single block of text between 250 and 300 words.`
        },
        {
          role: "user",
          content: `Rewrite this job description following the AutoJobMatch system instructions (250-300 words, single paragraph):\n\n${originalDescription}`
        }
      ],
      temperature: 0.3,
      max_tokens: 400,
      presence_penalty: 0.1,
      frequency_penalty: 0.1
    })

    const rewritten = completion.choices[0].message.content?.trim() || originalDescription

    // Validate the rewritten description meets requirements
    const wordCount = rewritten.split(/\s+/).length
    if (wordCount < 250 || wordCount > 300) {
      console.warn(`⚠️ AI output word count (${wordCount}) outside target range (250-300), using fallback`)
      return createFallbackDescription(originalDescription)
    }

    console.log(`✅ Successfully rewrote description (${originalDescription.length} → ${rewritten.length} chars, ${wordCount} words)`)
    return rewritten

  } catch (error) {
    console.error('❌ Error rewriting job description:', error)

    // Check for rate limiting specifically
    if (error.message?.includes('rate limit') || error.message?.includes('too many requests')) {
      console.warn('🚦 Rate limit hit, using fallback processing')
      // Add delay to prevent further rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000))
    }

    return createFallbackDescription(originalDescription)
  }
}

/**
 * Fallback function to create a standardized description when AI fails
 */
function createFallbackDescription(originalDescription: string): string {
  // Simple truncation and cleanup for fallback
  let cleaned = originalDescription
    .replace(/\s+/g, ' ') // Normalize whitespace
    .replace(/[^\w\s\-\.\,\;\:\!\?\@\#\$\%\&\*\(\)]/g, '') // Remove special characters except common punctuation
    .trim()

  // Truncate to reasonable length if too long
  if (cleaned.length > 1000) {
    cleaned = cleaned.substring(0, 997) + '...'
  }

  console.log(`🔄 Using fallback description (${cleaned.length} chars)`)
  return cleaned
}

/**
 * Batch rewrite multiple job descriptions with rate limiting
 */
async function batchRewriteDescriptions(descriptions: string[], openai: OpenAI): Promise<string[]> {
  const results: string[] = []
  const BATCH_DELAY = 1000 // 1 second delay between requests to avoid rate limiting

  console.log(`📦 Starting batch rewrite of ${descriptions.length} descriptions`)

  for (let i = 0; i < descriptions.length; i++) {
    try {
      console.log(`🔄 Processing description ${i + 1}/${descriptions.length}`)
      const rewritten = await rewriteJobDescription(descriptions[i], openai)
      results.push(rewritten)

      // Add delay between requests (except for the last one)
      if (i < descriptions.length - 1) {
        await new Promise(resolve => setTimeout(resolve, BATCH_DELAY))
      }

    } catch (error) {
      console.error(`❌ Failed to rewrite description ${i + 1}:`, error)
      results.push(createFallbackDescription(descriptions[i]))
    }
  }

  console.log(`✅ Batch rewrite completed. Success rate: ${results.filter(r => r !== createFallbackDescription("")).length}/${descriptions.length}`)
  return results
}

async function generateEmbedding(text: string, openai: OpenAI): Promise<number[]> {
  // Validate input
  if (!text || text.trim().length === 0) {
    console.warn('⚠️ Empty text provided for embedding generation')
    return []
  }

  try {
    console.log(`🔄 Generating embedding for text (${text.length} chars)`)

    const response = await openai.embeddings.create({
      model: "text-embedding-3-large",
      input: text.trim(),
      dimensions: 1536,
      encoding_format: "float"
    })

    const embedding = response.data[0].embedding

    // Validate embedding dimensions
    if (!embedding || embedding.length !== 1536) {
      console.error(`❌ Invalid embedding dimensions: expected 1536, got ${embedding?.length || 0}`)
      return []
    }

    console.log(`✅ Successfully generated embedding (${embedding.length} dimensions)`)
    return embedding

  } catch (error) {
    console.error('❌ Error generating embedding:', error)

    // Handle specific error cases
    if (error.message?.includes('rate limit') || error.message?.includes('too many requests')) {
      console.warn('🚦 Embedding API rate limit hit, adding delay before retry')
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Retry once after delay
      try {
        const response = await openai.embeddings.create({
          model: "text-embedding-3-large",
          input: text.trim(),
          dimensions: 1536
        })
        console.log(`✅ Embedding retry successful`)
        return response.data[0].embedding
      } catch (retryError) {
        console.error('❌ Embedding retry failed:', retryError)
      }
    }

    if (error.message?.includes('maximum length') || error.message?.includes('too long')) {
      console.warn('⚠️ Text too long for embedding, truncating')
      const truncatedText = text.substring(0, 8000) // OpenAI has ~8K token limit
      return generateEmbedding(truncatedText, openai)
    }

    return []
  }
}

/**
 * Batch generate embeddings for multiple job descriptions
 * Optimized for performance with proper error handling
 */
async function batchGenerateEmbeddings(texts: string[], openai: OpenAI): Promise<number[][]> {
  const embeddings: number[][] = []
  const BATCH_SIZE = 100 // OpenAI allows up to 2048 inputs per request
  const BATCH_DELAY = 500 // 500ms delay between batches

  console.log(`📦 Starting batch embedding generation for ${texts.length} texts`)

  // Process in batches to optimize API usage
  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE)
    const batchNumber = Math.floor(i / BATCH_SIZE) + 1
    const totalBatches = Math.ceil(texts.length / BATCH_SIZE)

    try {
      console.log(`🔄 Processing embedding batch ${batchNumber}/${totalBatches} (${batch.length} texts)`)

      // Filter out empty texts to avoid API errors
      const validTexts = batch.filter(text => text && text.trim().length > 0)
      const validIndexes = batch.map((text, index) => text && text.trim().length > 0 ? index : -1).filter(idx => idx !== -1)

      if (validTexts.length === 0) {
        console.warn(`⚠️ No valid texts in batch ${batchNumber}, skipping`)
        // Add empty embeddings for this batch to maintain array alignment
        embeddings.push(...new Array(batch.length).fill([]))
        continue
      }

      const response = await openai.embeddings.create({
        model: "text-embedding-3-large",
        input: validTexts,
        dimensions: 1536,
        encoding_format: "float"
      })

      // Create embeddings array aligned with original batch
      const batchEmbeddings: number[][] = new Array(batch.length).fill([])
      let validIndex = 0

      for (let j = 0; j < batch.length; j++) {
        if (batch[j] && batch[j].trim().length > 0) {
          batchEmbeddings[j] = response.data[validIndex].embedding
          validIndex++
        }
      }

      embeddings.push(...batchEmbeddings)
      console.log(`✅ Batch ${batchNumber} completed successfully`)

      // Add delay between batches (except for the last batch)
      if (i + BATCH_SIZE < texts.length) {
        await new Promise(resolve => setTimeout(resolve, BATCH_DELAY))
      }

    } catch (error) {
      console.error(`❌ Error processing embedding batch ${batchNumber}:`, error)

      // Fallback: generate embeddings individually for this batch
      console.log(`🔄 Fallback: generating embeddings individually for batch ${batchNumber}`)
      const fallbackEmbeddings: number[][] = []

      for (const text of batch) {
        const embedding = await generateEmbedding(text, openai)
        fallbackEmbeddings.push(embedding)
      }

      embeddings.push(...fallbackEmbeddings)
    }
  }

  const successCount = embeddings.filter(e => e.length === 1536).length
  console.log(`✅ Batch embedding generation completed. Success rate: ${successCount}/${texts.length} (${((successCount/texts.length)*100).toFixed(1)}%)`)

  return embeddings
}

/**
 * Validates and normalizes embedding vectors
 */
function validateEmbedding(embedding: number[]): number[] {
  if (!embedding || embedding.length !== 1536) {
    console.warn(`⚠️ Invalid embedding: expected 1536 dimensions, got ${embedding?.length || 0}`)
    return []
  }

  // Check for NaN or Infinity values
  const hasInvalidValues = embedding.some(val => !isFinite(val))
  if (hasInvalidValues) {
    console.warn('⚠️ Embedding contains invalid values (NaN/Infinity)')
    return []
  }

  // Optional: Normalize the embedding (L2 normalization)
  const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0))
  if (magnitude === 0) {
    console.warn('⚠️ Embedding has zero magnitude')
    return []
  }

  const normalizedEmbedding = embedding.map(val => val / magnitude)
  return normalizedEmbedding
}

/**
 * Batch process multiple jobs with improved error handling and transaction support
 */
async function batchProcessJobs(jobs: any[], supabaseClient: any, openai: OpenAI): Promise<{ processed: number, failed: number, errors: string[] }> {
  const BATCH_SIZE = 10 // Process jobs in smaller batches to reduce memory usage
  const results = { processed: 0, failed: 0, errors: [] as string[] }

  console.log(`📦 Starting batch processing of ${jobs.length} jobs in batches of ${BATCH_SIZE}`)

  for (let i = 0; i < jobs.length; i += BATCH_SIZE) {
    const batch = jobs.slice(i, i + BATCH_SIZE)
    const batchNumber = Math.floor(i / BATCH_SIZE) + 1
    const totalBatches = Math.ceil(jobs.length / BATCH_SIZE)

    console.log(`🔄 Processing batch ${batchNumber}/${totalBatches} (${batch.length} jobs)`)

    try {
      // Process each job in the batch individually for better error isolation
      for (const job of batch) {
        try {
          await processAndStoreJob(job, supabaseClient, openai)
          results.processed++
        } catch (error) {
          results.failed++
          const errorMessage = `Failed to process job: ${job.title} - ${error.message}`
          results.errors.push(errorMessage)
          console.error(`❌ ${errorMessage}`)
        }
      }

      // Add small delay between batches to prevent API rate limiting
      if (i + BATCH_SIZE < jobs.length) {
        await new Promise(resolve => setTimeout(resolve, 500))
      }

    } catch (error) {
      console.error(`❌ Batch ${batchNumber} failed:`, error)
      results.failed += batch.length
      results.errors.push(`Batch ${batchNumber} failed: ${error.message}`)
    }
  }

  console.log(`✅ Batch processing completed. Processed: ${results.processed}, Failed: ${results.failed}`)
  return results
}

/**
 * Process and store a single job with comprehensive error handling
 */
async function processAndStoreJob(job: any, supabaseClient: any, openai: OpenAI): Promise<void> {
  // Extract and validate job data
  const originalUrl = job.share_link || job.apply_options?.[0]?.link || "N/A"

  if (!originalUrl || originalUrl === "N/A") {
    throw new Error('No valid URL found for job')
  }

  if (!job.title || !job.company_name) {
    throw new Error('Missing required job title or company name')
  }

  // Check for duplicates
  const { data: existingJob, error: checkError } = await supabaseClient
    .from('job_posts')
    .select('job_id, job_title')
    .eq('original_url', originalUrl)
    .single()

  if (checkError && checkError.code !== 'PGRST116') {
    throw new Error(`Database error checking duplicates: ${checkError.message}`)
  }

  if (existingJob) {
    console.log(`⏭️ Job already exists: ${existingJob.job_title}`)
    return // Skip without throwing
  }

  // Process description and generate embedding
  const originalDescription = job.description || ''
  if (originalDescription.trim().length < 50) {
    throw new Error('Job description too short to process')
  }

  const rewrittenDescription = await rewriteJobDescription(originalDescription, openai)
  const embeddingText = `${job.title} ${job.company_name} ${rewrittenDescription}`
  const embedding = await generateEmbedding(embeddingText, openai)
  const validatedEmbedding = validateEmbedding(embedding)

  if (validatedEmbedding.length === 0) {
    throw new Error('Failed to generate valid embedding')
  }

  // Prepare job data
  const jobData = {
    original_url: originalUrl,
    job_title: job.title.trim(),
    company_name: job.company_name.trim(),
    location: job.location || 'Remote',
    original_description: originalDescription,
    rewritten_description: rewrittenDescription,
    job_embedding: validatedEmbedding,
    source: job.via || 'Google Jobs',
    status: 'active' as const,
    scrape_date: new Date().toISOString()
  }

  // Store job in database
  const { error: storeError } = await supabaseClient
    .from('job_posts')
    .insert(jobData)

  if (storeError) {
    if (storeError.code === '23505') {
      console.log(`⚠️ Duplicate job URL: ${originalUrl}`)
      return // Skip without throwing
    } else {
      throw new Error(`Database error storing job: ${storeError.message}`)
    }
  }

  console.log(`💾 Successfully stored job: ${job.title} at ${job.company_name}`)
}