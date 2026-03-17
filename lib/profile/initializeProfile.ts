type InitializeProfileInput = {
  userId: string;
  fullName: string;
  birthDate: string;
  birthTime?: string;
  birthTimeKnown: boolean;
  birthPlace: string;
  currentLocation: string;
};

export function buildInitialProfileArtifacts(input: InitializeProfileInput) {
  const effectiveBirthTime = input.birthTimeKnown
    ? (input.birthTime || "12:00")
    : "12:00";

  const birthTimeConfidence = input.birthTimeKnown
    ? "exact"
    : "unknown_default_noon";

  const normalizedBirthInput = {
    birth_date: input.birthDate,
    birth_time_raw: input.birthTime || null,
    birth_time_effective: effectiveBirthTime,
    birth_time_confidence: birthTimeConfidence,
    birth_place_text: input.birthPlace,
    current_location_text: input.currentLocation
  };

  const decisionProfile = {
    communication_style: "steady",
    timing_rule: input.birthTimeKnown
      ? "Use timing with normal confidence."
      : "Use timing with caution until birth time is updated.",
    note: input.birthTimeKnown
      ? "Profile ready."
      : "Profile ready with lower timing accuracy."
  };

  const relationalBaseline = {
    system_state: "starting",
    nodes: [
      { id: "self", label: input.fullName || "You", x: 180, y: 220 },
      { id: "other", label: "Other", x: 420, y: 220 },
      { id: "system", label: "System", x: 300, y: 90 }
    ],
    links: [
      { from: "self", to: "other", state: "cool" as const },
      { from: "other", to: "system", state: "faded" as const }
    ]
  };

  const narrativeSeed = {
    headline: "You’re set up.",
    body: input.birthTimeKnown
      ? "Your workspace is ready with a live view, a daily read, and a place to add people."
      : "Your workspace is ready. Some timing details may be less exact until you add a birth time."
  };

  return {
    normalizedBirthInput,
    decisionProfile,
    relationalBaseline,
    narrativeSeed
  };
}
