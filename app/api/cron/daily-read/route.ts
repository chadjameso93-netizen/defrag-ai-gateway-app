import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { generateDailyReadText } from "@/lib/daily-read/generateDailyReadText";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const secret = req.headers.get("x-cron-secret");

    if (!secret || secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const period = (url.searchParams.get("period") || "morning") as "morning" | "evening";

    if (period !== "morning" && period !== "evening") {
      return NextResponse.json({ error: "Invalid period" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    const { data: premiumUsers, error: entitlementError } = await supabase
      .from("entitlements")
      .select("user_id")
      .eq("plan", "premium")
      .eq("status", "active");

    if (entitlementError) {
      return NextResponse.json({ error: entitlementError.message }, { status: 500 });
    }

    const today = new Date().toISOString().slice(0, 10);
    const users = premiumUsers || [];
    const results = [];

    for (const row of users) {
      const userId = row.user_id;

      const { data: existing } = await supabase
        .from("daily_reads")
        .select("id")
        .eq("user_id", userId)
        .eq("read_date", today)
        .eq("period", period)
        .limit(1);

      if (existing && existing.length > 0) {
        results.push({ userId, skipped: true });
        continue;
      }

      const generated = await generateDailyReadText({ userId, period });

      const { data: inserted, error: insertError } = await supabase
        .from("daily_reads")
        .insert({
          user_id: userId,
          read_date: today,
          period,
          title: generated.title,
          body_text: generated.bodyText,
          audio_url: null
        })
        .select()
        .single();

      if (insertError) {
        results.push({ userId, error: insertError.message });
        continue;
      }

      results.push({ userId, created: true, id: inserted.id });
    }

    return NextResponse.json({
      ok: true,
      period,
      processed: results.length,
      results
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
