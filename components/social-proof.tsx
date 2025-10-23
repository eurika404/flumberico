export default function SocialProof() {
  const testimonials = [
    {
      name: "Sarah T.",
      title: "Marketing Analyst",
      quote: "Flumberico got me 8 interviews in 3 weeks.",
      image: "/Sarah.jpg",
    },
    {
      name: "Marcus L.",
      title: "Product Manager",
      quote: "Landed a $140K job in 19 days.",
      image: "/Marcus.jpg",
    },
    {
      name: "Priya K.",
      title: "Software Engineer",
      quote: "Flumberico saved me from burnout.",
      image: "/Priya.jpg",
    },
  ]

  const stats = [
    { label: "success rate", value: "83%" },
    { label: "on waitlist", value: "3,847+" },
    { label: "ATS match accuracy", value: "94%" },
    { label: "monthly applications", value: "200+" },
  ]

  return (
    <section id="results" className="py-20 px-4 sm:px-6 lg:px-8 bg-midnight-light">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-balance">
          Real Results from <span className="text-cyan">Real Flumberico Users</span>
        </h2>

        {/* Stats Bar */}
        <div className="grid md:grid-cols-4 gap-4 bg-midnight p-8 rounded-xl border border-border mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="text-3xl font-bold text-cyan mb-2">{stat.value}</p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="p-6 bg-midnight rounded-xl border border-border hover:border-cyan transition-smooth hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={`${testimonial.name}, ${testimonial.title}`}
                  className="w-12 h-12 rounded-full object-cover mr-3 ring-2 ring-cyan/20"
                />
                <div>
                  <p className="font-semibold text-cyan">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </div>
              <p className="text-lg italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>

        {/* Founder Section */}
        <div className="text-center bg-midnight p-8 rounded-xl border border-border">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-cyan mb-4">Built by people who get it</h3>
            <div className="flex items-center justify-center mb-4">
              <img
                src="/Alex.jpg"
                alt="Alex R., Founder of Flumberico"
                className="w-16 h-16 rounded-full object-cover mr-4 ring-2 ring-cyan/20"
              />
              <div className="text-left">
                <p className="font-semibold text-white">Alex R., Founder of Flumberico</p>
                <p className="text-sm text-muted-foreground">Former recruiter + data scientist</p>
              </div>
            </div>
            <p className="text-muted-foreground italic">
              "Built by ex-recruiters and data scientists who hated job hunting too."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
