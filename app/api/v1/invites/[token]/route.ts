import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";

export async function GET(
  _req: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("invites")
      .select("*")
      .eq("invite_token", params.token)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json({ ok: true, invite: data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const body = await req.json();
    const supabase = getSupabaseAdmin();

    const { data: invite, error: inviteError } = await supabase
      .from("invites")
      .select("*")
      .eq("invite_token", params.token)
      .single();

    if (inviteError || !invite) {
      return NextResponse.json({ error: "Invite not found." }, { status: 404 });
    }

    const { error: participantError } = await supabase
      .from("relationship_participants")
      .update({
        display_name: body.fullName || null,
        birth_date: body.birthDate,
        birth_time: body.birthTime || null,
        birth_time_confidence: body.birthTimeConfidence || "unknown",
        birth_place: body.birthPlace,
        privacy_mode: body.privacyMode || "private_raw",
        data_status: "submitted"
      })
      .eq("id", invite.participant_id);

    if (participantError) {
      return NextResponse.json({ error: participantError.message }, { status: 500 });
    }

    const { error: statusError } = await supabase
      .from("invites")
      .update({ status: "completed" })
      .eq("id", invite.id);

    if (statusError) {
      return NextResponse.json({ error: statusError.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, message: "Invite completed." });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
