import { openai } from "@/lib/openai";
import type { SynthesisObject } from "./synthesis";

export async function generateGuidance(synthesis: SynthesisObject) {
  const fallback = {
    whatSeemsToBeHappening:
      `${synthesis.userSide} ${synthesis.otherSide} ${synthesis.dynamic}`,
    currentRisk:
      synthesis.timing.includes("does not look like the best moment") ? "High" :
      synthesis.timing.includes("pacing matters") ? "Medium" : "Low to medium",
    whatToDoNow:
      synthesis.timing.includes("does not look like the best moment")
        ? "Keep the next move short, calm, and low-pressure. Do not try to solve everything in one message."
        : "Stay simple, lower the pressure, and focus on opening the conversation rather than forcing a full resolution.",
    messageYouCanSend:
      "I want to handle this carefully. I am not trying to make things heavier. I’m open to talking when it feels like a better time.",
    whatToAvoid:
      "Avoid long emotional messages, repeated follow-ups, blame, or anything that asks for an immediate big response.",
    pressureOutlook:
      synthesis.timing
  };

  if (!process.env.AI_GATEWAY_API_KEY && !process.env.VERCEL_OIDC_TOKEN) {
    return fallback;
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.AI_GATEWAY_MODEL || "openai/gpt-4.1-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are Defrag. Use plain, calm, simple language. Do not use therapy jargon, internal system language, or technical labels. Return strict JSON with keys: whatSeemsToBeHappening,currentRisk,whatToDoNow,messageYouCanSend,whatToAvoid,pressureOutlook."
        },
        {
          role: "user",
          content: JSON.stringify(synthesis)
        }
      ]
    });

    const parsed = JSON.parse(response.choices[0].message.content || "{}");

    return {
      whatSeemsToBeHappening: parsed.whatSeemsToBeHappening || fallback.whatSeemsToBeHappening,
      currentRisk: parsed.currentRisk || fallback.currentRisk,
      whatToDoNow: parsed.whatToDoNow || fallback.whatToDoNow,
      messageYouCanSend: parsed.messageYouCanSend || fallback.messageYouCanSend,
      whatToAvoid: parsed.whatToAvoid || fallback.whatToAvoid,
      pressureOutlook: parsed.pressureOutlook || fallback.pressureOutlook
    };
  } catch {
    return fallback;
  }
}
