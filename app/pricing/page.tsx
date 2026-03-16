import TopNav from "@/components/TopNav";

export default function Pricing() {
  const href = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK || "https://buy.stripe.com/5kQ28t3ryd72ctVgxDaEE02";
  return (
    <main>
      <TopNav />
      <div className="shell section">
        <div className="kicker">Pricing</div>
        <h1 className="section-title">Choose your pace</h1>
        <p className="muted" style={{ maxWidth: 720 }}>
          Start free, then move to Pro when you want more consistent support, more message testing, and better running context.
        </p>

        <div className="price-grid" style={{ marginTop: 24 }}>
          <div className="card">
            <h2>Free</h2>
            <div className="price-big">$0</div>
            <p className="muted">A few analyses and message tests.</p>
          </div>

          <div className="card card-dark">
            <h2>Defrag Pro</h2>
            <div className="price-big">$19<span style={{ fontSize: 18, fontWeight: 600 }}>/month</span></div>
            <p style={{ color: "rgba(255,255,255,.78)" }}>For regular use and deeper support.</p>
            <a href={href} className="btn btn-primary" style={{ marginTop: 12 }}>Start Pro</a>
            <div className="footer-note" style={{ marginTop: 12 }}>Cancel anytime.</div>
          </div>
        </div>
      </div>
    </main>
  );
}
