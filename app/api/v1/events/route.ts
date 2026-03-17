import { NextRequest, NextResponse } from "next/server";
import { createEvent } from "@/lib/events/createEvent";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const event = await createEvent(body);

    return NextResponse.json({
      ok: true,
      event
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
