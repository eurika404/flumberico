"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Mail, Phone, MapPin, Send } from "lucide-react"

<<<<<<< HEAD

=======
>>>>>>> 87c15452b50e1e50ab1b328fee0291f5f69d2d83
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" })
      setSubmitted(false)
    }, 3000)
  }

  const contactInfo = [
    { icon: Mail, label: "Email", value: "hello@flumberico.com" },
<<<<<<< HEAD
    { icon: Phone, label: "Phone", value: "1 336-457-3841" },
    { icon: MapPin, label: "Location", value: "4976 Keyser Ridge Road, Greensboro, NC 27401" },
=======
    { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
    { icon: MapPin, label: "Location", value: "San Francisco, CA" },
>>>>>>> 87c15452b50e1e50ab1b328fee0291f5f69d2d83
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
<<<<<<< HEAD
            Ready to Transform Your <span className="text-cyan">Job Search?</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Have questions about AI job search automation? Our team is here to help you land interviews with 83% success rate.
          </p>
          <div className="flex justify-center gap-8 text-sm text-muted-foreground mt-4">
            <div>✓ 30-Day Interview Guarantee</div>
            <div>✓ 200+ Monthly Applications</div>
            <div>✓ 94% ATS Match Accuracy</div>
          </div>
=======
            Get in <span className="text-cyan">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
>>>>>>> 87c15452b50e1e50ab1b328fee0291f5f69d2d83
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <div
                  key={info.label}
                  className="bg-card border border-border rounded-lg p-6 text-center hover:border-cyan transition-smooth animate-slide-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon className="w-8 h-8 text-cyan mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{info.label}</h3>
                  <p className="text-muted-foreground">{info.value}</p>
                </div>
              )
            })}
          </div>

          {/* Contact Form */}
          <div className="bg-card border border-border rounded-lg p-8 animate-slide-in-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-midnight border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan transition-smooth"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-midnight border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan transition-smooth"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-midnight border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan transition-smooth"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 bg-midnight border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan transition-smooth resize-none"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-cyan text-midnight font-semibold rounded-lg hover:bg-cyan-dark transition-smooth glow-cyan flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Send Message
              </button>

              {submitted && (
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-center animate-slide-in-up">
                  Thank you! We'll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
