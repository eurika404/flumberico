import Header from "@/components/header"
import Footer from "@/components/footer"
import { TrendingUp, Users, Award, Zap } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Flumberico Results - AI Job Search Success Stories | 83% Success Rate",
  description: "See real results from Flumberico's AI job search automation. 83% success rate with 30-day interview guarantee. Real users landed dream jobs with 200+ automated applications.",
  keywords: "Flumberico results, AI job search success, automated job applications results, job search success stories, 30-day interview guarantee results, ATS optimization results, job hunting success, career advancement results",
  openGraph: {
    title: "Flumberico Results - AI Job Search Success Stories",
    description: "Real success stories: 83% of users land interviews with AI job search automation. See how we transform job hunting.",
    type: "website",
  },
}

export default function Results() {
  const stats = [
    {
      number: "15,000+",
      label: "Active Users",
      icon: Users,
      delay: "stagger-1",
    },
    {
      number: "89%",
      label: "Success Rate",
      icon: TrendingUp,
      delay: "stagger-2",
    },
    {
      number: "21 days",
      label: "Average Hiring Time",
      icon: Zap,
      delay: "stagger-3",
    },
    {
      number: "+23%",
      label: "Salary Increase",
      icon: Award,
      delay: "stagger-4",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Senior Product Manager",
      company: "Google",
      image: "👩‍💼",
      quote:
        "Flumberico completely changed how I approach job hunting. Within 3 weeks, I received 5 offers from top companies. Incredible!",
      salary: "$180,000",
      delay: "stagger-1",
    },
    {
      name: "Michael Chen",
      role: "Full Stack Developer",
      company: "Meta",
      image: "👨‍💻",
      quote:
        "I never thought I could land a job at Meta. Flumberico made the entire process effortless and efficient.",
      salary: "$250,000",
      delay: "stagger-2",
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      company: "Apple",
      image: "👩‍🎨",
      quote:
        "The AI-optimized resume made a huge difference. I got more interviews in one month than I did in an entire year before.",
      salary: "$165,000",
      delay: "stagger-3",
    },
    {
      name: "David Park",
      role: "Data Scientist",
      company: "OpenAI",
      image: "👨‍🔬",
      quote:
        "Flumberico is a game changer. Automated applications and personalized resumes helped me focus on interview prep.",
      salary: "$220,000",
      delay: "stagger-4",
    },
    {
      name: "Jessica Williams",
      role: "Marketing Manager",
      company: "Amazon",
      image: "👩‍💼",
      quote:
        "I’m amazed by Flumberico’s success rate. I landed my dream job in less than a month.",
      salary: "$155,000",
      delay: "stagger-5",
    },
    {
      name: "Alex Thompson",
      role: "DevOps Engineer",
      company: "Microsoft",
      image: "👨‍💻",
      quote:
        "Flumberico didn’t just help me get a job—it helped me increase my salary by 35%. Best investment ever.",
      salary: "$195,000",
      delay: "stagger-1",
    },
  ]

  const successStories = [
    {
      title: "From Unemployed to Senior Engineer",
      description:
        "After six months of unemployment, Rudi used Flumberico and landed a Senior Engineer position at a unicorn startup in just 18 days.",
      metrics: ["18 days", "5 offers", "+$80,000 salary"],
      delay: "stagger-1",
    },
    {
      title: "Successful Career Pivot",
      description:
        "Siti wanted to switch from finance to tech. With Flumberico’s help, she secured a Product Manager role at a leading tech company.",
      metrics: ["25 days", "3 offers", "Career change"],
      delay: "stagger-2",
    },
    {
      title: "Better Salary Negotiations",
      description:
        "Budi used Flumberico to generate multiple offers, giving him leverage to negotiate a higher salary.",
      metrics: ["21 days", "7 offers", "+$45,000 raise"],
      delay: "stagger-3",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center animate-slide-in-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Proven <span className="text-cyan">Results</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Thousands of professionals have transformed their careers with Flumberico. See their real success stories.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-midnight-light/50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className={`animate-slide-in-up ${stat.delay} text-center p-8 rounded-lg bg-card border border-border hover:border-cyan/50 transition-all duration-300`}
              >
                <Icon className="w-12 h-12 text-cyan mx-auto mb-4" />
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            What Our <span className="text-cyan">Users Say</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`animate-slide-in-up ${t.delay} p-6 rounded-lg bg-card border border-border hover:border-cyan/50 transition-all duration-300`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{t.image}</div>
                  <div>
                    <h3 className="font-bold">{t.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t.role} @ {t.company}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4 italic">"{t.quote}"</p>
                <div className="text-cyan font-semibold">{t.salary}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-midnight-light/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Success <span className="text-cyan">Stories</span>
          </h2>

          <div className="space-y-8">
            {successStories.map((s, i) => (
              <div
                key={i}
                className={`animate-slide-in-up ${s.delay} p-8 rounded-lg bg-card border border-border hover:border-cyan/50 transition-all duration-300`}
              >
                <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
                <p className="text-muted-foreground mb-6">{s.description}</p>
                <div className="flex flex-wrap gap-4">
                  {s.metrics.map((m, j) => (
                    <div
                      key={j}
                      className="px-4 py-2 bg-cyan/10 border border-cyan/30 rounded-full text-cyan font-semibold"
                    >
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Flumberico vs <span className="text-cyan">Traditional Job Search</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-lg bg-card border border-border">
              <h3 className="text-2xl font-bold mb-6 text-red-400">Traditional Job Search</h3>
              <ul className="space-y-4 text-muted-foreground">
                {[
                  "Manually browsing job boards",
                  "Rewriting resumes for every application",
                  "5–10 applications per month",
                  "Waiting 2–3 months for responses",
                  "No significant salary growth",
                  "Slow, tedious, and time-consuming process",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-red-400">✗</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-lg bg-gradient-to-br from-cyan/10 to-transparent border border-cyan/30 glow-cyan">
              <h3 className="text-2xl font-bold mb-6 text-cyan">Flumberico</h3>
              <ul className="space-y-4 text-foreground">
                {[
                  "AI searches 200+ jobs per month",
                  "Automatically optimized resumes per job",
                  "200+ high-quality applications per month",
                  "Average hiring time of 21 days",
                  "Average +23% salary increase",
                  "Automated, efficient, and proven results",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-cyan">✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Be the Next Success Story</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of professionals who have accelerated their careers with Flumberico.
          </p>
          <Link href="/">
            <button className="px-8 py-4 bg-cyan text-midnight font-bold rounded-full hover:bg-cyan-dark transition-smooth glow-cyan hover:glow-cyan-lg animate-glow-pulse text-lg">
              Start Your Journey
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
