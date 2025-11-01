import { OpenAI } from 'openai'
import { supabaseAdmin } from './supabase'
import { createJobPost, createScrapeLog, updateScrapeLog } from './database'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface JobSource {
  name: string
  apiUrl?: string
  scraper?: () => Promise<RawJob[]>
}

export interface RawJob {
  title: string
  company: string
  location: string
  description: string
  url: string
  source: string
  postedAt?: Date
  salary?: string
  type?: string
}

export interface ProcessedJob {
  title: string
  company_name: string
  original_url: string
  original_description: string
  rewritten_description: string
  job_embedding: number[]
  source: string
}

export class JobProcessor {
  private sources: JobSource[] = []

  constructor() {
    this.initializeSources()
  }

  private initializeSources() {
    // Add job sources
    this.sources = [
      {
        name: 'mock-jobs',
        scraper: () => this.getMockJobs()
      }
      // Add real job sources here
    ]
  }

  async processAllJobs(): Promise<{
    success: boolean
    processedCount: number
    totalScraped: number
    errors: string[]
  }> {
    const errors: string[] = []
    let totalScraped = 0
    let processedCount = 0

    // Create scrape log
    const logData = await createScrapeLog({
      source: 'job-processor',
      status: 'running',
      start_time: new Date().toISOString(),
      jobs_processed: 0
    })

    try {
      for (const source of this.sources) {
        try {
          console.log(`Processing jobs from ${source.name}...`)

          // Scrape jobs from source
          const rawJobs = source.scraper ? await source.scraper() : []
          totalScraped += rawJobs.length
          console.log(`Scraped ${rawJobs.length} jobs from ${source.name}`)

          // Process each job
          for (const rawJob of rawJobs) {
            try {
              await this.processJob(rawJob)
              processedCount++
            } catch (error) {
              console.error(`Error processing job: ${rawJob.title}`, error)
              errors.push(`Failed to process job: ${rawJob.title}`)
            }
          }

        } catch (error) {
          console.error(`Error scraping from ${source.name}:`, error)
          errors.push(`Failed to scrape from ${source.name}: ${error.message}`)
        }
      }

      // Update log with success
      await updateScrapeLog(logData.log_id, {
        status: 'completed',
        end_time: new Date().toISOString(),
        jobs_processed: processedCount
      })

      return {
        success: true,
        processedCount,
        totalScraped,
        errors
      }

    } catch (error) {
      console.error('Job processing failed:', error)

      // Update log with error
      await updateScrapeLog(logData.log_id, {
        status: 'failed',
        end_time: new Date().toISOString(),
        jobs_processed: processedCount,
        error_message: error.message
      })

      return {
        success: false,
        processedCount,
        totalScraped,
        errors: [error.message, ...errors]
      }
    }
  }

  private async processJob(rawJob: RawJob): Promise<void> {
    // Check for duplicates
    const { data: existingJob } = await supabaseAdmin
      .from('job_posts')
      .select('job_id')
      .eq('original_url', rawJob.url)
      .single()

    if (existingJob) {
      console.log(`Job already exists: ${rawJob.title}`)
      return
    }

    // Rewrite job description
    const rewrittenDescription = await this.rewriteJobDescription(rawJob.description)

    // Generate embedding
    const embeddingText = `${rawJob.title} ${rawJob.company} ${rewrittenDescription}`
    const embedding = await this.generateEmbedding(embeddingText)

    // Store job
    await createJobPost({
      original_url: rawJob.url,
      job_title: rawJob.title,
      company_name: rawJob.company,
      original_description: rawJob.description,
      rewritten_description: rewrittenDescription,
      job_embedding: embedding,
      source: rawJob.source
    })

    console.log(`Processed job: ${rawJob.title}`)
  }

