import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { requireResolvedUserId } from "@/lib/server/authUser";

export async function GET(req: NextRequest) {
  try {
    const userId = await requireResolvedUserId(req);
    const supabase = getSupabaseAdmin();

    const [{ data: profile }, { data: decision }, { data: baseline }, { data: narrative }, { count: relationshipCount }, { count: dailyReadCount }] = await Promise.all([
      supabase.from("profiles").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("decision_profiles").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("relational_baselines").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("narrative_seeds").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("relationships").select("*", { count: "exact", head: true }).eq("owner_user_id", userId),
      supabase.from("daily_reads").select("*", { count: "exact", head: true }).eq("user_id", userId)
    ]);

    return NextResponse.json({
      profile: profile || null,
      decision: decision?.decision_profile_json || {},
      baseline: baseline?.baseline_json || null,
      narrative: narrative?.narrative_json || {
        headline: "You’re set up.",
        body: "Start by asking about something current or add someone."
      },
      metrics: {
        relationshipCount: relationshipCount || 0,
        dailyReadCount: dailyReadCount || 0
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "me_failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
