import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = getSupabaseAdmin();

    const [{ data: relationship }, { data: events }] = await Promise.all([
      supabase.from("relationships").select("*").eq("id", params.id).maybeSingle(),
      supabase.from("relationship_events").select("*").eq("relationship_id", params.id).order("created_at", { ascending: false }).limit(5)
    ]);

    if (!relationship) {
      return NextResponse.json({ summary: null });
    }

    const eventCount = events?.length || 0;

    return NextResponse.json({
      summary: {
        headline: `${relationship.label} is active in your system.`,
        body: eventCount > 0
          ? `This connection has ${eventCount} recent timeline update${eventCount === 1 ? "" : "s"}.`
          : "This connection is ready for notes, context, and future reads.",
        status: relationship.status,
        relationshipType: relationship.relationship_type
      }
    });
  } catch {
    return NextResponse.json({ error: "relationship_summary_failed" }, { status: 500 });
  }
}
