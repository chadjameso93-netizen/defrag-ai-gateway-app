"use client";

import StatusBadge from "@/components/badges/StatusBadge";

export default function EventFeedCard({
  event
}: {
  event: {
    id: string;
    event_type: string;
    notes: string | null;
    intensity: number;
    created_at: string;
  };
}) {
  const intensity =
    event.intensity >= 0.75 ? "High intensity" :
    event.intensity >= 0.5 ? "Moderate intensity" :
    "Low intensity";

  const tone =
    event.intensity >= 0.75 ? "warn" :
    event.intensity >= 0.5 ? "strong" :
    "neutral";

  return (
    <div className="message-box" style={{ display: "grid", gap: 10 }}>
      <div>
        <div className="result-title">{event.event_type}</div>
        <div className="result-copy">{event.notes || "No notes"}</div>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <StatusBadge label={intensity} tone={tone as any} />
        <StatusBadge label={new Date(event.created_at).toLocaleString()} tone="neutral" />
      </div>
    </div>
  );
}
