"use client";

import AppShell from "@/components/layout/AppShell";
import { useLocalUser } from "@/hooks/useLocalUser";

export default function SettingsPage() {
  const userId = useLocalUser();

  return (
    <AppShell
      title="Settings"
      subtitle="Account state, user identity, and system settings will continue to deepen here."
    >
      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div className="card">
          <div className="result-title">Local identity</div>
          <div className="result-copy" style={{ marginTop: 12, overflowWrap: "anywhere" }}>
            {userId || "Loading..."}
          </div>
        </div>

        <div className="card">
          <div className="result-title">Next</div>
          <div className="result-copy" style={{ marginTop: 12 }}>
            The next sprint will replace local preview identity with real authentication.
          </div>
        </div>
      </div>
    </AppShell>
  );
}
