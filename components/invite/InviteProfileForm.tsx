"use client";

import { useState } from "react";

export default function InviteProfileForm({ token }: { token: string }) {
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthTimeConfidence, setBirthTimeConfidence] = useState("unknown");
  const [birthPlace, setBirthPlace] = useState("");
  const [privacyMode, setPrivacyMode] = useState("private_raw");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    setLoading(true);
    setError("");

    const res = await fetch(`/api/v1/invites/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullName,
        birthDate,
        birthTime,
        birthTimeConfidence,
        birthPlace,
        privacyMode
      })
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      setLoading(false);
      return;
    }

    setDone(true);
    setLoading(false);
  }

  if (done) {
    return (
      <div className="result-card" style={{ marginTop: 24 }}>
        <div className="kicker">Complete</div>
        <div className="result-copy">
          Your profile has been submitted successfully.
        </div>
      </div>
    );
  }

  return (
    <div className="result-card" style={{ marginTop: 24 }}>
      <div className="kicker">Your profile</div>

      <label className="label">Full name</label>
      <input className="input" value={fullName} onChange={(e) => setFullName(e.target.value)} />

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

      <label className="label" style={{ marginTop: 14 }}>Birth location</label>
      <input className="input" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} />

      <label className="label" style={{ marginTop: 14 }}>Privacy mode</label>
      <select className="input" value={privacyMode} onChange={(e) => setPrivacyMode(e.target.value)}>
        <option value="private_raw">Keep raw birth data private</option>
        <option value="derived_only">Share derived compatibility only</option>
        <option value="shared">Share with relationship owner</option>
      </select>

      {error ? (
        <div style={{ marginTop: 14, color: "#fda4af" }}>{error}</div>
      ) : null}

      <div className="actions">
        <button className="btn btn-primary" disabled={loading} onClick={submit}>
          {loading ? "Submitting..." : "Submit profile"}
        </button>
      </div>
    </div>
  );
}
