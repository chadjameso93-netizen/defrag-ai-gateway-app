"use client";

export default function OverviewStats({
  relationshipCount,
  participantCount,
  eventCount,
  dailyReadCount
}: {
  relationshipCount: number;
  participantCount: number;
  eventCount: number;
  dailyReadCount: number;
}) {
  const items = [
    { label: "Relationships", value: relationshipCount },
    { label: "Participants", value: participantCount },
    { label: "Events", value: eventCount },
    { label: "Daily Reads", value: dailyReadCount }
  ];

  return (
    <div className="grid" style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 12 }}>
      {items.map((item) => (
        <div key={item.label} className="mini-card">
          <div className="label">{item.label}</div>
          <div className="value" style={{ fontSize: 22 }}>{item.value}</div>
        </div>
      ))}
    </div>
  );
}
