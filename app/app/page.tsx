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
  const [silenceDays, setSilenceDays] = useState(0);
  const [argumentThisWeek, setArgumentThisWeek] = useState(false);
  const [feelingPulledIn, setFeelingPulIn] = useState(false);
  const [mixedSignals, setMixedSignals] = useState(false);
  const [repairAttemptIgnored, setRepairAttemptIgnored] = useState(false);
  const [sleepLow, setSleepLow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  async function run(path: string) {
    setLoading(true);
    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        checkIn: { silenceDays, argumentThisWeek, feelingPulledIn, mixedSignals, repairAttemptIgnored, sleepLow }
      })
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <main className="app-page">
      <TopNav />
      <div className="shell" style={{ paddingTop: 24, paddingBottom: 40 }}>
        <div className="app-grid">
          <div className="input-card">
            <div className="kicker">Defrag analysis</div>
            <h1 className="section-title">Tell Defrag what happened</h1>
            <p className="muted">
              Use normal words. Keep it simple. Defrag will help you understand the moment
              and choose the least harmful next step.
            </p>

            <label className="label">Describe the situation</label>
            <textarea
              className="textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Example: We argued two days ago. I sent a long message. They have not replied. I want to send another text tonight."
            />

            <div className="check-grid">
              <label className="check-card"><input type="checkbox" checked={argumentThisWeek} onChange={(e) => setArgumentThisWeek(e.target.checked)} /><span>There was an argument this week</span></label>
              <label className="check-card"><input type="checkbox" checked={feelingPulledIn} onChange={(e) => setFeelingPulIn(e.target.checked)} /><span>I feel pulled to act fast</span></label>
              <label className="check-card"><input type="checkbox" checked={mixedSignals} onChange={(e) => setMixedSignals(e.target.checked)} /><span>I am getting mixed signals</span></label>
              <label className="check-card"><input type="checkbox" checked={repairAttemptIgnored} onChange={(e) => setRepairAttemptIgnored(e.target.checked)} /><span>A repair attempt was ignored</span></label>
              <label className="check-card"><input type="checkbox" checked={sleepLow} onChange={(e) => setSleepLow(e.target.checked)} /><span>I am tired or worn down</span></label>
              <label className="check-card">
                <span style={{ width: "100%" }}>
                  <div className="label" style={{ marginBottom: 6 }}>Days without a reply</div>
                  <input className="input" type="number" min="0" value={silenceDays} onChange={(e) => setSilenceDays(Number(e.target.value || 0))} />
                </span>
              </label>
            </div>

            <div className="actions">
              <button className="btn btn-primary" disabled={!text.trim() || loading} onClick={() => run("/api/analyze")}>
                {loading ? "Working..." : "Analyze"}
              </button>
              <button className="btn" style={{ background: "#eef2ff", color: "#4338ca" }} disabled={!text.trim() || loading} onClick={() => run("/api/simulate")}>
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
                <p className="muted">You will see a clear read on what may be happening, how risky the moment feels, and one better next move.</p>
              ) : (
                <>
                  <div className="result-block"><div className="result-title">What seems to be happening</div><div className="result-copy">{result.whatSeemsToBeHappening}</div></div>
                  <div className="result-block"><div className="result-title">Current risk</div><div className="result-copy">{result.currentRisk}</div></div>
                  <div className="result-block"><div className="result-title">What to do now</div><div className="result-copy">{result.whatToDoNow}</div></div>
                  <div className="result-block"><div className="result-title">Pressure outlook</div><div className="result-copy">{result.pressureOutlook}</div></div>
                  <div className="result-block"><div className="result-title">What to avoid</div><div className="result-copy">{result.whatToAvoid}</div></div>
                  <div className="result-block">
                    <div className="message-box">
                      <div className="result-title">Message you can send</div>
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
