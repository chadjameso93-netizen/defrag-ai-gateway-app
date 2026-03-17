"use client";

import { useEffect, useState } from "react";

export default function ProfileEditor({ userId }: { userId: string }) {
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthTimeConfidence, setBirthTimeConfidence] = useState("unknown");
  const [birthPlace, setBirthPlace] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      if (!userId) return;
      setLoading(true);

      const res = await fetch(`/api/v1/profile/read?userId=${encodeURIComponent(userId)}`, {
        cache: "no-store"
      });

      const data = await res.json();
      const profile = data.profile;

      if (profile) {
        setFullName(profile.full_name || "");
        setBirthDate(profile.birth_date || "");
        setBirthTime(profile.birth_time || "");
        setBirthTimeConfidence(profile.birth_time_confidence || "unknown");
        setBirthPlace(profile.birth_place || "");
        setCurrentLocation(profile.current_location || "");
      }

      setLoading(false);
    }

    load();
  }, [userId]);

  async function save() {
    setSaving(true);
    setMessage("");

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
      setMessage(data.error || "Unable to save profile.");
      setSaving(false);
      return;
    }

    setMessage("Profile updated.");
    setSaving(false);
  }

  return (
    <div className="card">
      <div className="result-title">Edit profile</div>

      {loading ? (
        <div className="result-copy" style={{ marginTop: 12 }}>Loading...</div>
      ) : (
        <>
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 12 }}>
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

          {message ? <div style={{ marginTop: 14, color: "rgba(255,255,255,.82)" }}>{message}</div> : null}

          <div className="actions" style={{ marginTop: 18 }}>
            <button className="btn btn-primary" disabled={saving || !userId} onClick={save}>
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
