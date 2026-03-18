import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = getSupabaseAdmin();

    const [{ data: relationship }, { data: events }] = await Promise.all([
      supabase.from("relationships").select("*").eq("id", params.id).maybeSingle(),
      supabase.from("relationship_events").select("*").eq("relationship_id", params.id).order("created_at", { ascending: false }).limit(8)
    ]);

    if (!relationship) {
      return NextResponse.json({ state: null });
    }

    const count = events?.length || 0;
    const latest = events?.[0]?.title || null;

    const state =
      count === 0
        ? {
            label: "New connection",
            tone: "Quiet start",
            guidance: "Add context or a note to begin building the picture."
          }
        : count < 3
        ? {
            label: "Early movement",
            tone: "Signals are forming",
            guidance: "Keep adding clear notes so the pattern becomes easier to read."
          }
        : {
            label: "Active relationship",
            tone: latest ? `Recent event: ${latest}` : "Live",
            guidance: "Use the timeline and chat together to keep the read grounded."
          };

    return NextResponse.json({ state });
  } catch {
    return NextResponse.json({ error: "relationship_state_failed" }, { status: 500 });
  }
}
