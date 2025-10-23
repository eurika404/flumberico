export default function SocialProof() {
  const testimonials = [
    { name: "Sarah T.", quote: "Flumberico got me 8 interviews in 3 weeks." },
    { name: "Marcus L.", quote: "Landed a $140K job in 19 days." },
    { name: "Priya K.", quote: "Flumberico saved me from burnout." },
  ]

  const stats = [
    { label: "83% success", value: "83%" },
    { label: "3,847 on waitlist", value: "3,847" },
    { label: "94% ATS match", value: "94%" },
    { label: "200+ monthly apps", value: "200+" },
  ]

  return (
    <section id="results" className="py-20 px-4 sm:px-6 lg:px-8 bg-midnight-light">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-balance">
          Real Results from <span className="text-cyan">Real Flumberico Users</span>
        </h2>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="p-6 bg-midnight rounded-xl border border-border">
              <p className="text-lg mb-4 italic">"{testimonial.quote}"</p>
              <p className="font-semibold text-cyan">— {testimonial.name}</p>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="grid md:grid-cols-4 gap-4 bg-midnight p-8 rounded-xl border border-border">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="text-3xl font-bold text-cyan mb-2">{stat.value}</p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
