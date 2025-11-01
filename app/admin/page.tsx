import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { JobProcessingDashboard } from '@/components/admin/JobProcessingDashboard'

export default async function AdminPage() {
  const user = await currentUser()

  if (!user) {
    redirect('/sign-in')
  }

  // TODO: Add proper admin role checking
  // const { role } = await getUserRole(user.id)
  // if (role !== 'admin') {
  //   redirect('/dashboard')
  // }

  return <JobProcessingDashboard />
}