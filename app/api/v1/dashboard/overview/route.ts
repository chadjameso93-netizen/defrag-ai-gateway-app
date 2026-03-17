import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    const userId = "11111111-1111-1111-1111-111111111111";

    const { data: decision } = await supabase.from("decision_profiles").select("*").eq("user_id", userId).maybeSingle();
    const { data: baseline } = await supabase.from("relational_baselines").select("*").eq("user_id", userId).maybeSingle();
    const { data: narrative } = await supabase.from("narrative_seeds").select("*").eq("user_id", userId).maybeSingle();

    return NextResponse.json({
      decision: decision?.decision_profile_json || {},
      baseline: baseline?.baseline_json || {},
      narrative: narrative?.narrative_json || {
        headline: "You’re set up.",
        body: "Ask something or add someone."
      }
    });
  } catch (e) {
    return NextResponse.json({ error: "dashboard_error" }, { status: 500 });
  }
}
