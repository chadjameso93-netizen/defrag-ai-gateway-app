"use client";

import AppShell from "@/components/layout/AppShell";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <AppShell
      title="Settings"
      subtitle="Manage profile, privacy, and plan."
    >
      <div className="console-reset-layout">
        <section className="rail-map-surface">
          <div className="result-title">Profile</div>
          <div className="result-copy">Update your birth details, current location, and account info.</div>
          <div className="actions" style={{ marginTop: 14 }}>
            <Link href="/onboarding" className="btn btn-secondary">Edit profile</Link>
          </div>
        </section>

        <section className="rail-map-surface">
          <div className="result-title">Privacy</div>
          <div className="result-copy">Control what connected people can see and how invite links work.</div>
          <div className="actions" style={{ marginTop: 14 }}>
            <Link href="/privacy" className="btn btn-secondary">Privacy settings</Link>
          </div>
        </section>

        <section className="rail-map-surface">
          <div className="result-title">Plan</div>
          <div className="result-copy">Manage subscription and billing access.</div>
          <div className="actions" style={{ marginTop: 14 }}>
            <Link href="/billing" className="btn btn-primary">Manage plan</Link>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
