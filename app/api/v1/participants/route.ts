import { NextRequest, NextResponse } from "next/server";
import { createParticipant } from "@/lib/participants/createParticipant";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const participant = await createParticipant(body);

    return NextResponse.json({
      ok: true,
      participant
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
