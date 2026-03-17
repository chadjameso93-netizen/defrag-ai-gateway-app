import { getSupabaseAdmin } from "@/lib/supabase/client";

export async function getTimelineEvents(userId: string) {
  const supabase = getSupabaseAdmin();

  const { data: relationships, error: relationshipsError } = await supabase
    .from("relationships")
    .select("id,label,relationship_type")
    .eq("owner_user_id", userId);

  if (relationshipsError) {
    throw new Error(relationshipsError.message);
  }

  const safeRelationships = relationships || [];
  const relationshipIds = safeRelationships.map((r: any) => r.id);

  if (relationshipIds.length === 0) {
    return [];
  }

  const { data: events, error: eventsError } = await supabase
    .from("events")
    .select("*")
    .in("relationship_id", relationshipIds)
    .order("created_at", { ascending: false })
    .limit(20);

  if (eventsError) {
    throw new Error(eventsError.message);
  }

  const relationshipMap = new Map(
    safeRelationships.map((r: any) => [r.id, r])
  );

  return (events || []).map((event: any) => ({
    ...event,
    relationship: relationshipMap.get(event.relationship_id) || null
  }));
}
