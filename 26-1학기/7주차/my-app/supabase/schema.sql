-- Supabase SQL Editor에서 실행하세요.

create table if not exists public.lions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  part text not null,
  intro text default '',
  email text default '',
  phone text default '',
  website text default '',
  skills text[] default '{}',
  tag text default '',
  motto text default '',
  image text default '',
  track text default 'LION TRACK',
  created_at timestamptz not null default now()
);

alter table public.lions enable row level security;

drop policy if exists "lions_select_public" on public.lions;
create policy "lions_select_public"
  on public.lions for select
  using (true);

drop policy if exists "lions_insert_authenticated" on public.lions;
create policy "lions_insert_authenticated"
  on public.lions for insert
  to authenticated
  with check (true);

drop policy if exists "lions_update_authenticated" on public.lions;
create policy "lions_update_authenticated"
  on public.lions for update
  to authenticated
  using (true);

drop policy if exists "lions_delete_authenticated" on public.lions;
create policy "lions_delete_authenticated"
  on public.lions for delete
  to authenticated
  using (true);
