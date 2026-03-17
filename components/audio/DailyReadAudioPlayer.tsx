"use client";

import { useState } from "react";

export default function DailyReadAudioPlayer({
  dailyReadId,
  initialAudioUrl
}: {
  dailyReadId: string;
  initialAudioUrl?: string | null;
}) {
  const [audioUrl, setAudioUrl] = useState(initialAudioUrl || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateAudio() {
    setLoading(true);
    setError("");

    const res = await fetch("/api/v1/daily-read/audio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        dailyReadId
      })
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Unable to generate audio.");
      setLoading(false);
      return;
    }

    if (data.audioUrl) {
      setAudioUrl(data.audioUrl);
    }

    setLoading(false);
  }

  if (audioUrl) {
    return (
      <div style={{ marginTop: 12 }}>
        <audio controls preload="none" style={{ width: "100%" }}>
          <source src={audioUrl} type="audio/mpeg" />
        </audio>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 12 }}>
      {error ? <div style={{ color: "#fda4af", marginBottom: 10 }}>{error}</div> : null}
      <button className="btn btn-secondary" disabled={loading} onClick={generateAudio}>
        {loading ? "Generating audio..." : "Generate audio"}
      </button>
    </div>
  );
}
