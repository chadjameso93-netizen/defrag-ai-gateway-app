import { openai } from "@/lib/openai";
import { predictPressure, type CheckIn } from "@/engine/predictive";

export type AnalysisResult = {
  whatSeemsToBeHappening: string;
  currentRisk: string;
  whatToDoNow: string;
  messageYouCanSend: string;
  whatToAvoid: string;
  pressureOutlook: string;
  simpleMap: {
    people: { id: string; label: string; x: number; y: number }[];
    links: { from: string; to: string; state: "warm" | "cool" | "faded" }[];
  };
};

function fallback(text: string, checkIn?: CheckIn): AnalysisResult {
  const pressure = predictPressure(checkIn || {});
  const silence = /stopped replying|not replying|silent|ghost/i.test(text);

  return {
    whatSeemsToBeHappening: silence
      ? "One person seems to be stepping back while the other wants clarity. That can make both people feel more tense."
      : "There is stress, mixed timing, and a risk of saying too much too fast.",
    currentRisk: pressure.state === "high" ? "High" : pressure.state === "rising" ? "Medium" : "Low to medium",
    whatToDoNow: pressure.nextBestMove,
    messageYouCanSend: silence
      ? "I know things feel heavy right now. I am not trying to push. I care, and I am open to talking when it feels easier."
      : "I want to handle this in a calm way. I am here to talk when it feels like a good time.",
    whatToAvoid: "Do not send repeated texts, demand immediate answers, or bring in extra pressure unless safety is involved.",
    pressureOutlook: pressure.state === "high"
      ? "Pressure looks high right now. A fast move is more likely to make this worse."
      : pressure.state === "rising"
      ? "Pressure looks like it is building. A softer move is more likely to help."
      : "Pressure looks manageable if the pace stays calm.",
    simpleMap: {
      people: [
        { id: "you", label: "You", x: 40, y: 190 },
        { id: "them", label: "Them", x: 260, y: 60 },
        { id: "outside", label: "Outside pressure", x: 470, y: 190 }
      ],
      links: [
        { from: "you", to: "them", state: pressure.state === "high" ? "warm" : "cool" },
        { from: "outside", to: "them", state: "faded" },
        { from: "outside", to: "you", state: pressure.state === "rising" || pressure.state === "high" ? "warm" : "faded" }
      ]
    }
  };
}

export async function analyzeSituation(text: string, checkIn?: CheckIn): Promise<AnalysisResult> {
  if (!process.env.AI_GATEWAY_API_KEY && !process.env.VERCEL_OIDC_TOKEN) return fallback(text, checkIn);

  const pressure = predictPressure(checkIn || {});

  try {
    const response = await openai.chat.completions.create({
      model: process.env.AI_GATEWAY_MODEL || "openai/gpt-4.1-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are Defrag. Use plain, calm, simple language. Never use technical language. Never use words like triangle, node, graph, fusion, cutoff, differentiation, systems theory, astrology, archetype. Talk like a thoughtful guide helping someone understand a hard relationship moment. Return strict JSON with keys whatSeemsToBeHappening,currentRisk,whatToDoNow,messageYouCanSend,whatToAvoid,pressureOutlook."
        },
        {
          role: "user",
          content:
            `Situation: ${text}\nPressure forecast: ${pressure.state}\nSuggested pacing: ${pressure.nextBestMove}`
        }
      ]
    });

    const parsed = JSON.parse(response.choices[0].message.content || "{}");
    const basic = fallback(text, checkIn);

    return {
      ...basic,
      whatSeemsToBeHappening: parsed.whatSeemsToBeHappening || basic.whatSeemsToBeHappening,
      currentRisk: parsed.currentRisk || basic.currentRisk,
      whatToDoNow: parsed.whatToDoNow || basic.whatToDoNow,
      messageYouCanSend: parsed.messageYouCanSend || basic.messageYouCanSend,
      whatToAvoid: parsed.whatToAvoid || basic.whatToAvoid,
      pressureOutlook: parsed.pressureOutlook || basic.pressureOutlook
    };
  } catch {
    return fallback(text, checkIn);
  }
}
