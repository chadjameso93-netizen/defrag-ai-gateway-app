"use client";

export default function RelationshipMetrics({
  participantCount,
  inviteCount,
  eventCount,
  pressure
}: {
  participantCount: number;
  inviteCount: number;
  eventCount: number;
  pressure: number;
}) {
  const items = [
    { label: "Participants", value: String(participantCount) },
    { label: "Invites", value: String(inviteCount) },
    { label: "Events", value: String(eventCount) },
    { label: "Pressure", value: `${Math.round(pressure * 100)}%` }
  ];

  return (
    <div className="grid" style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 12, marginTop: 18 }}>
      {items.map((item) => (
        <div key={item.label} className="mini-card">
          <div className="label">{item.label}</div>
          <div className="value" style={{ fontSize: 20 }}>{item.value}</div>
        </div>
      ))}
    </div>
  );
}
