#!/usr/bin/env ts-node

import { runAllTests } from '../lib/test-database'

async function main() {
  console.log('🧪 Running AutoJobMatch Database Tests')
  console.log('=====================================\n')

  const success = await runAllTests()

  if (success) {
    console.log('\n✅ All tests passed! Database is ready for use.')
    process.exit(0)
  } else {
    console.log('\n❌ Some tests failed. Please check the errors above.')
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}