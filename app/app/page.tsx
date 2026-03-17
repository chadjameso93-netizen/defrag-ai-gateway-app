"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { useAppIdentity } from "@/hooks/useAppIdentity";
import { useSelectedRelationship } from "@/hooks/useSelectedRelationship";
import { isProfileComplete } from "@/lib/profile/isProfileComplete";
import RelationshipPicker from "@/components/dashboard/RelationshipPicker";
import SelectedRelationshipState from "@/components/dashboard/SelectedRelationshipState";
import SystemMap from "@/components/SystemMap";
import SignalStrip from "@/components/analysis/SignalStrip";
import ExpandableInsight from "@/components/analysis/ExpandableInsight";

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
        <div className="kicker">Today</div>
        <h2 className="console-primary-title">
          {profileComplete
            ? "Read the situation before you add pressure."
            : "Finish your profile to get a stronger read."}
        </h2>
        <p className="muted console-primary-copy">
          {profileComplete
            ? "Work from one relationship at a time. Read the moment. Make one calmer move."
            : "Birth and location details help Defrag make better timing and pattern reads."}
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
        <SignalStrip />
        <div className="kicker">Live read</div>
        <div className="analysis-surface-title">Read the situation</div>
        <p className="muted">
          Describe what changed, what was said, or where the pressure is showing up.
        </p>
      </div>

      <div className="analysis-form-row">
        <RelationshipPicker
          userId={userId}
          value={relationshipId}
          onChange={setRelationshipId}
        />
      </div>

      <textarea
        className="textarea analysis-textarea-minimal"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What is happening right now?"
      />

      <div className="actions" style={{ marginTop: 16 }}>
        <button
          className="btn btn-primary"
          disabled={!text.trim() || loading || !userId}
          onClick={() => run("/api/analyze")}
        >
          {loading ? "Reading..." : "Read situation"}
        </button>
        <button
          className="btn btn-secondary"
          disabled={!text.trim() || loading || !userId}
          onClick={() => run("/api/simulate")}
        >
          Test message
        </button>
      </div>

      {result?.gated ? (
        <div className="console-inline-banner">
          <div className="result-title">Defrag Pro</div>
          <div className="result-copy">
            This is a limited preview. Upgrade to unlock full reads and the full workspace.
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
              Defrag reads pressure, pacing, distance, and likely next-step risk so you can respond with more clarity and less force.
            </p>
          </div>
        ) : (
          <>
            <ExpandableInsight
              label="System read"
              summary={result.whatSeemsToBeHappening}
              detail="Why it thinks that: the pattern looks more like pressure and pacing than a simple yes or no answer."
            />
            <ExpandableInsight
              label="Current risk"
              summary={result.currentRisk}
              detail="This shows how likely the moment is to get worse if it is pushed too hard."
            />
            <ExpandableInsight
              label="Next move"
              summary={result.whatToDoNow}
              detail="This is the calmer move that is least likely to raise the pressure."
            />
            <ExpandableInsight
              label="Pressure outlook"
              summary={result.pressureOutlook}
              detail="This is the likely direction of the situation if nothing changes right away."
            />
            <ExpandableInsight
              label="What to avoid"
              summary={result.whatToAvoid}
              detail="These are the moves most likely to create more tension or confusion."
            />
            <ExpandableInsight
              label="Message option"
              summary={result.messageYouCanSend}
              detail="This is a lower-pressure way to say something without forcing a result."
            />
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
      title="Console"
      subtitle="A live workspace for relationship reads."
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
                <SystemMap
                  people={result.simpleMap.people}
                  links={result.simpleMap.links}
                />
              ) : (
                <div className="map" style={{ display: "grid", placeItems: "center" }}>
                  <div className="muted">Run a read to see the field.</div>
                </div>
              )}
            </section>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
