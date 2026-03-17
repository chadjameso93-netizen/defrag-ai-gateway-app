import TopNav from "@/components/TopNav";
import Link from "next/link";
import InsightProofCard from "@/components/marketing/InsightProofCard";
import BowenProofCard from "@/components/marketing/BowenProofCard";

export default function Page() {
  return (
    <main>
      <TopNav />

      <section className="hero cinematic-hero">
        <div className="shell cinematic-grid">
          <div className="hero-copy">
            <div className="kicker">Relational clarity</div>

            <h1 className="cinematic-title">
              See the system.
              <br />
              Lower the pressure.
              <br />
              Move with precision.
            </h1>

            <p className="cinematic-sub">
              Defrag is a premium relational intelligence system that shows what is actually happening
              between you and them — through live AI synthesis, timing, and system-level state.
            </p>

            <div className="actions cinematic-actions">
              <Link href="/app" className="btn btn-primary">Open Defrag</Link>
              <Link href="/pricing" className="btn btn-secondary">View pricing</Link>
            </div>
          </div>

          <div className="hero-proof-stack">
            <InsightProofCard />
            <BowenProofCard />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section cinematic-value-section">
        <div className="shell cinematic-value-grid">
          <div className="value-panel value-panel-large">
            <div className="kicker">What Defrag gives you</div>
            <h2 className="h2-premium">A live relational operating system.</h2>
            <p className="muted">
              Not generic advice. Not one-off answers. Defrag builds a living read of pressure, timing,
              distance, and relational movement so the next step can be calmer and more exact.
            </p>
          </div>

          <div className="value-panel">
            <div className="result-title">See the hidden dynamic</div>
            <div className="result-copy">
              Understand whether the moment is conflict, regulation, distancing, or external pressure entering the system.
            </div>
          </div>

          <div className="value-panel">
            <div className="result-title">Choose the next move</div>
            <div className="result-copy">
              Get one calmer move and one message option that is less likely to harden the situation further.
            </div>
          </div>
        </div>
      </section>

      <section className="section pricing-spotlight">
        <div className="shell pricing-spotlight-grid">
          <div className="pricing-copy">
            <div className="kicker">Defrag Pro</div>
            <div className="price-big">$19<span style={{ fontSize: 18, fontWeight: 700 }}>/mo</span></div>
            <p className="muted">
              Full relational synthesis, premium workspace access, timeline depth, daily reads, and live system-state tools.
            </p>
          </div>

          <div className="pricing-actions">
            <Link href="/pricing" className="btn btn-primary">Start Defrag Pro</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
