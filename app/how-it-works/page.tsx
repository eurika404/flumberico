import HowItWorksClient from "./_client"

export const metadata = {
  title: "How Flumberico Works - AI Job Search Automation | 4-Step Process",
  description:
    "Discover how Flumberico's AI applies to 200+ jobs while you sleep. Our 4-step automated job search process includes ATS optimization, custom resumes, and 30-day interview guarantee.",
  keywords:
    "how Flumberico works, AI job search process, automated job applications, ATS optimization, resume automation, job search steps, AI job matching, automated applications, job hunting automation, career advancement",
  openGraph: {
    title: "How Flumberico Works - AI Job Search Automation",
    description: "4-step process: AI applies to 200+ jobs with custom resumes while you sleep. 83% success rate.",
    type: "website",
  },
}

export default function HowItWorks() {
  return <HowItWorksClient />
}
