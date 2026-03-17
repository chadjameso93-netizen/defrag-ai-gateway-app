import { getSupabaseAdmin } from "@/lib/supabase/client";

export async function persistProfileArtifacts(userId: string, artifacts: any) {
  const supabase = getSupabaseAdmin();

  await supabase.from("symbolic_profile_jobs").upsert({
    user_id: userId,
    status: "ready",
    profile_version: "v1",
    updated_at: new Date().toISOString()
  }, { onConflict: "user_id" as any });

  await supabase.from("person_symbolic_profile_raw").upsert({
    user_id: userId,
    normalized_birth_input_json: artifacts.normalizedBirthInput || {},
    planetary_positions_json: {},
    hd_activations_json: {},
    chart_properties_json: {},
    numerology_json: {},
    calculation_version: "v1",
    updated_at: new Date().toISOString()
  }, { onConflict: "user_id" });

  await supabase.from("person_symbolic_profiles").upsert({
    user_id: userId,
    profile_status: "ready",
    type: null,
    authority: null,
    strategy: null,
    profile: null,
    definition: null,
    incarnation_cross_name: null,
    signature: null,
    not_self_theme: null,
    defined_centers: [],
    open_centers: [],
    active_gates: [],
    precision_summary: artifacts.normalizedBirthInput?.birth_time_confidence || null,
    time_accuracy_state: artifacts.normalizedBirthInput?.birth_time_confidence || null,
    updated_at: new Date().toISOString()
  }, { onConflict: "user_id" });

  await supabase.from("decision_profiles").upsert({
    user_id: userId,
    decision_profile_json: artifacts.decisionProfile || {},
    updated_at: new Date().toISOString()
  }, { onConflict: "user_id" });

  await supabase.from("relational_baselines").upsert({
    user_id: userId,
    baseline_json: artifacts.relationalBaseline || {},
    updated_at: new Date().toISOString()
  }, { onConflict: "user_id" });

  await supabase.from("narrative_seeds").upsert({
    user_id: userId,
    narrative_json: artifacts.narrativeSeed || {},
    updated_at: new Date().toISOString()
  }, { onConflict: "user_id" });
}
