create table if not exists public.transpetro_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.transpetro_state enable row level security;
revoke all on table public.transpetro_state from anon;
grant select, insert, update, delete on table public.transpetro_state to authenticated;
create policy "transpetro_select_own" on public.transpetro_state for select to authenticated using ((select auth.uid()) = user_id);
create policy "transpetro_insert_own" on public.transpetro_state for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "transpetro_update_own" on public.transpetro_state for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "transpetro_delete_own" on public.transpetro_state for delete to authenticated using ((select auth.uid()) = user_id);
