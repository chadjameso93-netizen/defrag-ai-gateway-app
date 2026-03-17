import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { buildInitialProfileArtifacts } from "@/lib/profile/initializeProfile";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = String(body.userId || "").trim();

    if (!userId) {
      return NextResponse.json({ error: "userId is required." }, { status: 400 });
    }

    const artifacts = buildInitialProfileArtifacts({
      userId,
      fullName: body.fullName || "",
      birthDate: body.birthDate || "",
      birthTime: body.birthTime || "",
      birthTimeKnown: Boolean(body.birthTimeKnown),
      birthPlace: body.birthPlace || "",
      currentLocation: body.currentLocation || ""
    });

    const supabase = getSupabaseAdmin();
    const { persistProfileArtifacts } = await import("@/lib/profile/persistProfileArtifacts");
    const { persistProfileArtifacts } = await import("@/lib/profile/persistProfileArtifacts");

    await supabase.from("profiles").upsert({
      user_id: userId,
      full_name: body.fullName || "",
      birth_date: body.birthDate || null,
      birth_time: artifacts.normalizedBirthInput.birth_time_effective,
      birth_time_confidence: artifacts.normalizedBirthInput.birth_time_confidence,
      birth_place: body.birthPlace || null,
      current_location: body.currentLocation || null,
      onboarding_focus: "one_person",
      updated_at: new Date().toISOString()
    }, { onConflict: "user_id" });

    await supabase.from("daily_reads").insert({
      user_id: userId,
      read_date: new Date().toISOString().slice(0, 10),
      period: "morning",
      title: "Daily Read",
      body_text: artifacts.narrativeSeed.body,
      audio_url: null
    });

    await persistProfileArtifacts(userId, artifacts);

    return NextResponse.json({
      ok: true,
      status: "ready",
      profile: artifacts
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
