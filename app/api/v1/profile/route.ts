import { NextRequest, NextResponse } from "next/server";
import { userProfileSchema } from "@/lib/profile/schema";
import { getSupabaseAdmin } from "@/lib/supabase/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = userProfileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid profile payload." },
        { status: 400 }
      );
    }

    if (!body.userId) {
      return NextResponse.json(
        { error: "userId is required." },
        { status: 400 }
      );
    }

    const profile = parsed.data;
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("profiles")
      .upsert({
        user_id: body.userId,
        full_name: profile.fullName,
        birth_date: profile.birthDate,
        birth_time: profile.birthTime,
        birth_time_confidence: profile.birthTimeConfidence,
        birth_place: profile.birthPlace,
        current_location: profile.currentLocation,
        onboarding_focus: profile.onboardingFocus
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      profile: data
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Server error";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
