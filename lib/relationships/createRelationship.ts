import { getSupabaseAdmin } from "@/lib/supabase/client";

export async function createRelationship(userId: string, data: any) {
  const { name, role, birthDate, birthTime, birthLocation } = data;

  if (!userId) {
    throw new Error("userId is required");
  }

  if (!name || !role || !birthDate || !birthLocation) {
    throw new Error("name, role, birthDate, and birthLocation are required");
  }

  const supabase = getSupabaseAdmin();

  const { data: relationship, error } = await supabase
    .from("relationships")
    .insert([
      {
        owner_user_id: userId,
        label: name,
        relationship_type: role,
        system_type: "dyad"
      }
    ])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return relationship;
}
