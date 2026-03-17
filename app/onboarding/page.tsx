"use client";

import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
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

  const step = done ? 4 : !fullName ? 1 : !birthDate && !birthPlace ? 2 : !currentLocation ? 3 : 3;

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
    <AppShell
      title="Profile setup"
      subtitle="A short setup for the timing and pattern layer Defrag reads from."
    >
      <div className="onboarding-reset-grid">
        <section className="onboarding-main-surface">
          <div className="kicker">Step {step} of 4</div>
          <h2 className="analysis-surface-title">Build your profile.</h2>
          <p className="muted">
            Better profile details give Defrag a better read.
          </p>

          <div className="onboarding-form-grid">
            <div>
              <label className="label">Full name</label>
              <input className="input" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>

            <div>
              <label className="label">Birth date</label>
              <input className="input" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
            </div>

            <div>
              <label className="label">Birth time</label>
              <input className="input" type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} />
            </div>

            <div>
              <label className="label">Birth time confidence</label>
              <select className="input" value={birthTimeConfidence} onChange={(e) => setBirthTimeConfidence(e.target.value)}>
                <option value="exact">Exact</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>

            <div>
              <label className="label">Birth place</label>
              <input className="input" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} />
            </div>

            <div>
              <label className="label">Current location</label>
              <input className="input" value={currentLocation} onChange={(e) => setCurrentLocation(e.target.value)} />
            </div>
          </div>

          {error ? <div style={{ marginTop: 14, color: "#fda4af" }}>{error}</div> : null}
          {done ? <div style={{ marginTop: 14, color: "#86efac" }}>Profile saved.</div> : null}

          <div className="actions" style={{ marginTop: 22 }}>
            <button className="btn btn-primary" disabled={loading || !userId} onClick={saveProfile}>
              {loading ? "Saving..." : "Save profile"}
            </button>
          </div>
        </section>

        <aside className="onboarding-rail">
          <div className="onboarding-step-list">
            <div className={`onboarding-step ${step >= 1 ? "active" : ""}`}><span>1</span><strong>Name</strong></div>
            <div className={`onboarding-step ${step >= 2 ? "active" : ""}`}><span>2</span><strong>Birth details</strong></div>
            <div className={`onboarding-step ${step >= 3 ? "active" : ""}`}><span>3</span><strong>Location</strong></div>
            <div className={`onboarding-step ${step >= 4 ? "active" : ""}`}><span>4</span><strong>Done</strong></div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
