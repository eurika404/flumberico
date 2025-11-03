import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { AIMatchingEngine } from '@/lib/matching-engine'

export async function POST(req: NextRequest) {
  try {
    // Verify admin authentication
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

    const { criteria } = await req.json()

    const matchingEngine = new AIMatchingEngine(criteria)
    const results = await matchingEngine.batchMatchAllUsers(criteria)

    return NextResponse.json({
      success: true,
      results,
      message: `Batch matching completed. Processed ${results.matchedUsers} out of ${results.totalUsers} users with ${results.totalMatches} total matches.`,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error in batch matching:', error)
    return NextResponse.json(
      { error: 'Failed to perform batch matching' },
      { status: 500 }
    )
  }
}