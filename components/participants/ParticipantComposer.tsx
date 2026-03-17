"use client";

import { useState } from "react";

export default function ParticipantComposer({
  relationshipId,
  ownerUserId,
  onCreated
}: {
  relationshipId: string;
  ownerUserId: string;
  onCreated?: () => void;
}) {
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState("partner");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthTimeConfidence, setBirthTimeConfidence] = useState("unknown");
  const [birthPlace, setBirthPlace] = useState("");
  const [privacyMode, setPrivacyMode] = useState("private_raw");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    setLoading(true);
    setError("");

    const res = await fetch("/api/v1/participants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        relationshipId,
        ownerUserId,
        displayName,
        role,
        birthDate,
        birthTime,
        birthTimeConfidence,
        birthPlace,
        privacyMode
      })
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Unable to add participant.");
      setLoading(false);
      return;
    }

    setDisplayName("");
    setBirthDate("");
    setBirthTime("");
    setBirthPlace("");
    setBirthTimeConfidence("unknown");
    setPrivacyMode("private_raw");
    setLoading(false);
    onCreated?.();
  }

  return (
    <div className="card">
      <div className="result-title">Add participant directly</div>

      <label className="label" style={{ marginTop: 14 }}>Name</label>
      <input className="input" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />

      <label className="label" style={{ marginTop: 14 }}>Role</label>
      <select className="input" value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="partner">Partner</option>
        <option value="parent">Parent</option>
        <option value="child">Child</option>
        <option value="friend">Friend</option>
        <option value="coworker">Coworker</option>
        <option value="team">Team member</option>
      </select>

      <label className="label" style={{ marginTop: 14 }}>Birth date</label>
      <input className="input" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />

      <label className="label" style={{ marginTop: 14 }}>Birth time</label>
      <input className="input" type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} />

      <label className="label" style={{ marginTop: 14 }}>Birth time confidence</label>
      <select className="input" value={birthTimeConfidence} onChange={(e) => setBirthTimeConfidence(e.target.value)}>
        <option value="exact">Exact</option>
        <option value="morning">Morning</option>
        <option value="afternoon">Afternoon</option>
        <option value="evening">Evening</option>
        <option value="unknown">Unknown</option>
      </select>

      <label className="label" style={{ marginTop: 14 }}>Birth place</label>
      <input className="input" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} />

      <label className="label" style={{ marginTop: 14 }}>Privacy mode</label>
      <select className="input" value={privacyMode} onChange={(e) => setPrivacyMode(e.target.value)}>
        <option value="private_raw">Keep raw data private</option>
        <option value="derived_only">Derived only</option>
        <option value="shared">Shared</option>
      </select>

      {error ? <div style={{ marginTop: 14, color: "#fda4af" }}>{error}</div> : null}

      <div className="actions">
        <button className="btn btn-primary" disabled={loading || !displayName.trim() || !birthDate || !birthPlace} onClick={submit}>
          {loading ? "Adding..." : "Add participant"}
        </button>
      </div>
    </div>
  );
}
