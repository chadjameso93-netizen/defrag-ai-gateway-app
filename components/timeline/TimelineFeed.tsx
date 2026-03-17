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

      const res = await fetch(`/api/v1/dashboard/overview?userId=${encodeURIComponent(userId)}`, {
        cache: "no-store"
      });

      const data = await res.json();
      const relationshipCount = data?.overview?.relationshipCount || 0;

      if (!relationshipCount) {
        setEvents([]);
        setLoading(false);
        return;
      }

      const timelineRes = await fetch(`/api/v1/profile/read?userId=${encodeURIComponent(userId)}`, {
        cache: "no-store"
      });

      await timelineRes.json();
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
          Timeline event feed becomes richer in the next sprint. Current event history is available inside each relationship detail view.
        </div>
      ) : (
        <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
          {events.map((event) => (
            <div key={event.id} className="message-box">
              <div className="result-title">{event.event_type}</div>
              <div className="result-copy">{event.notes || "No notes"}</div>
              <div style={{ marginTop: 10 }}>
                <StatusBadge label={new Date(event.created_at).toLocaleString()} tone="neutral" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
