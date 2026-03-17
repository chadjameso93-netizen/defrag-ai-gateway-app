import Link from "next/link";
import AppShell from "@/components/layout/AppShell";

export default function BillingSuccessPage() {
  return (
    <AppShell
      title="Billing success"
      subtitle="Your subscription flow completed. Access should activate as Stripe events reach Defrag."
    >
      <div className="card card-dark" style={{ maxWidth: 860 }}>
        <div className="kicker">Success</div>
        <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1.04 }}>
          Your billing session completed.
        </div>
        <p className="muted" style={{ marginTop: 12 }}>
          Return to the console and refresh if needed. Stripe webhook updates should activate Defrag Pro access automatically.
        </p>
        <div className="actions" style={{ marginTop: 18 }}>
          <Link href="/app" className="btn btn-primary">Return to console</Link>
          <Link href="/settings" className="btn btn-secondary">Open settings</Link>
        </div>
      </div>
    </AppShell>
  );
}
