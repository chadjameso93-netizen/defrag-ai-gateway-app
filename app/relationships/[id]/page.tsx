"use client";

import { useEffect, useState } from "react";
import { useLocalUser } from "@/hooks/useLocalUser";
import EventComposer from "@/components/events/EventComposer";
import InviteComposer from "@/components/invites/InviteComposer";

type RelationshipData = {
  relationship: any;
  participants: any[];
  invites: any[];
};

type EventItem = {
  id: string;
  event_type: string;
  notes: string | null;
  intensity: number;
  created_at: string;
};

export default function RelationshipDetailPage({
  params
}: {
  params: { id: string };
}) {
  const userId = useLocalUser();
  const [data, setData] = useState<RelationshipData | null>(null);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);

    const [relationshipRes, eventsRes] = await Promise.all([
      fetch(`/api/v1/relationships/${params.id}`, { cache: "no-store" }),
      fetch(`/api/v1/events?relationshipId=${encodeURIComponent(params.id)}`, { cache: "no-store" })
    ]);

    const relationshipData = await relationshipRes.json();
    const eventsData = await eventsRes.json();

    setData(relationshipData.ok ? relationshipData : null);
    setEvents(eventsData.events || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [params.id]);

  return (
    <main className="app-page">
      <div className="shell" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div className="input-card" style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div className="kicker">Relationship</div>
          <h1 className="section-title">
            {data?.relationship?.label || "Relationship"}
          </h1>
          <p className="muted">
            Participant state, invites, and timeline events live here.
          </p>

          {loading ? (
            <div className="result-copy" style={{ marginTop: 20 }}>Loading...</div>
          ) : (
            <div className="grid" style={{ gridTemplateColumns: "1.1fr .9fr", gap: 24, marginTop: 24 }}>
              <div className="card">
                <div className="result-title">Participants</div>
                <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
                  {(data?.participants || []).length === 0 ? (
                    <div className="result-copy">No participants yet.</div>
                  ) : (
                    (data?.participants || []).map((p) => (
                      <div key={p.id} className="message-box">
                        <div className="result-title">{p.role}</div>
                        <div className="result-copy">{p.display_name}</div>
                      </div>
                    ))
                  )}
                </div>

                <div className="result-title" style={{ marginTop: 24 }}>Invites</div>
                <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
                  {(data?.invites || []).length === 0 ? (
                    <div className="result-copy">No invites yet.</div>
                  ) : (
                    (data?.invites || []).map((invite) => (
                      <div key={invite.id} className="message-box">
                        <div className="result-title">{invite.channel}</div>
                        <div className="result-copy">{invite.status}</div>
                      </div>
                    ))
                  )}
                </div>

                <div className="result-title" style={{ marginTop: 24 }}>Timeline</div>
                <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
                  {events.length === 0 ? (
                    <div className="result-copy">No events yet.</div>
                  ) : (
                    events.map((event) => (
                      <div key={event.id} className="message-box">
                        <div className="result-title">{event.event_type}</div>
                        <div className="result-copy">{event.notes || "No notes"}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div style={{ display: "grid", gap: 20 }}>
                <InviteComposer relationshipId={params.id} ownerUserId={userId} onCreated={load} />
                <EventComposer relationshipId={params.id} onCreated={load} />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
