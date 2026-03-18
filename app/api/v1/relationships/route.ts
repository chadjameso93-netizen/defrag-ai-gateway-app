import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { requireResolvedUserId } from "@/lib/server/authUser";

export async function GET(req: NextRequest) {
  try {
    const userId = await requireResolvedUserId(req);
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("relationships")
      .select("*")
      .eq("owner_user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ relationships: data || [] });
  } catch (error) {
    const message = error instanceof Error ? error.message : "relationships_failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = await requireResolvedUserId(req, body);
    const label = String(body.label || "").trim();

    if (!label) {
      return NextResponse.json({ error: "label_required" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("relationships")
      .insert({
        owner_user_id: userId,
        label,
        relationship_type: body.relationshipType || "connection",
        status: "active"
      })
      .select("*")
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ relationship: data || null });
  } catch (error) {
    const message = error instanceof Error ? error.message : "relationship_create_failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
