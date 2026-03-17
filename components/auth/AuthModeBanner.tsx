"use client";

import Link from "next/link";
import StatusBadge from "@/components/badges/StatusBadge";

export default function AuthModeBanner({
  mode,
  email
}: {
  mode: "preview" | "auth";
  email?: string | null;
}) {
  const preview = mode === "preview";

  return (
    <div className="card">
      <div className="result-title">Access mode</div>
      <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <StatusBadge label={preview ? "Preview mode" : "Authenticated"} tone={preview ? "warn" : "good"} />
        {email ? <StatusBadge label={email} tone="strong" /> : null}
      </div>
      <div className="result-copy" style={{ marginTop: 12 }}>
        {preview
          ? "You are using Defrag in preview mode. Real account sessions will replace preview identity when public auth is enabled."
          : "You are signed in and using account-backed identity."}
      </div>
      {preview ? (
        <div className="actions" style={{ marginTop: 12 }}>
          <Link href="/login" className="btn btn-secondary">Open login</Link>
        </div>
      ) : null}
    </div>
  );
}
