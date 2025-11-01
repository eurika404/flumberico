import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { AIMatchingEngine } from '@/lib/matching-engine'

export async function GET(req: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')
    const viewedOnly = searchParams.get('viewedOnly') === 'true'
    const savedOnly = searchParams.get('savedOnly') === 'true'
    const appliedOnly = searchParams.get('appliedOnly') === 'true'

    const matchingEngine = new AIMatchingEngine()
    const matches = await matchingEngine.getUserMatches(userId, limit, offset, {
      viewedOnly,
      savedOnly,
      appliedOnly
    })

    return NextResponse.json({
      success: true,
      matches,
      pagination: {
        limit,
        offset,
        hasMore: matches.length === limit
      }
    })

  } catch (error) {
    console.error('Error fetching user matches:', error)
    return NextResponse.json(
      { error: 'Failed to fetch matches' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { criteria } = await req.json()

    const matchingEngine = new AIMatchingEngine(criteria)
    const matches = await matchingEngine.findMatchesForUser(userId)

    return NextResponse.json({
      success: true,
      matches,
      count: matches.length
    })

  } catch (error) {
    console.error('Error generating matches:', error)
    return NextResponse.json(
      { error: 'Failed to generate matches' },
      { status: 500 }
    )
  }
}