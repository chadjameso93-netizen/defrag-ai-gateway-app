import type { ParsedSituation } from "./parse";

export type ContextObject = {
  relationshipType: string;
  priorPatternFlag: string | null;
  outsidePressure: boolean;
};

export function getContext(parsed: ParsedSituation, text: string): ContextObject {
  const t = text.toLowerCase();

  let priorPatternFlag: string | null = null;
  if (t.includes("again") || t.includes("always") || t.includes("every time") || t.includes("another fight")) {
    priorPatternFlag = "recurring pattern";
  }

  const outsidePressure =
    t.includes("family") ||
    t.includes("friend said") ||
    t.includes("other people") ||
    t.includes("everyone") ||
    t.includes("work stress");

  return {
    relationshipType: parsed.primaryRelationship,
    priorPatternFlag,
    outsidePressure
  };
}
