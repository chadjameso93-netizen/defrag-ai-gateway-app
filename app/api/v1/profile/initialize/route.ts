import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { persistProfileArtifacts } from "@/lib/profile/persistProfileArtifacts";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = body.userId || "11111111-1111-1111-1111-111111111111";

    const supabase = getSupabaseAdmin();

    await supabase.from("profiles").upsert({
      user_id: userId,
      birth_date: body.birth_date || null,
      birth_time: body.birth_time || null,
      birth_place: body.birth_place || null,
      updated_at: new Date().toISOString()
    });

    await persistProfileArtifacts(userId, {
      normalizedBirthInput: {
        birth_time_confidence: body.birth_time ? "exact" : "estimated_noon"
      },
      decisionProfile: {
        strategy: "Pause before reacting",
        authority: "Emotional clarity over time"
      },
      relationalBaseline: {
        state: "stable_start"
      },
      narrativeSeed: {
        headline: "You’re set up.",
        body: "Ask something or add someone."
      }
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "profile_init_failed" }, { status: 500 });
  }
}
