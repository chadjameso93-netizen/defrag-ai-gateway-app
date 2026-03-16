import swisseph from "swisseph"

export function getPlanetPosition(
  julianDay: number,
  planet: number
) {
  return new Promise((resolve, reject) => {
    swisseph.swe_calc_ut(
      julianDay,
      planet,
      swisseph.SEFLG_SPEED,
      (body: any) => resolve(body),
      (err: any) => reject(err)
    )
  })
}
