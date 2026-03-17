import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { computeRelationshipState } from "@/lib/state/computeRelationshipState";
import { buildRelationshipSystemMap } from "@/lib/system/buildRelationshipSystemMap";

export async function GET(req: NextRequest) {
  try {
    const relationshipId = req.nextUrl.searchParams.get("relationshipId");

    if (!relationshipId) {
      return NextResponse.json(
        { error: "relationshipId is required." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const [{ data: relationship, error: relationshipError }, { data: participants, error: participantsError }, { data: events, error: eventsError }] =
      await Promise.all([
        supabase.from("relationships").select("*").eq("id", relationshipId).single(),
        supabase.from("relationship_participants").select("*").eq("relationship_id", relationshipId),
        supabase.from("events").select("*").eq("relationship_id", relationshipId)
      ]);

    if (relationshipError || !relationship) {
      return NextResponse.json({ error: relationshipError?.message || "Relationship not found." }, { status: 404 });
    }

    if (participantsError) {
      return NextResponse.json({ error: participantsError.message }, { status: 500 });
    }

    if (eventsError) {
      return NextResponse.json({ error: eventsError.message }, { status: 500 });
    }

    const safeParticipants = participants || [];
    const safeEvents = events || [];

    const averageIntensity =
      safeEvents.length > 0
        ? safeEvents.reduce((sum: number, item: any) => sum + Number(item.intensity || 0), 0) / safeEvents.length
        : 0;

    const live = computeRelationshipState({
      participantCount: safeParticipants.length,
      recentEventCount: safeEvents.length,
      averageIntensity
    });

    const map = buildRelationshipSystemMap({
      relationshipLabel: relationship.label,
      participants: safeParticipants,
      liveState: live.state,
      includePressureNode: true
    });

    return NextResponse.json({
      ok: true,
      map,
      pressure: live.pressure,
      state: live.state
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
