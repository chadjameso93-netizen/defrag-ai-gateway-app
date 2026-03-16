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
  const [feelingPulledIn, setFeelingPulledIn] = useState(false);
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
    <main>
      <TopNav />
      <div className="shell app-wrap">
        <div className="app-grid">
          <div className="card">
            <h1 className="section-title">What happened?</h1>
            <p className="muted">Write what happened in plain words. Defrag will help you slow it down and choose a better next move.</p>

            <label className="label">Describe the situation</label>
            <textarea
              className="textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Example: We argued two days ago. I sent a long message. They have not replied. I want to send another text tonight."
            />

            <div className="grid grid-3" style={{ marginTop: 16 }}>
              <label className="card stat"><input type="checkbox" checked={argumentThisWeek} onChange={(e) => setArgumentThisWeek(e.target.checked)} /> Argument this week</label>
              <label className="card stat"><input type="checkbox" checked={feelingPulledIn} onChange={(e) => setFeelingPulledIn(e.target.checked)} /> I feel pulled to act fast</label>
              <label className="card stat"><input type="checkbox" checked={mixedSignals} onChange={(e) => setMixedSignals(e.target.checked)} /> Mixed signals</label>
              <label className="card stat"><input type="checkbox" checked={repairAttemptIgnored} onChange={(e) => setRepairAttemptIgnored(e.target.checked)} /> My repair attempt got ignored</label>
              <label className="card stat"><input type="checkbox" checked={sleepLow} onChange={(e) => setSleepLow(e.target.checked)} /> I am tired or worn down</label>
              <label className="card stat">Days without a reply <input className="input" type="number" min="0" value={silenceDays} onChange={(e) => setSilenceDays(Number(e.target.value || 0))} /></label>
            </div>

            <div className="actions">
              <button className="btn" style={{ background: "#111827", color: "#fff", border: 0 }} disabled={!text.trim() || loading} onClick={() => run("/api/analyze")}>
                {loading ? "Working..." : "Analyze"}
              </button>
              <button className="btn" style={{ background: "#eef2ff", color: "#3730a3", border: 0 }} disabled={!text.trim() || loading} onClick={() => run("/api/simulate")}>
                Test a message
              </button>
            </div>
          </div>

          <div className="grid">
            <div className="card">
              <h2 style={{ marginTop: 0 }}>Live relationship view</h2>
              {result ? (
                <SystemMap people={result.simpleMap.people} links={result.simpleMap.links} />
              ) : (
                <div className="map" style={{ display: "grid", placeItems: "center" }}>
                  <div className="muted">Run an analysis to see the live view.</div>
                </div>
              )}
            </div>

            <div className="card">
              <h2 style={{ marginTop: 0 }}>Your result</h2>
              {!result ? (
                <p className="muted">You will see a clear explanation, the current risk, what to do now, and one message you can send.</p>
              ) : (
                <>
                  <p><strong>What seems to be happening:</strong> {result.whatSeemsToBeHappening}</p>
                  <p><strong>Current risk:</strong> {result.currentRisk}</p>
                  <p><strong>What to do now:</strong> {result.whatToDoNow}</p>
                  <p><strong>Pressure outlook:</strong> {result.pressureOutlook}</p>
                  <p><strong>What to avoid:</strong> {result.whatToAvoid}</p>
                  <div className="card" style={{ background: "#f8faff" }}>
                    <strong>Message you can send</strong>
                    <pre>{result.messageYouCanSend}</pre>
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
