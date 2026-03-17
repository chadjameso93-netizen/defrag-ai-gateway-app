import { getSupabaseAdmin } from "@/lib/supabase/client";

export async function checkUserPlan(userId: string) {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("entitlements")
    .select("plan, status, stripe_customer_id, stripe_subscription_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) {
    return { plan: "free", allowed: false };
  }

  const allowed = data.plan === "premium" && data.status === "active";

  return {
    plan: data.plan || "free",
    allowed
  };
}
