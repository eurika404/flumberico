import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { OpenAI } from 'openai'
import { createJobProfile, createUserPreferences, getUserByClerkId } from '@/lib/database'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { userId, profileData } = await req.json()

    if (!userId || !profileData) {
      return NextResponse.json(
        { error: 'User ID and profile data are required' },
        { status: 400 }
      )
    }

    // Get the user from database
    const user = await getUserByClerkId(userId)
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Generate embedding for the profile
    let profileText = ''

    if (profileData.skills && Array.isArray(profileData.skills)) {
      profileText += 'Skills: ' + profileData.skills.join(', ') + '. '
    }

    if (profileData.experience && Array.isArray(profileData.experience)) {
      profileText += 'Experience: '
      profileData.experience.forEach((exp: any) => {
        if (exp.title && exp.company) {
          profileText += `${exp.title} at ${exp.company}. `
          if (exp.description) {
            profileText += exp.description + ' '
          }
        }
      })
    }

    // Add job roles to the embedding text
    if (profileData.preferences?.jobRoles && Array.isArray(profileData.preferences.jobRoles)) {
      profileText += 'Seeking roles: ' + profileData.preferences.jobRoles.join(', ') + '. '
    }

    // Generate the embedding
    let profileEmbedding: number[] = []
    try {
      const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-3-large",
        input: profileText,
        dimensions: 1536
      })

      profileEmbedding = embeddingResponse.data[0].embedding
    } catch (error) {
      console.error('Error generating embedding:', error)
      return NextResponse.json(
        { error: 'Failed to generate profile embedding' },
        { status: 500 }
      )
    }

    // Create job profile
    const jobProfile = await createJobProfile({
      user_id: user.user_id,
      skills: profileData.skills || [],
      experience: profileData.experience || [],
      profile_embedding: profileEmbedding
    })

    // Create user preferences
    const preferences = await createUserPreferences({
      user_id: user.user_id,
      job_roles: profileData.preferences?.jobRoles || [],
      locations: profileData.preferences?.locations || [],
      min_salary: profileData.preferences?.minSalary || 0,
      is_remote: profileData.preferences?.isRemote || false
    })

    return NextResponse.json({
      success: true,
      data: {
        profileId: jobProfile.profile_id,
        preferencesId: preferences.preference_id,
        message: 'Profile created successfully'
      }
    })

  } catch (error) {
    console.error('Error completing onboarding:', error)
    return NextResponse.json(
      { error: 'Failed to complete onboarding. Please try again.' },
      { status: 500 }
    )
  }
}