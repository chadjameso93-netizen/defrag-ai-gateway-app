import TopNav from "@/components/TopNav";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <TopNav />

      {/* HERO */}
      <section className="hero">
        <div className="shell hero-grid">

          <div>
            <div className="kicker">Relational clarity</div>

            <h1>
              See what’s actually happening between you and them.
            </h1>

            <p>
              Not advice. Not guesswork. A live relational system that shows
              tension, timing, and what actually moves things forward.
            </p>

            <div className="actions" style={{ marginTop: 24 }}>
              <Link href="/app" className="btn btn-primary">
                Open Defrag
              </Link>

              <Link href="/pricing" className="btn btn-secondary">
                View pricing
              </Link>
            </div>
          </div>

          <div className="hero-card">
            <div className="result-block">
              <div className="result-title">Pressure level</div>
              <div className="result-copy">Rising, but still recoverable</div>
            </div>

            <div className="result-block">
              <div className="result-title">What’s happening</div>
              <div className="result-copy">
                The distance is less about the topic and more about how the
                last interaction felt. They are regulating, not deciding.
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

      {/* VALUE */}
      <section className="section">
        <div className="shell grid" style={{ gap: 28 }}>

          <div className="card-dark">
            <h2 className="h2-premium">
              Not advice in a vacuum.
            </h2>
            <p className="muted">
              Defrag builds a living model of your relationships — so guidance
              is based on real dynamics, not generic answers.
            </p>
          </div>

          <div className="card-dark">
            <h2 className="h2-premium">
              A live relational system.
            </h2>
            <p className="muted">
              See pressure, distance, and timing as they evolve — not after
              things break.
            </p>
          </div>

        </div>
      </section>

      {/* PRICING */}
      <section className="section">
        <div className="shell price-grid">

          <div className="card-dark">
            <div className="kicker">Free</div>
            <div className="price-big">$0</div>
            <p className="muted">
              Limited preview. Minimal insight. No deep system modeling.
            </p>
          </div>

          <div className="card-dark">
            <div className="kicker">Defrag Pro</div>
            <div className="price-big">$19/mo</div>
            <p className="muted">
              Full relational system, daily reads, timeline, and deep insight.
            </p>

            <div style={{ marginTop: 18 }}>
              <Link href="/api/checkout" className="btn btn-primary">
                Start Pro
              </Link>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
