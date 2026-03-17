"use client";

export default function TimelineHero({
  readCount,
  eventCount
}: {
  readCount: number;
  eventCount: number;
}) {
  return (
    <div className="card card-dark" style={{ minHeight: 220 }}>
      <div className="kicker">Timeline</div>
      <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.055em", lineHeight: 1.02, maxWidth: 840 }}>
        A chronological view of relational movement, pressure, and daily signal.
      </div>
      <p className="muted" style={{ marginTop: 12, maxWidth: 720 }}>
        Use the timeline to read what has accumulated over time — not just what feels loud in the moment.
      </p>

      <div className="grid" style={{ gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 12, marginTop: 20 }}>
        <div className="mini-card">
          <div className="label">Daily reads</div>
          <div className="value" style={{ fontSize: 24 }}>{readCount}</div>
        </div>
        <div className="mini-card">
          <div className="label">Timeline events</div>
          <div className="value" style={{ fontSize: 24 }}>{eventCount}</div>
        </div>
      </div>
    </div>
  );
}
