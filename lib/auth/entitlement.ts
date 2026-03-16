import { getSupabaseAdmin } from "@/lib/supabase/client";

export async function requirePremium(userId: string) {

  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("entitlements")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error || !data) {
    return false;
  }

  if (data.plan !== "premium") {
    return false;
  }

  if (data.status !== "active") {
    return false;
  }

  return true;
}
