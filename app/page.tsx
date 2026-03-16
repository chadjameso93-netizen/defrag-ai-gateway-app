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
            <h1>Clarity for complex relationship moments.</h1>
            <p>
              Understand what may be happening, how much pressure is building,
              and what kind of next move is least likely to make things worse.
            </p>

            <div className="row" style={{ marginTop: 26 }}>
              <Link href="/app" className="btn btn-primary">Open Defrag</Link>
              <Link href="/pricing" className="btn btn-secondary">Pricing</Link>
            </div>
          </div>

          <div className="hero-card">
            <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 14 }}>A calmer read, in seconds</div>

            <div className="result-block">
              <div className="result-title">What may be happening</div>
              <div className="result-copy">The situation may be more sensitive than it looks, and pace matters more than force right now.</div>
            </div>

            <div className="result-block">
              <div className="result-title">What helps now</div>
              <div className="result-copy">Keep the next move short, low-pressure, and easy to receive.</div>
            </div>

            <div className="result-block">
              <div className="message-box">
                <div className="result-title">Message option</div>
                <div className="result-copy">I want to handle this carefully. I’m open to talking when it feels like a better time.</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="section">
        <div className="shell">
          <div className="grid" style={{ gridTemplateColumns: "1.4fr .8fr", gap: 24 }}>
            <div className="card">
              <div className="kicker">What Defrag does</div>
              <h3 style={{ fontSize: 28, marginTop: 0 }}>See the moment more clearly.</h3>
              <p className="muted" style={{ maxWidth: 680 }}>
                Defrag helps you interpret distance, silence, mixed signals, and rising tension.
                It gives you a calmer read on what may be happening, what to avoid, and what to do next.
              </p>
            </div>

            <div className="card">
              <div className="kicker">Use cases</div>
              <p className="muted">Silence</p>
              <p className="muted">Mixed signals</p>
              <p className="muted">Hard conversations</p>
              <p className="muted">Message drafting</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
