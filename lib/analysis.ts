export async function analyzeSituation(input: string) {
  const text = (input || "").trim();

  if (!text) {
    return {
      summary: "There is not enough context yet.",
      perspectives: {
        you: "",
        them: ""
      },
      system: "",
      guidance: "",
      avoid: ""
    };
  }

  // BASIC HEURISTIC (placeholder until full AI synthesis layer)
  const softer = /space|time|later|no pressure|whenever/i.test(text);

  return {
    summary: softer
      ? "This looks like a situation where keeping things light will help."
      : "This looks like a moment where the interaction may still be settling.",

    perspectives: {
      you: "From your side, this can feel uncertain or unclear.",
      them: softer
        ? "From their side, this may feel easier to respond to."
        : "From their side, they may still be processing or creating space."
    },

    system: softer
      ? "The timing here supports a lower-pressure approach."
      : "The timing suggests this is not a moment to push for resolution.",

    guidance: softer
      ? "Keep things simple. One message is enough."
      : "Give it space. Let the situation settle before reaching again.",

    avoid: softer
      ? "Avoid adding extra messages right after."
      : "Avoid pushing for clarity too quickly or sending multiple follow-ups."
  };
}
