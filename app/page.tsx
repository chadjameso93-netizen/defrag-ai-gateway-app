import TopNav from "@/components/TopNav";
import ParallaxGlow from "@/components/motion/ParallaxGlow";
import HeroStatement from "@/components/marketing/HeroStatement";
import PremiumFeatureRail from "@/components/marketing/PremiumFeatureRail";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <div className="hero" style={{ position: "relative" }}>
        <ParallaxGlow />
        <TopNav />

        <section className="shell hero-grid" style={{ position: "relative", zIndex: 1 }}>
          <HeroStatement />

          <div className="hero-card">
            <div style={{ fontWeight: 900, fontSize: 20, marginBottom: 18, letterSpacing: "-0.03em" }}>
              Built for live human systems
            </div>
            <PremiumFeatureRail />
          </div>
        </section>
      </div>

      <section className="section">
        <div className="shell">
          <div className="grid" style={{ gridTemplateColumns: "1.15fr .85fr", gap: 24 }}>
            <div className="card card-dark" style={{ minHeight: 280 }}>
              <div className="kicker">Why it feels different</div>
              <h2 style={{ fontSize: 44, lineHeight: 1.02, letterSpacing: "-0.055em", margin: "0 0 12px" }}>
                Not advice in a vacuum.
                <br />
                A live relational operating system.
              </h2>
              <p className="muted" style={{ maxWidth: 760 }}>
                Defrag is designed for continuity. It remembers the structure around you — your profile,
                your people, your recent events, and the changing pressure inside the system — so its guidance
                can become more precise over time.
              </p>
            </div>

            <div className="card" style={{ minHeight: 280, display: "grid", alignContent: "space-between" }}>
              <div>
                <div className="kicker">Defrag Pro</div>
                <div className="price-big" style={{ marginTop: 0 }}>$19<span style={{ fontSize: 18, fontWeight: 700 }}>/mo</span></div>
                <p className="muted">
                  Full relational synthesis, live system state, deeper event context, and premium workspace access.
                </p>
              </div>

              <div className="actions" style={{ marginTop: 20 }}>
                <Link href="/pricing" className="btn btn-primary">Start Defrag Pro</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
