"use client";

import { useEffect, useState } from "react";
import StatusBadge from "@/components/badges/StatusBadge";

export default function TimelineFeed({ userId }: { userId: string }) {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      if (!userId) return;
      setLoading(true);

      const res = await fetch(`/api/v1/timeline?userId=${encodeURIComponent(userId)}`, {
        cache: "no-store"
      });

      const data = await res.json();
      setEvents(data.events || []);
      setLoading(false);
    }

    load();
  }, [userId]);

  return (
    <div className="card">
      <div className="result-title">Timeline feed</div>

      {loading ? (
        <div className="result-copy" style={{ marginTop: 12 }}>Loading...</div>
      ) : events.length === 0 ? (
        <div className="result-copy" style={{ marginTop: 12 }}>
          No cross-relationship timeline events yet.
        </div>
      ) : (
        <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
          {events.map((event) => (
            <div key={event.id} className="message-box">
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
                <StatusBadge
                  label={new Date(event.created_at).toLocaleString()}
                  tone="neutral"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
