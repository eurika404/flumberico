"use client"

import { useState } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import Link from "next/link"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const navItems = [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Results", href: "/results" },
    { label: "FAQ", href: "/faq" },
  ]

  const footerLinks = [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-midnight border-b border-border backdrop-blur-md bg-opacity-80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-smooth">
            <img
              src="/images/design-mode/FlumbericoLogo.png"
              alt="Flumberico Logo"
              className="h-34 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:text-cyan transition-smooth relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}

            {/* Resources Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-muted-foreground hover:text-cyan transition-smooth">
                Resources
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2">
                {footerLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block px-4 py-2 text-muted-foreground hover:text-cyan hover:bg-midnight-light transition-smooth"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/onboarding">
              <button className="px-6 py-2 bg-cyan text-midnight font-semibold rounded-full hover:bg-cyan-dark transition-smooth glow-cyan hover:glow-cyan-lg animate-glow-pulse">
                Join Now
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-cyan" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-2 animate-slide-in-up">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-4 py-2 text-muted-foreground hover:text-cyan transition-smooth"
              >
                {item.label}
              </a>
            ))}

            {/* Mobile Resources */}
            <div className="px-4 py-2">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 text-muted-foreground hover:text-cyan transition-smooth w-full"
              >
                Resources
                <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {isDropdownOpen && (
                <div className="mt-2 space-y-1 pl-4 border-l border-border">
                  {footerLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="block py-2 text-muted-foreground hover:text-cyan transition-smooth"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/onboarding" className="w-full">
              <button className="w-full mt-4 px-6 py-2 bg-cyan text-midnight font-semibold rounded-full hover:bg-cyan-dark transition-smooth">
                Join Now
              </button>
            </Link>
          </nav>
        )}
      </div>
      <meta name="google-site-verification" content="pzjKK8teB-gOZ8maQp6Az3XzahPu9FJpszafxGBoEXE" />
    </header>
  )
}
