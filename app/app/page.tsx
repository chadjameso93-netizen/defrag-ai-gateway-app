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

type Result = {
  gated?: boolean;
  upgradeUrl?: string;
  whatSeemsToBeHappening: string;
  currentRisk: string;
  whatToDoNow: string;
  messageYouCanSend: string;
  whatToAvoid: string;
  pressureOutlook: string;
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

  useEffect(() => {
    async function load() {
      if (!userId) return;

      const overviewRes = await fetch(
        `/api/v1/dashboard/overview?userId=${encodeURIComponent(userId)}`,
        { cache: "no-store" }
      );

      const overviewData = await overviewRes.json();
      setOverview(overviewData.overview || null);
    }

    load();
  }, [userId]);

  async function run(path: string) {
    setLoading(true);

    const res = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
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

  const assistantReply = result
    ? `${result.whatSeemsToBeHappening} ${result.whatToDoNow}`
    : "";

  return (
    <AppShell
      title="Defrag AI"
      subtitle="A conversational workspace for relationship clarity."
    >
      <div className="defrag-chat-layout">
        <section className="defrag-chat-main">
          <div className="defrag-chat-header">
            <div className="kicker">Defrag AI</div>
            <h2 className="console-primary-title">Talk through what’s happening.</h2>
            <p className="muted console-primary-copy">
              Ask naturally. Defrag replies in plain language and shows deeper supporting signals only when you want them.
            </p>
          </div>

          <div className="chat-thread">
            {text ? <ChatMessage role="user" content={text} /> : null}

            {result ? (
              <>
                <ChatMessage role="assistant" content={assistantReply} />

                <div className="chat-support">
                  <InsightDrawer
                    title="Timing"
                    summary="Why now matters"
                    detail="This is the timing layer behind the reply. It helps explain whether this is a good moment to reach out, wait, or keep things simple."
                  />
                  <InsightDrawer
                    title="Astrology"
                    summary="Short signal"
                    detail="A short timing signal drawn from the symbolic layer. This is supporting context, not something you need to decode."
                  />
                  <InsightDrawer
                    title="Human Design"
                    summary="Processing style"
                    detail="A short note about how someone may be processing emotion, space, or communication right now."
                  />
                  <InsightDrawer
                    title="Pattern"
                    summary="What this resembles"
                    detail="A simple read on the pattern underneath the moment, such as withdrawal after conflict, mixed signals, or waiting for regulation."
                  />
                  <InsightDrawer
                    title="Relationship dynamic"
                    summary="What may be driving it"
                    detail="A plain-language explanation of what may be shaping the interaction between you and this person."
                  />
                </div>
              </>
            ) : (
              <div className="chat-empty-state">
                <p>Examples</p>
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
            )}
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
          <SelectedRelationshipState relationshipId={relationshipId} />

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

          {overview ? (
            <section className="rail-map-surface">
              <div className="result-title">Your workspace</div>
              <div className="console-metric-strip">
                <div><span>Relationships</span><strong>{overview.relationshipCount || 0}</strong></div>
                <div><span>Participants</span><strong>{overview.participantCount || 0}</strong></div>
                <div><span>Events</span><strong>{overview.eventCount || 0}</strong></div>
                <div><span>Reads</span><strong>{overview.dailyReadCount || 0}</strong></div>
              </div>
            </section>
          ) : null}
        </aside>
      </div>
    </AppShell>
  );
}
