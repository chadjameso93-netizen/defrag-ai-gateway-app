import { getSupabaseAdmin } from "@/lib/supabase/client";
import { getProfile } from "@/lib/profile/getProfile";
import { computeRelationshipState } from "@/lib/state/computeRelationshipState";

export async function buildDailyReadContext(userId: string) {
  const supabase = getSupabaseAdmin();

  const profile = await getProfile(userId);

  const { data: relationships, error: relationshipsError } = await supabase
    .from("relationships")
    .select("*")
    .eq("owner_user_id", userId);

  if (relationshipsError) {
    throw new Error(relationshipsError.message);
  }

  const safeRelationships = relationships || [];

  let totalParticipants = 0;
  let totalEvents = 0;
  let intensitySum = 0;

  for (const relationship of safeRelationships) {
    const [{ data: participants }, { data: events }] = await Promise.all([
      supabase
        .from("relationship_participants")
        .select("*")
        .eq("relationship_id", relationship.id),
      supabase
        .from("events")
        .select("*")
        .eq("relationship_id", relationship.id)
    ]);

    const safeParticipants = participants || [];
    const safeEvents = events || [];

    totalParticipants += safeParticipants.length;
    totalEvents += safeEvents.length;
    intensitySum += safeEvents.reduce((sum: number, item: any) => sum + Number(item.intensity || 0), 0);
  }

  const averageIntensity =
    totalEvents > 0 ? intensitySum / totalEvents : 0;

  const liveState = computeRelationshipState({
    participantCount: totalParticipants,
    recentEventCount: totalEvents,
    averageIntensity
  });

  return {
    profile,
    relationshipCount: safeRelationships.length,
    participantCount: totalParticipants,
    eventCount: totalEvents,
    averageIntensity,
    liveState: liveState.state,
    pressure: liveState.pressure
  };
}
