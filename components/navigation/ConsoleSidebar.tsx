"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/app", label: "Console" },
  { href: "/relationships", label: "Relationships" },
  { href: "/timeline", label: "Timeline" },
  { href: "/pricing", label: "Pricing" },
  { href: "/settings", label: "Settings" }
];

export default function ConsoleSidebar() {
  const pathname = usePathname();

  return (
    <aside className="console-sidebar">
      <div className="console-brand">Defrag</div>

      <div className="console-section-label">Workspace</div>
      <nav className="console-nav">
        {items.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/app" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`console-nav-item ${active ? "active" : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="console-sidebar-footer">
        <div className="console-sidebar-note">
          Premium relational intelligence for live human systems.
        </div>
      </div>
    </aside>
  );
}
