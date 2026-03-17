import TopNav from "@/components/TopNav";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <TopNav />

      <section className="hero">
        <div className="shell hero-grid" style={{ alignItems: "start", paddingTop: 88, paddingBottom: 88 }}>
          <div>
            <div className="kicker">Relational clarity</div>

            <h1>
              See what’s
              <br />
              actually
              <br />
              happening
              <br />
              between you
              <br />
              and them.
            </h1>

            <p style={{ maxWidth: 560 }}>
              Defrag is a premium relational intelligence system that shows pressure, distance, and timing —
              so you can understand the moment before you make it heavier.
            </p>

            <div className="actions" style={{ marginTop: 28 }}>
              <Link href="/app" className="btn btn-primary">Open Defrag</Link>
              <Link href="/pricing" className="btn btn-secondary">View pricing</Link>
            </div>
          </div>

          <div className="hero-card" style={{ maxWidth: 380, justifySelf: "end", marginTop: 54 }}>
            <div className="result-block">
              <div className="result-title">Pressure level</div>
              <div className="result-copy">Rising, but still recoverable</div>
            </div>

            <div className="result-block">
              <div className="result-title">What’s happening</div>
              <div className="result-copy">
                The distance is less about the topic and more about how the last interaction felt. They are regulating, not deciding.
              </div>
            </div>

            <div className="result-block">
              <div className="result-title">Best next move</div>
              <div className="result-copy">
                Keep things light. One calm message. Then space.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell" style={{ display: "grid", gap: 22 }}>
          <div className="card card-dark" style={{ padding: 30 }}>
            <div className="h2-premium">Not advice in a vacuum.</div>
            <p className="muted" style={{ marginTop: 12, maxWidth: 860 }}>
              Defrag builds a living model of your relationships, timing, and recent pressure — so guidance is based on real dynamics, not generic answers.
            </p>
          </div>

          <div className="card" style={{ padding: 30 }}>
            <div className="h2-premium">A live relational system.</div>
            <p className="muted" style={{ marginTop: 12, maxWidth: 860 }}>
              See tension, distance, activation, and timing as they evolve — before the system hardens into misunderstanding.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 12 }}>
        <div className="shell price-grid">
          <div className="card">
            <div className="kicker">Free</div>
            <div className="price-big">$0</div>
            <p className="muted">
              A limited preview of the product. Minimal system depth. No full relational synthesis.
            </p>
          </div>

          <div className="card card-dark">
            <div className="kicker">Defrag Pro</div>
            <div className="price-big">$19<span style={{ fontSize: 18, fontWeight: 700 }}>/mo</span></div>
            <p className="muted">
              Full relational system, premium workspace, timeline depth, daily reads, and deeper synthesis.
            </p>

            <div className="actions" style={{ marginTop: 18 }}>
              <Link href="/pricing" className="btn btn-primary">Start Pro</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
