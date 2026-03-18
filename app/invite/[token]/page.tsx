"use client";

import { useMemo, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useParams } from "next/navigation";
import { useAppIdentity } from "@/hooks/useAppIdentity";

export default function InviteAcceptPage() {
  const params = useParams();
  const token = useMemo(() => String(params?.token || ""), [params]);
  const { userId } = useAppIdentity();

  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("Accept this invite to add the connection to your Defrag workspace.");

  async function acceptInvite() {
    if (!userId || !token) return;

    setStatus("loading");
    setMessage("Accepting invite...");

    const res = await fetch("/api/v1/invites/accept", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": userId
      },
      body: JSON.stringify({
        userId,
        token
      })
    });

    const data = await res.json();

    if (!res.ok) {
      setStatus("error");
      setMessage(data.error || "Unable to accept invite.");
      return;
    }

    setStatus("done");
    setMessage("Invite accepted. The relationship is now part of your system.");
  }

  return (
    <AppShell
      title="Accept invite"
      subtitle="Add this connection to your Defrag workspace."
    >
      <div className="console-reset-layout">
        <section className="rail-map-surface">
          <div className="result-title">Connection invite</div>
          <div className="result-copy">{message}</div>

          <div className="actions" style={{ marginTop: 16 }}>
            <button
              className="btn btn-primary"
              onClick={acceptInvite}
              disabled={!userId || !token || status === "loading" || status === "done"}
            >
              {status === "loading" ? "Accepting..." : status === "done" ? "Accepted" : "Accept invite"}
            </button>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
