-- Drop tables if they exist (optional - only if you want to reset)
-- DROP TABLE IF EXISTS uside_opportunities;
-- DROP TABLE IF EXISTS uside_guilds;

-- Migrate uside_guilds table (preserve data)
-- Step 1: Create new table with IDENTITY
CREATE TABLE IF NOT EXISTS uside_guilds_new (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  coin_per_month INTEGER NOT NULL,
  investors TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Step 2: Copy data from old table if it exists
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'uside_guilds' AND table_schema = 'public') THEN
    INSERT INTO uside_guilds_new (id, name, coin_per_month, investors, icon, color, created_at)
    OVERRIDING SYSTEM VALUE
    SELECT id, name, coin_per_month, investors, icon, color, created_at FROM uside_guilds;
    
    -- Update sequence to max id
    PERFORM setval(pg_get_serial_sequence('uside_guilds_new', 'id'), (SELECT MAX(id) FROM uside_guilds_new));
    
    DROP TABLE uside_guilds;
    ALTER TABLE uside_guilds_new RENAME TO uside_guilds;
  END IF;
END $$;

-- Migrate uside_opportunities table (preserve data)
-- Step 1: Create new table with IDENTITY
CREATE TABLE IF NOT EXISTS uside_opportunities_new (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  effect INTEGER NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  type TEXT NOT NULL,
  rarity TEXT NOT NULL DEFAULT 'common' CHECK (rarity IN ('common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic', 'divine')),
  rarity_chance DECIMAL(5,2) NOT NULL DEFAULT 50.00 CHECK (rarity_chance >= 0 AND rarity_chance <= 100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Step 2: Copy data from old table if it exists
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'uside_opportunities' AND table_schema = 'public') THEN
    INSERT INTO uside_opportunities_new (id, name, description, effect, icon, color, type, rarity, rarity_chance, created_at)
    OVERRIDING SYSTEM VALUE
    SELECT 
      id, 
      name, 
      description, 
      effect, 
      icon, 
      color, 
      type, 
      COALESCE(rarity, 'common'),
      COALESCE(rarity_chance, 50.00),
      created_at 
    FROM uside_opportunities;
    
    -- Update sequence to max id
    PERFORM setval(pg_get_serial_sequence('uside_opportunities_new', 'id'), (SELECT MAX(id) FROM uside_opportunities_new));
    
    DROP TABLE uside_opportunities;
    ALTER TABLE uside_opportunities_new RENAME TO uside_opportunities;
  END IF;
END $$;

-- Enable RLS
ALTER TABLE uside_guilds ENABLE ROW LEVEL SECURITY;
ALTER TABLE uside_opportunities ENABLE ROW LEVEL SECURITY;

-- Allow public read/write/delete (for seeding)
CREATE POLICY "Allow public read on uside_guilds"
  ON uside_guilds
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert on uside_guilds"
  ON uside_guilds
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public delete on uside_guilds"
  ON uside_guilds
  FOR DELETE
  USING (true);

CREATE POLICY "Allow public update on uside_guilds"
  ON uside_guilds
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public read on uside_opportunities"
  ON uside_opportunities
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert on uside_opportunities"
  ON uside_opportunities
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public delete on uside_opportunities"
  ON uside_opportunities
  FOR DELETE
  USING (true);

CREATE POLICY "Allow public update on uside_opportunities"
  ON uside_opportunities
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create uside_daily_results table
CREATE TABLE IF NOT EXISTS uside_daily_results (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  guild_id BIGINT NOT NULL REFERENCES uside_guilds(id) ON DELETE CASCADE,
  guild_name TEXT NOT NULL,
  project_name TEXT,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  profit INTEGER DEFAULT 0,
  investors JSONB[] DEFAULT ARRAY[]::JSONB[] CHECK (
    ARRAY_LENGTH(investors, 1) IS NULL OR
    (ARRAY_LENGTH(investors, 1) > 0 AND 
     investors[1] ? 'investor_name' AND 
     investors[1] ? 'investment_coins')
  ),
  opportunity_id BIGINT REFERENCES uside_opportunities(id) ON DELETE SET NULL,
  result_date DATE NOT NULL,
  opportunity_name TEXT,
  opportunity_description TEXT,
  effect INTEGER,
  icon TEXT,
  color TEXT,
  rarity TEXT,
  rarity_chance DECIMAL(5,2),
  has_opportunity BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(guild_id, result_date)
);

-- Enable RLS on uside_daily_results
ALTER TABLE uside_daily_results ENABLE ROW LEVEL SECURITY;

-- Allow public read/write/delete on uside_daily_results
CREATE POLICY "Allow public read on uside_daily_results"
  ON uside_daily_results
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert on uside_daily_results"
  ON uside_daily_results
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update on uside_daily_results"
  ON uside_daily_results
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete on uside_daily_results"
  ON uside_daily_results
  FOR DELETE
  USING (true);

-- Add rarity and coin fields to existing uside_opportunities table
ALTER TABLE public.uside_opportunities 
ADD COLUMN IF NOT EXISTS rarity TEXT NOT NULL DEFAULT 'common' 
CHECK (rarity IN ('common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic', 'divine'));

-- Add coin range fields for different opportunity types
ALTER TABLE public.uside_opportunities 
ADD COLUMN IF NOT EXISTS coin_min INTEGER NOT NULL DEFAULT 0;

ALTER TABLE public.uside_opportunities 
ADD COLUMN IF NOT EXISTS coin_max INTEGER NOT NULL DEFAULT 0;

UPDATE auth.users 
SET raw_user_meta_data = 
  CASE 
    WHEN raw_user_meta_data IS NULL THEN '{"role": "admin"}'::jsonb
    ELSE raw_user_meta_data || '{"role": "admin"}'::jsonb
  END
WHERE email = 'email@example.com';

create table public.uside_guilds (
  id bigint generated always as identity not null,
  name text not null,
  coin_per_month integer not null,
  investors jsonb[] not null,
  icon text not null,
  color text not null,
  created_at timestamp without time zone null default now(),
  logo_url character varying null,
  flag_url character varying null,
  banner_url character varying null,
  project_name text null,
  progress integer null,
  completed boolean null,
  constraint uside_guilds_new_pkey1 primary key (id)
) TABLESPACE pg_default;

create table public.uside_daily_results (
  id bigint generated always as identity not null,
  guild_id bigint not null,
  opportunity_id bigint null,
  result_date date not null,
  opportunity_name text null,
  opportunity_description text null,
  effect integer null,
  icon text null,
  color text null,
  has_opportunity boolean null default false,
  created_at timestamp without time zone null default now(),
  updated_at timestamp without time zone null default now(),
  guild_name text null,
  investors jsonb[] null,
  rarity text null,
  project_name text null,
  progress integer null,
  completed boolean null,
  profit integer null,
  constraint uside_daily_results_pkey primary key (id),
  constraint uside_daily_results_guild_id_result_date_key unique (guild_id, result_date),
  constraint uside_daily_results_guild_id_fkey foreign KEY (guild_id) references uside_guilds (id) on delete CASCADE,
  constraint uside_daily_results_opportunity_id_fkey foreign KEY (opportunity_id) references uside_opportunities (id) on delete set null
) TABLESPACE pg_default;