"use client";

import { useState } from "react";
import { useAppIdentity } from "@/hooks/useAppIdentity";

export default function OnboardingPage() {
  const { userId } = useAppIdentity();

  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthTimeConfidence, setBirthTimeConfidence] = useState("unknown");
  const [birthPlace, setBirthPlace] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function saveProfile() {
    setLoading(true);
    setError("");
    setDone(false);

    const res = await fetch("/api/v1/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId,
        fullName,
        birthDate,
        birthTime,
        birthTimeConfidence,
        birthPlace,
        currentLocation,
        onboardingFocus: "one_person"
      })
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Unable to save profile.");
      setLoading(false);
      return;
    }

    setDone(true);
    setLoading(false);
  }

  return (
    <main className="app-page">
      <div className="shell" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div className="input-card" style={{ maxWidth: 760, margin: "0 auto" }}>
          <div className="kicker">Onboarding</div>
          <h1 className="section-title">Create your Defrag profile</h1>
          <p className="muted">
            Defrag uses natal profile, live timing, and relational context to generate deeper synthesis.
          </p>

          <label className="label" style={{ marginTop: 18 }}>Full name</label>
          <input className="input" value={fullName} onChange={(e) => setFullName(e.target.value)} />

          <label className="label" style={{ marginTop: 18 }}>Birth date</label>
          <input className="input" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />

          <label className="label" style={{ marginTop: 18 }}>Birth time</label>
          <input className="input" type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} />

          <label className="label" style={{ marginTop: 18 }}>Birth time confidence</label>
          <select className="input" value={birthTimeConfidence} onChange={(e) => setBirthTimeConfidence(e.target.value)}>
            <option value="exact">Exact</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
            <option value="unknown">Unknown</option>
          </select>

          <label className="label" style={{ marginTop: 18 }}>Birth place</label>
          <input className="input" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} />

          <label className="label" style={{ marginTop: 18 }}>Current location</label>
          <input className="input" value={currentLocation} onChange={(e) => setCurrentLocation(e.target.value)} />

          {error ? <div style={{ marginTop: 14, color: "#fda4af" }}>{error}</div> : null}
          {done ? <div style={{ marginTop: 14, color: "#86efac" }}>Profile saved.</div> : null}

          <div className="actions">
            <button className="btn btn-primary" disabled={loading || !userId} onClick={saveProfile}>
              {loading ? "Saving..." : "Save profile"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
