// Run: pnpm test (node --test, native TS type stripping, no framework)
import { test } from "node:test";
import assert from "node:assert/strict";
import { contactSchema, looksLikeBot, MIN_FILL_MS } from "./validation.ts";

const ok = { name: "Adi", email: "a@b.co", message: "Hello there, nice site!" };

test("valid input passes", () => {
  assert.equal(contactSchema.safeParse(ok).success, true);
});

test("CR/LF in name is flattened", () => {
  const r = contactSchema.parse({ ...ok, name: "Adi\r\nBcc: x@evil.com" });
  assert.equal(r.name, "Adi Bcc: x@evil.com");
});

test("length limits enforced", () => {
  assert.equal(contactSchema.safeParse({ ...ok, message: "x".repeat(4001) }).success, false);
  assert.equal(contactSchema.safeParse({ ...ok, email: "nope" }).success, false);
});

test("bot heuristics", () => {
  const now = 1_000_000;
  assert.equal(looksLikeBot("acme", "", now), true);
  assert.equal(looksLikeBot("", String(now - 500), now), true);
  assert.equal(looksLikeBot("", String(now - MIN_FILL_MS), now), false);
  assert.equal(looksLikeBot("", "", now), false); // no-JS visitor
});
