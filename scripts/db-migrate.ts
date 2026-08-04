import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Pool } from "pg";

async function migrate() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required for db:migrate");
  }

  const sqlPath = resolve(process.cwd(), "drizzle/0000_tn_enterprise.sql");
  const sql = readFileSync(sqlPath, "utf8");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    await pool.query(sql);
    console.log("Applied drizzle/0000_tn_enterprise.sql");
  } finally {
    await pool.end();
  }
}

migrate()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
