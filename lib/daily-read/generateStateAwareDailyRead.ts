type DailyReadPeriod = "morning" | "evening";

type DailyReadContext = {
  profile: any;
  relationshipCount: number;
  participantCount: number;
  eventCount: number;
  averageIntensity: number;
  liveState: "calm" | "tension" | "distance" | "activation" | "triangulation";
  pressure: number;
};

function buildOpening(period: DailyReadPeriod, state: DailyReadContext["liveState"]) {
  if (period === "morning") {
    if (state === "activation") return "This morning opens with unusually high sensitivity in the system.";
    if (state === "tension") return "This morning begins with a noticeable emotional charge under the surface.";
    if (state === "distance") return "This morning feels quieter, but the quiet may still be carrying meaning.";
    if (state === "triangulation") return "This morning suggests competing pulls in the system, not just one simple dynamic.";
    return "This morning supports steadiness, pacing, and cleaner interpretation.";
  }

  if (state === "activation") return "This evening carries lingering activation and should be handled with care.";
  if (state === "tension") return "This evening feels emotionally loaded, even if nothing dramatic is happening on the surface.";
  if (state === "distance") return "This evening is quieter and may be better for reflection than forcing contact.";
  if (state === "triangulation") return "This evening suggests multiple emotional currents operating at once.";
  return "This evening supports perspective, restraint, and steadier choices.";
}

function buildGuidance(context: DailyReadContext) {
  const { liveState, relationshipCount, participantCount, eventCount, pressure } = context;

  const lines: string[] = [];

  if (liveState === "activation") {
    lines.push("Do less, not more. If something feels urgent, slow it down before acting.");
  } else if (liveState === "tension") {
    lines.push("Keep communication shorter, softer, and easier to receive.");
  } else if (liveState === "distance") {
    lines.push("Do not confuse quiet with clarity. Let observation come before reaction.");
  } else if (liveState === "triangulation") {
    lines.push("Avoid reacting as if this is only about one person. The wider system matters right now.");
  } else {
    lines.push("This is a better window for composure, listening, and clean next steps.");
  }

  if (relationshipCount > 1) {
    lines.push("More than one relationship may be influencing your state, even if one issue seems primary.");
  }

  if (participantCount >= 3) {
    lines.push("System complexity is elevated, so mixed signals are more likely than usual.");
  }

  if (eventCount > 0) {
    lines.push("Recent events are still shaping the emotional field, even if the visible moment looks calm.");
  }

  if (pressure >= 0.7) {
    lines.push("Treat timing as more important than explanation right now.");
  }

  return lines.join(" ");
}

function buildOpportunity(period: DailyReadPeriod, state: DailyReadContext["liveState"]) {
  if (period === "morning") {
    if (state === "activation" || state === "tension") return "The opportunity today is to reduce pressure before it compounds.";
    return "The opportunity today is to create steadier conditions before making a difficult move.";
  }

  if (state === "distance") return "The opportunity tonight is to reflect without forcing an answer.";
  return "The opportunity tonight is to choose interpretation carefully and keep the system from tightening further.";
}

export function generateStateAwareDailyRead(
  context: DailyReadContext,
  period: DailyReadPeriod
) {
  const title = period === "morning" ? "Morning Read" : "Evening Read";

  const opening = buildOpening(period, context.liveState);
  const guidance = buildGuidance(context);
  const opportunity = buildOpportunity(period, context.liveState);

  const bodyText = `${opening} ${guidance} ${opportunity}`;

  return {
    title,
    bodyText
  };
}
