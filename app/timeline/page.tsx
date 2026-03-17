"use client";

import { useEffect, useState } from "react";
import { useLocalUser } from "@/hooks/useLocalUser";
import DailyReadAudioPlayer from "@/components/audio/DailyReadAudioPlayer";

export default function TimelinePage() {
  const userId = useLocalUser();
  const [reads, setReads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadReads() {
      if (!userId) return;
      setLoading(true);
      const res = await fetch(`/api/v1/daily-read?userId=${encodeURIComponent(userId)}`, {
        cache: "no-store"
      });
      const data = await res.json();
      setReads(data.reads || []);
      setLoading(false);
    }

    loadReads();
  }, [userId]);

  return (
    <main className="app-page">
      <div className="shell" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div className="input-card" style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div className="kicker">Timeline</div>
          <h1 className="section-title">Daily reads and timeline</h1>
          <p className="muted">
            This surface combines relationship events, daily reads, and future timing windows.
          </p>

          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 24 }}>
            <div className="card">
              <div className="result-title">Today</div>
              {loading ? (
                <div className="result-copy" style={{ marginTop: 12 }}>Loading...</div>
              ) : reads.length === 0 ? (
                <div className="result-copy" style={{ marginTop: 12 }}>No reads yet.</div>
              ) : (
                <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
                  {reads.map((read) => (
                    <div key={read.id} className="message-box">
                      <div className="result-title">{read.title}</div>
                      <div className="result-copy">{read.body_text}</div>
                      <DailyReadAudioPlayer dailyReadId={read.id} initialAudioUrl={read.audio_url} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="card">
              <div className="result-title">Next</div>
              <div className="result-copy" style={{ marginTop: 12 }}>
                The next sprint will upgrade daily reads from deterministic text to state-aware generation and refine the live system console.
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
