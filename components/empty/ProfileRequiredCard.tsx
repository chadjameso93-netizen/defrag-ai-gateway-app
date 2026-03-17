"use client";

import Link from "next/link";

export default function ProfileRequiredCard() {
  return (
    <div className="card card-dark">
      <div className="kicker">Profile required</div>
      <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1.04 }}>
        Complete your profile to unlock deeper relational accuracy.
      </div>
      <p className="muted" style={{ marginTop: 12, maxWidth: 720 }}>
        Defrag needs your core birth and location data to support stronger timing context,
        daily reads, and relationship synthesis.
      </p>
      <div className="actions" style={{ marginTop: 18 }}>
        <Link href="/onboarding" className="btn btn-primary">Complete onboarding</Link>
        <Link href="/settings" className="btn btn-secondary">Open settings</Link>
      </div>
    </div>
  );
}
