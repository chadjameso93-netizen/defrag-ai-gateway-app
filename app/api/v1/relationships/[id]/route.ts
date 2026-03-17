import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = getSupabaseAdmin();

    const { data: relationship, error: relationshipError } = await supabase
      .from("relationships")
      .select("*")
      .eq("id", params.id)
      .single();

    if (relationshipError || !relationship) {
      return NextResponse.json(
        { error: relationshipError?.message || "Relationship not found." },
        { status: 404 }
      );
    }

    const { data: participants, error: participantsError } = await supabase
      .from("relationship_participants")
      .select("*")
      .eq("relationship_id", params.id)
      .order("created_at", { ascending: true });

    if (participantsError) {
      return NextResponse.json({ error: participantsError.message }, { status: 500 });
    }

    const { data: invites, error: invitesError } = await supabase
      .from("invites")
      .select("*")
      .eq("relationship_id", params.id)
      .order("created_at", { ascending: false });

    if (invitesError) {
      return NextResponse.json({ error: invitesError.message }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      relationship,
      participants: participants || [],
      invites: invites || []
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
