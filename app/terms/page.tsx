<<<<<<< HEAD
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata = {
  title: "Terms of Service - Flumberico AI Job Search Automation",
  description: "Flumberico's terms of service for AI job search automation with 30-day interview guarantee. Terms for applying to 200+ jobs while you sleep with 83% success rate.",
  keywords: "Flumberico terms of service, AI job search terms, automated job applications terms, 30-day interview guarantee terms, ATS optimization terms, job search automation terms, service agreement",
  openGraph: {
    title: "Terms of Service - Flumberico AI Job Search Automation",
    description: "Terms and conditions for AI job search automation service with 30-day interview guarantee and 200+ monthly applications.",
    type: "website",
  },
}

=======
"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"

>>>>>>> 87c15452b50e1e50ab1b328fee0291f5f69d2d83
export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-12 text-cyan animate-fade-in">Terms of Service</h1>

          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <div className="animate-slide-in-up">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing and using the Flumberico website and application, you accept and agree to be bound by the
                terms and provision of this agreement. If you do not agree to abide by the above, please do not use this
                service.
              </p>
            </div>

            <div className="animate-slide-in-up stagger-1">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) on
                Flumberico's website for personal, non-commercial transitory viewing only. This is the grant of a
                license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or for any public display</li>
                <li>Attempting to decompile or reverse engineer any software contained on the website</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
              </ul>
            </div>

            <div className="animate-slide-in-up stagger-2">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Disclaimer</h2>
              <p>
                The materials on Flumberico's website are provided on an 'as is' basis. Flumberico makes no warranties,
                expressed or implied, and hereby disclaims and negates all other warranties including, without
                limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or
                non-infringement of intellectual property or other violation of rights.
              </p>
            </div>

            <div className="animate-slide-in-up stagger-3">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Limitations</h2>
              <p>
                In no event shall Flumberico or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                to use the materials on Flumberico's website.
              </p>
            </div>

            <div className="animate-slide-in-up stagger-4">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Accuracy of Materials</h2>
              <p>
                The materials appearing on Flumberico's website could include technical, typographical, or photographic
                errors. Flumberico does not warrant that any of the materials on its website are accurate, complete, or
                current. Flumberico may make changes to the materials contained on its website at any time without
                notice.
              </p>
            </div>

            <div className="animate-slide-in-up stagger-5">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Contact Information</h2>
              <p>If you have any questions about these Terms of Service, please contact us at legal@flumberico.com</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
