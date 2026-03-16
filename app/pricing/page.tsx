import TopNav from "@/components/TopNav";

export default function Pricing() {
  const href = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK || "https://buy.stripe.com/5kQ28t3ryd72ctVgxDaEE02";
  return (
    <main>
      <TopNav />
      <div className="shell" style={{ paddingTop: 24 }}>
        <h1 className="section-title">Pricing</h1>
        <div className="grid grid-3" style={{ marginTop: 24 }}>
          <div className="card">
            <h3>Free</h3>
            <p className="muted">A simple way to try Defrag.</p>
            <p><strong>$0</strong></p>
            <p className="muted">A few analyses and message tests.</p>
          </div>
          <div className="card dark">
            <h3>Defrag Pro</h3>
            <p style={{ color: "rgba(255,255,255,.8)" }}>For ongoing use.</p>
            <p><strong>$19/month</strong></p>
            <p style={{ color: "rgba(255,255,255,.8)" }}>More analysis, message testing, and saved history.</p>
            <a className="btn btn-primary" href={href} style={{ marginTop: 8 }}>Start Pro</a>
          </div>
        </div>
      </div>
    </main>
  );
}
