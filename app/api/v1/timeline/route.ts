import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = String(searchParams.get("userId") || "").trim();
    const relationshipId = String(searchParams.get("relationshipId") || "").trim();

    if (!userId) {
      return NextResponse.json({ error: "userId_required" }, { status: 400 });
    }

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
  } catch {
    return NextResponse.json({ error: "timeline_failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = getSupabaseAdmin();
    const body = await req.json();

    const userId = String(body.userId || "").trim();
    const relationshipId = String(body.relationshipId || "").trim();

    if (!userId || !relationshipId) {
      return NextResponse.json({ error: "userId_and_relationshipId_required" }, { status: 400 });
    }

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
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ event: data });
  } catch {
    return NextResponse.json({ error: "timeline_create_failed" }, { status: 500 });
  }
}
