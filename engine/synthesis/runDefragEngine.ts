import { DefragContext, DefragInsight } from "../types"
import { computeSkyState } from "../timing/skyState"
import { computeRelationalState } from "../relational/relationalState"

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

  return {
    relationalState: relational.tensionLevel === "high"
      ? "Relational pressure building"
      : "Relational system unsettled",

    pressureLevel: relational.tensionLevel,

    explanation:
      "Multiple signals suggest rising sensitivity in the relational system. Timing conditions may increase emotional reactivity.",

    recommendedAction:
      "Reduce pressure and allow space before attempting to resolve the issue directly.",

    messageOption:
      "I want to handle this carefully. I'm open to talking when it feels like a better time."
  }

}
