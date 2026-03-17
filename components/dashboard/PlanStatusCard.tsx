"use client";

import { useEffect, useState } from "react";
import StatusBadge from "@/components/badges/StatusBadge";

export default function PlanStatusCard({ userId }: { userId: string }) {
  const [plan, setPlan] = useState("free");
  const [status, setStatus] = useState("inactive");

  useEffect(() => {
    async function load() {
      if (!userId) return;

      const res = await fetch(`/api/v1/entitlement?userId=${encodeURIComponent(userId)}`, {
        cache: "no-store"
      });
      const data = await res.json();

      if (data?.entitlement) {
        setPlan(data.entitlement.plan || "free");
        setStatus(data.entitlement.status || "inactive");
      }
    }

    load();
  }, [userId]);

  const premium = plan === "premium" && status === "active";

  return (
    <div className="card">
      <div className="result-title">Plan</div>
      <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <StatusBadge
          label={premium ? "Defrag Pro" : "Free"}
          tone={premium ? "good" : "neutral"}
        />
        <StatusBadge
          label={status}
          tone={premium ? "good" : "warn"}
        />
      </div>
      <div className="result-copy" style={{ marginTop: 12 }}>
        {premium
          ? "Full relational synthesis and premium system access are enabled."
          : "You are on a limited preview plan. Upgrade to unlock full system depth."}
      </div>
    </div>
  );
}
