"use client";

import { useEffect, useState } from "react";
import { useAppIdentity } from "@/hooks/useAppIdentity";
import AppShell from "@/components/layout/AppShell";
import TimelineSummary from "@/components/timeline/TimelineSummary";
import TimelineHero from "@/components/timeline/TimelineHero";
import TimelineReadStack from "@/components/timeline/TimelineReadStack";
import TimelineEventStack from "@/components/timeline/TimelineEventStack";

export default function TimelinePage() {
  const { userId } = useAppIdentity();
  const [reads, setReads] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      if (!userId) return;
      setLoading(true);

      const [readsRes, eventsRes] = await Promise.all([
        fetch(`/api/v1/daily-read?userId=${encodeURIComponent(userId)}`, {
          cache: "no-store"
        }),
        fetch(`/api/v1/timeline?userId=${encodeURIComponent(userId)}`, {
          cache: "no-store"
        })
      ]);

      const readsData = await readsRes.json();
      const eventsData = await eventsRes.json();

      setReads(readsData.reads || []);
      setEvents(eventsData.events || []);
      setLoading(false);
    }

    load();
  }, [userId]);

  return (
    <AppShell
      title="Timeline"
      subtitle="Daily reads, cross-relationship events, and future timing windows converge here."
    >
      <TimelineHero readCount={reads.length} eventCount={events.length} />
      <div style={{ marginTop: 24 }}>
        <TimelineSummary reads={reads} events={events} />
      </div>

      <div className="grid console-grid-two" style={{ gap: 24, marginTop: 24 }}>
        {loading ? (
          <div className="card">
            <div className="result-copy">Loading...</div>
          </div>
        ) : (
          <>
            <TimelineReadStack reads={reads} />
            <TimelineEventStack events={events} />
          </>
        )}
      </div>
    </AppShell>
  );
}
