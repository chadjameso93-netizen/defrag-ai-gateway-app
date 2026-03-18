import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { getUserIdFromRequest } from "@/lib/server/userContext";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = getUserIdFromRequest(req, body);
    const supabase = getSupabaseAdmin();

    const rawToken = String(body.token || "").trim();
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

    const { data: relationship, error } = await supabase
      .from("relationships")
      .insert({
        owner_user_id: invite.owner_user_id,
        other_user_id: userId,
        label: invite.relationship_label || "Connection",
        relationship_type: "connection",
        status: "active"
      })
      .select("*")
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (relationship?.id) {
      await supabase.from("relationship_events").insert({
        user_id: invite.owner_user_id,
        relationship_id: relationship.id,
        title: "Connection added",
        notes: `${invite.relationship_label || "Connection"} accepted the invite link.`,
        event_type: "system"
      });
    }

    await supabase
      .from("invite_tokens")
      .update({ redeemed_at: new Date().toISOString() })
      .eq("id", invite.id);

    return NextResponse.json({ ok: true, relationshipId: relationship?.id || null });
  } catch (error) {
    const message = error instanceof Error ? error.message : "accept_invite_failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
