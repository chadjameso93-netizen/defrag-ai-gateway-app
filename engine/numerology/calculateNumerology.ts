import { PersonProfile } from "../types"

export type NumerologyProfile = {
  lifePath: number | null
  expression: number | null
}

function sumDigits(value: string): number {
  const digits = value.replace(/\D/g, "").split("").map(Number)
  return digits.reduce((a, b) => a + b, 0)
}

function reduceNumber(n: number): number {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = String(n).split("").map(Number).reduce((a, b) => a + b, 0)
  }
  return n
}

export function calculateNumerology(person: PersonProfile): NumerologyProfile {
  if (!person.natal.birthDate) {
    return { lifePath: null, expression: null }
  }

  const raw = sumDigits(person.natal.birthDate)
  const lifePath = reduceNumber(raw)

  return {
    lifePath,
    expression: null
  }
}
