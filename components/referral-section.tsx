"use client"

import { Share2, Sparkles } from "lucide-react"

export default function SocialShareSection() {
  const shareUrl = encodeURIComponent("https://flumbericoco.com")
  const shareText = encodeURIComponent(
    "🚀 Discover Flumbericoco — an AI-powered career growth platform designed to help you land your dream job!"
  )

  return (
    <section className="py-20 px-6 bg-midnight-light text-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
          Share the <span className="text-cyan">Future of Career Growth</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
          Spread the word and help your friends discover how AI can unlock better jobs and smarter career paths with Flumbericoco.
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

        {/* CTA Button */}
        <button
          onClick={() => window.open("https://upvir.al/166486/Flumberico", "_blank")}
          className="px-10 py-4 bg-[#bcff00] text-[#0a1428] font-extrabold rounded-full text-lg hover:opacity-90 transition-all shadow-lg flex items-center gap-2 mx-auto"
        >
          <Sparkles size={20} /> Join the Early Access Campaign
        </button>
      </div>
    </section>
  )
}
