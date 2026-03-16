export type PsychologicalSignals = {
  attachmentSignal?: string
  escalationRisk?: string
}

export function detectPsychSignals(
  text: string
): PsychologicalSignals {

  const lower = text.toLowerCase()

  return {
    attachmentSignal: lower.includes("ignored") ? "fear-of-disconnection" : undefined,
    escalationRisk: lower.includes("argument") ? "rising-conflict" : undefined
  }

}
