import { PersonProfile } from "../types"

export type IChingProfile = {
  primaryHexagram: string | null
  relatingHexagram: string | null
}

export function calculateIChingProfile(person: PersonProfile): IChingProfile {
  return {
    primaryHexagram: null,
    relatingHexagram: null
  }
}
