import { supabase } from "@/lib/supabase"

export async function createRelationship(userId: string, data: any) {

  const { name, role, birthDate, birthTime, birthLocation } = data

  const { data: relationship, error } = await supabase
    .from("relationships")
    .insert([
      {
        owner_id: userId,
        name,
        role,
        birth_date: birthDate,
        birth_time: birthTime,
        birth_location: birthLocation
      }
    ])
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return relationship
}
