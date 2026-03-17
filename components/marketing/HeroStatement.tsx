"use client";

import Link from "next/link";

export default function HeroStatement() {
  return (
    <div style={{ position: "relative", zIndex: 2 }}>
      <div className="kicker">Defrag</div>
      <h1 style={{ margin: "8px 0 18px" }}>
        See the relational system.
        <br />
        Move with precision.
      </h1>
      <p>
        Defrag turns tension, distance, timing, and interpersonal pressure into a live premium workspace —
        so you can understand what is actually happening, what not to force, and what to do next.
      </p>

      <div className="row" style={{ marginTop: 30 }}>
        <Link href="/app" className="btn btn-primary">Open Console</Link>
        <Link href="/onboarding" className="btn btn-secondary">Start your profile</Link>
        <Link href="/pricing" className="btn btn-secondary">View pricing</Link>
      </div>
    </div>
  );
}