  private async rewriteJobDescription(description: string): Promise<string> {
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
            content: `Rewrite this job description to be more concise and engaging (max 500 characters):\n\n${description}`
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })

      return completion.choices[0].message.content?.trim() || description.slice(0, 497) + '...'

    } catch (error) {
      console.error('Error rewriting job description:', error)
      return description.slice(0, 497) + '...'
    }
  }

  private async generateEmbedding(text: string): Promise<number[]> {
    try {
      const response = await openai.embeddings.create({
        model: "text-embedding-3-large",
        input: text,
        dimensions: 1536
      })

      return response.data[0].embedding

    } catch (error) {
      console.error('Error generating embedding:', error)
      return []
    }
  }

  private async getMockJobs(): Promise<RawJob[]> {
    // Mock jobs for testing
    return [
      {
        title: 'Senior Frontend Developer',
        company: 'TechCorp Solutions',
        location: 'San Francisco, CA',
        description: 'We are looking for an experienced Frontend Developer to join our team. You will work on cutting-edge web applications using React, TypeScript, and modern CSS frameworks. The ideal candidate has 5+ years of experience in frontend development, strong knowledge of JavaScript/TypeScript, and experience with React hooks and state management. You will collaborate with designers and backend developers to create amazing user experiences.',
        url: 'https://example.com/job/frontend-dev-1',
        source: 'mock-jobs',
        postedAt: new Date(),
        salary: '$120k-$180k',
        type: 'Full-time'
      },
      {
        title: 'Product Manager',
        company: 'InnovateTech',
        location: 'New York, NY',
        description: 'Join our product team as a Product Manager and help shape the future of our SaaS platform. You will be responsible for product strategy, roadmap planning, and working closely with engineering teams to deliver high-quality features. We are looking for someone with 3+ years of product management experience, strong analytical skills, and experience with agile development methodologies. MBA preferred but not required.',
        url: 'https://example.com/job/pm-2',
        source: 'mock-jobs',
        postedAt: new Date(),
        salary: '$100k-$150k',
        type: 'Full-time'
      },
      {
        title: 'DevOps Engineer',
        company: 'CloudScale Inc',
        location: 'Remote',
        description: 'We are seeking a DevOps Engineer to help build and maintain our cloud infrastructure. You will work with AWS, Docker, Kubernetes, and CI/CD pipelines to ensure our applications are highly available and scalable. The ideal candidate has 4+ years of DevOps experience, strong knowledge of cloud platforms, and experience with infrastructure as code. Kubernetes certification is a plus.',
        url: 'https://example.com/job/devops-3',
        source: 'mock-jobs',
        postedAt: new Date(),
        salary: '$130k-$170k',
        type: 'Full-time remote'
      },
      {
        title: 'UX/UI Designer',
        company: 'DesignForward',
        location: 'Austin, TX',
        description: 'Creative UX/UI Designer needed to help design beautiful and intuitive user interfaces. You will conduct user research, create wireframes and prototypes, and work with developers to implement designs. Must have 3+ years of UX design experience, proficiency in Figma and Adobe Creative Suite, and a strong portfolio showcasing your design work. Experience with mobile app design is preferred.',
        url: 'https://example.com/job/ux-designer-4',
        source: 'mock-jobs',
        postedAt: new Date(),
        salary: '$80k-$120k',
        type: 'Full-time'
      },
      {
        title: 'Data Scientist',
        company: 'DataDriven Analytics',
        location: 'Boston, MA',
        description: 'We are looking for a Data Scientist to help us extract insights from complex datasets. You will work on machine learning models, statistical analysis, and data visualization projects. The ideal candidate has strong Python skills, experience with machine learning frameworks like TensorFlow or PyTorch, and knowledge of SQL and big data technologies. PhD in a quantitative field is preferred but not required.',
        url: 'https://example.com/job/data-scientist-5',
        source: 'mock-jobs',
        postedAt: new Date(),
        salary: '$110k-$160k',
        type: 'Full-time'
      }
    ]
  }

  addSource(source: JobSource): void {
    this.sources.push(source)
  }

  removeSource(sourceName: string): void {
    this.sources = this.sources.filter(source => source.name !== sourceName)
  }

  getSources(): JobSource[] {
    return [...this.sources]
  }
}