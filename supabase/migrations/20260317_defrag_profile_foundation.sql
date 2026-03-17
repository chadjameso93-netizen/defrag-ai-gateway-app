create extension if not exists pgcrypto;

alter table if exists profiles
  add column if not exists full_name text,
  add column if not exists birth_time_confidence text,
  add column if not exists current_location text,
  add column if not exists onboarding_focus text;

create table if not exists symbolic_profile_jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  status text not null default 'queued',
  profile_version text not null default 'v1',
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists person_symbolic_profile_raw (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  normalized_birth_input_json jsonb not null default '{}'::jsonb,
  planetary_positions_json jsonb not null default '{}'::jsonb,
  hd_activations_json jsonb not null default '{}'::jsonb,
  chart_properties_json jsonb not null default '{}'::jsonb,
  numerology_json jsonb not null default '{}'::jsonb,
  calculation_version text not null default 'v1',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists person_symbolic_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  profile_status text not null default 'queued',
  type text,
  authority text,
  strategy text,
  profile text,
  definition text,
  incarnation_cross_name text,
  signature text,
  not_self_theme text,
  defined_centers jsonb not null default '[]'::jsonb,
  open_centers jsonb not null default '[]'::jsonb,
  active_gates jsonb not null default '[]'::jsonb,
  precision_summary text,
  time_accuracy_state text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists decision_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  decision_profile_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists relational_baselines (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  baseline_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists narrative_seeds (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique,
  narrative_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists invite_tokens (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null,
  relationship_label text,
  token_hash text not null unique,
  delivery_method text not null default 'link',
  expires_at timestamptz not null,
  redeemed_at timestamptz,
  created_at timestamptz not null default now()
);
