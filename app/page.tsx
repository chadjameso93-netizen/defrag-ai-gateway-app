import TopNav from "@/components/TopNav";
import Link from "next/link";

function LiveProof() {
  return (
    <section className="landing-proof">
      <div className="proof-sequence">
        <div className="proof-line">
          <span className="proof-label">You think</span>
          <p>They’re ignoring me.</p>
        </div>

        <div className="proof-line emphasis">
          <span className="proof-label">Defrag sees</span>
          <p>This looks more like pressure regulation after conflict than withdrawal.</p>
        </div>

        <div className="proof-line">
          <span className="proof-label">So the move is</span>
          <p>Reduce intensity. One calm message. Then space.</p>
        </div>
      </div>
    </section>
  );
}

function SystemArtifact() {
  return (
    <section className="system-artifact">
      <div className="artifact-header">
        <div className="kicker">Live relational state</div>
        <div className="artifact-title">Pressure is entering through the system, not just the conversation.</div>
      </div>

      <div className="artifact-map">
        <div className="artifact-node node-left">You</div>
        <div className="artifact-node node-right">Them</div>
        <div className="artifact-node node-top">Pressure</div>

        <div className="artifact-line line-main warm" />
        <div className="artifact-line line-side cool" />
      </div>

      <p className="artifact-copy">
        Defrag interprets the emotional field around a relationship — tension, pacing, distance, and external load —
        so the next move is based on dynamics, not guesswork.
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
              AI that understands
              <br />
              relationships,
              <br />
              not just language.
            </h1>

            <p className="landing-sub">
              Defrag interprets emotional dynamics, timing, and relational pressure so you can
              understand what is actually happening between you and them before you react.
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
            <div className="kicker">Why Defrag exists</div>
            <h2 className="landing-editorial-title">
              Most AI can generate an answer.
              <br />
              It cannot interpret a relational system.
            </h2>
          </div>

          <div className="landing-editorial-copy">
            Defrag builds a persistent relational model using symbolic profiles, network dynamics,
            timing signals, and a live relational state layer. The result is not generic advice. It is
            a calmer, more exact read of what is happening inside the human system itself.
          </div>
        </div>
      </section>

      <section className="landing-pricing-band">
        <div className="shell landing-pricing-inner">
          <div>
            <div className="kicker">Defrag Pro</div>
            <div className="price-big">$19<span style={{ fontSize: 18, fontWeight: 700 }}>/mo</span></div>
            <p className="muted" style={{ maxWidth: 620 }}>
              Full relational intelligence system, live state, timeline depth, daily reads, and premium workspace access.
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
