import swisseph from "swisseph"
import { getPlanetPosition } from "./ephemeris"

export async function calculateNatalChart(
  date: Date
) {

  const julian = swisseph.swe_julday(
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate(),
    date.getUTCHours()
  )

  const sun = await getPlanetPosition(julian, swisseph.SE_SUN)
  const moon = await getPlanetPosition(julian, swisseph.SE_MOON)

  return {
    sun,
    moon
  }
}
