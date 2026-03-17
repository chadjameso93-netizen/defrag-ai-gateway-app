"use client";

import DailyReadAudioPlayer from "@/components/audio/DailyReadAudioPlayer";

export default function TimelineReadStack({ reads }: { reads: any[] }) {
  return (
    <div className="card">
      <div className="result-title">Daily reads</div>

      {reads.length === 0 ? (
        <div className="result-copy" style={{ marginTop: 12 }}>No reads yet.</div>
      ) : (
        <div style={{ marginTop: 12, display: "grid", gap: 14 }}>
          {reads.map((read) => (
            <div key={read.id} className="message-box" style={{ padding: 16 }}>
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
