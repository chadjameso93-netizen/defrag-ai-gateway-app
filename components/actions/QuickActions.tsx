"use client";

import Link from "next/link";

export default function QuickActions() {
  const items = [
    { href: "/onboarding", label: "Update profile", sub: "Improve symbolic depth" },
    { href: "/relationships", label: "Open relationships", sub: "Manage participants and invites" },
    { href: "/timeline", label: "Review timeline", sub: "See recent reads and events" },
    { href: "/pricing", label: "Manage plan", sub: "Upgrade or review access" }
  ];

  return (
    <div className="card">
      <div className="result-title">Quick actions</div>

      <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="message-box" style={{ textDecoration: "none" }}>
            <div className="result-title">{item.label}</div>
            <div className="result-copy">{item.sub}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
