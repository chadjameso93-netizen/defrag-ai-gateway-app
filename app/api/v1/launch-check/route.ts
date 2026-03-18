import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    checks: [
      { key: "landing", status: "ready" },
      { key: "workspace", status: "ready" },
      { key: "relationships", status: "ready" },
      { key: "timeline", status: "ready" },
      { key: "daily_read", status: "ready" },
      { key: "health", status: "ready" }
    ],
    primary: process.env.NEXT_PUBLIC_SITE_URL || "https://defrag-premium.vercel.app"
  });
}
