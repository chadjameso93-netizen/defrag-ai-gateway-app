"use client";

import { useEffect, useState } from "react";
import AppShell from "@/components/layout/AppShell";
import SystemMap from "@/components/SystemMap";
import { useAppIdentity } from "@/hooks/useAppIdentity";
import { useSelectedRelationship } from "@/hooks/useSelectedRelationship";
import DailyReadPanel from "@/components/dashboard/DailyReadPanel";
import ConsoleHero from "@/components/console/ConsoleHero";
import PlanStatusCard from "@/components/dashboard/PlanStatusCard";
import OverviewStats from "@/components/dashboard/OverviewStats";
import RecentReadsCard from "@/components/dashboard/RecentReadsCard";
import ProfileSummaryCard from "@/components/profile/ProfileSummaryCard";
import QuickActions from "@/components/actions/QuickActions";
import TodaySignalCard from "@/components/dashboard/TodaySignalCard";
import ProfileRequiredCard from "@/components/empty/ProfileRequiredCard";
import NoRelationshipsCard from "@/components/empty/NoRelationshipsCard";
import { isProfileComplete } from "@/lib/profile/isProfileComplete";
import RelationshipPicker from "@/components/dashboard/RelationshipPicker";
import SelectedRelationshipState from "@/components/dashboard/SelectedRelationshipState";
import SaveConsoleEvent from "@/components/events/SaveConsoleEvent";
import RecentActivityCard from "@/components/dashboard/RecentActivityCard";

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
  const relationshipCount = overview?.relationshipCount || 0;

  return (
    <AppShell
      title="Defrag Console"
      subtitle="A live working surface for relational analysis, timing, daily reads, and premium system state."
    >
      <div style={{ display: "grid", gap: 24 }}>
        <ConsoleHero />

        {!profileComplete ? <ProfileRequiredCard /> : null}

        {overview ? (
          <>
            <TodaySignalCard overview={overview} />
            <OverviewStats
              relationshipCount={overview.relationshipCount}
              participantCount={overview.participantCount}
              eventCount={overview.eventCount}
              dailyReadCount={overview.dailyReadCount}
            />
          </>
        ) : null}

        {relationshipCount === 0 ? <NoRelationshipsCard /> : null}

        <div className="grid console-grid-two">
          <div className="input-card">
            <div className="kicker">AI</div>
            <h2 style={{ fontSize: 30, marginTop: 0, marginBottom: 8 }}>Analyze the moment</h2>
            <p className="muted">
              Use the console to interpret the moment, test a message, and see the live state update.
            </p>

            <div style={{ marginTop: 18 }}>
              <RelationshipPicker userId={userId} value={relationshipId} onChange={setRelationshipId} />
            </div>

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
            <SelectedRelationshipState relationshipId={relationshipId} />

            <div className="result-card">
              <div className="kicker">Live map</div>
              {result?.simpleMap ? (
                <SystemMap people={result.simpleMap.people} links={result.simpleMap.links} />
              ) : (
                <div className="map" style={{ display: "grid", placeItems: "center" }}>
                  <div className="muted">Run an analysis to see the live state.</div>
                </div>
              )}
            </div>

            <PlanStatusCard userId={userId} />
          </div>
        </div>

        <div className="grid console-grid-two">
          <SaveConsoleEvent relationshipId={relationshipId} notes={text} />
          <RecentActivityCard userId={userId} relationshipId={relationshipId} />
        </div>

        <div className="grid console-grid-two">
          <DailyReadPanel userId={userId} />
          <RecentReadsCard reads={overview?.recentReads || []} />
        </div>

        <div className="grid console-grid-two">
          <ProfileSummaryCard userId={userId} />
          <QuickActions />
        </div>

        <div className="result-card">
          <div className="kicker">Insight</div>
          {!result ? (
            <p className="muted">
              You will see what may be happening, what pressure looks like, what helps now, and one message option.
            </p>
          ) : (
            <div className="grid console-grid-two" style={{ gap: 16 }}>
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
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
