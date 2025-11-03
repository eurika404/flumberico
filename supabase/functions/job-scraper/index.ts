import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { OpenAI } from 'https://esm.sh/openai@4.28.0'

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

    const openai = new OpenAI({
      apiKey: Deno.env.get('OPENAI_API_KEY') ?? '',
    })

    // Start scrape log
    const { data: logData, error: logError } = await supabaseClient
      .from('scrape_logs')
      .insert({
        source: 'job-scraper',
        status: 'running',
        start_time: new Date().toISOString(),
        jobs_processed: 0
      })
      .select()
      .single()

    if (logError) {
      console.error('Error creating scrape log:', logError)
      throw logError
    }

    const logId = logData.log_id
    let processedJobs = 0
    let scrapedJobs = []

    try {
      // Scrape jobs from multiple sources
      const jobSources = [
        { name: 'linkedin', url: 'https://api.linkedin.com/v2/jobSearch' },
        { name: 'indeed', url: 'https://api.indeed.com/ads/apisearch' },
        // Add more job board APIs as needed
      ]

      for (const source of jobSources) {
        try {
          const jobs = await scrapeFromSource(source, openai)
          scrapedJobs.push(...jobs)
          console.log(`Scraped ${jobs.length} jobs from ${source.name}`)
        } catch (error) {
          console.error(`Error scraping from ${source.name}:`, error)
        }
      }

      // Process and store jobs
      for (const job of scrapedJobs) {
        try {
          // Check for duplicates
          const { data: existingJob } = await supabaseClient
            .from('job_posts')
            .select('job_id')
            .eq('original_url', job.original_url)
            .single()

          if (existingJob) {
            console.log(`Job already exists: ${job.title}`)
            continue
          }

          // Rewrite job description with AI
          const rewrittenDescription = await rewriteJobDescription(job.original_description, openai)

          // Generate embedding for the job
          const embeddingText = `${job.title} ${job.company_name} ${rewrittenDescription}`
          const embedding = await generateEmbedding(embeddingText, openai)

          // Store job in database
          const { data: storedJob, error: storeError } = await supabaseClient
            .from('job_posts')
            .insert({
              original_url: job.original_url,
              job_title: job.title,
              company_name: job.company_name,
              original_description: job.original_description,
              rewritten_description: rewrittenDescription,
              job_embedding: embedding,
              source: job.source,
              status: 'active'
            })
            .select()
            .single()

          if (storeError) {
            console.error('Error storing job:', storeError)
            continue
          }

          processedJobs++
          console.log(`Stored job: ${storedJob.job_title}`)

        } catch (error) {
          console.error('Error processing job:', error)
          continue
        }
      }

      // Update scrape log with success
      await supabaseClient
        .from('scrape_logs')
        .update({
          status: 'completed',
          end_time: new Date().toISOString(),
          jobs_processed: processedJobs
        })
        .eq('log_id', logId)

      return new Response(
        JSON.stringify({
          success: true,
          message: `Successfully processed ${processedJobs} jobs`,
          processedCount: processedJobs,
          totalScraped: scrapedJobs.length
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
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

async function scrapeFromSource(source: any, openai: OpenAI): Promise<any[]> {
  // In a real implementation, you would use actual job board APIs
  // For now, we'll return mock data

  const mockJobs = [
    {
      title: 'Senior Software Engineer',
      company: 'TechCorp',
      original_url: `https://example.com/job/1-${source.name}`,
      original_description: `We are looking for a Senior Software Engineer to join our team at ${source.name}. You will be responsible for developing high-quality software solutions, working with cross-functional teams, and mentoring junior developers. Requirements include 5+ years of experience in software development, proficiency in JavaScript/TypeScript, experience with React and Node.js, and strong problem-solving skills.`,
      source: source.name
    },
    {
      title: 'Product Manager',
      company: 'StartupXYZ',
      original_url: `https://example.com/job/2-${source.name}`,
      original_description: `Join our innovative startup as a Product Manager. You will drive product strategy, work with engineering teams to deliver features, and collaborate with stakeholders to define product requirements. Looking for someone with 3+ years of product management experience, strong analytical skills, and experience with agile development methodologies.`,
      source: source.name
    },
    {
      title: 'UX Designer',
      company: 'DesignHub',
      original_url: `https://example.com/job/3-${source.name}`,
      original_description: `We're seeking a talented UX Designer to create amazing user experiences. You'll conduct user research, create wireframes and prototypes, and work closely with developers to implement designs. Must have 3+ years of UX design experience, proficiency in Figma and Adobe Creative Suite, and a strong portfolio of design projects.`,
      source: source.name
    }
  ]

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  return mockJobs
}

async function rewriteJobDescription(originalDescription: string, openai: OpenAI): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are an expert at rewriting job descriptions to be more concise, engaging, and standardized.

Your task is to:
1. Keep the most important information and requirements
2. Make it more engaging and appealing to candidates
3. Ensure it's under 500 characters
4. Maintain a professional but approachable tone
5. Focus on what makes the role exciting

Return only the rewritten description, nothing else.`
        },
        {
          role: "user",
          content: `Rewrite this job description to be more concise and engaging (max 500 characters):\n\n${originalDescription}`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    })

    return completion.choices[0].message.content?.trim() || originalDescription

  } catch (error) {
    console.error('Error rewriting job description:', error)
    return originalDescription.slice(0, 497) + '...'
  }
}

async function generateEmbedding(text: string, openai: OpenAI): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-large",
      input: text,
      dimensions: 1536
    })

    return response.data[0].embedding

  } catch (error) {
    console.error('Error generating embedding:', error)
    // Return empty array if embedding fails
    return []
  }
}