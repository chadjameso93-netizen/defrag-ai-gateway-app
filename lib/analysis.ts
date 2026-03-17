import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

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
  if (!input) {
    return {
      summary: "Add a bit more detail so I can read the situation clearly.",
      perspectives: { you: "", them: "" },
      system: "",
      guidance: "",
      avoid: ""
    };
  }

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: input }
    ],
    temperature: 0.7
  });

  const text = completion.choices[0].message.content || "";

  // LIGHT STRUCTURE PARSE (keeps it flexible but usable)
  const sections = text.split("\n").filter(Boolean);

  return {
    summary: sections[0] || text,
    perspectives: {
      you: sections[1] || "",
      them: sections[2] || ""
    },
    system: sections[3] || "",
    guidance: sections[4] || "",
    avoid: sections[5] || ""
  };
}
