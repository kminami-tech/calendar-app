import { mkdirSync } from "node:fs";
import path from "node:path";

import { defineConfig } from "drizzle-kit";

const databaseFile =
  process.env.CALENDAR_DB_FILE ?? path.join(process.cwd(), "data", "calendar.sqlite");

mkdirSync(path.dirname(databaseFile), { recursive: true });

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: databaseFile,
  },
});
