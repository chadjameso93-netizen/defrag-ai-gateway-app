import OpenAI from "openai";

type GenerateDailyReadArgs = {
  userId: string;
  period: "morning" | "evening";
};

function fallbackRead(period: "morning" | "evening") {
  return {
    title: period === "morning" ? "Morning Read" : "Evening Read",
    bodyText:
      period === "morning"
        ? "This morning favors a slower pace, steadier boundaries, and less force around emotionally loaded conversations. Let timing do more of the work than urgency."
        : "This evening favors reflection, softer interpretation, and more care with what you react to. Let the system settle before trying to force clarity."
  };
}

export async function generateDailyReadText({
  userId,
  period
}: GenerateDailyReadArgs) {
  const apiKey = process.env.OPENAI_API_KEY || process.env.AI_GATEWAY_API_KEY;

  if (!apiKey) {
    return fallbackRead(period);
  }

  try {
    const client = new OpenAI({
      apiKey,
      baseURL: process.env.AI_GATEWAY_API_KEY
        ? "https://ai-gateway.vercel.sh/v1"
        : undefined
    });

    const response = await client.chat.completions.create({
      model: process.env.AI_GATEWAY_MODEL || "gpt-4.1-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are Defrag Daily Read. Write calm, premium, conversational daily guidance. No therapy jargon. No astrology jargon in the output. Keep it natural and emotionally intelligent. Return JSON with keys title and bodyText."
        },
        {
          role: "user",
          content:
            `Generate a ${period} daily read for user ${userId}. ` +
            `This is a premium relational guidance overview. ` +
            `The output should feel like a 1-2 minute concise read for now, written in polished natural language.`
        }
      ]
    });

    const parsed = JSON.parse(response.choices[0]?.message?.content || "{}");

    return {
      title:
        parsed.title ||
        (period === "morning" ? "Morning Read" : "Evening Read"),
      bodyText:
        parsed.bodyText ||
        fallbackRead(period).bodyText
    };
  } catch {
    return fallbackRead(period);
  }
}
