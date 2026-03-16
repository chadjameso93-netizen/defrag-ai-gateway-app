import type { ParsedSituation } from "./parse";
import type { ContextObject } from "./context";
import type { TimingAssessment } from "./timing";

export type SynthesisObject = {
  userSide: string;
  otherSide: string;
  dynamic: string;
  timing: string;
  bestHelp: string;
};

export function buildSynthesis(
  parsed: ParsedSituation,
  context: ContextObject,
  timing: TimingAssessment,
  text: string
): SynthesisObject {
  const t = text.toLowerCase();

  let userSide = "You seem to want clarity and a steadier sense of where things stand.";
  if (parsed.likelyTone === "anxiety") userSide = "You seem to want reassurance and a clearer read on what is happening.";
  if (parsed.likelyTone === "anger") userSide = "You may be carrying frustration and wanting the other person to understand your side clearly.";
  if (parsed.likelyTone === "hurt") userSide = "You seem hurt and may be looking for repair, honesty, or relief.";

  let otherSide = "The other person may be reacting more to pressure and tone than to your actual intention.";
  if (t.includes("not replying") || t.includes("silent")) {
    otherSide = "The other person may be stepping back, shutting down, or needing more space before they can engage.";
  }

  let dynamic = "This may be a mismatch in pace, emotion, and interpretation.";
  if (context.priorPatternFlag) dynamic = "This may be part of a repeated loop where the same pressure points keep showing up.";
  if (parsed.primaryRelationship === "mother" || parsed.primaryRelationship === "father") {
    dynamic = "This may be a tension between closeness and autonomy, where both people are reading the moment differently.";
  }

  let bestHelp = parsed.outputNeed;
  if (timing.pressureLevel === "high") bestHelp = "timing guidance, emotional steadiness, and a lower-pressure next step";

  return {
    userSide,
    otherSide,
    dynamic,
    timing: timing.timingGuidance,
    bestHelp
  };
}
