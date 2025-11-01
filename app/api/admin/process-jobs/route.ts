import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { JobProcessor } from '@/lib/job-processor'

export async function POST(req: NextRequest) {
  try {
    // Verify admin authentication (you should implement proper admin checks)
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // TODO: Add proper admin role checking
    // const { role } = await getUserRole(userId)
    // if (role !== 'admin') {
    //   return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    // }

    const jobProcessor = new JobProcessor()
    const result = await jobProcessor.processAllJobs()

    return NextResponse.json({
      success: result.success,
      message: `Job processing completed. Processed ${result.processedCount} out of ${result.totalScraped} jobs.`,
      processedCount: result.processedCount,
      totalScraped: result.totalScraped,
      errors: result.errors,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error processing jobs:', error)
    return NextResponse.json(
      { error: 'Failed to process jobs' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    // Verify admin authentication
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get recent scrape logs
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/scrape_logs?order=start_time.desc&limit=10`, {
      headers: {
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY!,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch scrape logs')
    }

    const logs = await response.json()

    return NextResponse.json({
      success: true,
      logs,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error fetching job processing logs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch logs' },
      { status: 500 }
    )
  }
}