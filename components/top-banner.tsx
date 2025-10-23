export default function TopBanner() {
  return (
    <div className="bg-midnight-light border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="text-cyan font-semibold">🔁 Share Required to Join Flumberico</span>
          <span className="text-muted-foreground">
            We're building the official homepage & onboarding funnel for Flumberico — early-access users must share on
            social media to join the waitlist.
          </span>
        </div>
      </div>
    </div>
  )
}
