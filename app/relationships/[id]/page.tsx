"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useAppIdentity } from "@/hooks/useAppIdentity";
import EventComposer from "@/components/events/EventComposer";
import InviteComposer from "@/components/invites/InviteComposer";
import ParticipantComposer from "@/components/participants/ParticipantComposer";
import LiveStateBadge from "@/components/state/LiveStateBadge";
import RelationshipMap from "@/components/map/RelationshipMap";
import ParticipantCard from "@/components/relationships/ParticipantCard";
import EventFeedCard from "@/components/relationships/EventFeedCard";
import RelationshipMetrics from "@/components/relationships/RelationshipMetrics";
import RelationshipSummaryRail from "@/components/relationships/RelationshipSummaryRail";

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
  const { userId } = useAppIdentity();
  const [data, setData] = useState<RelationshipData | null>(null);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [stateData, setStateData] = useState<{ state: string; pressure: number } | null>(null);
  const [mapData, setMapData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);

    const [relationshipRes, eventsRes, stateRes, mapRes] = await Promise.all([
      fetch(`/api/v1/relationships/detail?id=${encodeURIComponent(params.id)}`, { cache: "no-store" }),
      fetch(`/api/v1/events?relationshipId=${encodeURIComponent(params.id)}`, { cache: "no-store" }),
      fetch(`/api/v1/relationships/state?relationshipId=${encodeURIComponent(params.id)}`, { cache: "no-store" }),
      fetch(`/api/v1/relationships/map?relationshipId=${encodeURIComponent(params.id)}`, { cache: "no-store" })
    ]);

    const relationshipData = await relationshipRes.json();
    const eventsData = await eventsRes.json();
    const stateJson = await stateRes.json();
    const mapJson = await mapRes.json();

    setData(relationshipData.ok ? relationshipData : null);
    setEvents(eventsData.events || []);
    setStateData(stateJson.ok ? { state: stateJson.state, pressure: stateJson.pressure } : null);
    setMapData(mapJson.ok ? mapJson.map : null);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [params.id]);

  return (
    <AppShell
      title={data?.relationship?.label || "Relationship"}
      subtitle="Participant state, invites, event history, and live relational pressure all converge here."
    >
      {stateData ? (
        <div style={{ marginBottom: 18, maxWidth: 420 }}>
          <LiveStateBadge state={stateData.state} pressure={stateData.pressure} />
        </div>
      ) : null}

      <RelationshipMetrics
        participantCount={data?.participants?.length || 0}
        inviteCount={data?.invites?.length || 0}
        eventCount={events.length}
        pressure={stateData?.pressure || 0}
      />

      {mapData ? (
        <div style={{ marginTop: 24 }}>
          <RelationshipMap nodes={mapData.people} edges={mapData.links} />
        </div>
      ) : null}

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
                  <ParticipantCard key={p.id} participant={p} />
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
                  <EventFeedCard key={event.id} event={event} />
                ))
              )}
            </div>
          </div>

          <div style={{ display: "grid", gap: 20 }}>
            <RelationshipSummaryRail
              relationship={data?.relationship}
              state={stateData}
              participants={data?.participants || []}
              invites={data?.invites || []}
              events={events}
            />
            <ParticipantComposer relationshipId={params.id} ownerUserId={userId} onCreated={load} />
            <InviteComposer relationshipId={params.id} ownerUserId={userId} onCreated={load} />
            <EventComposer relationshipId={params.id} onCreated={load} />
          </div>
        </div>
      )}
    </AppShell>
  );
}
