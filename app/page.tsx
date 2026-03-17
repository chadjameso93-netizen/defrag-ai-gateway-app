import TopNav from "@/components/TopNav";
import Link from "next/link";

function LiveProof() {
  return (
    <section className="landing-proof">
      <div className="proof-sequence">
        <div className="proof-line">
          <span className="proof-label">You think</span>
          <p>They are pulling away.</p>
        </div>

        <div className="proof-line emphasis">
          <span className="proof-label">Defrag sees</span>
          <p>This looks more like pressure after conflict than a clean break.</p>
        </div>

        <div className="proof-line">
          <span className="proof-label">So the move is</span>
          <p>Say less. Keep it calm. Give it room.</p>
        </div>
      </div>
    </section>
  );
}

function SystemArtifact() {
  return (
    <section className="system-artifact">
      <div className="artifact-header">
        <div className="kicker">Live system view</div>
        <div className="artifact-title">The pressure is in the system, not just the last message.</div>
      </div>

      <div className="artifact-map">
        <div className="artifact-node node-left">You</div>
        <div className="artifact-node node-right">Them</div>
        <div className="artifact-node node-top">Pressure</div>

        <div className="artifact-line line-main warm" />
        <div className="artifact-line line-side cool" />
      </div>

      <p className="artifact-copy">
        Defrag reads tension, distance, and timing so you can tell the difference between a hard stop and a moment that needs less pressure.
      </p>
    </section>
  );
}

export default function Page() {
  return (
    <main className="landing-root">
      <TopNav />

      <section className="landing-hero">
        <div className="landing-hero-bg" />
        <div className="shell landing-hero-grid">
          <div className="landing-copy">
            <div className="kicker">Relational intelligence</div>

            <h1 className="landing-title">
              AI that reads
              <br />
              relationships,
              <br />
              not just words.
            </h1>

            <p className="landing-sub">
              Defrag helps you see what is happening between you and them, why the pressure is rising, and what move is least likely to make it worse.
            </p>

            <div className="actions" style={{ marginTop: 28 }}>
              <Link href="/app" className="btn btn-primary">Open Defrag</Link>
              <Link href="/pricing" className="btn btn-secondary">View pricing</Link>
            </div>
          </div>

          <div className="landing-right-column">
            <LiveProof />
            <SystemArtifact />
          </div>
        </div>
      </section>

      <section className="landing-editorial">
        <div className="shell landing-editorial-grid">
          <div>
            <div className="kicker">Why it matters</div>
            <h2 className="landing-editorial-title">
              Most AI can answer a question.
              <br />
              It cannot read a relationship.
            </h2>
          </div>

          <div className="landing-editorial-copy">
            Defrag looks at pressure, timing, and patterns across a relationship so the next move is based on what is actually going on, not a guess.
          </div>
        </div>
      </section>

      <section className="landing-pricing-band">
        <div className="shell landing-pricing-inner">
          <div>
            <div className="kicker">Defrag Pro</div>
            <div className="price-big">$19<span style={{ fontSize: 18, fontWeight: 700 }}>/mo</span></div>
            <p className="muted" style={{ maxWidth: 620 }}>
              Full system reads, live state, timeline depth, daily guidance, and the premium workspace.
            </p>
          </div>

          <div className="landing-pricing-action">
            <Link href="/pricing" className="btn btn-primary">Start Defrag Pro</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
