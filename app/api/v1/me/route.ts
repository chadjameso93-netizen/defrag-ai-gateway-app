import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId_required" }, { status: 400 });
    }

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
  } catch {
    return NextResponse.json({ error: "me_failed" }, { status: 500 });
  }
}
