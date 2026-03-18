import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = String(body.userId || "").trim();

    if (!userId) {
      return NextResponse.json({ error: "userId_required" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    const { data: existing } = await supabase
      .from("relationships")
      .select("id")
      .eq("owner_user_id", userId)
      .limit(1);

    if (!existing || existing.length === 0) {
      await supabase.from("relationships").insert({
        owner_user_id: userId,
        label: "My system",
        relationship_type: "self",
        status: "active"
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "bootstrap_failed" }, { status: 500 });
  }
}
