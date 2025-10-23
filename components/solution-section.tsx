export default function SolutionSection() {
  const steps = [
    {
      icon: "1️⃣",
      title: "Share Your Dream",
      description: "Tell Flumberico your goals.",
    },
    {
      icon: "2️⃣",
      title: "AI Scans 1M+ Jobs",
      description: "From LinkedIn & hidden boards.",
    },
    {
      icon: "3️⃣",
      title: "Auto-Apply Smartly",
      description: "Custom resumes for each posting.",
    },
    {
      icon: "4️⃣",
      title: "Show Up to Win",
      description: "Get interview insights & salary help.",
    },
  ]

  const benefits = [
    { icon: "⚡", label: "200+ Monthly Applications" },
    { icon: "🎯", label: "94% ATS Match Accuracy" },
    { icon: "💰", label: "Built-In Salary Scripts" },
    { icon: "🛡️", label: "Stealth Mode for Privacy" },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance animate-fade-in text-center">
          How <span className="text-cyan">Flumberico Works</span>
        </h2>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-6 mb-16 mt-12">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative bg-midnight-light p-6 rounded-xl border border-border hover:border-cyan transition-smooth animate-slide-in-up hover:scale-105"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mb-8">
          <p className="text-xl text-cyan font-semibold">No endless job hunting. Just results.</p>
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
