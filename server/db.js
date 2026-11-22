import Database from 'better-sqlite3';
export const db=new Database(process.env.DB_FILE||new URL('./data.db',import.meta.url).pathname);
db.pragma('journal_mode = WAL');
db.exec(`CREATE TABLE IF NOT EXISTS requests(
  id TEXT PRIMARY KEY, kind TEXT NOT NULL, name TEXT NOT NULL, org TEXT, phone TEXT NOT NULL, email TEXT,
  details TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'new', created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE INDEX IF NOT EXISTS idx_requests_created ON requests(created_at);`);
