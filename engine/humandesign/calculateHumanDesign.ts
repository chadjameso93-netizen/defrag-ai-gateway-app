import { PersonProfile } from "../types"

export type HumanDesignProfile = {
  type: string | null
  authority: string | null
  profile: string | null
  definition: string | null
}

export function calculateHumanDesign(person: PersonProfile): HumanDesignProfile {
  return {
    type: null,
    authority: null,
    profile: null,
    definition: null
  }
}
