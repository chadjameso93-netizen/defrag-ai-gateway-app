import { DefragContext, DefragInsight } from "../types"
import { computeSkyState } from "../timing/skyState"
import { computeRelationalState } from "../relational/relationalState"
import { detectPsychSignals } from "../psychology/patternSignals"
import { calculateNatalAstrology } from "../astrology/calculateNatalAstrology"
import { calculateHumanDesign } from "../humandesign/calculateHumanDesign"
import { calculateIChingProfile } from "../iching/calculateIChingProfile"
import { calculateNumerology } from "../numerology/calculateNumerology"

export async function runDefragEngine(
  context: DefragContext
): Promise<DefragInsight> {

  const sky = await computeSkyState(
    context.timing.timestamp,
    context.timing.location
  )

  const relational = computeRelationalState(
    context.relationship.participants
  )

  const text = (context.relationship.recentEvents || []).join(" ")
  const psych = detectPsychSignals(text)

  const userAstrology = calculateNatalAstrology(context.user)
  const userHumanDesign = calculateHumanDesign(context.user)
  const userIChing = calculateIChingProfile(context.user)
  const userNumerology = calculateNumerology(context.user)

  const frameworkCount = [
    userAstrology,
    userHumanDesign,
    userIChing,
    userNumerology
  ].length

  const pressureLevel =
    relational.tensionLevel === "high" ? "High" :
    psych.escalationRisk ? "Medium" :
    "Low to medium"

  return {
    relationalState:
      relational.tensionLevel === "high"
        ? "Relational pressure building"
        : "Relational system unsettled",

    pressureLevel,

    explanation:
      frameworkCount >= 4
        ? "Multiple layers suggest that the situation is sensitive right now. Relational pressure appears elevated, and timing may matter more than force."
        : "The situation appears sensitive right now, and the timing may be more important than the content of the next move.",

    recommendedAction:
      pressureLevel === "High"
        ? "Reduce pressure and avoid pushing for a full resolution right now."
        : "Keep the next move calm, simple, and easy to receive.",

    messageOption:
      "I want to handle this carefully. I’m open to talking whenever it feels like a better time."
  }
}
