import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { Webhook } from 'svix'
import { createUser } from '@/lib/database'

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET

export async function POST(req: NextRequest) {
  console.log('🎣 Clerk webhook received')

  try {
    const headerPayload = headers()
    const svixId = headerPayload.get('svix-id')
    const svixTimestamp = headerPayload.get('svix-timestamp')
    const svixSignature = headerPayload.get('svix-signature')

    if (!svixId || !svixTimestamp || !svixSignature) {
      console.error('❌ Missing svix headers')
      return new NextResponse('Error occurred -- no svix headers', {
        status: 400,
      })
    }

    // Get the raw body
    const payload = await req.json()
    const body = JSON.stringify(payload)

    // Create a new Svix instance with your secret.
    const wh = new Webhook(webhookSecret || '')

    let evt: any

    // Verify the payload with the headers
    try {
      evt = wh.verify(body, {
        'svix-id': svixId,
        'svix-timestamp': svixTimestamp,
        'svix-signature': svixSignature,
      }) as any
    } catch (err) {
      console.error('❌ Error verifying webhook:', err)
      return new NextResponse('Error verifying webhook', {
        status: 400,
      })
    }

    // Handle the webhook
    const eventType = evt.type
    console.log(`📝 Processing webhook event: ${eventType}`)

    switch (eventType) {
      case 'user.created':
        await handleUserCreated(evt.data)
        break

      case 'user.updated':
        await handleUserUpdated(evt.data)
        break

      case 'user.deleted':
        await handleUserDeleted(evt.data)
        break

      default:
        console.log(`⚠️  Unhandled event type: ${eventType}`)
    }

    return NextResponse.json({ message: 'Webhook processed successfully' })

  } catch (error) {
    console.error('❌ Webhook processing error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

async function handleUserCreated(data: any) {
  console.log('👤 Creating user in database:', data.id)

  try {
    const { id, email_addresses, first_name, last_name } = data
    const primaryEmail = email_addresses.find((email: any) => email.id === data.primary_email_address_id)

    if (!primaryEmail) {
      throw new Error('No primary email found')
    }

    const userData = {
      clerk_id: id,
      email: primaryEmail.email_address,
      name: `${first_name || ''} ${last_name || ''}`.trim() || 'User',
    }

    await createUser(userData)
    console.log('✅ User created successfully:', userData.email)

  } catch (error) {
    console.error('❌ Error creating user:', error)
    throw error
  }
}

async function handleUserUpdated(data: any) {
  console.log('🔄 Updating user in database:', data.id)
  // TODO: Implement user update logic
  // This would typically update the user's email and name in the database
}

async function handleUserDeleted(data: any) {
  console.log('🗑️  Deleting user from database:', data.id)
  // TODO: Implement user deletion logic
  // This would typically soft-delete or hard-delete the user and all their data
  // For now, we'll rely on the database CASCADE delete constraints
}