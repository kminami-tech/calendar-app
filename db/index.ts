import { mkdirSync } from "node:fs";
import path from "node:path";

import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

import * as schema from "./schema";

export const databaseFile =
  process.env.CALENDAR_DB_FILE ?? path.join(process.cwd(), "data", "calendar.sqlite");

mkdirSync(path.dirname(databaseFile), { recursive: true });

export const sqlite = new Database(databaseFile);
sqlite.pragma("journal_mode = WAL");

export const db = drizzle(sqlite, { schema });

export function migrateDb() {
  migrate(db, { migrationsFolder: path.join(process.cwd(), "drizzle") });
}

export type Db = typeof db;
