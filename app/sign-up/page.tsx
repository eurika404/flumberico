import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'
import { ArrowLeft, Sparkles } from 'lucide-react'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      <div className="relative w-full max-w-md">
        {/* Back to home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Logo and title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-indigo-400" />
            <h1 className="text-3xl font-bold text-white">AutoJobMatch</h1>
          </div>
          <p className="text-slate-400">
            Start your journey to the perfect job match with AI-powered recommendations.
          </p>
        </div>

        {/* Clerk SignUp component */}
        <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-6">
          <SignUp
            appearance={{
              elements: {
                card: 'bg-transparent shadow-none',
                header: 'hidden',
                socialButtons: 'grid grid-cols-1 gap-3',
                formButtonPrimary: 'w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors',
                formFieldInput: 'w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
                dividerRow: 'my-6',
                dividerText: 'text-slate-400 bg-slate-900 px-4',
                footerAction: 'mt-6 text-center',
                footerActionLink: 'text-indigo-400 hover:text-indigo-300 font-medium',
              }
            }}
            redirectUrl="/onboarding"
          />
        </div>

        {/* Sign in link */}
        <div className="text-center mt-6">
          <p className="text-slate-400">
            Already have an account?{' '}
            <Link
              href="/sign-in"
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}