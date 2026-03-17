"use client";

import { useState } from "react";

export default function SaveConsoleEvent({
  relationshipId,
  notes
}: {
  relationshipId: string;
  notes: string;
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function save(type: string) {
    if (!relationshipId || !notes.trim()) return;

    setLoading(true);
    setMessage("");

    const res = await fetch("/api/v1/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        relationshipId,
        type,
        notes,
        intensity: type === "argument" ? 0.8 : type === "distance" ? 0.45 : 0.55
      })
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Unable to save event.");
      setLoading(false);
      return;
    }

    setMessage("Saved to timeline.");
    setLoading(false);
  }

  return (
    <div className="card">
      <div className="result-title">Save to timeline</div>
      <div className="result-copy" style={{ marginTop: 12 }}>
        Capture this moment as part of the relationship history.
      </div>

      {message ? <div style={{ marginTop: 12, color: "rgba(255,255,255,.82)" }}>{message}</div> : null}

      <div className="actions" style={{ marginTop: 16 }}>
        <button className="btn btn-secondary" disabled={loading || !relationshipId || !notes.trim()} onClick={() => save("conversation")}>
          {loading ? "Saving..." : "Save as conversation"}
        </button>
        <button className="btn btn-secondary" disabled={loading || !relationshipId || !notes.trim()} onClick={() => save("argument")}>
          Save as argument
        </button>
        <button className="btn btn-secondary" disabled={loading || !relationshipId || !notes.trim()} onClick={() => save("distance")}>
          Save as distance
        </button>
      </div>
    </div>
  );
}
