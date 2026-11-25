// News image 25 November 2026.
// Copies the baked-in front page (entry.png) to the output directory.
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
copyFileSync(join(repoRoot, "entry.png"), join(outDir, "entry.png"));

// The copied file must be byte-for-byte the entry: refuse a partial copy.
const sourceSize = statSync(join(repoRoot, "entry.png")).size;
const copiedSize = statSync(join(outDir, "entry.png")).size;
if (copiedSize !== sourceSize) {
  throw new Error(`entry.png copy mismatch: ${copiedSize} bytes copied, ${sourceSize} expected`);
}
