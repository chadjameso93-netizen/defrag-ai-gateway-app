import { NextRequest, NextResponse } from "next/server";
import { getDailyRead } from "@/lib/daily-read/getDailyRead";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { buildDailyReadContext } from "@/lib/daily-read/buildDailyReadContext";
import { generateStateAwareDailyRead } from "@/lib/daily-read/generateStateAwareDailyRead";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required." },
        { status: 400 }
      );
    }

    const existing = await getDailyRead(userId);

    if (existing.length > 0) {
      return NextResponse.json({ ok: true, reads: existing, generated: false });
    }

    const supabase = getSupabaseAdmin();
    const today = new Date().toISOString().slice(0, 10);

    const context = await buildDailyReadContext(userId);

    const morning = generateStateAwareDailyRead(context, "morning");
    const evening = generateStateAwareDailyRead(context, "evening");

    const { data, error } = await supabase
      .from("daily_reads")
      .insert([
        {
          user_id: userId,
          read_date: today,
          period: "morning",
          title: morning.title,
          body_text: morning.bodyText,
          audio_url: null
        },
        {
          user_id: userId,
          read_date: today,
          period: "evening",
          title: evening.title,
          body_text: evening.bodyText,
          audio_url: null
        }
      ])
      .select("*");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, reads: data || [], generated: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
