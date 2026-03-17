"use client";

import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useAppIdentity } from "@/hooks/useAppIdentity";
import OnboardingStepper from "@/components/onboarding/OnboardingStepper";

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

  const step =
    done ? 4 :
    fullName ? birthDate || birthPlace ? 3 : 2 : 1;

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
      title="Create your profile"
      subtitle="A guided setup flow for the profile Defrag uses to build timing context, symbolic depth, and stronger relational precision."
    >
      <div className="grid console-grid-two" style={{ gap: 24 }}>
        <div
          style={{
            border: "1px solid rgba(255,255,255,.08)",
            background: "rgba(255,255,255,.03)",
            borderRadius: 28,
            padding: 24
          }}
        >
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 18 }}>
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

          <div className="actions" style={{ marginTop: 20 }}>
            <button className="btn btn-primary" disabled={loading || !userId} onClick={saveProfile}>
              {loading ? "Saving..." : "Complete profile"}
            </button>
          </div>
        </div>

        <div className="card card-dark" style={{ minHeight: 360 }}>
          <div className="kicker">Guided flow</div>
          <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1.04, marginBottom: 18 }}>
            Build the symbolic profile the system depends on.
          </div>

          <OnboardingStepper step={step} />

          <p className="muted" style={{ marginTop: 22 }}>
            The stronger your profile data, the stronger the timing layer, daily reads, and relationship synthesis become.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
