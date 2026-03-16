import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const token = randomUUID();

  return NextResponse.json({
    ok: true,
    inviteToken: token,
    inviteUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "https://defrag-premium.vercel.app"}/invite/${token}`,
    payload: body
  });
}
