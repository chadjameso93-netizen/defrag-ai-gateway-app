"use client";

import { useState } from "react";
import TopNav from "@/components/TopNav";
import SystemMap from "@/components/SystemMap";

type Result = {
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
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  async function run(path: string) {
    setLoading(true);
    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <main className="app-page">
      <TopNav />
      <div className="shell" style={{ paddingTop: 28, paddingBottom: 44 }}>
        <div className="app-grid">
          <div className="input-card">
            <div className="kicker">Analysis</div>
            <h1 className="section-title">Describe the situation</h1>
            <p className="muted">
              Write what happened in your own words. Defrag will help you understand the moment
              and choose the next move that keeps things steadier.
            </p>

            <label className="label">Situation</label>
            <textarea
              className="textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Example: We had a hard conversation, then they stopped replying. I want to reach out again but I do not know whether that will help or make things worse."
            />

            <div className="actions">
              <button className="btn btn-primary" disabled={!text.trim() || loading} onClick={() => run("/api/analyze")}>
                {loading ? "Working..." : "Analyze"}
              </button>
              <button className="btn btn-secondary" disabled={!text.trim() || loading} onClick={() => run("/api/simulate")}>
                Test a message
              </button>
            </div>
          </div>

          <div className="side-stack">
            <div className="result-card">
              <div className="kicker">Live view</div>
              {result ? (
                <SystemMap people={result.simpleMap.people} links={result.simpleMap.links} />
              ) : (
                <div className="map" style={{ display: "grid", placeItems: "center" }}>
                  <div className="muted">Run an analysis to see the live view.</div>
                </div>
              )}
            </div>

            <div className="result-card">
              <div className="kicker">Your result</div>
              {!result ? (
                <p className="muted">You will see what may be happening, how tense the moment feels, what helps right now, what to avoid, and one message option.</p>
              ) : (
                <>
                  <div className="result-block"><div className="result-title">What may be happening</div><div className="result-copy">{result.whatSeemsToBeHappening}</div></div>
                  <div className="result-block"><div className="result-title">Current risk</div><div className="result-copy">{result.currentRisk}</div></div>
                  <div className="result-block"><div className="result-title">What helps right now</div><div className="result-copy">{result.whatToDoNow}</div></div>
                  <div className="result-block"><div className="result-title">Pressure outlook</div><div className="result-copy">{result.pressureOutlook}</div></div>
                  <div className="result-block"><div className="result-title">What to avoid</div><div className="result-copy">{result.whatToAvoid}</div></div>
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
      </div>
    </main>
  );
}
