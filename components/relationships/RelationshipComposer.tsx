"use client";

import { useState } from "react";

export default function RelationshipComposer({
  userId,
  onCreated
}: {
  userId: string;
  onCreated?: () => void;
}) {
  const [label, setLabel] = useState("");
  const [relationshipType, setRelationshipType] = useState("partner");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function createRelationship() {
    setLoading(true);
    setError("");

    const res = await fetch("/api/v1/relationships", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ownerUserId: userId,
        label,
        relationshipType
      })
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Unable to create relationship.");
      setLoading(false);
      return;
    }

    setLabel("");
    setRelationshipType("partner");
    setLoading(false);
    onCreated?.();
  }

  return (
    <div className="card">
      <div className="result-title">Create relationship</div>

      <label className="label" style={{ marginTop: 14 }}>Name or label</label>
      <input className="input" value={label} onChange={(e) => setLabel(e.target.value)} />

      <label className="label" style={{ marginTop: 14 }}>Relationship type</label>
      <select className="input" value={relationshipType} onChange={(e) => setRelationshipType(e.target.value)}>
        <option value="partner">Partner</option>
        <option value="parent">Parent</option>
        <option value="child">Child</option>
        <option value="friend">Friend</option>
        <option value="coworker">Coworker</option>
        <option value="team">Team</option>
      </select>

      {error ? <div style={{ marginTop: 14, color: "#fda4af" }}>{error}</div> : null}

      <div className="actions">
        <button className="btn btn-primary" disabled={loading || !label.trim()} onClick={createRelationship}>
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
}
