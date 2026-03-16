import type { SynthesisObject } from "./synthesis";

export function applySafety(synthesis: SynthesisObject): SynthesisObject {
  return {
    ...synthesis,
    userSide: synthesis.userSide.replace(/always|never/gi, ""),
    otherSide: synthesis.otherSide.replace(/always|never/gi, ""),
    dynamic: synthesis.dynamic.replace(/diagnosis|disorder/gi, "")
  };
}
