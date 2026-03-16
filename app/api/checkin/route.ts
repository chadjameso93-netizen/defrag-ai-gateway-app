import { NextRequest, NextResponse } from "next/server";
import { predictPressure } from "@/engine/predictive";

export async function POST(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json(predictPressure(body || {}));
}
