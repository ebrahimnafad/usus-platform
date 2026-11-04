// scripts/check-console.cjs
// Deterministic check: no bare console.* calls in src/.
// console.log in production components is a debugging artefact — use the
// E2E suite or Vitest for observable behaviour instead.
//
// To allow a deliberate console call, append an inline comment:
//   console.error("fatal:", err); // check-console: allow
"use strict";

const fs = require("fs");
const path = require("path");

const SRC_DIR = path.resolve(__dirname, "../src");
const ALLOW_COMMENT = "check-console: allow";

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) {
      files.push(...walk(full));
    } else if (/\.(ts|tsx)$/.test(entry)) {
      files.push(full);
    }
  }
  return files;
}

const CONSOLE_RE = /\bconsole\.(log|warn|error|debug|info)\s*\(/;

const violations = [];

for (const file of walk(SRC_DIR)) {
  const lines = fs.readFileSync(file, "utf8").split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (CONSOLE_RE.test(line) && !line.includes(ALLOW_COMMENT)) {
      violations.push({ file, line: i + 1, text: line.trim() });
    }
  }
}

if (violations.length === 0) {
  console.log("check-console: OK — no bare console.* calls in src/");
  process.exit(0);
} else {
  console.error(
    `check-console: ${violations.length} violation(s) found in src/:\n`
  );
  for (const v of violations) {
    console.error(`  ${path.relative(SRC_DIR, v.file)}:${v.line}`);
    console.error(`    ${v.text}\n`);
  }
  console.error("To allow a deliberate call, append: // check-console: allow");
  process.exit(1);
}
