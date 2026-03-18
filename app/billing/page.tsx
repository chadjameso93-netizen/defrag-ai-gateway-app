"use client";

import AppShell from "@/components/layout/AppShell";
import Link from "next/link";

export default function BillingPage() {
  return (
    <AppShell
      title="Billing"
      subtitle="Plan and subscription access."
    >
      <div className="console-reset-layout">
        <section className="rail-map-surface">
          <div className="result-title">Defrag Pro</div>
          <div className="result-copy">Full reads, live state, daily guidance, and the premium workspace.</div>
          <div className="actions" style={{ marginTop: 14 }}>
            <Link href="/pricing" className="btn btn-primary">Open pricing</Link>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
