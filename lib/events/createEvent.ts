import { getSupabaseAdmin } from "@/lib/supabase/client";

export async function createEvent(data: any) {
  const supabase = getSupabaseAdmin();

  const { relationshipId, type, notes, intensity } = data;

  const { data: event, error } = await supabase
    .from("events")
    .insert([
      {
        relationship_id: relationshipId,
        event_type: type,
        notes: notes || null,
        intensity: intensity || 0.5
      }
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return event;
}
