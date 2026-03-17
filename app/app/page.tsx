"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useAppIdentity } from "@/hooks/useAppIdentity";
import { useSelectedRelationship } from "@/hooks/useSelectedRelationship";
import RelationshipPicker from "@/components/dashboard/RelationshipPicker";
import SelectedRelationshipState from "@/components/dashboard/SelectedRelationshipState";
import SystemMap from "@/components/SystemMap";
import ChatMessage from "@/components/chat/ChatMessage";
import InsightDrawer from "@/components/chat/InsightDrawer";
import AddPersonEntry from "@/components/dashboard/AddPersonEntry";
import ShadowCard from "@/components/shadow/ShadowCard";
import BowenMapPanel from "@/components/relationships/BowenMapPanel";

type Result = {
  gated?: boolean;
  upgradeUrl?: string;
  summary: string;
  perspectives: {
    you: string;
    them: string;
  };
  system: string;
  guidance: string;
  avoid: string;
  simpleMap?: {
    people: { id: string; label: string; x: number; y: number }[];
    links: { from: string; to: string; state: "warm" | "cool" | "faded" }[];
  };
};

export default function AppPage() {
  const { userId } = useAppIdentity();
  const { relationshipId, setRelationshipId } = useSelectedRelationship();

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [overview, setOverview] = useState<any | null>(null);
  const [dailyRead, setDailyRead] = useState("");

  useEffect(() => {
    async function load() {
      if (!userId) return;

      const [overviewRes, readRes] = await Promise.all([
        fetch(`/api/v1/dashboard/overview?userId=${encodeURIComponent(userId)}`, {
          cache: "no-store"
        }),
        fetch("/api/read", { cache: "no-store" })
      ]);

      const overviewData = await overviewRes.json();
      const readData = await readRes.json();

      setOverview(overviewData.overview || null);
      setDailyRead(readData.text || "");
    }

    load();
  }, [userId]);

  async function run(path: string) {
    setLoading(true);

    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        relationshipId,
        text
      })
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <AppShell
      title="Defrag AI"
      subtitle="A clear read of what is happening between you and your people."
    >
      <div className="defrag-chat-layout">
        <section className="defrag-chat-main">
          <div className="defrag-chat-header">
            <div className="kicker">Conversation</div>
            <h2 className="console-primary-title">Talk through what’s happening.</h2>
            <p className="muted console-primary-copy">
              Defrag replies in plain language, then shows deeper layers only if you want them.
            </p>
          </div>

          <div className="workspace-summary-band">
            <div>
              <span>Relationships</span>
              <strong>{overview?.relationshipCount || 0}</strong>
            </div>
            <div>
              <span>Participants</span>
              <strong>{overview?.participantCount || 0}</strong>
            </div>
            <div>
              <span>Events</span>
              <strong>{overview?.eventCount || 0}</strong>
            </div>
            <div>
              <span>Reads</span>
              <strong>{overview?.dailyReadCount || 0}</strong>
            </div>
          </div>

          <div className="chat-thread">
            {!text && !result ? (
              <div className="chat-empty-state">
                <p>Try one of these</p>
                <div className="chat-example-list">
                  <button type="button" onClick={() => setText("They have been quiet since our last conversation. What may be going on?")}>
                    They have been quiet since our last conversation. What may be going on?
                  </button>
                  <button type="button" onClick={() => setText("I want to send a message, but I do not want to make this worse.")}>
                    I want to send a message, but I do not want to make this worse.
                  </button>
                  <button type="button" onClick={() => setText("Can you help me understand the shift between us this week?")}>
                    Can you help me understand the shift between us this week?
                  </button>
                </div>
              </div>
            ) : null}

            {text ? <ChatMessage role="user" data={text} /> : null}
            {result ? <ChatMessage role="assistant" data={result} /> : null}

            {result ? (
              <div className="chat-support">
                <InsightDrawer
                  title="Timing"
                  summary="Why now matters"
                  detail="This gives extra context on whether this looks like a better moment to speak, wait, or keep things simple."
                />
                <InsightDrawer
                  title="Pattern"
                  summary="What this resembles"
                  detail="This is the simple pattern read under the moment, like mixed signals after stress or distance after conflict."
                />
                <InsightDrawer
                  title="Dynamic"
                  summary="How this may be felt"
                  detail="This adds context about how the interaction may be landing on both sides."
                />
              </div>
            ) : null}
          </div>

          <div className="chat-composer">
            <div style={{ marginBottom: 12 }}>
              <RelationshipPicker userId={userId} value={relationshipId} onChange={setRelationshipId} />
            </div>

            <textarea
              className="textarea chat-textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Message Defrag AI..."
            />

            <div className="actions" style={{ marginTop: 14 }}>
              <button
                className="btn btn-primary"
                disabled={!text.trim() || loading || !userId}
                onClick={() => run("/api/analyze")}
              >
                {loading ? "Thinking..." : "Send"}
              </button>

              <button
                className="btn btn-secondary"
                disabled={!text.trim() || loading || !userId}
                onClick={() => run("/api/simulate")}
              >
                Test a message
              </button>
            </div>

            {result?.gated ? (
              <div className="console-inline-banner">
                <div className="result-title">Defrag Pro</div>
                <div className="result-copy">
                  This is a limited preview. Upgrade to unlock the full workspace.
                </div>
                {result.upgradeUrl ? (
                  <div className="actions" style={{ marginTop: 10 }}>
                    <a className="btn btn-primary" href={result.upgradeUrl}>Upgrade</a>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </section>

        <aside className="defrag-chat-rail">
          <section className="rail-map-surface">
            <div className="result-title">Today</div>
            <div className="result-copy">
              {dailyRead || "Daily guidance will appear here."}
            </div>
          </section>

          <AddPersonEntry />
          <SelectedRelationshipState relationshipId={relationshipId} />
          <BowenMapPanel />

          <section className="rail-map-surface">
            <div className="result-title">Live view</div>
            {result?.simpleMap ? (
              <SystemMap people={result.simpleMap.people} links={result.simpleMap.links} />
            ) : (
              <div className="map" style={{ display: "grid", placeItems: "center" }}>
                <div className="muted">The live view appears after a reply.</div>
              </div>
            )}
          </section>

          <ShadowCard />
        </aside>
      </div>
    </AppShell>
  );
}
