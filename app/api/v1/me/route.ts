import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { requireUserIdFromQuery } from "@/lib/server/requireUserId";

export async function GET(req: NextRequest) {
  try {
    const userId = await requireUserIdFromQuery(req);
    const supabase = getSupabaseAdmin();

    const [{ data: profile }, { data: decision }, { data: baseline }, { data: narrative }] = await Promise.all([
      supabase.from("profiles").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("decision_profiles").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("relational_baselines").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("narrative_seeds").select("*").eq("user_id", userId).maybeSingle()
    ]);

    return NextResponse.json({
      profile: profile || null,
      decision: decision?.decision_profile_json || {},
      baseline: baseline?.baseline_json || null,
      narrative: narrative?.narrative_json || null
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "me_failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
