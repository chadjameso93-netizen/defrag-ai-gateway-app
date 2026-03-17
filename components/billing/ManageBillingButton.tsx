"use client";

import { useState } from "react";

export default function ManageBillingButton({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(false);

  async function openPortal() {
    try {
      setLoading(true);

      const res = await fetch("/api/v1/billing/portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId })
      });

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
        return;
      }

      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  return (
    <button className="btn btn-secondary" disabled={loading || !userId} onClick={openPortal}>
      {loading ? "Opening..." : "Manage billing"}
    </button>
  );
}
