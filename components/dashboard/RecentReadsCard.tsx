"use client";

export default function RecentReadsCard({ reads }: { reads: any[] }) {
  return (
    <div className="card">
      <div className="result-title">Recent reads</div>
      {reads.length === 0 ? (
        <div className="result-copy" style={{ marginTop: 12 }}>No reads yet.</div>
      ) : (
        <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
          {reads.map((read) => (
            <div key={read.id} className="message-box">
              <div className="result-title">{read.title}</div>
              <div className="result-copy">{read.body_text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
