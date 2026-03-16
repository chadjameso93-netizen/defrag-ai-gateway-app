import { NextRequest, NextResponse } from "next/server";
import { analyzeSituation } from "@/lib/analysis";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const text = String(body.text || "");
  const softer = /I know|I care|when you are ready|no pressure/i.test(text);
  const result = await analyzeSituation(text, body.checkIn || {});
  return NextResponse.json({
    ...result,
    whatSeemsToBeHappening: softer
      ? "This message is less likely to feel like pressure."
      : "This message may come across as more intense than you want.",
    currentRisk: softer ? "Lower" : result.currentRisk,
    whatToDoNow: softer
      ? "If you send it, do not add more messages right after."
      : "Make it shorter, softer, and less urgent before sending.",
    pressureOutlook: softer
      ? "This message is more likely to keep the moment steady."
      : "This message may raise pressure if the moment is already tense."
  });
}
