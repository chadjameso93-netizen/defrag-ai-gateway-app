"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useAppIdentity } from "@/hooks/useAppIdentity";

type TimelineEvent = {
  id: string;
  title: string;
  notes: string;
  event_type: string;
  created_at: string;
};

export default function TimelinePage() {
  const { userId } = useAppIdentity();
  const [events, setEvents] = useState<TimelineEvent[]>([]);

  useEffect(() => {
    async function load() {
      if (!userId) return;
      const res = await fetch(`/api/v1/timeline?userId=${encodeURIComponent(userId)}`, {
        cache: "no-store"
      });
      const data = await res.json();
      setEvents(data.events || []);
    }

    load();
  }, [userId]);

  return (
    <AppShell
      title="Timeline"
      subtitle="Recent changes, notes, and events across your system."
    >
      <div className="console-reset-layout">
        <section className="rail-map-surface">
          <div className="result-title">Recent events</div>
          <div className="timeline-list">
            {events.length === 0 ? (
              <div className="result-copy">No timeline entries yet.</div>
            ) : (
              events.map((item) => (
                <div key={item.id} className="timeline-row">
                  <div>
                    <strong>{item.title}</strong>
                    <div className="muted">{item.notes || item.event_type}</div>
                  </div>
                  <div className="timeline-date">
                    {new Date(item.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
