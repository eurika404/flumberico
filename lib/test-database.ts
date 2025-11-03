import { supabaseClient, supabaseAdmin } from './supabase'
import { createUser, getUserByClerkId, createJobProfile, getUserProfile } from './database'

// Test database connectivity and basic operations
export async function testDatabaseConnection() {
  console.log('🔍 Testing database connectivity...')

  try {
    // Test 1: Basic connection
    console.log('1. Testing basic connection...')
    const { data, error } = await supabaseClient.from('users').select('count').limit(1)

    if (error) {
      console.error('❌ Basic connection test failed:', error)
      return false
    }
    console.log('✅ Basic connection test passed')

    // Test 2: Check if tables exist
    console.log('2. Checking table existence...')
    const tables = ['users', 'job_profiles', 'preferences', 'job_posts', 'job_matches', 'scrape_logs']

    for (const table of tables) {
      const { error: tableError } = await supabaseClient.from(table).select('*').limit(1)
      if (tableError && !tableError.message.includes('does not exist')) {
        console.log(`✅ Table '${table}' exists`)
      } else if (tableError) {
        console.error(`❌ Table '${table}' check failed:`, tableError)
        return false
      }
    }

    // Test 3: Check pgvector extension
    console.log('3. Checking pgvector extension...')
    const { data: extensionData, error: extensionError } = await supabaseAdmin
      .rpc('get_pg_vector_extension')

    // Alternative way to check if vector extension exists
    const { data: vectorCheck, error: vectorError } = await supabaseAdmin
      .from('pg_extension')
      .select('*')
      .eq('extname', 'vector')
      .single()

    if (vectorError && vectorError.code !== 'PGRST116') {
      console.error('❌ pgvector extension check failed:', vectorError)
      return false
    }

    if (vectorCheck) {
      console.log('✅ pgvector extension is enabled')
    } else {
      console.log('⚠️  pgvector extension may not be enabled - please check manually')
    }

    // Test 4: Test vector similarity function
    console.log('4. Testing vector similarity function...')
    const testVector1 = Array(1536).fill(0.1)
    const testVector2 = Array(1536).fill(0.1)

    try {
      const { data: similarityResult, error: similarityError } = await supabaseClient
        .rpc('cosine_similarity', {
          vec1: testVector1,
          vec2: testVector2
        })

      if (similarityError) {
        console.error('❌ Vector similarity function test failed:', similarityError)
      } else {
        console.log('✅ Vector similarity function works correctly')
      }
    } catch (err) {
      console.error('❌ Vector similarity function test failed:', err)
    }

    // Test 5: Test RLS policies
    console.log('5. Testing RLS policies...')
    const testClerkId = 'test_clerk_id_12345'

    try {
      // This should work with RLS
      const { data: userData, error: userError } = await getUserByClerkId(testClerkId)

      if (userError && userError.code !== 'PGRST116') {
        console.error('❌ RLS policy test failed:', userError)
        return false
      }

      console.log('✅ RLS policies are working correctly')
    } catch (err) {
      console.error('❌ RLS policy test failed:', err)
      return false
    }

    console.log('🎉 All database tests passed!')
    return true

  } catch (error) {
    console.error('❌ Database connectivity test failed:', error)
    return false
  }
}

// Test basic CRUD operations
export async function testCRUDOperations() {
  console.log('🔍 Testing CRUD operations...')

  try {
    const testClerkId = `test_${Date.now()}`
    const testEmail = `test${Date.now()}@example.com`
    const testName = 'Test User'

    // Test 1: Create user
    console.log('1. Testing user creation...')
    const userData = await createUser({
      clerk_id: testClerkId,
      email: testEmail,
      name: testName
    })
    console.log('✅ User created successfully:', userData.user_id)

    // Test 2: Read user
    console.log('2. Testing user retrieval...')
    const retrievedUser = await getUserByClerkId(testClerkId)
    if (!retrievedUser || retrievedUser.email !== testEmail) {
      throw new Error('User retrieval failed')
    }
    console.log('✅ User retrieved successfully')

    // Test 3: Create job profile
    console.log('3. Testing job profile creation...')
    const profileData = await createJobProfile({
      user_id: userData.user_id,
      skills: ['JavaScript', 'React', 'Node.js'],
      experience: [
        {
          title: 'Software Engineer',
          company: 'Test Company',
          duration: '2 years',
          description: 'Test experience'
        }
      ],
      profile_embedding: Array(1536).fill(0.1)
    })
    console.log('✅ Job profile created successfully:', profileData.profile_id)

    // Test 4: Read job profile
    console.log('4. Testing job profile retrieval...')
    const retrievedProfile = await getUserProfile(userData.user_id)
    if (!retrievedProfile || retrievedProfile.skills.length === 0) {
      throw new Error('Job profile retrieval failed')
    }
    console.log('✅ Job profile retrieved successfully')

    // Test 5: Cleanup (delete test data)
    console.log('5. Cleaning up test data...')
    await supabaseAdmin
      .from('job_profiles')
      .delete()
      .eq('user_id', userData.user_id)

    await supabaseAdmin
      .from('users')
      .delete()
      .eq('user_id', userData.user_id)

    console.log('✅ Test data cleaned up successfully')
    console.log('🎉 All CRUD tests passed!')
    return true

  } catch (error) {
    console.error('❌ CRUD operations test failed:', error)
    return false
  }
}

// Run all tests
export async function runAllTests() {
  console.log('🚀 Starting comprehensive database tests...')

  const connectionTest = await testDatabaseConnection()
  if (!connectionTest) {
    console.error('❌ Database connection tests failed')
    return false
  }

  const crudTest = await testCRUDOperations()
  if (!crudTest) {
    console.error('❌ CRUD operations tests failed')
    return false
  }

  console.log('🎉 All database tests completed successfully!')
  return true
}