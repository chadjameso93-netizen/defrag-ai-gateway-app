import { NextRequest, NextResponse } from "next/server";
import { analyzeSchema } from "@/lib/validation";
import { buildCurrentAppContext } from "@/engine/adapters/buildCurrentAppContext";
import { runDefragEngine } from "@/engine/synthesis/runDefragEngine";
import { requirePro } from "@/lib/billing/requirePro";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = analyzeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid request." },
        { status: 400 }
      );
    }

    const userId = body.userId || "11111111-1111-1111-1111-111111111111";

    const block = await requirePro(userId);
    if (block) return block;

    const text = parsed.data.text;
    const context = buildCurrentAppContext(text);
    const result = await runDefragEngine(context);

    const softer = /i care|i'm open|i am open|when it feels like a better time|no pressure/i.test(text);

    return NextResponse.json({
      gated: false,
      whatSeemsToBeHappening: softer
        ? "This message is less likely to feel pressuring."
        : result.explanation,
      currentRisk: softer ? "Lower" : result.pressureLevel,
      whatToDoNow: softer
        ? "If you send it, keep the pace slow and do not stack more messages on top of it."
        : result.recommendedAction,
      messageYouCanSend: result.messageOption,
      whatToAvoid:
        "Avoid sending multiple follow-ups or turning one message into a full conflict review.",
      pressureOutlook: softer
        ? "This message is more likely to keep the moment steady."
        : result.relationalState,
      simpleMap: {
        people: [
          { id: "you", label: "You", x: 140, y: 180 },
          { id: "them", label: "Other", x: 360, y: 180 },
          { id: "external", label: "Pressure", x: 250, y: 80 }
        ],
        links: [
          { from: "you", to: "them", state: softer ? "cool" : "warm" },
          { from: "them", to: "external", state: "faded" }
        ]
      }
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
