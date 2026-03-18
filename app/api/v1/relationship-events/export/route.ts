import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { requireResolvedUserId } from "@/lib/server/authUser";

export async function GET(req: NextRequest) {
  try {
    const userId = await requireResolvedUserId(req);
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("relationship_events")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      events: data || []
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "relationship_events_export_failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
