import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    app: "defrag",
    status: "ready",
    timestamp: new Date().toISOString()
  });
}
