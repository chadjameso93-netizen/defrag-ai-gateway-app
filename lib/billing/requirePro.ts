import { NextResponse } from "next/server";
import { checkUserPlan } from "./checkPlan";

export async function requirePro(userId: string) {
  const plan = await checkUserPlan(userId);

  if (!plan.allowed) {
    return NextResponse.json(
      {
        gated: true,
        error: "upgrade_required",
        message: "Upgrade to Defrag Pro to continue.",
        upgradeUrl: process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK || "/pricing"
      },
      { status: 402 }
    );
  }

  return null;
}
