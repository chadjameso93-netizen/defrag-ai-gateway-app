import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    primary: process.env.NEXT_PUBLIC_SITE_URL || "https://defrag-premium.vercel.app"
  });
}
