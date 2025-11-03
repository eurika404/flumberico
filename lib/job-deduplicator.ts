import { supabaseAdmin } from './supabase'

export interface JobDuplicate {
  jobId: string
  duplicateJobId: string
  similarityScore: number
  reason: string
}

export class JobDeduplicator {
  private similarityThreshold: number = 0.85

  constructor(similarityThreshold: number = 0.85) {
    this.similarityThreshold = similarityThreshold
  }

  async checkForDuplicates(jobTitle: string, companyName: string, description: string): Promise<JobDuplicate[]> {
    const duplicates: JobDuplicate[] = []

    try {
      // Get recent jobs for comparison (last 30 days)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const { data: recentJobs, error } = await supabaseAdmin
        .from('job_posts')
        .select('job_id, job_title, company_name, original_description')
        .gte('scrape_date', thirtyDaysAgo.toISOString())
        .eq('status', 'active')

      if (error) {
        console.error('Error fetching recent jobs:', error)
        return duplicates
      }

      if (!recentJobs || recentJobs.length === 0) {
        return duplicates
      }

      // Compare with existing jobs
      for (const existingJob of recentJobs) {
        const similarity = await this.calculateSimilarity(
          jobTitle,
          companyName,
          description,
          existingJob.job_title,
          existingJob.company_name,
          existingJob.original_description
        )

        if (similarity >= this.similarityThreshold) {
          duplicates.push({
            jobId: existingJob.job_id,
            duplicateJobId: '', // Will be set when inserting new job
            similarityScore: similarity,
            reason: this.getDuplicateReason(similarity, jobTitle, existingJob.job_title, companyName, existingJob.company_name)
          })
        }
      }

      // Sort by similarity score (highest first)
      duplicates.sort((a, b) => b.similarityScore - a.similarityScore)

    } catch (error) {
      console.error('Error checking for duplicates:', error)
    }

    return duplicates
  }

  private async calculateSimilarity(
    title1: string,
    company1: string,
    description1: string,
    title2: string,
    company2: string,
    description2: string
  ): Promise<number> {
    // Simple text similarity calculation
    // In a real implementation, you might use more sophisticated algorithms

    let similarityScore = 0
    let weightSum = 0

    // Company name similarity (highest weight)
    const companySimilarity = this.textSimilarity(company1.toLowerCase(), company2.toLowerCase())
    similarityScore += companySimilarity * 0.4
    weightSum += 0.4

    // Title similarity (high weight)
    const titleSimilarity = this.textSimilarity(title1.toLowerCase(), title2.toLowerCase())
    similarityScore += titleSimilarity * 0.35
    weightSum += 0.35

    // Description similarity (medium weight)
    const descSimilarity = this.textSimilarity(description1.toLowerCase(), description2.toLowerCase())
    similarityScore += descSimilarity * 0.25
    weightSum += 0.25

    return similarityScore
  }

  private textSimilarity(text1: string, text2: string): number {
    // Simple Jaccard similarity for word-based comparison
    const words1 = this.tokenize(text1)
    const words2 = this.tokenize(text2)

    const intersection = new Set([...words1].filter(word => words2.has(word)))
    const union = new Set([...words1, ...words2])

    if (union.size === 0) return 0

    return intersection.size / union.size
  }

  private tokenize(text: string): Set<string> {
    // Remove punctuation, convert to lowercase, split into words
    return new Set(
      text
        .toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(word => word.length > 2) // Remove very short words
    )
  }

  private getDuplicateReason(
    similarity: number,
    title1: string,
    title2: string,
    company1: string,
    company2: string
  ): string {
    if (company1.toLowerCase() === company2.toLowerCase()) {
      return `Same company (${company1}) with similar job title`
    }

    if (title1.toLowerCase() === title2.toLowerCase()) {
      return `Same job title (${title1}) at different companies`
    }

    if (similarity > 0.95) {
      return 'Very high similarity in title, company, and description'
    }

    if (similarity > 0.9) {
      return 'High similarity in job details'
    }

    return 'Moderate similarity in job characteristics'
  }

  async markAsDuplicate(originalJobId: string, duplicateJobId: string): Promise<void> {
    try {
      // Update the duplicate job status to inactive
      const { error } = await supabaseAdmin
        .from('job_posts')
        .update({ status: 'inactive' })
        .eq('job_id', duplicateJobId)

      if (error) {
        console.error('Error marking job as duplicate:', error)
        throw error
      }

      console.log(`Marked job ${duplicateJobId} as duplicate of ${originalJobId}`)

    } catch (error) {
      console.error('Error in markAsDuplicate:', error)
      throw error
    }
  }

  async cleanupDuplicates(): Promise<number> {
    let cleanedCount = 0

    try {
      // Get all active jobs
      const { data: activeJobs, error } = await supabaseAdmin
        .from('job_posts')
        .select('job_id, job_title, company_name, original_description, scrape_date')
        .eq('status', 'active')
        .order('scrape_date', { ascending: false })

      if (error) {
        console.error('Error fetching active jobs:', error)
        return 0
      }

      if (!activeJobs || activeJobs.length === 0) {
        return 0
      }

      // Compare each job with newer jobs
      for (let i = 0; i < activeJobs.length; i++) {
        const currentJob = activeJobs[i]

        for (let j = 0; j < i; j++) {
          const newerJob = activeJobs[j]

          const similarity = await this.calculateSimilarity(
            currentJob.job_title,
            currentJob.company_name,
            currentJob.original_description,
            newerJob.job_title,
            newerJob.company_name,
            newerJob.original_description
          )

          if (similarity >= this.similarityThreshold) {
            // Mark the older job as duplicate
            await this.markAsDuplicate(newerJob.job_id, currentJob.job_id)
            cleanedCount++
            break // Stop checking this job once marked as duplicate
          }
        }
      }

    } catch (error) {
      console.error('Error during cleanup:', error)
    }

    return cleanedCount
  }

  setSimilarityThreshold(threshold: number): void {
    this.similarityThreshold = Math.max(0, Math.min(1, threshold))
  }

  getSimilarityThreshold(): number {
    return this.similarityThreshold
  }
}