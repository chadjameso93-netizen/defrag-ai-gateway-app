"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import StatusBadge from "@/components/badges/StatusBadge";

export default function RecentActivityCard({
  userId,
  relationshipId
}: {
  userId: string;
  relationshipId?: string;
}) {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      if (!userId) return;

      const res = await fetch(`/api/v1/timeline?userId=${encodeURIComponent(userId)}`, {
        cache: "no-store"
      });

      const data = await res.json();
      let next = data.events || [];

      if (relationshipId) {
        next = next.filter((event: any) => event.relationship_id === relationshipId);
      }

      setEvents(next.slice(0, 6));
    }

    load();
  }, [userId, relationshipId]);

  return (
    <div className="card">
      <div className="result-title">
        {relationshipId ? "Selected relationship activity" : "Recent activity"}
      </div>

      {events.length === 0 ? (
        <div className="result-copy" style={{ marginTop: 12 }}>
          No recent activity yet.
        </div>
      ) : (
        <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
          {events.map((event) => (
            <Link
              key={event.id}
              href={event.relationship?.id ? `/relationships/${event.relationship.id}` : "/relationships"}
              className="message-box"
              style={{ textDecoration: "none" }}
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
                  label={new Date(event.created_at).toLocaleString()}
                  tone="neutral"
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
