export type SkyState = {
  activeTransits: string[]
  pressureIndicators: string[]
}

export async function computeSkyState(
  timestamp: number,
  location: string
): Promise<SkyState> {

  return {
    activeTransits: [],
    pressureIndicators: []
  }

}
