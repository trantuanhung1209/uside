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
  created_at TIMESTAMP DEFAULT NOW()
);

-- Step 2: Copy data from old table if it exists
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'uside_opportunities' AND table_schema = 'public') THEN
    INSERT INTO uside_opportunities_new (id, name, description, effect, icon, color, type, created_at)
    OVERRIDING SYSTEM VALUE
    SELECT id, name, description, effect, icon, color, type, created_at FROM uside_opportunities;
    
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



UPDATE auth.users 
SET raw_user_meta_data = 
  CASE 
    WHEN raw_user_meta_data IS NULL THEN '{"role": "admin"}'::jsonb
    ELSE raw_user_meta_data || '{"role": "admin"}'::jsonb
  END
WHERE email = 'email@example.com';