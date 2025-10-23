export default function ProblemSection() {
  const painPoints = [
    {
      icon: "🌀",
      title: "Spray & Pray Burnout",
      description: "40 hours/week, still no callbacks.",
    },
    {
      icon: "🤖",
      title: "ATS Black Hole",
      description: "75% of resumes never reach recruiters.",
    },
    {
      icon: "👻",
      title: "Ghosting Epidemic",
      description: "40% of job seekers get zero interviews yearly.",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-midnight-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Applied to 427 Jobs. Got 3 Interviews. <span className="text-cyan">Sound Familiar?</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {painPoints.map((point, idx) => (
            <div
              key={idx}
              className="p-6 bg-midnight rounded-xl border border-border hover:border-cyan transition-smooth animate-slide-in-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="text-4xl mb-4 animate-float" style={{ animationDelay: `${idx * 0.2}s` }}>
                {point.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{point.title}</h3>
              <p className="text-muted-foreground">{point.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center animate-slide-in-up">
          <p className="text-xl text-muted-foreground">
            What if Flumberico made your dream job come to you —{" "}
            <span className="text-cyan font-semibold">while you sleep?</span>
          </p>
        </div>
      </div>
    </section>
  )
}
