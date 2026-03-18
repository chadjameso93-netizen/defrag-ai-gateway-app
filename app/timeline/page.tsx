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
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    if (!userId) return;
    const res = await fetch(`/api/v1/timeline?userId=${encodeURIComponent(userId)}`, {
      cache: "no-store",
      headers: { "x-user-id": userId }
    });
    const data = await res.json();
    setEvents(data.events || []);
  }

  useEffect(() => {
    load();
  }, [userId]);

  async function createNote() {
    if (!userId || !title.trim()) return;

    setSaving(true);

    await fetch("/api/v1/timeline", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": userId
      },
      body: JSON.stringify({
        userId,
        relationshipId: "timeline-global",
        title,
        notes,
        eventType: "note"
      })
    });

    setTitle("");
    setNotes("");
    setSaving(false);
    load();
  }

  return (
    <AppShell
      title="Timeline"
      subtitle="Recent changes, notes, and events across your system."
    >
      <div className="console-reset-layout">
        <section className="rail-map-surface">
          <div className="result-title">Add a note</div>
          <div className="console-reset-layout" style={{ gap: 12 }}>
            <input
              className="input"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="textarea"
              placeholder="What happened?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <div className="actions">
              <button className="btn btn-primary" onClick={createNote} disabled={saving || !title.trim()}>
                {saving ? "Saving..." : "Save note"}
              </button>
            </div>
          </div>
        </section>

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
