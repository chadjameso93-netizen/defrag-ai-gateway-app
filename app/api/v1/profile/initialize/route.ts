import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { persistProfileArtifacts } from "@/lib/profile/persistProfileArtifacts";
import { requireUserIdFromBody } from "@/lib/server/requireUserId";

export async function POST(req: NextRequest) {
  try {
    const { userId, body } = await requireUserIdFromBody(req);
    const supabase = getSupabaseAdmin();

    const effectiveBirthTime = body.birthTimeKnown ? (body.birthTime || "12:00") : "12:00";
    const birthTimeConfidence = body.birthTimeKnown ? "exact" : "unknown_default_noon";

    await supabase.from("profiles").upsert({
      user_id: userId,
      full_name: body.fullName || "",
      birth_date: body.birthDate || null,
      birth_time: effectiveBirthTime,
      birth_time_confidence: birthTimeConfidence,
      birth_place: body.birthPlace || null,
      current_location: body.currentLocation || null,
      onboarding_focus: "one_person",
      updated_at: new Date().toISOString()
    }, { onConflict: "user_id" });

    const artifacts = {
      normalizedBirthInput: {
        birth_date: body.birthDate || null,
        birth_time_raw: body.birthTime || null,
        birth_time_effective: effectiveBirthTime,
        birth_time_confidence: birthTimeConfidence,
        birth_place_text: body.birthPlace || "",
        current_location_text: body.currentLocation || ""
      },
      decisionProfile: {
        communication_style: "steady",
        timing_rule: birthTimeConfidence === "exact"
          ? "Use timing with normal confidence."
          : "Use timing with caution until birth time is updated.",
        note: birthTimeConfidence === "exact"
          ? "Profile ready."
          : "Profile ready with lower timing accuracy."
      },
      relationalBaseline: {
        system_state: "starting",
        nodes: [
          { id: "self", label: body.fullName || "You", x: 180, y: 220 },
          { id: "other", label: "Other", x: 420, y: 220 },
          { id: "system", label: "System", x: 300, y: 90 }
        ],
        links: [
          { from: "self", to: "other", state: "cool" },
          { from: "other", to: "system", state: "faded" }
        ]
      },
      narrativeSeed: {
        headline: "You’re set up.",
        body: birthTimeConfidence === "exact"
          ? "Start by asking about something current or add someone."
          : "You’re set up. Some timing details may be less exact until you add a birth time."
      }
    };

    await persistProfileArtifacts(userId, artifacts);

    const today = new Date().toISOString().slice(0, 10);
    await supabase.from("daily_reads").upsert({
      user_id: userId,
      read_date: today,
      period: "morning",
      title: "Daily Read",
      body_text: artifacts.narrativeSeed.body,
      audio_url: null
    }, { onConflict: "user_id,read_date,period" as any });

    return NextResponse.json({
      ok: true,
      status: "ready",
      profile: artifacts
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "profile_init_failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
