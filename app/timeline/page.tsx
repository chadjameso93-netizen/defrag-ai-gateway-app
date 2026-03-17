"use client";

import { useEffect, useState } from "react";
import { useAppIdentity } from "@/hooks/useAppIdentity";
import DailyReadAudioPlayer from "@/components/audio/DailyReadAudioPlayer";
import AppShell from "@/components/layout/AppShell";
import TimelineFeed from "@/components/timeline/TimelineFeed";
import TimelineSummary from "@/components/timeline/TimelineSummary";

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
      <TimelineSummary reads={reads} events={events} />

      <div className="grid console-grid-two" style={{ gap: 24, marginTop: 24 }}>
        <div className="card">
          <div className="result-title">Today</div>
          {loading ? (
            <div className="result-copy" style={{ marginTop: 12 }}>Loading...</div>
          ) : reads.length === 0 ? (
            <div className="result-copy" style={{ marginTop: 12 }}>No reads yet.</div>
          ) : (
            <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
              {reads.map((read) => (
                <div key={read.id} className="message-box">
                  <div className="result-title">{read.title}</div>
                  <div className="result-copy">{read.body_text}</div>
                  <DailyReadAudioPlayer dailyReadId={read.id} initialAudioUrl={read.audio_url} />
                </div>
              ))}
            </div>
          )}
        </div>

        <TimelineFeed userId={userId} />
      </div>
    </AppShell>
  );
}
