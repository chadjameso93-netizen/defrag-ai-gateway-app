"use client";

export default function TimelineSummary({
  reads,
  events
}: {
  reads: any[];
  events: any[];
}) {
  const eventCount = events.length;
  const readCount = reads.length;

  const highIntensityCount = events.filter((e) => Number(e.intensity || 0) >= 0.75).length;
  const moderateCount = events.filter((e) => Number(e.intensity || 0) >= 0.5 && Number(e.intensity || 0) < 0.75).length;

  return (
    <div className="card">
      <div className="result-title">Timeline summary</div>

      <div className="grid" style={{ gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 12, marginTop: 12 }}>
        <div className="mini-card">
          <div className="label">Reads</div>
          <div className="value" style={{ fontSize: 22 }}>{readCount}</div>
        </div>
        <div className="mini-card">
          <div className="label">Events</div>
          <div className="value" style={{ fontSize: 22 }}>{eventCount}</div>
        </div>
        <div className="mini-card">
          <div className="label">High intensity</div>
          <div className="value" style={{ fontSize: 22 }}>{highIntensityCount}</div>
        </div>
        <div className="mini-card">
          <div className="label">Moderate</div>
          <div className="value" style={{ fontSize: 22 }}>{moderateCount}</div>
        </div>
      </div>
    </div>
  );
}
