import { PersonProfile } from "../types"

export type RelationalState = {
  triangles: number
  tensionLevel: "low" | "medium" | "high"
}

export function computeRelationalState(
  participants: PersonProfile[]
): RelationalState {

  return {
    triangles: 0,
    tensionLevel: "medium"
  }

}
