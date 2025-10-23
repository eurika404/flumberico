<<<<<<< HEAD
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata = {
  title: "Privacy Policy - Flumberico AI Job Search Automation",
  description: "Flumberico's privacy policy for AI job search automation. Learn how we protect your data with stealth mode privacy, secure job applications, and 30-day interview guarantee.",
  keywords: "Flumberico privacy policy, AI job search privacy, automated job applications privacy, stealth mode job search, data protection, ATS optimization privacy, job search security, user privacy",
  openGraph: {
    title: "Privacy Policy - Flumberico AI Job Search Automation",
    description: "Your privacy matters. Learn how Flumberico protects your job search data with stealth mode and secure AI automation.",
    type: "website",
  },
}

=======
"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"

>>>>>>> 87c15452b50e1e50ab1b328fee0291f5f69d2d83
export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-12 text-cyan animate-fade-in">Privacy Policy</h1>

          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <div className="animate-slide-in-up">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
              <p>
                Flumberico ("we", "us", "our", or "Company") operates the Flumberico website and application. This page
                informs you of our policies regarding the collection, use, and disclosure of personal data when you use
                our Service and the choices you have associated with that data.
              </p>
            </div>

            <div className="animate-slide-in-up stagger-1">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information Collection and Use</h2>
              <p>
                We collect several different types of information for various purposes to provide and improve our
                Service to you.
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Personal Data: Name, email address, phone number, resume, job preferences</li>
                <li>Usage Data: Browser type, IP address, pages visited, time and date of visits</li>
                <li>Cookies and Tracking: We use cookies to track activity on our Service</li>
              </ul>
            </div>

            <div className="animate-slide-in-up stagger-2">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Use of Data</h2>
              <p>Flumberico uses the collected data for various purposes:</p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information to improve our Service</li>
              </ul>
            </div>

            <div className="animate-slide-in-up stagger-3">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Security of Data</h2>
              <p>
                The security of your data is important to us but remember that no method of transmission over the
                Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable
                means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>
            </div>

            <div className="animate-slide-in-up stagger-4">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.
              </p>
            </div>

            <div className="animate-slide-in-up stagger-5">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at privacy@flumberico.com</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
