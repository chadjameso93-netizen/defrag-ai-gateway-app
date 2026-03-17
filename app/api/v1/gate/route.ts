import { NextRequest, NextResponse } from "next/server";
import { checkEntitlement } from "@/lib/entitlements/checkEntitlement";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 });
  }

  const entitlement = await checkEntitlement(userId);

  return NextResponse.json({
    ok: true,
    entitlement
  });
}
