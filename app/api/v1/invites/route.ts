import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase/client";

export async function POST(req: NextRequest) {
  try {
    const supabase = getSupabaseAdmin();
    const body = await req.json();

    const raw = crypto.randomBytes(24).toString("hex");
    const hash = crypto.createHash("sha256").update(raw).digest("hex");

    await supabase.from("invite_tokens").insert({
      owner_user_id: body.userId || "11111111-1111-1111-1111-111111111111",
      relationship_label: body.label || "Connection",
      token_hash: hash,
      expires_at: new Date(Date.now() + 259200000).toISOString()
    });

    return NextResponse.json({
      inviteLink: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/invite/${raw}`
    });
  } catch {
    return NextResponse.json({ error: "invite_error" }, { status: 500 });
  }
}
