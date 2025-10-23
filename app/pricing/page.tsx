import PricingClient from "./PricingClient"

export const metadata = {
  title: "Flumberico Pricing - AI Job Search Automation | Waitlist Access",
  description:
    "Join Flumberico's waitlist for AI job search automation. Apply to 200+ jobs while you sleep with 30-day interview guarantee. Limited to 10,000 spots - 78% filled.",
  keywords:
    "Flumberico pricing, AI job search cost, automated job applications pricing, job search automation cost, 30-day interview guarantee, ATS optimization pricing, resume automation cost, job hunting tools price, career advancement cost",
  openGraph: {
    title: "Flumberico Pricing - AI Job Search Automation",
    description:
      "Limited waitlist access: AI applies to 200+ jobs while you sleep. 83% success rate with $500 guarantee.",
    type: "website",
  },
}

export default function PricingPage() {
  return <PricingClient />
}
