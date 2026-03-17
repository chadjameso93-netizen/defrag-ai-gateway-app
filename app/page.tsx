import Link from "next/link";
import TopNav from "@/components/TopNav";

export default function HomePage() {
  return (
    <main>
      <div className="hero">
        <TopNav />
        <section className="shell hero-grid">
          <div>
            <div className="kicker">Defrag</div>
            <h1>Relational intelligence for complex human systems.</h1>
            <p>
              Defrag helps you understand tension, distance, timing, and interpersonal pressure
              through a premium live console built for ongoing relational clarity.
            </p>

            <div className="row" style={{ marginTop: 26 }}>
              <Link href="/app" className="btn btn-primary">Open Console</Link>
              <Link href="/pricing" className="btn btn-secondary">Pricing</Link>
            </div>
          </div>

          <div className="hero-card">
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 14 }}>What Defrag gives you</div>

            <div className="result-block">
              <div className="result-title">Live relational state</div>
              <div className="result-copy">A working read on tension, distance, activation, and system pressure.</div>
            </div>

            <div className="result-block">
              <div className="result-title">Daily guidance</div>
              <div className="result-copy">Morning and evening reads shaped by profile, relationship structure, and recent events.</div>
            </div>

            <div className="result-block">
              <div className="result-title">Relational system</div>
              <div className="result-copy">Profiles, participants, invites, timeline, and an evolving live map.</div>
            </div>
          </div>
        </section>
      </div>

      <section className="section">
        <div className="shell">
          <div className="grid" style={{ gridTemplateColumns: "1.3fr .7fr", gap: 24 }}>
            <div className="card">
              <div className="kicker">Premium console</div>
              <h3 style={{ fontSize: 30, marginTop: 0 }}>Built for continuity, not one-off advice.</h3>
              <p className="muted" style={{ maxWidth: 760 }}>
                Defrag is designed as an ongoing relational intelligence system — profile, timeline,
                participants, daily reads, and live system state all work together.
              </p>
            </div>

            <div className="card">
              <div className="kicker">Access</div>
              <p className="muted">Free preview</p>
              <p className="muted">Defrag Pro unlocks the full system</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
