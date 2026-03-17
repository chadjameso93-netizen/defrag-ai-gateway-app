"use client";

export default function TodaySignalCard({
  overview
}: {
  overview: any;
}) {
  const relationshipCount = overview?.relationshipCount || 0;
  const eventCount = overview?.eventCount || 0;
  const participantCount = overview?.participantCount || 0;

  let headline = "The system is still in a light setup state.";
  let sub = "More profile, relationship, and event detail will increase depth.";

  if (relationshipCount >= 1 && eventCount === 0) {
    headline = "You have relationship structure in place, but limited recent event context.";
    sub = "Adding timeline markers will improve live interpretation.";
  }

  if (relationshipCount >= 1 && eventCount >= 1) {
    headline = "The system has enough structure to begin generating more meaningful reads.";
    sub = "Continue adding events and participant detail to deepen guidance.";
  }

  if (participantCount >= 3 && eventCount >= 2) {
    headline = "Relational complexity is increasing, and system-level patterns should become clearer.";
    sub = "This is where Defrag begins to feel significantly more powerful.";
  }

  return (
    <div className="card card-dark">
      <div className="kicker">Today</div>
      <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1.04 }}>
        {headline}
      </div>
      <p className="muted" style={{ marginTop: 12, maxWidth: 720 }}>
        {sub}
      </p>
    </div>
  );
}
