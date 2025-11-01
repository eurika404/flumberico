import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { ReactNode } from 'react'

interface ClerkProviderWrapperProps {
  children: ReactNode
}

export function ClerkProviderWrapper({ children }: ClerkProviderWrapperProps) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#6366f1',
          colorBackground: '#0f172a',
          colorInputBackground: '#1e293b',
          colorInputText: '#f1f5f9',
        },
        elements: {
          card: 'bg-slate-900 border-slate-800',
          headerTitle: 'text-slate-100',
          headerSubtitle: 'text-slate-400',
          socialButtonsBlockButton: 'bg-slate-800 border-slate-700 text-slate-100 hover:bg-slate-700',
          formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
          formFieldInput: 'bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400',
          footerActionLink: 'text-indigo-400 hover:text-indigo-300',
        },
      }}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/onboarding"
      afterSignUpUrl="/onboarding"
    >
      {children}
    </ClerkProvider>
  )
}