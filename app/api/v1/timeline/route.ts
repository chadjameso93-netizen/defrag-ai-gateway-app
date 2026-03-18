import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { requireResolvedUserId } from "@/lib/server/authUser";

export async function GET(req: NextRequest) {
  try {
    const userId = await requireResolvedUserId(req);
    const { searchParams } = new URL(req.url);
    const relationshipId = String(searchParams.get("relationshipId") || "").trim();
    const supabase = getSupabaseAdmin();

    let query = supabase
      .from("relationship_events")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(50);

    if (relationshipId) {
      query = query.eq("relationship_id", relationshipId);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ events: data || [] });
  } catch (error) {
    const message = error instanceof Error ? error.message : "timeline_failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = await requireResolvedUserId(req, body);
    const relationshipId = String(body.relationshipId || "").trim();

    if (!relationshipId) {
      return NextResponse.json({ error: "relationshipId_required" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("relationship_events")
      .insert({
        user_id: userId,
        relationship_id: relationshipId,
        title: body.title || "Update",
        notes: body.notes || "",
        event_type: body.eventType || "note"
      })
      .select("*")
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ event: data || null });
  } catch (error) {
    const message = error instanceof Error ? error.message : "timeline_create_failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
