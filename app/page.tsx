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

      <section className="section editorial-section">
        <div className="shell editorial-grid">
          <div className="editorial-copy">
            <div className="kicker">Why it matters</div>
            <h2 className="h2-premium">Not advice in a vacuum.</h2>
            <p className="muted">
              Defrag builds a living read of pressure, timing, distance, and relational movement,
              so the next move can be calmer, cleaner, and less likely to make the system heavier.
            </p>
          </div>

          <div className="editorial-points">
            <div className="editorial-line">
              <span>See the hidden dynamic</span>
              <p>Understand whether the moment is conflict, regulation, distancing, or external pressure entering the system.</p>
            </div>

            <div className="editorial-line">
              <span>Choose the next move</span>
              <p>Get one calmer move and one message option that is less likely to harden the situation further.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing-band">
        <div className="shell pricing-band-inner">
          <div>
            <div className="kicker">Defrag Pro</div>
            <div className="price-big">$19<span style={{ fontSize: 18, fontWeight: 700 }}>/mo</span></div>
            <p className="muted" style={{ maxWidth: 620 }}>
              Full relational synthesis, premium workspace access, timeline depth, daily reads, and live system-state tools.
            </p>
          </div>

          <div className="pricing-band-action">
            <Link href="/pricing" className="btn btn-primary">Start Defrag Pro</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
