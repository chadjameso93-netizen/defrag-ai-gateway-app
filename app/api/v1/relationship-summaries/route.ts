import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";

function buildSummary(label: string) {
  return {
    headline: `${label} is now part of your system.`,
    body: "Defrag can now track timing, notes, and relationship context across this connection.",
    state: "starting"
  };
}

export async function POST(req: NextRequest) {
  try {
    const supabase = getSupabaseAdmin();
    const body = await req.json();

    const relationshipId = String(body.relationshipId || "").trim();
    const label = String(body.label || "Connection").trim();

    if (!relationshipId) {
      return NextResponse.json({ error: "relationshipId_required" }, { status: 400 });
    }

    const summary = buildSummary(label);

    return NextResponse.json({ ok: true, summary });
  } catch {
    return NextResponse.json({ error: "relationship_summary_failed" }, { status: 500 });
  }
}
