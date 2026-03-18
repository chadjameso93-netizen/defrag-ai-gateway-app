import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";

export async function POST(req: NextRequest) {
  try {
    const supabase = getSupabaseAdmin();
    const body = await req.json();

    const userId = String(body.userId || "").trim();
    const fullName = String(body.fullName || "You").trim();

    if (!userId) {
      return NextResponse.json({ error: "userId_required" }, { status: 400 });
    }

    await supabase.from("decision_profiles").upsert({
      user_id: userId,
      decision_profile_json: {
        communication_style: "steady",
        timing_rule: "Pause before reacting.",
        note: "Start with a clear view before you act."
      },
      updated_at: new Date().toISOString()
    }, { onConflict: "user_id" });

    await supabase.from("relational_baselines").upsert({
      user_id: userId,
      baseline_json: {
        system_state: "starting",
        nodes: [
          { id: "self", label: fullName, x: 180, y: 220 },
          { id: "other", label: "Other", x: 420, y: 220 },
          { id: "system", label: "System", x: 300, y: 90 }
        ],
        links: [
          { from: "self", to: "other", state: "cool" },
          { from: "other", to: "system", state: "faded" }
        ]
      },
      updated_at: new Date().toISOString()
    }, { onConflict: "user_id" });

    await supabase.from("narrative_seeds").upsert({
      user_id: userId,
      narrative_json: {
        headline: "You’re set up.",
        body: "Start by asking about something current or add someone."
      },
      updated_at: new Date().toISOString()
    }, { onConflict: "user_id" });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "dashboard_bootstrap_failed" }, { status: 500 });
  }
}
