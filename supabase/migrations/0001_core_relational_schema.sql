create table if not exists profiles (
  user_id uuid primary key,
  full_name text,
  birth_date date not null,
  birth_time text,
  birth_time_confidence text not null default 'unknown',
  birth_place text not null,
  current_location text,
  onboarding_focus text,
  privacy_level text default 'private',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists relationships (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null,
  label text not null,
  relationship_type text not null,
  system_type text not null default 'dyad',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists relationship_participants (
  id uuid primary key default gen_random_uuid(),
  relationship_id uuid not null references relationships(id) on delete cascade,
  owner_user_id uuid not null,
  display_name text not null,
  role text not null,
  linked_user_id uuid,
  birth_date date,
  birth_time text,
  birth_time_confidence text default 'unknown',
  birth_place text,
  data_status text not null default 'pending_invite',
  privacy_mode text not null default 'private_raw',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists invites (
  id uuid primary key default gen_random_uuid(),
  relationship_id uuid not null references relationships(id) on delete cascade,
  participant_id uuid not null references relationship_participants(id) on delete cascade,
  owner_user_id uuid not null,
  invite_token text not null unique,
  channel text not null,
  recipient_contact text,
  status text not null default 'pending',
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table if not exists entitlements (
  user_id uuid primary key,
  plan text not null default 'free',
  status text not null default 'inactive',
  stripe_customer_id text,
  stripe_subscription_id text,
  current_period_end timestamptz,
  updated_at timestamptz not null default now()
);
