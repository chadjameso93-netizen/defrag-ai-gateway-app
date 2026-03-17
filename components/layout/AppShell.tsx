"use client";

import Link from "next/link";
import { ReactNode } from "react";

export default function AppShell({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <main className="app-page">
      <div className="nav-wrap">
        <div className="shell nav" style={{ gap: 20 }}>
          <div className="brand">Defrag</div>
          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/app">Console</Link>
            <Link href="/relationships">Relationships</Link>
            <Link href="/timeline">Timeline</Link>
            <Link href="/pricing">Pricing</Link>
          </div>
        </div>
      </div>

      <div className="shell" style={{ paddingTop: 28, paddingBottom: 44 }}>
        <div style={{ marginBottom: 24 }}>
          <div className="kicker">Defrag Pro</div>
          <h1 className="section-title" style={{ marginBottom: 8 }}>{title}</h1>
          {subtitle ? <p className="muted" style={{ maxWidth: 780 }}>{subtitle}</p> : null}
        </div>

        {children}
      </div>
    </main>
  );
}
