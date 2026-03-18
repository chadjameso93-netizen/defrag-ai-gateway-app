import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { requireUserIdFromBody } from "@/lib/server/requireUserId";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await requireUserIdFromBody(req);
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
        status: "active",
        updated_at: new Date().toISOString()
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "bootstrap_failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
