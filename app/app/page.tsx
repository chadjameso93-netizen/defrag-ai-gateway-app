"use client";

import { useState } from "react";
import TopNav from "@/components/TopNav";
import SystemMap from "@/components/SystemMap";
import { useLocalUser } from "@/hooks/useLocalUser";
import DailyReadPanel from "@/components/dashboard/DailyReadPanel";
import RelationshipSummary from "@/components/dashboard/RelationshipSummary";

type Result = {
  gated?: boolean;
  upgradeUrl?: string;
  whatSeemsToBeHappening: string;
  currentRisk: string;
  whatToDoNow: string;
  messageYouCanSend: string;
  whatToAvoid: string;
  pressureOutlook: string;
  simpleMap: {
    people: { id: string; label: string; x: number; y: number }[];
    links: { from: string; to: string; state: "warm" | "cool" | "faded" }[];
  };
};

export default function AppPage() {
  const userId = useLocalUser();

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  async function run(path: string) {
    setLoading(true);

    const res = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId,
        text
      })
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <main className="app-page">
      <TopNav />
      <div className="shell" style={{ paddingTop: 28, paddingBottom: 44 }}>
        <div className="grid" style={{ gridTemplateColumns: "1.1fr .9fr", gap: 24 }}>
          <div className="input-card">
            <div className="kicker">Defrag</div>
            <h1 className="section-title">Live relational analysis</h1>
            <p className="muted">
              Defrag uses profile, timing, and relationship context to read the moment and guide the next move.
            </p>

            <label className="label" style={{ marginTop: 18 }}>Describe the situation</label>
            <textarea
              className="textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Describe what is happening right now."
            />

            <div className="actions">
              <button className="btn btn-primary" disabled={!text.trim() || loading || !userId} onClick={() => run("/api/analyze")}>
                {loading ? "Working..." : "Analyze"}
              </button>

              <button className="btn btn-secondary" disabled={!text.trim() || loading || !userId} onClick={() => run("/api/simulate")}>
                Test a message
              </button>
            </div>

            {result?.gated ? (
              <div className="message-box" style={{ marginTop: 18 }}>
                <div className="result-title">Defrag Pro</div>
                <div className="result-copy">
                  This is a limited preview. Upgrade to unlock full relational synthesis, timeline-aware insight, and premium system access.
                </div>
                {result.upgradeUrl ? (
                  <div className="actions" style={{ marginTop: 12 }}>
                    <a className="btn btn-primary" href={result.upgradeUrl}>Upgrade</a>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          <div style={{ display: "grid", gap: 20 }}>
            <div className="result-card">
              <div className="kicker">Live state</div>
              {result ? (
                <SystemMap people={result.simpleMap.people} links={result.simpleMap.links} />
              ) : (
                <div className="map" style={{ display: "grid", placeItems: "center" }}>
                  <div className="muted">Run an analysis to see the live state.</div>
                </div>
              )}
            </div>

            <div className="result-card">
              <div className="kicker">Insight</div>
              {!result ? (
                <p className="muted">
                  You will see what may be happening, what pressure looks like, what helps now, and one message option.
                </p>
              ) : (
                <>
                  <div className="result-block">
                    <div className="result-title">What may be happening</div>
                    <div className="result-copy">{result.whatSeemsToBeHappening}</div>
                  </div>

                  <div className="result-block">
                    <div className="result-title">Current risk</div>
                    <div className="result-copy">{result.currentRisk}</div>
                  </div>

                  <div className="result-block">
                    <div className="result-title">What helps now</div>
                    <div className="result-copy">{result.whatToDoNow}</div>
                  </div>

                  <div className="result-block">
                    <div className="result-title">Pressure outlook</div>
                    <div className="result-copy">{result.pressureOutlook}</div>
                  </div>

                  <div className="result-block">
                    <div className="result-title">What to avoid</div>
                    <div className="result-copy">{result.whatToAvoid}</div>
                  </div>

                  <div className="result-block">
                    <div className="message-box">
                      <div className="result-title">Message option</div>
                      <div className="result-copy">{result.messageYouCanSend}</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 24 }}>
          <DailyReadPanel userId={userId} />
          <RelationshipSummary userId={userId} />
        </div>
      </div>
    </main>
  );
}
