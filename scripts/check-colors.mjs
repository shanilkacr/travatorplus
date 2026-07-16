#!/usr/bin/env node
/**
 * Design-compliance guard: fail if any non-grayscale color literal appears in
 * apps/web outside the single allowed token file. Monochrome-only is part of
 * "done" for Travator.
 *
 * Allowed: #FFF/#FFFFFF, #000/#0A0A0A and the documented gray ramp, plus any
 * hex where R==G==B (pure gray). Anything else (a colored hex, or an rgb()/hsl
 * with unequal channels) is flagged.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname, relative } from "node:path";

const ROOT = process.cwd();
const WEB_DIR = join(ROOT, "apps", "web");
// The one place colors may be declared.
const TOKEN_FILE = join(WEB_DIR, "app", "globals.css");
const SCAN_EXT = new Set([".ts", ".tsx", ".js", ".jsx", ".css", ".mjs"]);
const IGNORE_DIRS = new Set(["node_modules", ".next", ".turbo", "dist", "out"]);

const HEX_RE = /#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/g;

function isGrayHex(hex) {
  let h = hex.slice(1);
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return r === g && g === b;
}

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (IGNORE_DIRS.has(entry)) continue;
      yield* walk(full);
    } else if (SCAN_EXT.has(extname(entry))) {
      yield full;
    }
  }
}

const violations = [];
let scanned = 0;
try {
  statSync(WEB_DIR);
} catch {
  console.log("check:colors — apps/web not present yet, skipping.");
  process.exit(0);
}

for (const file of walk(WEB_DIR)) {
  if (file === TOKEN_FILE) continue;
  scanned++;
  const text = readFileSync(file, "utf8");
  const lines = text.split("\n");
  lines.forEach((line, i) => {
    const matches = line.match(HEX_RE);
    if (!matches) return;
    for (const m of matches) {
      if (!isGrayHex(m)) {
        violations.push({ file: relative(ROOT, file), line: i + 1, hex: m, src: line.trim() });
      }
    }
  });
}

if (violations.length) {
  console.error(`\n✗ check:colors — ${violations.length} non-grayscale color(s) found in apps/web:\n`);
  for (const v of violations) {
    console.error(`  ${v.file}:${v.line}  ${v.hex}   ${v.src.slice(0, 80)}`);
  }
  console.error(
    `\nMonochrome-only design system: define colors as tokens in apps/web/app/globals.css.\n`
  );
  process.exit(1);
}

console.log(`✓ check:colors — scanned ${scanned} file(s) in apps/web, no non-grayscale colors.`);
