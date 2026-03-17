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

    const softer = /i care|i'm open|i am open|when it feels like a better time|no pressure/i.test(text);

    if (!entitlement.active) {
      return NextResponse.json({
        gated: true,
        upgradeUrl: process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK || "/pricing",
        whatSeemsToBeHappening: softer
          ? "This message is less likely to feel pressuring."
          : "This message may land more heavily than you want.",
        currentRisk: "Preview only",
        whatToDoNow:
          "Upgrade to Defrag Pro to unlock full message simulation and deeper pattern analysis.",
        messageYouCanSend:
          "I want to handle this carefully. I’m open to talking whenever it feels like a better time.",
        whatToAvoid:
          "Avoid sending multiple follow-ups or turning one message into a full conflict review.",
        pressureOutlook: "Limited preview"
      });
    }

    const context = buildCurrentAppContext(text);
    const result = await runDefragEngine(context);

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
          { id: "you", label: "You", x: 40, y: 190 },
          { id: "them", label: "Them", x: 260, y: 60 },
          { id: "outside", label: "Context", x: 470, y: 190 }
        ],
        links: [
          { from: "you", to: "them", state: softer ? "cool" : "warm" },
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
