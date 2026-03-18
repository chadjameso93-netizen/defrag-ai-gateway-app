import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = String(searchParams.get("userId") || "").trim();

    if (!userId) {
      return NextResponse.json({ error: "userId_required" }, { status: 400 });
    }

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
  } catch {
    return NextResponse.json({ error: "relationships_failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = getSupabaseAdmin();
    const body = await req.json();

    const userId = String(body.userId || "").trim();
    const label = String(body.label || "").trim();

    if (!userId || !label) {
      return NextResponse.json({ error: "userId_and_label_required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("relationships")
      .insert({
        owner_user_id: userId,
        label,
        relationship_type: body.relationshipType || "connection",
        status: "active"
      })
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ relationship: data });
  } catch {
    return NextResponse.json({ error: "relationship_create_failed" }, { status: 500 });
  }
}
