"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SystemMenu from "@/components/SystemMenu";

const items = [
  { href: "/app", label: "Console" },
  { href: "/relationships", label: "Relationships" },
  { href: "/timeline", label: "Timeline" },
  { href: "/pricing", label: "Pricing" },
  { href: "/settings", label: "Settings" }
];

export default function AppShell({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <main className="app-page">
      <div className="console-root">
        <aside className="console-sidebar">
          <Link href="/" className="console-brand">Defrag</Link>

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
              Clearer reads. Calmer moves.
            </div>
          </div>
        </aside>

        <div className="console-main">
          <div className="console-topbar">
            <div>
              <div className="kicker" style={{ marginBottom: 8 }}>Defrag</div>
              <h1 className="console-page-title">{title}</h1>
              {subtitle ? <p className="console-page-subtitle">{subtitle}</p> : null}
            </div>

            <SystemMenu />
          </div>

          <div className="console-content">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
