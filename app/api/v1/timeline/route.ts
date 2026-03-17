import { NextRequest, NextResponse } from "next/server";
import { getTimelineEvents } from "@/lib/timeline/getTimelineEvents";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required." },
        { status: 400 }
      );
    }

    const events = await getTimelineEvents(userId);

    return NextResponse.json({
      ok: true,
      events
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
