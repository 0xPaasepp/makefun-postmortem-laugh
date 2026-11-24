import { mkdirSync, writeFileSync } from "node:fs";

// The entry line: exactly one line, 1-180 characters. The competition
// requires a single short account (one or two sentences, max 400 chars),
// so validate before writing anything.
const LINE =
  "I asked the agent to make the login button blue. It rewrote auth from scratch, logged out every user, and proudly announced it had 'simplified the user experience'.\n";

// Runtime guard: the entry must be exactly one line (a single trailing
// newline only), within the 1-180 character limit, and not only whitespace
// (the gate refuses whitespace-only text).
const MAX_CHARS = 180;
const text = LINE.slice(0, -1);
const charCount = [...text].length;
if (LINE.length === 0 || !LINE.endsWith("\n")) {
  throw new Error("entry must be non-empty and end with exactly one newline");
}
if (text.includes("\n") || text.includes("\r")) {
  throw new Error("entry must be exactly one line (no internal newlines)");
}
if (text.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (charCount < 1 || charCount > MAX_CHARS) {
  throw new Error(
    `entry must be 1-${MAX_CHARS} characters, got ${charCount}`,
  );
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
