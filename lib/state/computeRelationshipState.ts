export type LiveRelationshipState =
  | "calm"
  | "tension"
  | "distance"
  | "activation"
  | "triangulation";

export function computeRelationshipState(input: {
  participantCount: number;
  recentEventCount: number;
  averageIntensity: number;
}) {
  const { participantCount, recentEventCount, averageIntensity } = input;

  let state: LiveRelationshipState = "calm";

  if (participantCount >= 3 && averageIntensity >= 0.7) {
    state = "triangulation";
  } else if (averageIntensity >= 0.75) {
    state = "activation";
  } else if (averageIntensity >= 0.5) {
    state = "tension";
  } else if (recentEventCount === 0) {
    state = "distance";
  }

  return {
    state,
    pressure:
      state === "activation" ? 0.85 :
      state === "triangulation" ? 0.8 :
      state === "tension" ? 0.6 :
      state === "distance" ? 0.25 :
      0.15
  };
}
