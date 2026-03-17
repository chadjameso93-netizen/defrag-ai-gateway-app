"use client";

import { useEffect, useState } from "react";
import StatusBadge from "@/components/badges/StatusBadge";

export default function ProfileSummaryCard({ userId }: { userId: string }) {
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      if (!userId) return;
      setLoading(true);

      const res = await fetch(`/api/v1/profile/read?userId=${encodeURIComponent(userId)}`, {
        cache: "no-store"
      });

      const data = await res.json();
      setProfile(data.profile || null);
      setLoading(false);
    }

    loadProfile();
  }, [userId]);

  return (
    <div className="card">
      <div className="result-title">Profile</div>

      {loading ? (
        <div className="result-copy" style={{ marginTop: 12 }}>Loading...</div>
      ) : !profile ? (
        <div className="result-copy" style={{ marginTop: 12 }}>
          No saved profile yet. Complete onboarding to unlock stronger system depth.
        </div>
      ) : (
        <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
          <div className="message-box">
            <div className="result-title">{profile.full_name || "Unnamed profile"}</div>
            <div className="result-copy">
              {profile.birth_date || "No birth date"} · {profile.birth_place || "No birth place"}
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <StatusBadge
              label={
                profile.birth_time
                  ? "Birth time saved"
                  : "Birth time missing"
              }
              tone={profile.birth_time ? "good" : "warn"}
            />
            <StatusBadge
              label={profile.current_location ? "Current location saved" : "Current location missing"}
              tone={profile.current_location ? "good" : "warn"}
            />
            {profile.onboarding_focus ? (
              <StatusBadge label={profile.onboarding_focus} tone="strong" />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
