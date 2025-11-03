import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { AIMatchingEngine } from '@/lib/matching-engine'

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { matchId, updates } = await req.json()

    if (!matchId || !updates) {
      return NextResponse.json(
        { error: 'Match ID and updates are required' },
        { status: 400 }
      )
    }

    const matchingEngine = new AIMatchingEngine()
    await matchingEngine.updateUserMatchStatus(userId, matchId, updates)

    return NextResponse.json({
      success: true,
      message: 'Match status updated successfully'
    })

  } catch (error) {
    console.error('Error updating match status:', error)
    return NextResponse.json(
      { error: 'Failed to update match status' },
      { status: 500 }
    )
  }
}