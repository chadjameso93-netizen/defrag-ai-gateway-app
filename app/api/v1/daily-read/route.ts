import { NextRequest, NextResponse } from "next/server";
import { getDailyRead } from "@/lib/daily-read/getDailyRead";
import { getSupabaseAdmin } from "@/lib/supabase/client";

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

    const seedReads = [
      {
        user_id: userId,
        read_date: today,
        period: "morning",
        title: "Morning Read",
        body_text: "This morning favors a slower pace, less force, and clearer boundaries around emotionally loaded conversations."
      },
      {
        user_id: userId,
        read_date: today,
        period: "evening",
        title: "Evening Read",
        body_text: "This evening is better for reflection, context, and timing awareness than for pressing a difficult issue too hard."
      }
    ];

    const { data, error } = await supabase
      .from("daily_reads")
      .insert(seedReads)
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
