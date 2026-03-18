"use client";

import Link from "next/link";

export default function TopNav() {
  return (
    <div className="nav-wrap">
      <div className="shell nav">
        <Link href="/" className="brand">Defrag</Link>

        <div className="nav-links">
          <Link href="/how-it-works">How it works</Link>
          <Link href="/about">About</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/app" className="btn btn-primary">Open Defrag</Link>
        </div>
      </div>
    </div>
  );
}
