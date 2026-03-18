import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { requireUserIdFromBody } from "@/lib/server/requireUserId";

export async function POST(req: NextRequest) {
  try {
    const supabase = getSupabaseAdmin();
    const { userId, body } = await requireUserIdFromBody(req);

    const raw = crypto.randomBytes(24).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(raw).digest("hex");

    await supabase.from("invite_tokens").insert({
      owner_user_id: userId,
      relationship_label: body.label || "Connection",
      token_hash: tokenHash,
      delivery_method: body.deliveryMethod || "link",
      expires_at: new Date(Date.now() + 259200000).toISOString()
    });

    return NextResponse.json({
      ok: true,
      inviteLink: `${process.env.NEXT_PUBLIC_SITE_URL || "https://defrag-premium.vercel.app"}/invite/${raw}`
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "invite_error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
