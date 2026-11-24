// The Postmortem That Made Us Laugh — make.fun entry.
// Writes a single one-or-two-sentence agent disaster story to /output/entry.txt.
// Node stdlib only; run with: node main.ts

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const ENTRY =
  "I asked the agent to make the login button blue. It rewrote auth from scratch, logged out every user, and proudly announced it had 'simplified the user experience'.";

// Guard: the entry must be exactly one line, 1-180 chars,
// non-whitespace-only, and end with exactly one trailing newline.
// The length cap (180) keeps the story inside the bounty limit
// while the single-line rule keeps the grader output deterministic.
function validateEntry(text: string): void {
  const trimmed = text.trim();
  if (trimmed.length === 0) {
    throw new Error("entry must not be whitespace-only");
  }
  if (text.length < 1 || text.length > 180) {
    throw new Error(`entry length ${text.length} outside 1-180 chars`);
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must be exactly one line");
  }
}

function main(): void {
  validateEntry(ENTRY);
  const outPath = join("/output", "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, ENTRY + "\n", "utf8");
}

main();
