import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { requireUserIdFromBody } from "@/lib/server/requireUserId";

export async function POST(req: NextRequest) {
  try {
    const supabase = getSupabaseAdmin();
    const { userId, body } = await requireUserIdFromBody(req);

    const rawToken = String(body.token || "");
    if (!rawToken) {
      return NextResponse.json({ error: "token_required" }, { status: 400 });
    }

    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

    const { data: invite } = await supabase
      .from("invite_tokens")
      .select("*")
      .eq("token_hash", tokenHash)
      .is("redeemed_at", null)
      .gt("expires_at", new Date().toISOString())
      .maybeSingle();

    if (!invite) {
      return NextResponse.json({ error: "invalid_or_expired_invite" }, { status: 404 });
    }

    await supabase.from("relationships").insert({
      owner_user_id: invite.owner_user_id,
      other_user_id: userId,
      label: invite.relationship_label || "Connection",
      relationship_type: "connection",
      status: "active"
    });

    await supabase
      .from("invite_tokens")
      .update({ redeemed_at: new Date().toISOString() })
      .eq("id", invite.id);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "accept_invite_failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
