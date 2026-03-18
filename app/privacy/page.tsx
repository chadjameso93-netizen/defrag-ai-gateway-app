"use client";

import AppShell from "@/components/layout/AppShell";

export default function PrivacyPage() {
  return (
    <AppShell
      title="Privacy"
      subtitle="Data visibility and invite controls."
    >
      <div className="console-reset-layout">
        <section className="rail-map-surface">
          <div className="result-title">Birth details</div>
          <div className="result-copy">Precise birth details should stay private by default and only power your reads unless you choose otherwise.</div>
        </section>

        <section className="rail-map-surface">
          <div className="result-title">Connected people</div>
          <div className="result-copy">Invite links should expire and only create active links after acceptance.</div>
        </section>
      </div>
    </AppShell>
  );
}
