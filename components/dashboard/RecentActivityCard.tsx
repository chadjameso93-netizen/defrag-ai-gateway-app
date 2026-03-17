"use client";

import { useEffect, useState } from "react";
import StatusBadge from "@/components/badges/StatusBadge";

export default function RecentActivityCard({ userId }: { userId: string }) {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      if (!userId) return;

      const res = await fetch(`/api/v1/timeline?userId=${encodeURIComponent(userId)}`, {
        cache: "no-store"
      });

      const data = await res.json();
      setEvents((data.events || []).slice(0, 6));
    }

    load();
  }, [userId]);

  return (
    <div className="card">
      <div className="result-title">Recent activity</div>

      {events.length === 0 ? (
        <div className="result-copy" style={{ marginTop: 12 }}>
          No recent activity yet.
        </div>
      ) : (
        <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
          {events.map((event) => (
            <div key={event.id} className="message-box">
              <div className="result-title">
                {event.relationship?.label || "Relationship"} · {event.event_type}
              </div>
              <div className="result-copy">{event.notes || "No notes"}</div>
              <div style={{ marginTop: 10 }}>
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
