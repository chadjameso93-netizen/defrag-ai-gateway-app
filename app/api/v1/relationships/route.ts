import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";

export async function GET(req: NextRequest) {
  try {
    const ownerUserId = req.nextUrl.searchParams.get("ownerUserId");

    if (!ownerUserId) {
      return NextResponse.json(
        { error: "ownerUserId is required." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("relationships")
      .select("*")
      .eq("owner_user_id", ownerUserId)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, relationships: data || [] });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.ownerUserId) {
      return NextResponse.json({ error: "ownerUserId is required." }, { status: 400 });
    }

    if (!body.label || !body.relationshipType) {
      return NextResponse.json({ error: "label and relationshipType are required." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("relationships")
      .insert({
        owner_user_id: body.ownerUserId,
        label: body.label,
        relationship_type: body.relationshipType,
        system_type: body.systemType || "dyad"
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, relationship: data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
