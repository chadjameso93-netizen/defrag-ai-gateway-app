import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("relationships")
      .select("*")
      .eq("id", params.id)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ relationship: data || null });
  } catch {
    return NextResponse.json({ error: "relationship_read_failed" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = getSupabaseAdmin();
    const body = await req.json();

    const updates: Record<string, any> = {
      updated_at: new Date().toISOString()
    };

    if (body.label) updates.label = body.label;
    if (body.relationshipType) updates.relationship_type = body.relationshipType;
    if (body.status) updates.status = body.status;

    const { data, error } = await supabase
      .from("relationships")
      .update(updates)
      .eq("id", params.id)
      .select("*")
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ relationship: data || null });
  } catch {
    return NextResponse.json({ error: "relationship_update_failed" }, { status: 500 });
  }
}
