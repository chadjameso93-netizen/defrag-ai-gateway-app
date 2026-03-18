import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { requireUserIdFromQuery } from "@/lib/server/requireUserId";

export async function GET(req: NextRequest) {
  try {
    const userId = await requireUserIdFromQuery(req);
    const supabase = getSupabaseAdmin();

    const [
      { data: decision },
      { data: baseline },
      { data: narrative },
      { count: relationshipCount },
      { count: dailyReadCount }
    ] = await Promise.all([
      supabase.from("decision_profiles").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("relational_baselines").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("narrative_seeds").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("relationships").select("*", { count: "exact", head: true }).eq("owner_user_id", userId),
      supabase.from("daily_reads").select("*", { count: "exact", head: true }).eq("user_id", userId)
    ]);

    return NextResponse.json({
      decision: decision?.decision_profile_json || {},
      baseline: baseline?.baseline_json || {
        nodes: [
          { id: "self", label: "You", x: 180, y: 220 },
          { id: "other", label: "Other", x: 420, y: 220 },
          { id: "system", label: "System", x: 300, y: 90 }
        ],
        links: [
          { from: "self", to: "other", state: "cool" },
          { from: "other", to: "system", state: "faded" }
        ]
      },
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
    const message = error instanceof Error ? error.message : "dashboard_error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
