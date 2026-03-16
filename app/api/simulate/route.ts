import { NextRequest, NextResponse } from "next/server";
import { runDefragPipeline } from "@/engine/pipeline";
import { analyzeSchema } from "@/lib/validation";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = analyzeSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid request." },
      { status: 400 }
    );
  }

  const text = parsed.data.text;
  const result = await runDefragPipeline(text);

  const softer = /i care|i'm open|i am open|when it feels like a better time|no pressure/i.test(text);

  return NextResponse.json({
    ...result,
    whatSeemsToBeHappening: softer
      ? "This message is less likely to feel pressuring."
      : result.whatSeemsToBeHappening,
    currentRisk: softer ? "Lower" : result.currentRisk,
    whatToDoNow: softer
      ? "If you send it, keep the pace slow and do not stack more messages on top of it."
      : result.whatToDoNow,
    pressureOutlook: softer
      ? "This message is more likely to keep the moment steady."
      : result.pressureOutlook
  });
}
