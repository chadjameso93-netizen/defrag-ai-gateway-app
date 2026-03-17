"use client";

import { useState } from "react";
import TopNav from "@/components/TopNav";
import { useLocalUser } from "@/hooks/useLocalUser";

export default function Pricing() {
  const [loading, setLoading] = useState(false);
  const userId = useLocalUser();

  async function startCheckout() {
    try {
      setLoading(true);

      const res = await fetch("/api/v1/billing/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId
        })
      });

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
        return;
      }

      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  return (
    <main>
      <TopNav />
      <div className="shell section">
        <div className="kicker">Pricing</div>
        <h1 className="section-title">Choose your pace</h1>
        <p className="muted" style={{ maxWidth: 720 }}>
          Free is a preview. Defrag Pro unlocks the full relational system, deeper synthesis, and premium product access.
        </p>

        <div className="price-grid" style={{ marginTop: 24 }}>
          <div className="card">
            <h2>Free</h2>
            <div className="price-big">$0</div>
            <p className="muted">Limited preview insight and minimal dashboard access.</p>
          </div>

          <div className="card card-dark">
            <h2>Defrag Pro</h2>
            <div className="price-big">$19<span style={{ fontSize: 18, fontWeight: 600 }}>/month</span></div>
            <p style={{ color: "rgba(255,255,255,.78)" }}>
              Full relational synthesis, deeper insight, relationship system, and premium product access.
            </p>
            <button className="btn btn-primary" style={{ marginTop: 12 }} onClick={startCheckout} disabled={loading || !userId}>
              {loading ? "Redirecting..." : "Start Defrag Pro"}
            </button>
            <div className="footer-note" style={{ marginTop: 12 }}>Cancel anytime.</div>
          </div>
        </div>
      </div>
    </main>
  );
}
