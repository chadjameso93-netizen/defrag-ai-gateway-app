import { getSupabaseAdmin } from "@/lib/supabase/client";

export async function getDailyRead(userId: string) {
  const supabase = getSupabaseAdmin();
  const today = new Date().toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from("daily_reads")
    .select("*")
    .eq("user_id", userId)
    .eq("read_date", today)
    .order("period", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}
