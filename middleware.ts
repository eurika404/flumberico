import { authMiddleware } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export default authMiddleware({
  publicRoutes: [
    '/',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/api/webhooks(.*)',
    '/api/clerk-webhook',
  ],
  ignoredRoutes: [
    '/api/webhooks(.*)',
    '/api/clerk-webhook',
  ],
  afterAuth: (auth, req) => {
    // Handle users who are logged in
    if (auth.userId && !auth.isPublicRoute) {
      // Redirect to onboarding if user hasn't completed it
      if (req.nextUrl.pathname === '/dashboard') {
        // You might want to check if user has completed onboarding
        // For now, we'll let them access the dashboard
        return NextResponse.next()
      }
    }

    // Handle users who are not logged in
    if (!auth.userId && !auth.isPublicRoute) {
      const signInUrl = new URL('/sign-in', req.url)
      signInUrl.searchParams.set('redirect_url', req.url)
      return NextResponse.redirect(signInUrl)
    }

    return NextResponse.next()
  },
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}