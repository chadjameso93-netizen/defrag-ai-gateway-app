"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useAppIdentity } from "@/hooks/useAppIdentity";
import { useSelectedRelationship } from "@/hooks/useSelectedRelationship";
import { isProfileComplete } from "@/lib/profile/isProfileComplete";
import RelationshipPicker from "@/components/dashboard/RelationshipPicker";
import SelectedRelationshipState from "@/components/dashboard/SelectedRelationshipState";
import SaveConsoleEvent from "@/components/events/SaveConsoleEvent";
import RecentActivityCard from "@/components/dashboard/RecentActivityCard";
import DailyReadPanel from "@/components/dashboard/DailyReadPanel";
import ProfileSummaryCard from "@/components/profile/ProfileSummaryCard";
import PlanStatusCard from "@/components/dashboard/PlanStatusCard";
import SystemMap from "@/components/SystemMap";

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

function ConsoleTopband({
  profileComplete,
  overview
}: {
  profileComplete: boolean;
  overview: any;
}) {
  return (
    <section className="console-topband">
      <div className="console-topband-copy">
        <div className="kicker">Today</div>
        <h2 className="console-title">
          {profileComplete
            ? "Read the field before you add pressure."
            : "Complete your profile to deepen the read."}
        </h2>
        <p className="muted">
          {profileComplete
            ? "Anchor to one relationship, interpret the moment, and move with more precision."
            : "Birth and location data strengthen timing, daily reads, and deeper relational interpretation."}
        </p>
      </div>

      {overview ? (
        <div className="console-metrics">
          <div className="console-metric">
            <span>Relationships</span>
            <strong>{overview.relationshipCount || 0}</strong>
          </div>
          <div className="console-metric">
            <span>Participants</span>
            <strong>{overview.participantCount || 0}</strong>
          </div>
          <div className="console-metric">
            <span>Events</span>
            <strong>{overview.eventCount || 0}</strong>
          </div>
          <div className="console-metric">
            <span>Reads</span>
            <strong>{overview.dailyReadCount || 0}</strong>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function AnalysisSurface({
  userId,
  relationshipId,
  setRelationshipId,
  text,
  setText,
  loading,
  run,
  result
}: any) {
  return (
    <section className="analysis-surface">
      <div className="analysis-header">
        <div className="kicker">Console</div>
        <h2 className="analysis-title">Analyze the moment</h2>
        <p className="muted">
          Anchor the read to a real relationship, then describe what is happening now.
        </p>
      </div>

      <div style={{ marginTop: 20 }}>
        <RelationshipPicker userId={userId} value={relationshipId} onChange={setRelationshipId} />
      </div>

      <label className="label" style={{ marginTop: 18 }}>Situation</label>
      <textarea
        className="textarea analysis-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Describe the silence, tension, shift, message, or what changed."
      />

      <div className="actions" style={{ marginTop: 18 }}>
        <button className="btn btn-primary" disabled={!text.trim() || loading || !userId} onClick={() => run("/api/analyze")}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        <button className="btn btn-secondary" disabled={!text.trim() || loading || !userId} onClick={() => run("/api/simulate")}>
          Test message
        </button>
      </div>

      {result?.gated ? (
        <div className="analysis-upgrade-note">
          <div className="result-title">Defrag Pro</div>
          <div className="result-copy">
            This is a limited preview. Upgrade to unlock full relational synthesis and premium system access.
          </div>
          {result.upgradeUrl ? (
            <div className="actions" style={{ marginTop: 12 }}>
              <a className="btn btn-primary" href={result.upgradeUrl}>Upgrade</a>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="analysis-readout">
        {!result ? (
          <>
            <div className="result-title">Analysis</div>
            <div className="analysis-empty">
              Run an analysis to see what may be happening, where the pressure is, what not to force, and the next move least likely to make the system heavier.
            </div>
          </>
        ) : (
          <div className="analysis-sequence">
            <div className="analysis-line">
              <span>What may be happening</span>
              <p>{result.whatSeemsToBeHappening}</p>
            </div>
            <div className="analysis-line">
              <span>Current risk</span>
              <p>{result.currentRisk}</p>
            </div>
            <div className="analysis-line">
              <span>What helps now</span>
              <p>{result.whatToDoNow}</p>
            </div>
            <div className="analysis-line">
              <span>Pressure outlook</span>
              <p>{result.pressureOutlook}</p>
            </div>
            <div className="analysis-line">
              <span>What to avoid</span>
              <p>{result.whatToAvoid}</p>
            </div>
            <div className="analysis-line">
              <span>Message option</span>
              <p>{result.messageYouCanSend}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default function AppPage() {
  const { userId } = useAppIdentity();
  const { relationshipId, setRelationshipId } = useSelectedRelationship();

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [overview, setOverview] = useState<any | null>(null);
  const [profile, setProfile] = useState<any | null>(null);

  useEffect(() => {
    async function load() {
      if (!userId) return;

      const [overviewRes, profileRes] = await Promise.all([
        fetch(`/api/v1/dashboard/overview?userId=${encodeURIComponent(userId)}`, {
          cache: "no-store"
        }),
        fetch(`/api/v1/profile/read?userId=${encodeURIComponent(userId)}`, {
          cache: "no-store"
        })
      ]);

      const overviewData = await overviewRes.json();
      const profileData = await profileRes.json();

      setOverview(overviewData.overview || null);
      setProfile(profileData.profile || null);
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

  const profileComplete = isProfileComplete(profile);

  return (
    <AppShell
      title="Defrag Console"
      subtitle="A premium live workspace for relational analysis, timing, pressure, and system-level clarity."
    >
      <div className="console-root-layout">
        <ConsoleTopband profileComplete={profileComplete} overview={overview} />

        <div className="console-main-grid">
          <AnalysisSurface
            userId={userId}
            relationshipId={relationshipId}
            setRelationshipId={setRelationshipId}
            text={text}
            setText={setText}
            loading={loading}
            run={run}
            result={result}
          />

          <aside className="console-rail">
            <SelectedRelationshipState relationshipId={relationshipId} />

            <section className="rail-surface">
              <div className="result-title">Live map</div>
              {result?.simpleMap ? (
                <SystemMap people={result.simpleMap.people} links={result.simpleMap.links} />
              ) : (
                <div className="map" style={{ display: "grid", placeItems: "center" }}>
                  <div className="muted">Run an analysis to visualize the relational field.</div>
                </div>
              )}
            </section>

            <PlanStatusCard userId={userId} />
          </aside>
        </div>

        <div className="console-support-strip">
          <SaveConsoleEvent relationshipId={relationshipId} notes={text} />
          <RecentActivityCard userId={userId} relationshipId={relationshipId} />
          <DailyReadPanel userId={userId} />
          <ProfileSummaryCard userId={userId} />
        </div>
      </div>
    </AppShell>
  );
}
