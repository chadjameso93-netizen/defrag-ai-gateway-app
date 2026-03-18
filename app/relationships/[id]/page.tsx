"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useAppIdentity } from "@/hooks/useAppIdentity";
import { useParams } from "next/navigation";

type Relationship = {
  id: string;
  label: string;
  relationship_type: string;
  status: string;
};

type TimelineEvent = {
  id: string;
  title: string;
  notes: string;
  event_type: string;
  created_at: string;
};

export default function RelationshipDetailPage() {
  const { userId } = useAppIdentity();
  const params = useParams();
  const id = String(params?.id || "");

  const [relationship, setRelationship] = useState<Relationship | null>(null);
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [summary, setSummary] = useState<any | null>(null);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    if (!id || !userId) return;

    const [relationshipRes, timelineRes, summaryRes] = await Promise.all([
      fetch(`/api/v1/relationships/${id}`, { cache: "no-store" }),
      fetch(`/api/v1/timeline?userId=${encodeURIComponent(userId)}&relationshipId=${encodeURIComponent(id)}`, {
        cache: "no-store"
      }),
      fetch(`/api/v1/relationships/${id}/summary`, { cache: "no-store" })
    ]);

    const relationshipData = await relationshipRes.json();
    const timelineData = await timelineRes.json();
    const summaryData = await summaryRes.json();

    setRelationship(relationshipData.relationship || null);
    setEvents(timelineData.events || []);
    setSummary(summaryData.summary || null);
  }

  useEffect(() => {
    load();
  }, [id, userId]);

  async function addEvent() {
    if (!userId || !id || !title.trim()) return;

    setSaving(true);

    await fetch("/api/v1/timeline", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId,
        relationshipId: id,
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
      title={relationship?.label || "Relationship"}
      subtitle="Track context, notes, and changes across this connection."
    >
      <div className="console-reset-layout">
        <section className="rail-map-surface">
          <div className="result-title">Overview</div>
          <div className="result-copy">
            {summary?.body || (relationship
              ? `${relationship.label} is currently marked as ${relationship.status}.`
              : "Loading relationship...")}
          </div>
        </section>

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
              <button className="btn btn-primary" onClick={addEvent} disabled={saving || !title.trim()}>
                {saving ? "Saving..." : "Save note"}
              </button>
            </div>
          </div>
        </section>

        <section className="rail-map-surface">
          <div className="result-title">Timeline</div>
          <div className="timeline-list">
            {events.length === 0 ? (
              <div className="result-copy">No events yet.</div>
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
