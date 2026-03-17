import { NextRequest, NextResponse } from "next/server";
import { checkEntitlement } from "@/lib/entitlements/checkEntitlement";
import { analyzeSchema } from "@/lib/validation";
import { buildCurrentAppContext } from "@/engine/adapters/buildCurrentAppContext";
import { runDefragEngine } from "@/engine/synthesis/runDefragEngine";

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

    const userId = body.userId || null;
    const text = parsed.data.text;

    const entitlement = userId
      ? await checkEntitlement(userId)
      : { plan: "free", active: false };

    if (!entitlement.active) {
      return NextResponse.json({
        gated: true,
        upgradeUrl: process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK || "/pricing",
        whatSeemsToBeHappening:
          "A relational signal is present, but full synthesis is reserved for Defrag Pro.",
        currentRisk: "Preview only",
        whatToDoNow:
          "Upgrade to Defrag Pro to unlock the full relational read, timing context, and deeper guidance.",
        messageYouCanSend:
          "I want to handle this carefully. I’m open to talking when it feels like a better time.",
        whatToAvoid:
          "Avoid stacked follow-ups, reactive texting, and pushing for immediate clarity.",
        pressureOutlook: "Limited preview"
      });
    }

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
          { id: "you", label: "You", x: 40, y: 190 },
          { id: "them", label: "Them", x: 260, y: 60 },
          { id: "outside", label: "Context", x: 470, y: 190 }
        ],
        links: [
          { from: "you", to: "them", state: "cool" },
          { from: "outside", to: "them", state: "faded" },
          { from: "outside", to: "you", state: "faded" }
        ]
      }
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
