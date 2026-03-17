"use client";

import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useAppIdentity } from "@/hooks/useAppIdentity";
import ManageBillingButton from "@/components/billing/ManageBillingButton";

export default function Pricing() {
  const [loading, setLoading] = useState(false);
  const { userId } = useAppIdentity();

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
    <AppShell
      title="Pricing"
      subtitle="Choose your pace. Free is a preview. Defrag Pro unlocks the full relational system."
    >
      <div className="price-grid">
        <div className="card">
          <h2 style={{ marginTop: 0 }}>Free</h2>
          <div className="price-big">$0</div>
          <p className="muted">Limited preview insight and minimal dashboard depth.</p>
        </div>

        <div className="card card-dark">
          <h2 style={{ marginTop: 0 }}>Defrag Pro</h2>
          <div className="price-big">$19<span style={{ fontSize: 18, fontWeight: 700 }}>/month</span></div>
          <p style={{ color: "rgba(255,255,255,.78)" }}>
            Full relational synthesis, relationship system depth, live state, and premium workspace access.
          </p>
          <div className="actions" style={{ marginTop: 14 }}>
            <button className="btn btn-primary" onClick={startCheckout} disabled={loading || !userId}>
              {loading ? "Redirecting..." : "Start Defrag Pro"}
            </button>
            <ManageBillingButton userId={userId} />
          </div>
          <div className="footer-note" style={{ marginTop: 12 }}>Cancel anytime.</div>
        </div>
      </div>
    </AppShell>
  );
}
