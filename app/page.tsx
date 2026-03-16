import Link from "next/link";
import TopNav from "@/components/TopNav";

export default function HomePage() {
  return (
    <main>
      <div className="hero">
        <TopNav />
        <section className="shell hero-grid">
          <div>
            <div className="kicker">Relational clarity</div>
            <h1>Understand the moment. Lower the pressure. Choose the next move with care.</h1>
            <p>
              Defrag helps you make sense of distance, mixed signals, silence,
              and hard conversations so you can respond with more steadiness and less regret.
            </p>
            <div className="row" style={{ marginTop: 26 }}>
              <Link href="/app" className="btn btn-primary">Start</Link>
              <Link href="/pricing" className="btn btn-secondary">Pricing</Link>
            </div>
          </div>

          <div className="hero-card">
            <div style={{ fontWeight: 800, fontSize: 18 }}>What Defrag gives you</div>
            <p style={{ color: "rgba(255,255,255,.68)", lineHeight: 1.65 }}>
              A calmer read on what may be happening, how tense the moment feels,
              what to avoid, and what kind of next message is least likely to make things worse.
            </p>
            <div className="hero-metric">
              <div className="mini-card">
                <div className="label">What may be happening</div>
                <div className="value" style={{ fontSize: 18 }}>Clearer</div>
              </div>
              <div className="mini-card">
                <div className="label">Pressure level</div>
                <div className="value" style={{ fontSize: 18 }}>Visible</div>
              </div>
              <div className="mini-card">
                <div className="label">Next move</div>
                <div className="value" style={{ fontSize: 18 }}>Calmer</div>
              </div>
              <div className="mini-card">
                <div className="label">Message option</div>
                <div className="value" style={{ fontSize: 18 }}>Ready</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="section">
        <div className="shell">
          <div className="grid grid-3">
            <div className="card">
              <div className="kicker">Clarity</div>
              <h3>See what may be happening</h3>
              <p className="muted">Get a simple explanation of the dynamics without jargon or overcomplication.</p>
            </div>
            <div className="card">
              <div className="kicker">Stability</div>
              <h3>See when pressure is rising</h3>
              <p className="muted">Understand whether the moment needs space, softness, or a direct response.</p>
            </div>
            <div className="card">
              <div className="kicker">Action</div>
              <h3>Choose a better next step</h3>
              <p className="muted">Get one calm move and one message option that is more likely to help than harm.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
