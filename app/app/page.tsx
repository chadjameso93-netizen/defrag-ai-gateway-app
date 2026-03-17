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

function CompactStatusRow({
  relationshipCount,
  participantCount,
  eventCount,
  dailyReadCount
}: {
  relationshipCount: number;
  participantCount: number;
  eventCount: number;
  dailyReadCount: number;
}) {
  const items = [
    { label: "Relationships", value: relationshipCount },
    { label: "Participants", value: participantCount },
    { label: "Events", value: eventCount },
    { label: "Reads", value: dailyReadCount }
  ];

  return (
    <div className="compact-stats-row">
      {items.map((item) => (
        <div key={item.label} className="compact-stat">
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </div>
  );
}

function AnalysisWorkspace({
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
    <section className="workspace-main">
      <div className="workspace-header">
        <div>
          <div className="kicker">Console</div>
          <h2 className="workspace-title">Analyze the moment</h2>
          <p className="muted">
            Anchor the read to a real relationship, then describe what is happening right now.
          </p>
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <RelationshipPicker userId={userId} value={relationshipId} onChange={setRelationshipId} />
      </div>

      <label className="label" style={{ marginTop: 18 }}>Situation</label>
      <textarea
        className="textarea workspace-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Describe the silence, the tension, the shift, the message, or what changed."
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
        <div className="workspace-inline-note" style={{ marginTop: 18 }}>
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

      <div className="analysis-output" style={{ marginTop: 24 }}>
        {!result ? (
          <>
            <div className="result-title">Analysis</div>
            <div className="analysis-empty">
              Run an analysis to see what may be happening, where the pressure is, what not to force, and the next move least likely to make things worse.
            </div>
          </>
        ) : (
          <div className="analysis-list">
            <div className="analysis-item">
              <span>What may be happening</span>
              <p>{result.whatSeemsToBeHappening}</p>
            </div>
            <div className="analysis-item">
              <span>Current risk</span>
              <p>{result.currentRisk}</p>
            </div>
            <div className="analysis-item">
              <span>What helps now</span>
              <p>{result.whatToDoNow}</p>
            </div>
            <div className="analysis-item">
              <span>Pressure outlook</span>
              <p>{result.pressureOutlook}</p>
            </div>
            <div className="analysis-item">
              <span>What to avoid</span>
              <p>{result.whatToAvoid}</p>
            </div>
            <div className="analysis-item">
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
      <div className="app-composition">
        <div className="app-topband">
          <div className="app-topband-copy">
            <div className="kicker">Today</div>
            <h2 className="workspace-title" style={{ marginBottom: 8 }}>
              {profileComplete
                ? "The system is ready for a cleaner read."
                : "Complete your profile to deepen the signal."}
            </h2>
            <p className="muted">
              {profileComplete
                ? "Work from one live relationship at a time and capture the movement as it happens."
                : "Birth and location data strengthen timing, daily reads, and deeper relational synthesis."}
            </p>
          </div>

          {overview ? (
            <CompactStatusRow
              relationshipCount={overview.relationshipCount}
              participantCount={overview.participantCount}
              eventCount={overview.eventCount}
              dailyReadCount={overview.dailyReadCount}
            />
          ) : null}
        </div>

        <div className="app-workgrid">
          <AnalysisWorkspace
            userId={userId}
            relationshipId={relationshipId}
            setRelationshipId={setRelationshipId}
            text={text}
            setText={setText}
            loading={loading}
            run={run}
            result={result}
          />

          <aside className="workspace-rail">
            <SelectedRelationshipState relationshipId={relationshipId} />

            <div className="rail-panel">
              <div className="result-title">Live map</div>
              {result?.simpleMap ? (
                <SystemMap people={result.simpleMap.people} links={result.simpleMap.links} />
              ) : (
                <div className="map" style={{ display: "grid", placeItems: "center" }}>
                  <div className="muted">Run an analysis to visualize the field.</div>
                </div>
              )}
            </div>

            <PlanStatusCard userId={userId} />
          </aside>
        </div>

        <div className="app-support-grid">
          <SaveConsoleEvent relationshipId={relationshipId} notes={text} />
          <RecentActivityCard userId={userId} relationshipId={relationshipId} />
          <DailyReadPanel userId={userId} />
          <ProfileSummaryCard userId={userId} />
        </div>
      </div>
    </AppShell>
  );
}
