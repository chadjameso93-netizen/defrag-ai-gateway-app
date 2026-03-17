import { getSupabaseAdmin } from "@/lib/supabase/client";

export async function createParticipant(data: any) {
  const supabase = getSupabaseAdmin();

  const {
    relationshipId,
    ownerUserId,
    displayName,
    role,
    birthDate,
    birthTime,
    birthTimeConfidence,
    birthPlace,
    privacyMode
  } = data;

  if (!relationshipId || !ownerUserId || !displayName || !role || !birthDate || !birthPlace) {
    throw new Error("relationshipId, ownerUserId, displayName, role, birthDate, and birthPlace are required");
  }

  const { data: participant, error } = await supabase
    .from("relationship_participants")
    .insert([
      {
        relationship_id: relationshipId,
        owner_user_id: ownerUserId,
        display_name: displayName,
        role,
        birth_date: birthDate,
        birth_time: birthTime || null,
        birth_time_confidence: birthTimeConfidence || "unknown",
        birth_place: birthPlace,
        data_status: "submitted",
        privacy_mode: privacyMode || "private_raw"
      }
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return participant;
}
