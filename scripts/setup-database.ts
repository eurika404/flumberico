#!/usr/bin/env ts-node

import { supabaseAdmin } from '../lib/supabase'
import fs from 'fs'
import path from 'path'

async function setupDatabase() {
  console.log('🚀 Starting database setup...')

  try {
    // Read and execute the schema
    const schemaPath = path.join(__dirname, '../supabase/schema.sql')
    const schema = fs.readFileSync(schemaPath, 'utf8')

    console.log('📝 Executing database schema...')

    // Split schema into individual statements
    const statements = schema
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0)

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i]
      console.log(`Executing statement ${i + 1}/${statements.length}...`)

      const { error } = await supabaseAdmin.rpc('exec_sql', { sql_statement: statement })

      if (error) {
        console.error(`❌ Error executing statement ${i + 1}:`, error)
        throw error
      }
    }

    console.log('✅ Database schema created successfully!')

    // Test basic connectivity
    console.log('🔍 Testing database connectivity...')
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('count')
      .limit(1)

    if (error) {
      console.error('❌ Database connectivity test failed:', error)
      throw error
    }

    console.log('✅ Database connectivity test passed!')
    console.log('🎉 Database setup completed successfully!')

  } catch (error) {
    console.error('❌ Database setup failed:', error)
    process.exit(1)
  }
}

if (require.main === module) {
  setupDatabase()
}