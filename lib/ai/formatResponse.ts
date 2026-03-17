export function formatAIResponse(input: any) {
  return {
    summary: input.summary || "Here’s what’s happening.",
    perspectives: {
      you: input.you || "",
      them: input.them || ""
    },
    system: input.system || "",
    guidance: input.guidance || "",
    avoid: input.avoid || ""
  };
}
