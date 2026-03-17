import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    text: "Keep things simple today. Say less, make room, and let the moment settle before you push for clarity.",
    audio_url: null
  });
}
