import { getSupabaseAdmin } from "@/lib/supabase/client";

export async function checkEntitlement(userId: string) {
  const supabase = getSupabaseAdmin();

  const { data } = await supabase
    .from("entitlements")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (!data) {
    return {
      plan: "free",
      active: false
    };
  }

  return {
    plan: data.plan,
    active: data.status === "active"
  };
}
