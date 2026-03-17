import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { computeRelationshipState } from "@/lib/state/computeRelationshipState";

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

    const [{ data: participants, error: participantsError }, { data: events, error: eventsError }] =
      await Promise.all([
        supabase
          .from("relationship_participants")
          .select("*")
          .eq("relationship_id", relationshipId),
        supabase
          .from("events")
          .select("*")
          .eq("relationship_id", relationshipId)
      ]);

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
        ? safeEvents.reduce((sum, item: any) => sum + Number(item.intensity || 0), 0) / safeEvents.length
        : 0;

    const result = computeRelationshipState({
      participantCount: safeParticipants.length,
      recentEventCount: safeEvents.length,
      averageIntensity
    });

    return NextResponse.json({
      ok: true,
      state: result.state,
      pressure: result.pressure,
      participantCount: safeParticipants.length,
      eventCount: safeEvents.length
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
