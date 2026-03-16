export type CheckIn = {
  silenceDays?: number;
  argumentThisWeek?: boolean;
  feelingPulledIn?: boolean;
  mixedSignals?: boolean;
  repairAttemptIgnored?: boolean;
  sleepLow?: boolean;
};

export function predictPressure(input: CheckIn) {
  let score = 0;
  if ((input.silenceDays || 0) >= 2) score += 2;
  if (input.argumentThisWeek) score += 2;
  if (input.feelingPulledIn) score += 2;
  if (input.mixedSignals) score += 1;
  if (input.repairAttemptIgnored) score += 2;
  if (input.sleepLow) score += 1;

  let state = "steady";
  if (score >= 3) state = "rising";
  if (score >= 6) state = "high";

  let nextBestMove = "Keep the tone light and avoid pushing for a big resolution right now.";
  if (state === "rising") nextBestMove = "Slow the pace, ask less, and do not add extra pressure.";
  if (state === "high") nextBestMove = "Take a step back, lower pressure, and wait before sending anything emotionally heavy.";

  return { score, state, nextBestMove };
}
