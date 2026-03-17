"use client";

import AppShell from "@/components/layout/AppShell";
import { useAppIdentity } from "@/hooks/useAppIdentity";
import AuthModeBanner from "@/components/auth/AuthModeBanner";

export default function SettingsPage() {
  const identity = useAppIdentity();

  return (
    <AppShell
      title="Settings"
      subtitle="Account state, identity mode, and system settings continue to deepen here."
    >
      <div className="grid console-grid-two" style={{ gap: 24 }}>
        <AuthModeBanner mode={identity.mode} email={identity.email} />

        <div className="card">
          <div className="result-title">Current identity</div>
          <div className="result-copy" style={{ marginTop: 12, overflowWrap: "anywhere" }}>
            {identity.loading ? "Loading..." : identity.userId}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
