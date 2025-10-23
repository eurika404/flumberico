export default function SolutionSection() {
  const steps = [
    { number: "1", title: "Share Your Dream", description: "Tell Flumberico your goals." },
    { number: "2", title: "AI Scans 1M+ Jobs", description: "From LinkedIn and hidden boards." },
    { number: "3", title: "Auto-Apply with Custom Resumes", description: "200+ per month." },
    { number: "4", title: "Show Up to Win", description: "Get interviews, insights, and salary help." },
  ]

  const benefits = [
    { icon: "⚡", label: "200+ Monthly Applications" },
    { icon: "🎯", label: "80%+ Match Accuracy" },
    { icon: "💰", label: "Built-In Salary Scripts" },
    { icon: "🛡️", label: "Stealth Mode for Employed Users" },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance animate-fade-in">
          While You Sleep, <span className="text-cyan">Flumberico Hunts Your Dream Job</span>
        </h2>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-6 mb-16 mt-12">
          {steps.map((step, idx) => (
            <div key={idx} className="relative animate-slide-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-cyan text-midnight rounded-full flex items-center justify-center font-bold text-lg animate-glow-pulse">
                  {step.number}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              </div>
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-20 w-12 h-0.5 bg-gradient-to-r from-cyan to-transparent"></div>
              )}
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-4 gap-6 bg-midnight-light p-8 rounded-xl border border-border animate-slide-in-up">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="text-center hover:scale-105 transition-transform"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="text-4xl mb-2 animate-float" style={{ animationDelay: `${idx * 0.2}s` }}>
                {benefit.icon}
              </div>
              <p className="font-semibold">{benefit.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
