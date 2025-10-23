"use client"

<<<<<<< HEAD
import { Sparkles, CheckCircle, User } from "lucide-react"

export default function ReferralSection() {
  const shareUrl = encodeURIComponent("https://flumberico.com")
  const shareText = encodeURIComponent(
    "🚀 Flumberico applies to 200+ dream jobs for you while you sleep. Get your dream job in 30 days or they pay you $500!"
=======
import { Share2, Sparkles } from "lucide-react"

export default function SocialShareSection() {
  const shareUrl = encodeURIComponent("https://flumbericoco.com")
  const shareText = encodeURIComponent(
    "🚀 Discover Flumbericoco — an AI-powered career growth platform designed to help you land your dream job!"
>>>>>>> 87c15452b50e1e50ab1b328fee0291f5f69d2d83
  )

  return (
    <section className="py-20 px-6 bg-midnight-light text-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
<<<<<<< HEAD
        {/* Success Message */}
        <div className="mb-8 inline-flex items-center gap-2 px-6 py-3 bg-green-500/20 border border-green-500/30 rounded-full">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="text-green-400 font-semibold">You're on the list!</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
          Share Flumberico to <span className="text-cyan">Skip the Line</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
          Refer 3 friends and get instant access. No waiting for the official launch.
=======
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
          Share the <span className="text-cyan">Future of Career Growth</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
          Spread the word and help your friends discover how AI can unlock better jobs and smarter career paths with Flumbericoco.
>>>>>>> 87c15452b50e1e50ab1b328fee0291f5f69d2d83
        </p>

        {/* Social Media Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <a
            href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#25D366] text-white rounded-full font-semibold hover:opacity-90 transition-all"
          >
            WhatsApp
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#0077B5] text-white rounded-full font-semibold hover:opacity-90 transition-all"
          >
            LinkedIn
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${shareText}%20${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#1DA1F2] text-white rounded-full font-semibold hover:opacity-90 transition-all"
          >
            X (Twitter)
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#1877F2] text-white rounded-full font-semibold hover:opacity-90 transition-all"
          >
            Facebook
          </a>
        </div>

<<<<<<< HEAD
        {/* Progress */}
        <div className="mb-8 bg-midnight p-6 rounded-xl border border-border">
          <h3 className="text-lg font-semibold text-cyan mb-4">Your Referral Progress</h3>
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((friend) => (
              <div
                key={friend}
                className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center"
              >
                <User className="w-6 h-6 text-muted-foreground" />
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            0 of 3 friends referred • Share to unlock instant access
          </p>
        </div>

        {/* Primary CTA Button */}
        <button
          onClick={() => window.open("https://upvir.al/166486/Flumberico", "_blank")}
          className="px-10 py-4 bg-cyan text-midnight font-extrabold rounded-full text-lg hover:bg-cyan-dark transition-all shadow-lg flex items-center gap-2 mx-auto"
        >
          <Sparkles size={20} /> Refer 3 Friends & Skip the Line
        </button>

        {/* Secondary Option */}
        <p className="mt-6 text-sm text-muted-foreground">
          Or{" "}
          <button
            onClick={() => window.open("https://upvir.al/166486/Flumberico", "_blank")}
            className="text-cyan hover:text-cyan-light underline"
          >
            join the regular waitlist
          </button>
        </p>
=======
        {/* CTA Button */}
        <button
          onClick={() => window.open("https://upvir.al/166486/Flumberico", "_blank")}
          className="px-10 py-4 bg-[#bcff00] text-[#0a1428] font-extrabold rounded-full text-lg hover:opacity-90 transition-all shadow-lg flex items-center gap-2 mx-auto"
        >
          <Sparkles size={20} /> Join the Early Access Campaign
        </button>
>>>>>>> 87c15452b50e1e50ab1b328fee0291f5f69d2d83
      </div>
    </section>
  )
}
