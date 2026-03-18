import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase/client";

export async function POST(req: NextRequest) {
  try {
    const supabase = getSupabaseAdmin();
    const body = await req.json();

    const rawToken = String(body.token || "");
    const invitedUserId = String(body.userId || "");

    if (!rawToken || !invitedUserId) {
      return NextResponse.json({ error: "token_and_user_required" }, { status: 400 });
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
      other_user_id: invitedUserId,
      label: invite.relationship_label || "Connection",
      relationship_type: "connection",
      status: "active"
    });

    await supabase
      .from("invite_tokens")
      .update({ redeemed_at: new Date().toISOString() })
      .eq("id", invite.id);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "accept_invite_failed" }, { status: 500 });
  }
}
