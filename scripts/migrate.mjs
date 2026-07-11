// Creates all CMS tables. Idempotent — safe to re-run.
// Requires POSTGRES_URL (or DATABASE_URL) in the environment, e.g. via `vercel env pull .env.local`.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { config } from 'dotenv';
import pg from 'pg';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.join(__dirname, '..', '.env.local') });
const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

if (!connectionString) {
  console.error('Missing POSTGRES_URL / DATABASE_URL. Run `vercel env pull .env.local` first.');
  process.exit(1);
}

const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });

async function main() {
  const sql = readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
  await client.connect();
  await client.query(sql);
  console.log('Schema applied successfully.');
  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
