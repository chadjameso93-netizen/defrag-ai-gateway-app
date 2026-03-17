"use client";

import { useState } from "react";

export default function EventComposer({
  relationshipId,
  onCreated
}: {
  relationshipId: string;
  onCreated?: () => void;
}) {
  const [type, setType] = useState("conversation");
  const [notes, setNotes] = useState("");
  const [intensity, setIntensity] = useState("0.5");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    setLoading(true);
    setError("");

    const res = await fetch("/api/v1/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        relationshipId,
        type,
        notes,
        intensity: Number(intensity)
      })
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Unable to create event.");
      setLoading(false);
      return;
    }

    setNotes("");
    setIntensity("0.5");
    setLoading(false);
    onCreated?.();
  }

  return (
    <div className="card">
      <div className="result-title">Add event</div>

      <label className="label" style={{ marginTop: 14 }}>Event type</label>
      <select className="input" value={type} onChange={(e) => setType(e.target.value)}>
        <option value="conversation">Conversation</option>
        <option value="argument">Argument</option>
        <option value="distance">Distance</option>
        <option value="repair">Repair</option>
        <option value="stress">Stress</option>
        <option value="reconnection">Reconnection</option>
      </select>

      <label className="label" style={{ marginTop: 14 }}>Notes</label>
      <textarea className="textarea" value={notes} onChange={(e) => setNotes(e.target.value)} />

      <label className="label" style={{ marginTop: 14 }}>Intensity</label>
      <input className="input" type="number" min="0" max="1" step="0.1" value={intensity} onChange={(e) => setIntensity(e.target.value)} />

      {error ? <div style={{ marginTop: 14, color: "#fda4af" }}>{error}</div> : null}

      <div className="actions">
        <button className="btn btn-primary" disabled={loading} onClick={submit}>
          {loading ? "Saving..." : "Save event"}
        </button>
      </div>
    </div>
  );
}
