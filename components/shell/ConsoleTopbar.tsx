"use client";

import Link from "next/link";
import { useAppIdentity } from "@/hooks/useAppIdentity";
import StatusBadge from "@/components/badges/StatusBadge";
import SignOutButton from "@/components/account/SignOutButton";

export default function ConsoleTopbar() {
  const identity = useAppIdentity();

  return (
    <div className="console-topbar">
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <StatusBadge
          label={identity.isAuthed ? "Authenticated" : "Preview mode"}
          tone={identity.isAuthed ? "good" : "warn"}
        />
        <StatusBadge
          label={identity.isAuthed ? "Account-backed" : "Preview identity"}
          tone="strong"
        />
        {identity.email ? <StatusBadge label={identity.email} tone="neutral" /> : null}
      </div>

      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <Link href="/pricing" className="btn btn-secondary">Pricing</Link>
        {identity.isAuthed ? <SignOutButton /> : <Link href="/login" className="btn btn-primary">Sign in</Link>}
      </div>
    </div>
  );
}
