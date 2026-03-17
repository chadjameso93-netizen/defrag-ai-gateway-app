import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const relationshipId = req.nextUrl.searchParams.get("relationshipId");

  return NextResponse.json({
    ok: true,
    relationshipId,
    events: []
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  return NextResponse.json({
    ok: true,
    event: body,
    next: "persist to timeline table"
  });
}
