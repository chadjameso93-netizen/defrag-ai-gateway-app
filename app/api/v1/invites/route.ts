import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.relationshipId || !body.ownerUserId || !body.displayName || !body.role) {
      return NextResponse.json(
        { error: "relationshipId, ownerUserId, displayName, and role are required." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { data: participant, error: participantError } = await supabase
      .from("relationship_participants")
      .insert({
        relationship_id: body.relationshipId,
        owner_user_id: body.ownerUserId,
        display_name: body.displayName,
        role: body.role,
        birth_date: body.birthDate || null,
        birth_time: body.birthTime || null,
        birth_time_confidence: body.birthTimeConfidence || "unknown",
        birth_place: body.birthPlace || null,
        data_status: "pending_invite",
        privacy_mode: body.privacyMode || "private_raw"
      })
      .select()
      .single();

    if (participantError) {
      return NextResponse.json({ error: participantError.message }, { status: 500 });
    }

    const inviteToken = randomUUID();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    const { data: invite, error: inviteError } = await supabase
      .from("invites")
      .insert({
        relationship_id: body.relationshipId,
        participant_id: participant.id,
        owner_user_id: body.ownerUserId,
        invite_token: inviteToken,
        channel: body.channel || "link",
        recipient_contact: body.recipientContact || null,
        status: "pending",
        expires_at: expiresAt
      })
      .select()
      .single();

    if (inviteError) {
      return NextResponse.json({ error: inviteError.message }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      participant,
      invite,
      inviteUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "https://defrag-premium.vercel.app"}/invite/${inviteToken}`
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
