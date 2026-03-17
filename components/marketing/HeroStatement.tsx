"use client";

import Link from "next/link";

export default function HeroStatement() {
  return (
    <div className="float-soft">
      <div className="kicker">Defrag</div>

      <div className="h1-premium">
        See what’s actually happening
        <br />
        between you and them.
      </div>

      <p className="text-muted" style={{ maxWidth: 560, marginTop: 18 }}>
        Not advice. Not guesswork.
        A live relational system that shows tension, timing, and what will actually move things forward.
      </p>

      <div style={{ marginTop: 28, display: "flex", gap: 12 }}>
        <Link href="/app" className="btn-premium">Open Defrag</Link>
        <Link href="/onboarding" className="btn btn-secondary">Start profile</Link>
      </div>
    </div>
  );
}
