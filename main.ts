// The GPS Swears It Was a Shortcut — make.fun entry program.
// Writes the GPS's one-line excuse to <OUTPUT_DIR>/entry.txt (default /output).
// No dependencies, no network. Node 22+.

import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry line, exactly as written in the design spec:
// the GPS, smug and defensive, blames its map and accuses the lake
// of trespassing on its route. One line, plain text, no dialogue tags.
const ENTRY =
  "My map still says that lake is a road, so technically this was a shortcut \u2014 the water is just trespassing on my route.";

function fail(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}

function validateEntry(text) {
  // Count Unicode code points, not UTF-16 units, so the gate's
  // 1-to-200 character range is measured the way the scorer measures it.
  const chars = [...text];
  if (chars.length < 1 || chars.length > 200) {
    fail(`entry is ${chars.length} characters, outside the 1-200 gate`);
  }
  if (text.trim().length === 0) {
    fail("entry is only whitespace");
  }
  if (text !== text.trim()) {
    fail("entry has leading or trailing whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    fail("entry must be a single line");
  }
  // Reject control characters and the Unicode line/paragraph separators,
  // which would break the single-line plain-text gate.
  for (const ch of text) {
    const code = ch.codePointAt(0);
    if (code < 0x20 || code === 0x7f || code === 0x2028 || code === 0x2029) {
      fail(`entry contains a forbidden control character U+${code.toString(16).toUpperCase().padStart(4, "0")}`);
    }
  }
}

function main() {
  validateEntry(ENTRY);

  const outputDir = process.env.OUTPUT_DIR || "/output";
  // Create the output directory if needed. Never remove the directory
  // itself: on the grader it is a mount point, so only clear its contents.
  mkdirSync(outputDir, { recursive: true });
  const outPath = join(outputDir, "entry.txt");
  try {
    rmSync(outPath, { force: true });
  } catch {
    // A stale entry file that cannot be removed is handled by overwriting below.
  }

  // Write byte-exact, with no trailing newline: the gate counts the
  // file's characters, and a trailing newline is not part of the line.
  writeFileSync(outPath, ENTRY, "utf8");

  // Read the file back and verify it byte-for-byte before reporting success.
  // Compare raw bytes, not just decoded strings, so a stray BOM, a
  // trailing newline, or a different encoding of the em dash is caught.
  const expected = Buffer.from(ENTRY, "utf8");
  const actual = readFileSync(outPath);
  if (!actual.equals(expected)) {
    fail("verification failed: entry.txt bytes do not match the entry exactly");
  }
  if (actual.length === 0 || actual[actual.length - 1] === 0x0a) {
    fail("verification failed: entry.txt is empty or ends with a newline");
  }
  const bytes = expected.length;
  console.log(`wrote ${outPath}: ${[...ENTRY].length} characters, ${bytes} bytes, single line, byte-exact`);
}

main();
