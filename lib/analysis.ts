import OpenAI from "openai";

function getClient() {
  const apiKey = process.env.OPENAI_API_KEY || "";
  if (!apiKey) return null;
  return new OpenAI({ apiKey });
}

const SYSTEM_PROMPT = `
You are Defrag AI.

Help the user understand what is happening in a relationship from multiple perspectives.

Always respond with:
- what this looks like
- your perspective
- their perspective
- what is shaping it
- what to do next
- what to avoid

Use simple, grounded language.
No therapy language. No jargon. No labels.
Do not mention frameworks.

Keep it calm, clear, and direct.
`;

export async function analyzeSituation(input: string) {
  const text = (input || "").trim();

  if (!text) {
    return {
      summary: "Add a bit more detail so I can read the situation clearly.",
      perspectives: { you: "", them: "" },
      system: "",
      guidance: "",
      avoid: ""
    };
  }

  const client = getClient();

  if (!client) {
    return {
      summary: "Here’s a simple first read of what may be happening.",
      perspectives: {
        you: "From your side, this can feel uncertain or heavy.",
        them: "From their side, they may be processing, pulling back, or needing a little more room."
      },
      system: "This looks like a moment where the situation may still be settling.",
      guidance: "Keep the next move simple and easy to receive.",
      avoid: "Avoid pushing for clarity too quickly or sending too many follow-ups."
    };
  }

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: text }
    ],
    temperature: 0.7
  });

  const content = completion.choices[0]?.message?.content || "";
  const lines = content.split("\n").map((x) => x.trim()).filter(Boolean);

  return {
    summary: lines[0] || content || "Here’s a clear read of what may be happening.",
    perspectives: {
      you: lines[1] || "From your side, this can feel uncertain or unclear.",
      them: lines[2] || "From their side, they may still be processing or taking space."
    },
    system: lines[3] || "The wider pattern suggests this is not a moment to force resolution.",
    guidance: lines[4] || "Keep the next move simple and lower-pressure.",
    avoid: lines[5] || "Avoid escalating, overexplaining, or stacking messages."
  };
}
