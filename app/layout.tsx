import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import AnimatedBackground from "@/components/animated-background"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"], display: "swap" })
const _geistMono = Geist_Mono({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: {
    default: "Flumberico - AI Job Hunter | Your Dream Job in 30 Days",
    template: "%s | Flumberico",
  },
  description:
    "Flumberico is an AI-powered job hunter that applies to 200+ personalized job listings per month using optimized resumes and cover letters. Get your dream job in 30 days — or we pay you $500.",
  keywords: [
    "AI job search",
    "AI resume builder",
    "AI job hunter",
    "career growth",
    "AI job assistant",
    "automated job applications",
    "job search automation",
    "AI hiring platform",
    "Flumberico",
    "Flumbericoco",
    "Flumber ico",
  ],
  authors: [{ name: "Flumberico", url: "https://flumberico.com" }],
  creator: "Flumberico",
  publisher: "Flumberico",
  generator: "Next.js",
  metadataBase: new URL("https://flumberico.com"),
  openGraph: {
    title: "Flumberico - AI Job Hunter | Get Your Dream Job in 30 Days",
    description:
      "Flumberico AI applies for 200+ jobs monthly using custom resumes. Land your dream job in 30 days or get $500 back.",
    url: "https://flumberico.com",
    siteName: "Flumberico",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://flumberico.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Flumberico - AI Job Hunter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flumberico - AI Job Hunter | Dream Job in 30 Days",
    description:
      "Flumberico uses AI to find and apply to your perfect jobs. Personalized, automated, and guaranteed.",
    creator: "@flumberico",
    images: ["https://flumberico.com/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://flumberico.com",
  },
  themeColor: "#000000",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* ✅ Structured Data (JSON-LD for Google Rich Snippets) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Flumberico",
              url: "https://flumberico.com",
              logo: "https://flumberico.com/logo.png",
              sameAs: [
                "https://twitter.com/flumberico",
                "https://linkedin.com/company/flumberico",
              ],
              description:
                "Flumberico helps you land your dream job using AI — applying to 200+ personalized job openings per month.",
            }),
          }}
        />
        {/* ✅ Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${_geist.className} ${_geistMono.className} font-sans antialiased bg-midnight text-white`}
<<<<<<< HEAD
        suppressHydrationWarning={true}
=======
>>>>>>> 87c15452b50e1e50ab1b328fee0291f5f69d2d83
      >
        <AnimatedBackground />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
