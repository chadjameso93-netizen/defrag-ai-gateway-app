"use client";

import { ReactNode } from "react";
import ConsoleSidebar from "@/components/navigation/ConsoleSidebar";
import ConsoleTopbar from "@/components/shell/ConsoleTopbar";

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
    <main className="console-root">
      <ConsoleSidebar />

      <div className="console-main">
        <ConsoleTopbar />

        <div className="console-content">
          <div className="console-header">
            <div className="kicker">Defrag Pro</div>
            <h1 className="section-title" style={{ marginBottom: 8 }}>{title}</h1>
            {subtitle ? (
              <p className="muted" style={{ maxWidth: 860 }}>{subtitle}</p>
            ) : null}
          </div>

          {children}
        </div>
      </div>
    </main>
  );
}
