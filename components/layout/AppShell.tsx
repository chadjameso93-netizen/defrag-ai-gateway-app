"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppIdentity } from "@/hooks/useAppIdentity";
import SignOutButton from "@/components/account/SignOutButton";

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
  const identity = useAppIdentity();

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top right, rgba(255,255,255,.05), transparent 22%), linear-gradient(180deg, #050608 0%, #090b11 100%)",
        color: "white"
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "260px minmax(0,1fr)",
          minHeight: "100vh"
        }}
      >
        <aside
          style={{
            borderRight: "1px solid rgba(255,255,255,.08)",
            padding: "22px 18px",
            display: "flex",
            flexDirection: "column",
            gap: 18,
            background: "rgba(255,255,255,.02)",
            backdropFilter: "blur(14px)"
          }}
        >
          <Link
            href="/"
            style={{
              color: "rgba(255,255,255,.96)",
              textDecoration: "none",
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: "-0.04em"
            }}
          >
            Defrag
          </Link>

          <div
            style={{
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: ".14em",
              color: "rgba(255,255,255,.42)"
            }}
          >
            Workspace
          </div>

          <nav style={{ display: "grid", gap: 8 }}>
            {items.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/app" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    border: "1px solid rgba(255,255,255,.08)",
                    background: active ? "rgba(255,255,255,.09)" : "rgba(255,255,255,.03)",
                    color: active ? "rgba(255,255,255,.98)" : "rgba(255,255,255,.74)",
                    textDecoration: "none",
                    padding: "12px 14px",
                    borderRadius: 14,
                    fontWeight: 700
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div style={{ marginTop: "auto", display: "grid", gap: 12 }}>
            <div
              style={{
                fontSize: 12,
                lineHeight: 1.5,
                color: "rgba(255,255,255,.5)"
              }}
            >
              Premium relational intelligence for live human systems.
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link href="/pricing" className="btn btn-secondary">Pricing</Link>
              {identity.isAuthed ? <SignOutButton /> : <Link href="/login" className="btn btn-primary">Sign in</Link>}
            </div>
          </div>
        </aside>

        <div style={{ minWidth: 0 }}>
          <div
            style={{
              borderBottom: "1px solid rgba(255,255,255,.08)",
              padding: "18px 28px",
              background: "rgba(255,255,255,.02)",
              backdropFilter: "blur(14px)"
            }}
          >
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <span className="kicker" style={{ marginBottom: 0 }}>Defrag Pro</span>
              <span
                style={{
                  border: "1px solid rgba(255,255,255,.12)",
                  background: identity.isAuthed ? "rgba(134,239,172,.10)" : "rgba(251,191,36,.08)",
                  color: identity.isAuthed ? "#bbf7d0" : "#fde68a",
                  borderRadius: 999,
                  padding: "6px 10px",
                  fontSize: 12,
                  fontWeight: 700
                }}
              >
                {identity.isAuthed ? "Authenticated" : "Preview mode"}
              </span>
            </div>
          </div>

          <div style={{ padding: "24px 28px 40px" }}>
            <div style={{ marginBottom: 24 }}>
              <div className="kicker">Defrag Pro</div>
              <h1 className="section-title" style={{ marginBottom: 8 }}>{title}</h1>
              {subtitle ? (
                <p className="muted" style={{ maxWidth: 860 }}>{subtitle}</p>
              ) : null}
            </div>

            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
