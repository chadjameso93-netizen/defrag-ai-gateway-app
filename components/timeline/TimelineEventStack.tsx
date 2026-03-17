"use client";

import StatusBadge from "@/components/badges/StatusBadge";
import Link from "next/link";

export default function TimelineEventStack({ events }: { events: any[] }) {
  return (
    <div className="card">
      <div className="result-title">Event history</div>

      {events.length === 0 ? (
        <div className="result-copy" style={{ marginTop: 12 }}>No timeline events yet.</div>
      ) : (
        <div style={{ marginTop: 12, display: "grid", gap: 14 }}>
          {events.map((event) => (
            <Link
              key={event.id}
              href={event.relationship?.id ? `/relationships/${event.relationship.id}` : "/relationships"}
              className="message-box"
              style={{ textDecoration: "none", padding: 16 }}
            >
              <div className="result-title">
                {event.relationship?.label || "Relationship"} · {event.event_type}
              </div>
              <div className="result-copy">{event.notes || "No notes"}</div>

              <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                {event.relationship?.relationship_type ? (
                  <StatusBadge label={event.relationship.relationship_type} tone="strong" />
                ) : null}
                <StatusBadge
                  label={
                    event.intensity >= 0.75
                      ? "High intensity"
                      : event.intensity >= 0.5
                      ? "Moderate intensity"
                      : "Low intensity"
                  }
                  tone={event.intensity >= 0.75 ? "warn" : event.intensity >= 0.5 ? "strong" : "neutral"}
                />
                <StatusBadge label={new Date(event.created_at).toLocaleString()} tone="neutral" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
