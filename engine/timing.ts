export type TimingAssessment = {
  pressureLevel: "low" | "medium" | "high";
  timingGuidance: string;
  sensitivityNote: string;
};

export function assessTiming(text: string): TimingAssessment {
  const t = text.toLowerCase();

  let score = 0;
  if (t.includes("tonight") || t.includes("right now") || t.includes("immediately")) score += 1;
  if (t.includes("argument") || t.includes("fight") || t.includes("blew up")) score += 2;
  if (t.includes("not replying") || t.includes("stopped replying") || t.includes("silent")) score += 2;
  if (t.includes("long message")) score += 1;
  if (t.includes("again")) score += 1;

  let pressureLevel: "low" | "medium" | "high" = "low";
  if (score >= 2) pressureLevel = "medium";
  if (score >= 4) pressureLevel = "high";

  let timingGuidance = "This looks like a moment where a calm, simple approach could still work.";
  let sensitivityNote = "Timing does not look unusually fragile.";

  if (pressureLevel === "medium") {
    timingGuidance = "This looks like a moment where pacing matters. Softer is likely better than faster.";
    sensitivityNote = "The situation may be more sensitive than it looks on the surface.";
  }

  if (pressureLevel === "high") {
    timingGuidance = "This does not look like the best moment for a heavy or emotionally loaded message.";
    sensitivityNote = "The situation looks pressurized, so even a reasonable message may land badly right now.";
  }

  return {
    pressureLevel,
    timingGuidance,
    sensitivityNote
  };
}
