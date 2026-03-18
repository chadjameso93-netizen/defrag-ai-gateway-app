import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { requireResolvedUserId } from "@/lib/server/authUser";

export async function GET(req: NextRequest) {
  try {
    const userId = await requireResolvedUserId(req);
    const supabase = getSupabaseAdmin();
    const today = new Date().toISOString().slice(0, 10);

    const { data: existing } = await supabase
      .from("daily_reads")
      .select("*")
      .eq("user_id", userId)
      .eq("read_date", today)
      .eq("period", "morning")
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ ok: true, read: existing });
    }

    const fallback = {
      user_id: userId,
      read_date: today,
      period: "morning",
      title: "Daily Read",
      body_text: "Stay simple today. Let the situation breathe before you try to define it too quickly.",
      audio_url: null
    };

    const { data, error } = await supabase
      .from("daily_reads")
      .upsert(fallback, { onConflict: "user_id,read_date,period" })
      .select("*")
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, read: data || fallback });
  } catch (error) {
    const message = error instanceof Error ? error.message : "daily_read_failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
