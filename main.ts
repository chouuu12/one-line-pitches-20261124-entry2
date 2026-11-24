import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const SENTENCE =
  "That idea you keep describing to friends? Say it out loud once, an AI agent builds the first version tonight, and if you hate it you've lost an evening, not a year.";

// Gate: the entry must be UTF-8 text of 1 to 240 characters, not only whitespace.
if (SENTENCE.length < 1 || SENTENCE.length > 240) {
  throw new Error(`sentence must be 1-240 characters, got ${SENTENCE.length}`);
}
if (SENTENCE.trim().length === 0) {
  throw new Error("sentence must not be only whitespace");
}
if (SENTENCE !== SENTENCE.trim()) {
  throw new Error("sentence must not have leading or trailing whitespace");
}

mkdirSync("/output", { recursive: true });
// Write exactly the sentence: no trailing newline, no extra text.
writeFileSync("/output/entry.txt", SENTENCE, "utf8");

// Self-check: read the file back and fail loudly if it is not byte-identical.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== SENTENCE) {
  throw new Error("self-check failed: /output/entry.txt does not match the sentence");
}
