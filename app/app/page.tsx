"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useAppIdentity } from "@/hooks/useAppIdentity";
import { useSelectedRelationship } from "@/hooks/useSelectedRelationship";
import { isProfileComplete } from "@/lib/profile/isProfileComplete";
import RelationshipPicker from "@/components/dashboard/RelationshipPicker";
import SelectedRelationshipState from "@/components/dashboard/SelectedRelationshipState";
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

function ConsoleHeader({
  profileComplete,
  overview
}: {
  profileComplete: boolean;
  overview: any;
}) {
  return (
    <section className="console-header-band">
      <div>
        <div className="kicker">Defrag Console</div>
        <h2 className="console-primary-title">
          {profileComplete
            ? "Read the relational field before you add pressure."
            : "Complete your profile to deepen the signal."}
        </h2>
        <p className="muted console-primary-copy">
          {profileComplete
            ? "Anchor to one relationship. Interpret the moment. Make one calmer move."
            : "Natal and location data strengthen timing, daily reads, and the precision of relational interpretation."}
        </p>
      </div>

      {overview ? (
        <div className="console-metric-strip">
          <div><span>Relationships</span><strong>{overview.relationshipCount || 0}</strong></div>
          <div><span>Participants</span><strong>{overview.participantCount || 0}</strong></div>
          <div><span>Events</span><strong>{overview.eventCount || 0}</strong></div>
          <div><span>Reads</span><strong>{overview.dailyReadCount || 0}</strong></div>
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
    <section className="analysis-surface-minimal">
      <div className="analysis-surface-head">
        <div className="kicker">Live read</div>
        <div className="analysis-surface-title">Read the situation</div>
        <p className="muted">
          Describe the signal, the shift, the message, the silence, or what changed.
        </p>
      </div>

      <div className="analysis-form-row">
        <RelationshipPicker userId={userId} value={relationshipId} onChange={setRelationshipId} />
      </div>

      <textarea
        className="textarea analysis-textarea-minimal"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What is happening right now?"
      />

      <div className="actions" style={{ marginTop: 16 }}>
        <button className="btn btn-primary" disabled={!text.trim() || loading || !userId} onClick={() => run("/api/analyze")}>
          {loading ? "Reading..." : "Read situation"}
        </button>
        <button className="btn btn-secondary" disabled={!text.trim() || loading || !userId} onClick={() => run("/api/simulate")}>
          Test message
        </button>
      </div>

      {result?.gated ? (
        <div className="console-inline-banner">
          <div className="result-title">Defrag Pro</div>
          <div className="result-copy">
            This is a limited preview. Upgrade to unlock full relational synthesis and premium system access.
          </div>
          {result.upgradeUrl ? (
            <div className="actions" style={{ marginTop: 10 }}>
              <a className="btn btn-primary" href={result.upgradeUrl}>Upgrade</a>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="analysis-sequence-minimal">
        {!result ? (
          <div className="analysis-placeholder">
            <span>System read</span>
            <p>
              Defrag interprets relational pressure, pacing, distance, and likely next-move risk so you can respond with more clarity and less force.
            </p>
          </div>
        ) : (
          <>
            <div className="analysis-min-line">
              <span>System read</span>
              <p>{result.whatSeemsToBeHappening}</p>
            </div>
            <div className="analysis-min-line">
              <span>Current risk</span>
              <p>{result.currentRisk}</p>
            </div>
            <div className="analysis-min-line">
              <span>Next move</span>
              <p>{result.whatToDoNow}</p>
            </div>
            <div className="analysis-min-line">
              <span>Pressure outlook</span>
              <p>{result.pressureOutlook}</p>
            </div>
            <div className="analysis-min-line">
              <span>What to avoid</span>
              <p>{result.whatToAvoid}</p>
            </div>
            <div className="analysis-min-line">
              <span>Message option</span>
              <p>{result.messageYouCanSend}</p>
            </div>
          </>
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
      subtitle="A live relational intelligence workspace."
    >
      <div className="console-reset-layout">
        <ConsoleHeader profileComplete={profileComplete} overview={overview} />

        <div className="console-reset-grid">
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

          <aside className="console-reset-rail">
            <SelectedRelationshipState relationshipId={relationshipId} />

            <section className="rail-map-surface">
              <div className="result-title">Live field</div>
              {result?.simpleMap ? (
                <SystemMap people={result.simpleMap.people} links={result.simpleMap.links} />
              ) : (
                <div className="map" style={{ display: "grid", placeItems: "center" }}>
                  <div className="muted">Run a read to visualize the field.</div>
                </div>
              )}
            </section>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
