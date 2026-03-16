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
              Clear relationship insight
            </div>
            <h1>See what is happening, lower the pressure, and choose a better next move.</h1>
            <p>
              Defrag helps you understand mixed signals, silence, hard conversations,
              and rising pressure in plain language that is calm, useful, and easy to act on.
            </p>
            <div className="row" style={{ marginTop: 26 }}>
              <Link href="/app" className="btn btn-primary">Try a free analysis</Link>
              <Link href="/how-it-works" className="btn btn-secondary">See how it works</Link>
            </div>
          </div>

          <div className="hero-card">
            <div style={{ fontWeight: 800, fontSize: 18 }}>Live relationship view</div>
            <p style={{ color: "rgba(255,255,255,.74)", lineHeight: 1.6 }}>
              A clear visual read on where pressure is building, when to slow down, and what kind of message is least likely to make things worse.
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
    </main>
  );
}
