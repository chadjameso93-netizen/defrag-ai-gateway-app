"use client";

import { useEffect, useState } from "react";
import DailyReadAudioPlayer from "@/components/audio/DailyReadAudioPlayer";

export default function DailyReadPanel({ userId }: { userId: string }) {
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
    <div className="card">
      <div className="result-title">Daily read</div>

      {loading ? (
        <div className="result-copy" style={{ marginTop: 12 }}>Loading...</div>
      ) : reads.length === 0 ? (
        <div className="result-copy" style={{ marginTop: 12 }}>No daily reads yet.</div>
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
  );
}
