import Link from "next/link";
import AppShell from "@/components/layout/AppShell";

export default function BillingCancelPage() {
  return (
    <AppShell
      title="Billing canceled"
      subtitle="You can return to pricing and complete the upgrade whenever you are ready."
    >
      <div className="card" style={{ maxWidth: 860 }}>
        <div className="kicker">Canceled</div>
        <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1.04 }}>
          The checkout session was canceled.
        </div>
        <p className="muted" style={{ marginTop: 12 }}>
          No subscription changes were applied.
        </p>
        <div className="actions" style={{ marginTop: 18 }}>
          <Link href="/pricing" className="btn btn-primary">Back to pricing</Link>
          <Link href="/app" className="btn btn-secondary">Return to console</Link>
        </div>
      </div>
    </AppShell>
  );
}
