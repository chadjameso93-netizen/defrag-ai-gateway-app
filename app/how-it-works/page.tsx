import TopNav from "@/components/TopNav";
import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <main className="landing-root">
      <TopNav />

      <section className="shell static-page">
        <div className="kicker">How it works</div>
        <h1 className="static-title">A clearer read, built in layers.</h1>
        <p className="static-copy">
          Defrag starts with your profile, then adds relationship context, timing, and interaction patterns to create a clearer read of what is happening.
        </p>

        <div className="static-grid">
          <section className="rail-map-surface">
            <div className="result-title">1. Build your profile</div>
            <div className="result-copy">
              Add your birth details and current location so Defrag can create a stronger baseline.
            </div>
          </section>

          <section className="rail-map-surface">
            <div className="result-title">2. Add your people</div>
            <div className="result-copy">
              Invite others by link or add them by hand to build your relationship system.
            </div>
          </section>

          <section className="rail-map-surface">
            <div className="result-title">3. Ask naturally</div>
            <div className="result-copy">
              Use Defrag AI like a conversation. It replies in plain language and shows more depth only when you want it.
            </div>
          </section>

          <section className="rail-map-surface">
            <div className="result-title">4. See the full view</div>
            <div className="result-copy">
              Track daily guidance, live state, and the system around the relationship so you are not reacting in the dark.
            </div>
          </section>
        </div>

        <div className="actions" style={{ marginTop: 28 }}>
          <Link href="/app" className="btn btn-primary">Open Defrag</Link>
          <Link href="/pricing" className="btn btn-secondary">View pricing</Link>
        </div>
      </section>
    </main>
  );
}
