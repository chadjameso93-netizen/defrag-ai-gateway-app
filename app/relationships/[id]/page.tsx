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
import RelationshipHero from "@/components/relationships/RelationshipHero";
import OperationalColumn from "@/components/relationships/OperationalColumn";

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
      <RelationshipHero
        relationship={data?.relationship}
        state={stateData}
        participants={data?.participants || []}
        invites={data?.invites || []}
        events={events}
      />

      {stateData ? (
        <div style={{ marginTop: 18, maxWidth: 420 }}>
          <LiveStateBadge state={stateData.state} pressure={stateData.pressure} />
        </div>
      ) : null}

      <div style={{ marginTop: 18 }}>
        <RelationshipMetrics
          participantCount={data?.participants?.length || 0}
          inviteCount={data?.invites?.length || 0}
          eventCount={events.length}
          pressure={stateData?.pressure || 0}
        />
      </div>

      {mapData ? (
        <div style={{ marginTop: 24 }}>
          <RelationshipMap nodes={mapData.people} edges={mapData.links} />
        </div>
      ) : null}

      {loading ? (
        <div className="result-copy" style={{ marginTop: 20 }}>Loading...</div>
      ) : (
        <div className="grid console-grid-two" style={{ marginTop: 24 }}>
          <div style={{ display: "grid", gap: 20 }}>
            <OperationalColumn title="Participants">
              {(data?.participants || []).length === 0 ? (
                <div className="result-copy">No participants yet.</div>
              ) : (
                (data?.participants || []).map((p) => (
                  <ParticipantCard key={p.id} participant={p} />
                ))
              )}
            </OperationalColumn>

            <OperationalColumn title="Invites">
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
            </OperationalColumn>

            <OperationalColumn title="Timeline">
              {events.length === 0 ? (
                <div className="result-copy">No events yet.</div>
              ) : (
                events.map((event) => (
                  <EventFeedCard key={event.id} event={event} />
                ))
              )}
            </OperationalColumn>
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
