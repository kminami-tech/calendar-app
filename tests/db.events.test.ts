import assert from "node:assert/strict";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { after, before, test } from "node:test";

let tempDir: string;

before(async () => {
  tempDir = await mkdtemp(path.join(tmpdir(), "calendar-db-"));
  process.env.CALENDAR_DB_FILE = path.join(tempDir, "calendar.sqlite");
});

after(() => {
  delete process.env.CALENDAR_DB_FILE;
});

void test("events can be stored and read through the typed database client", async () => {
  const { db, migrateDb } = await import("../db");
  const { events } = await import("../db/schema");

  migrateDb();

  const startAt = new Date("2026-05-29T09:00:00+09:00");
  const endAt = new Date("2026-05-29T10:00:00+09:00");

  const created = db
    .insert(events)
    .values({
      title: "朝会",
      startAt,
      endAt,
      allDay: false,
      memo: "Asia/Tokyo fixed",
      color: "#2563eb",
    })
    .returning()
    .get();

  const rows = db.select().from(events).all();

  assert.equal(rows.length, 1);
  assert.equal(rows[0]?.id, created.id);
  assert.equal(rows[0]?.title, "朝会");
  assert.equal(rows[0]?.startAt.toISOString(), startAt.toISOString());
  assert.equal(rows[0]?.endAt.toISOString(), endAt.toISOString());
  assert.equal(rows[0]?.allDay, false);
  assert.equal(rows[0]?.memo, "Asia/Tokyo fixed");
  assert.equal(rows[0]?.color, "#2563eb");
  assert.ok(rows[0]?.createdAt instanceof Date);
  assert.ok(rows[0]?.updatedAt instanceof Date);
});
