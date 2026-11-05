import assert from "node:assert/strict";
import test from "node:test";
import { PROBEMITGLIED_ROLE_ID, accountIsOneYearOld, probationLoginBlocked } from "./roles.ts";

const now = new Date("2026-11-05T09:00:00.000Z");

test("an account created one year ago is old enough to expire", () => {
  assert.equal(accountIsOneYearOld("2025-11-05T09:00:00.000Z", now), true);
  assert.equal(accountIsOneYearOld("2025-11-05T08:59:00.000Z", now), true);
  assert.equal(accountIsOneYearOld({ __type: "Date", iso: "2025-11-05T09:00:00.000Z" }, now), true);
});

test("an account younger than one year is still valid", () => {
  assert.equal(accountIsOneYearOld("2025-11-05T09:00:01.000Z", now), false);
  assert.equal(accountIsOneYearOld("2026-01-01T00:00:00.000Z", now), false);
  assert.equal(accountIsOneYearOld(undefined, now), false);
});

test("login is blocked only for Probemitglied accounts that are one year old", () => {
  assert.equal(
    probationLoginBlocked([PROBEMITGLIED_ROLE_ID], "2025-11-05T09:00:00.000Z", PROBEMITGLIED_ROLE_ID, now),
    true,
  );
  assert.equal(
    probationLoginBlocked([PROBEMITGLIED_ROLE_ID], "2026-06-01T00:00:00.000Z", PROBEMITGLIED_ROLE_ID, now),
    false,
  );
  assert.equal(
    probationLoginBlocked(["kKQapdCCs9"], "2020-01-01T00:00:00.000Z", PROBEMITGLIED_ROLE_ID, now),
    false,
  );
});
