import { getSupabaseAdmin } from "@/lib/supabase/client";

export async function getDashboardOverview(userId: string) {
  const supabase = getSupabaseAdmin();

  const [
    { data: relationships },
    { data: reads },
    { data: entitlement }
  ] = await Promise.all([
    supabase
      .from("relationships")
      .select("*")
      .eq("owner_user_id", userId),
    supabase
      .from("daily_reads")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(2),
    supabase
      .from("entitlements")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle()
  ]);

  const safeRelationships = relationships || [];
  const relationshipIds = safeRelationships.map((r: any) => r.id);

  const [{ data: participants }, { data: events }] = await Promise.all([
    relationshipIds.length > 0
      ? supabase
          .from("relationship_participants")
          .select("*")
          .in("relationship_id", relationshipIds)
      : Promise.resolve({ data: [] as any[] }),
    relationshipIds.length > 0
      ? supabase
          .from("events")
          .select("*")
          .in("relationship_id", relationshipIds)
      : Promise.resolve({ data: [] as any[] })
  ]);

  return {
    relationshipCount: safeRelationships.length,
    participantCount: (participants || []).length,
    eventCount: (events || []).length,
    dailyReadCount: (reads || []).length,
    entitlement: entitlement || {
      plan: "free",
      status: "inactive"
    },
    recentReads: reads || []
  };
}
