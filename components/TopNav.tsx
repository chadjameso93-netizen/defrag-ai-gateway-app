"use client";

import Link from "next/link";
import { useState } from "react";

export default function TopNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="nav-wrap">
      <div className="shell nav">
        <Link href="/" className="brand">Defrag</Link>

        <button
          className="mobile-nav-toggle"
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>

        <div className={`nav-links ${open ? "open" : ""}`}>
          <Link href="/#how-it-works" onClick={() => setOpen(false)}>How it works</Link>
          <Link href="/pricing" onClick={() => setOpen(false)}>Pricing</Link>
          <Link href="/app" className="btn btn-secondary" onClick={() => setOpen(false)}>Open app</Link>
        </div>
      </div>
    </div>
  );
}
