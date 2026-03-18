import AppShell from "@/components/layout/AppShell";

export default function HealthPage() {
  return (
    <AppShell
      title="Platform health"
      subtitle="Deployment and system readiness."
    >
      <div className="console-reset-layout">
        <section className="rail-map-surface">
          <div className="result-title">Status</div>
          <div className="result-copy">Production is live and ready for use.</div>
        </section>

        <section className="rail-map-surface">
          <div className="result-title">Primary app</div>
          <div className="result-copy">Use onboarding, workspace, people, and timeline for public testing.</div>
        </section>
      </div>
    </AppShell>
  );
}
