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

    return NextResponse.json({
      gated: false,
      whatSeemsToBeHappening: result.explanation,
      currentRisk: result.pressureLevel,
      whatToDoNow: result.recommendedAction,
      messageYouCanSend: result.messageOption,
      whatToAvoid:
        "Avoid long emotional messages, stacked follow-ups, and trying to resolve everything at once.",
      pressureOutlook: result.relationalState,
      simpleMap: {
        people: [
          { id: "you", label: "You", x: 140, y: 180 },
          { id: "them", label: "Other", x: 360, y: 180 },
          { id: "external", label: "Pressure", x: 250, y: 80 }
        ],
        links: [
          { from: "you", to: "them", state: "cool" },
          { from: "them", to: "external", state: "faded" }
        ]
      }
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
