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
          <p>This looks more like distance after tension than a final break.</p>
        </div>

        <div className="proof-line">
          <span className="proof-label">What to do next</span>
          <p>Keep it simple. Give it room. Do not force a result.</p>
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
        <div className="artifact-title">See the situation clearly from all sides.</div>
      </div>

      <div className="artifact-map">
        <div className="artifact-node node-left">You</div>
        <div className="artifact-node node-right">Them</div>
        <div className="artifact-node node-top">Context</div>

        <div className="artifact-line line-main" />
        <div className="artifact-line line-side" />
      </div>

      <p className="artifact-copy">
        Defrag helps you see what is happening between you and your people, clearly from all sides, and what to do next.
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
            <div className="kicker">Multi-perspective relational intelligence</div>

            <h1 className="landing-title">
              See what is
              <br />
              actually happening
              <br />
              between you
              <br />
              and your people.
            </h1>

            <p className="landing-sub">
              Defrag helps you see what is happening clearly from all sides, including the parts that usually go unnoticed, and what to do next.
            </p>

            <div className="actions" style={{ marginTop: 28 }}>
              <Link href="/app" className="btn btn-primary">Open Defrag</Link>
              <Link href="/how-it-works" className="btn btn-secondary">How it works</Link>
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
              Defrag reads the relationship.
            </h2>
          </div>

          <div className="landing-editorial-copy">
            Defrag combines timing, behavior, and patterns into one clear read so your next move is steadier, calmer, and easier to receive.
          </div>
        </div>
      </section>

      <section className="landing-pricing-band">
        <div className="shell landing-pricing-inner">
          <div>
            <div className="kicker">Defrag Pro</div>
            <div className="price-big">$19<span style={{ fontSize: 18, fontWeight: 700 }}>/mo</span></div>
            <p className="muted" style={{ maxWidth: 620 }}>
              Full reads, live state, daily guidance, and the premium workspace.
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
