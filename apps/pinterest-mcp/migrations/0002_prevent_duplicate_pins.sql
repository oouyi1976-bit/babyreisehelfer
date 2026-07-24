CREATE TABLE IF NOT EXISTS pinterest_publication_fingerprints (
  fingerprint TEXT PRIMARY KEY,
  pinterest_pin_id TEXT,
  source TEXT NOT NULL,
  created_at TEXT NOT NULL
);
