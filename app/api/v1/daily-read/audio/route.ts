import { NextRequest, NextResponse } from "next/server";
import { generateDailyReadAudio } from "@/lib/daily-read/generateDailyReadAudio";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.dailyReadId) {
      return NextResponse.json(
        { error: "dailyReadId is required." },
        { status: 400 }
      );
    }

    const result = await generateDailyReadAudio(body.dailyReadId);

    return NextResponse.json({
      ok: true,
      ...result
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
