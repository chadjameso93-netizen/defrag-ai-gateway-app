"use client";

import { useMemo, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useAppIdentity } from "@/hooks/useAppIdentity";

export default function OnboardingPage() {
  const { userId } = useAppIdentity();

  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthTimeKnown, setBirthTimeKnown] = useState(true);
  const [birthPlace, setBirthPlace] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const effectiveBirthTime = useMemo(() => {
    return birthTimeKnown ? birthTime : "12:00";
  }, [birthTimeKnown, birthTime]);

  async function saveProfile() {
    setLoading(true);
    setError("");

    const res = await fetch("/api/v1/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId,
        fullName,
        birthDate,
        birthTime: effectiveBirthTime,
        birthTimeConfidence: birthTimeKnown ? "exact" : "unknown_default_noon",
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

    setLoading(false);
    window.location.href = "/app";
  }

  return (
    <AppShell
      title="Profile setup"
      subtitle="A guided setup so Defrag can give you a clearer read."
    >
      <div className="onboarding-reset-grid">
        <section className="onboarding-main-surface">
          <div className="kicker">Step {step} of 4</div>

          {step === 1 ? (
            <>
              <h2 className="analysis-surface-title">What Defrag does</h2>
              <p className="muted">
                Defrag helps you see what’s actually happening between you and your people, and what to do next.
              </p>
              <p className="muted" style={{ marginTop: 12 }}>
                It gives you a clearer view of the situation from more than one side, so you are not guessing in the dark.
              </p>

              <div className="onboarding-form-grid" style={{ gridTemplateColumns: "1fr", marginTop: 24 }}>
                <div>
                  <label className="label">Your name</label>
                  <input className="input" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
              </div>

              <div className="actions" style={{ marginTop: 22 }}>
                <button className="btn btn-primary" disabled={!fullName.trim()} onClick={() => setStep(2)}>
                  Continue
                </button>
              </div>
            </>
          ) : null}

          {step === 2 ? (
            <>
              <h2 className="analysis-surface-title">Birth details</h2>
              <p className="muted">
                Birth details help Defrag build a stronger timing layer and a more accurate profile.
              </p>

              <div className="onboarding-form-grid" style={{ marginTop: 22 }}>
                <div>
                  <label className="label">Birth date</label>
                  <input className="input" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                </div>

                <div>
                  <label className="label">Birth place</label>
                  <input className="input" value={birthPlace} onChange={(e) => setBirthPlace(e.target.value)} />
                </div>
              </div>

              <div style={{ marginTop: 18 }}>
                <label className="label">Do you know your birth time?</label>
                <div className="actions">
                  <button
                    type="button"
                    className={`btn ${birthTimeKnown ? "btn-primary" : "btn-secondary"}`}
                    onClick={() => setBirthTimeKnown(true)}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className={`btn ${!birthTimeKnown ? "btn-primary" : "btn-secondary"}`}
                    onClick={() => setBirthTimeKnown(false)}
                  >
                    No
                  </button>
                </div>
              </div>

              {birthTimeKnown ? (
                <div style={{ marginTop: 18, maxWidth: 320 }}>
                  <label className="label">Birth time</label>
                  <input className="input" type="time" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} />
                </div>
              ) : (
                <div className="console-inline-banner" style={{ marginTop: 18 }}>
                  <div className="result-title">Unknown birth time</div>
                  <div className="result-copy">
                    We’ll use 12:00 PM for now. Your read will still work, but some details may be less exact until you add a real birth time.
                  </div>
                  <div className="actions" style={{ marginTop: 12 }}>
                    <a
                      className="btn btn-secondary"
                      href="https://www.astro.com/faq/fq_de_time_i.htm"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Why birth time matters
                    </a>
                  </div>
                </div>
              )}

              <div className="actions" style={{ marginTop: 22 }}>
                <button className="btn btn-secondary" onClick={() => setStep(1)}>Back</button>
                <button
                  className="btn btn-primary"
                  disabled={!birthDate || !birthPlace || (birthTimeKnown && !birthTime)}
                  onClick={() => setStep(3)}
                >
                  Continue
                </button>
              </div>
            </>
          ) : null}

          {step === 3 ? (
            <>
              <h2 className="analysis-surface-title">Current location</h2>
              <p className="muted">
                Your current location helps match daily guidance to where you are now.
              </p>

              <div className="onboarding-form-grid" style={{ gridTemplateColumns: "1fr", marginTop: 22 }}>
                <div>
                  <label className="label">Current location</label>
                  <input className="input" value={currentLocation} onChange={(e) => setCurrentLocation(e.target.value)} />
                </div>
              </div>

              <div className="actions" style={{ marginTop: 22 }}>
                <button className="btn btn-secondary" onClick={() => setStep(2)}>Back</button>
                <button className="btn btn-primary" disabled={!currentLocation.trim()} onClick={() => setStep(4)}>
                  Continue
                </button>
              </div>
            </>
          ) : null}

          {step === 4 ? (
            <>
              <h2 className="analysis-surface-title">You’re ready</h2>
              <p className="muted">
                When you enter Defrag, your workspace will already show a daily read, a live field view, and a place to add other people.
              </p>

              {error ? <div style={{ marginTop: 14, color: "#fda4af" }}>{error}</div> : null}

              <div className="actions" style={{ marginTop: 22 }}>
                <button className="btn btn-secondary" onClick={() => setStep(3)}>Back</button>
                <button className="btn btn-primary" disabled={loading || !userId} onClick={saveProfile}>
                  {loading ? "Saving..." : "Enter Defrag"}
                </button>
              </div>
            </>
          ) : null}
        </section>

        <aside className="onboarding-rail">
          <div className="onboarding-step-list">
            <div className={`onboarding-step ${step >= 1 ? "active" : ""}`}><span>1</span><strong>What Defrag does</strong></div>
            <div className={`onboarding-step ${step >= 2 ? "active" : ""}`}><span>2</span><strong>Birth details</strong></div>
            <div className={`onboarding-step ${step >= 3 ? "active" : ""}`}><span>3</span><strong>Current location</strong></div>
            <div className={`onboarding-step ${step >= 4 ? "active" : ""}`}><span>4</span><strong>Enter Defrag</strong></div>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
