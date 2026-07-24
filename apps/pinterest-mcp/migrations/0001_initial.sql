CREATE TABLE IF NOT EXISTS pinterest_tokens (
  token_key TEXT PRIMARY KEY,
  encrypted_value TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS pinterest_oauth_states (
  state TEXT PRIMARY KEY,
  code_verifier TEXT NOT NULL,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS pinterest_confirmation_intents (
  id TEXT PRIMARY KEY,
  action TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  consumed_at TEXT
);

CREATE TABLE IF NOT EXISTS pinterest_scheduled_pins (
  id TEXT PRIMARY KEY,
  board_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  link TEXT NOT NULL,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  scheduled_at TEXT NOT NULL,
  timezone TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('scheduled', 'publishing', 'published', 'failed', 'cancelled')),
  pinterest_pin_id TEXT,
  last_error TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  published_at TEXT
);

CREATE INDEX IF NOT EXISTS pinterest_scheduled_pins_due_idx
  ON pinterest_scheduled_pins(status, scheduled_at);

CREATE TABLE IF NOT EXISTS pinterest_publish_attempts (
  id TEXT PRIMARY KEY,
  scheduled_pin_id TEXT,
  pinterest_pin_id TEXT,
  action TEXT NOT NULL,
  status TEXT NOT NULL,
  error_message TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS pinterest_publish_attempts_date_idx
  ON pinterest_publish_attempts(action, status, created_at);
