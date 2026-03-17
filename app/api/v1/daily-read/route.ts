import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  return NextResponse.json({
    ok: true,
    userId,
    morning: {
      title: "Morning Read",
      text: "Today may require a slower pace and more care around emotionally loaded topics."
    },
    evening: {
      title: "Evening Read",
      text: "This evening looks better for reflection than for forceful clarification."
    }
  });
}
