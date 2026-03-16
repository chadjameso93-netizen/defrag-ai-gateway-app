import { NextRequest, NextResponse } from "next/server";
import { analyzeSituation } from "@/lib/analysis";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = await analyzeSituation(body.text || "", body.checkIn || {});
  return NextResponse.json(result);
}
