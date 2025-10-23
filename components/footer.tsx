export default function Footer() {
  return (
    <footer className="bg-midnight border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/images/design-mode/FlumbericoLogo.png"
                alt="Flumberico"
                className="h-34 w-auto object-contain"
              />
            </div>
            <p className="text-muted-foreground text-sm">Your AI job hunter that works while you sleep.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <a href="/how-it-works" className="hover:text-cyan transition-smooth">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/pricing" className="hover:text-cyan transition-smooth">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/results" className="hover:text-cyan transition-smooth">
                  Results
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <a href="/about" className="hover:text-cyan transition-smooth">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-cyan transition-smooth">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <a href="/privacy" className="hover:text-cyan transition-smooth">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-cyan transition-smooth">
                  Terms
                </a>
              </li>
              <li>
                <a href="/cookies" className="hover:text-cyan transition-smooth">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; 2025 Flumberico. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
