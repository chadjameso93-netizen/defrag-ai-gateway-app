create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  relationship_id uuid not null references relationships(id) on delete cascade,
  event_type text not null,
  notes text,
  intensity numeric not null default 0.5,
  created_at timestamptz not null default now()
);

create table if not exists daily_reads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  read_date date not null,
  period text not null, -- morning | evening
  title text not null,
  body_text text not null,
  audio_url text,
  created_at timestamptz not null default now()
);

create index if not exists idx_events_relationship_id on events(relationship_id);
create index if not exists idx_daily_reads_user_date on daily_reads(user_id, read_date);
