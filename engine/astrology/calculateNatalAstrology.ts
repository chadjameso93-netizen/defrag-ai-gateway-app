import { PersonProfile } from "../types"

export type AstrologyProfile = {
  sunSign: string | null
  moonSign: string | null
  risingSign: string | null
  transitSensitivity: "low" | "medium" | "high"
  source: "stub"
}

export function calculateNatalAstrology(person: PersonProfile): AstrologyProfile {
  const hasExactTime =
    !!person.natal.birthTime && person.natal.birthTimeConfidence === "exact"

  return {
    sunSign: null,
    moonSign: null,
    risingSign: hasExactTime ? null : null,
    transitSensitivity: hasExactTime ? "high" : "medium",
    source: "stub"
  }
}
