import Link from "next/link";
import TopNav from "@/components/TopNav";

export default function HomePage() {
  return (
    <main>
      <div className="hero">
        <TopNav />
        <section className="shell hero-grid">
          <div>
            <div className="kicker" style={{ background: "rgba(255,255,255,.1)", color: "#fff" }}>
              Relational clarity
            </div>
            <h1>See what is happening, lower the pressure, and choose the next move with care.</h1>
            <p>
              Defrag helps you understand mixed signals, silence, hard conversations,
              and rising pressure in clear language that is calm, useful, and easy to act on.
            </p>
            <div className="row" style={{ marginTop: 26 }}>
              <Link href="/app" className="btn btn-primary">Try the analysis</Link>
              <Link href="/pricing" className="btn btn-secondary">See pricing</Link>
            </div>
          </div>

          <div className="hero-card">
            <div style={{ fontWeight: 800, fontSize: 18 }}>Live relationship view</div>
            <p style={{ color: "rgba(255,255,255,.74)", lineHeight: 1.6 }}>
              A simple visual read on where pressure may be building, when to slow down,
              and what kind of message is least likely to make things worse.
            </p>
            <div className="hero-metric">
              <div className="mini-card">
                <div className="label">Pressure outlook</div>
                <div className="value">Rising</div>
              </div>
              <div className="mini-card">
                <div className="label">Best move</div>
                <div className="value" style={{ fontSize: 18 }}>Lower pressure</div>
              </div>
              <div className="mini-card">
                <div className="label">Message style</div>
                <div className="value" style={{ fontSize: 18 }}>Short and calm</div>
              </div>
              <div className="mini-card">
                <div className="label">Current risk</div>
                <div className="value" style={{ fontSize: 18 }}>Medium</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="section">
        <div className="shell">
          <div className="grid grid-3">
            <div className="card">
              <div className="kicker">Understand the moment</div>
              <h3>Get a clear read</h3>
              <p className="muted">See what may be going on beneath the surface and what kind of response fits the moment best.</p>
            </div>
            <div className="card">
              <div className="kicker">Catch pressure early</div>
              <h3>Notice the shift before it snaps</h3>
              <p className="muted">Spot when silence, mixed signals, or fast reactions are starting to push things in a worse direction.</p>
            </div>
            <div className="card">
              <div className="kicker">Respond better</div>
              <h3>Send a calmer message</h3>
              <p className="muted">Test your wording and get a softer version that is more likely to help than hurt.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
