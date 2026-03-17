import TopNav from "@/components/TopNav";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <TopNav />

      <section className="hero cinematic-hero">
        <div className="shell" style={{ maxWidth: 1100 }}>

          <div style={{ maxWidth: 720 }}>
            <div className="kicker">Relational Intelligence</div>

            <h1 className="cinematic-title">
              The next layer of AI
              <br />
              understands relationships.
            </h1>

            <p className="cinematic-sub">
              Defrag interprets emotional dynamics, relational systems, and timing signals
              so you can understand what is actually happening between you and them — before you react.
            </p>

            <div className="actions cinematic-actions">
              <Link href="/app" className="btn btn-primary">Open Defrag</Link>
              <Link href="/pricing" className="btn btn-secondary">View pricing</Link>
            </div>
          </div>

        </div>
      </section>

      <section className="section">
        <div className="shell" style={{ maxWidth: 900 }}>

          <div className="proof-sequence">

            <div className="proof-line">
              <span className="proof-label">You think</span>
              <p>“They’re ignoring me.”</p>
            </div>

            <div className="proof-line">
              <span className="proof-label">Defrag sees</span>
              <p>This is pressure regulation after conflict, not withdrawal.</p>
            </div>

            <div className="proof-line">
              <span className="proof-label">So the move is</span>
              <p>Reduce intensity. One calm message. Then space.</p>
            </div>

          </div>

        </div>
      </section>

      <section className="section">
        <div className="shell editorial-grid">

          <div>
            <div className="kicker">Why Defrag exists</div>
            <h2 className="h2-premium">
              Most AI understands language.
              <br />
              It does not understand relationships.
            </h2>
          </div>

          <div className="muted" style={{ lineHeight: 1.7 }}>
            Defrag builds a persistent relational model using symbolic profiles,
            network dynamics, and timing signals. It interprets pressure, perception,
            and emotional systems so you can respond with clarity instead of reaction.
          </div>

        </div>
      </section>

      <section className="pricing-band">
        <div className="shell pricing-band-inner">

          <div>
            <div className="kicker">Defrag Pro</div>
            <div className="price-big">$19<span style={{ fontSize: 18 }}>/mo</span></div>
            <p className="muted">
              Full relational intelligence system, live state, daily reads,
              timeline insight, and network-level awareness.
            </p>
          </div>

          <div>
            <Link href="/pricing" className="btn btn-primary">
              Start Defrag Pro
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}
