import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const roots = ["src", "public"];
const extensions = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".mjs",
  ".css",
  ".json",
  ".html",
  ".md",
  ".svg",
]);
const forbidden = [
  /\bjuicebox\b/i,
  /peoplegpt/i,
  /--juicebox-/i,
  /\bai recruiting\b/i,
  /\btalent sourcing\b/i,
  /\brecruiter\b/i,
];

const failures = [];

async function scan(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await scan(file);
      continue;
    }
    if (!extensions.has(path.extname(entry.name))) continue;
    const contents = await readFile(file, "utf8");
    forbidden.forEach((pattern) => {
      if (pattern.test(contents)) {
        failures.push(`${file}: ${pattern}`);
      }
    });
  }
}

for (const root of roots) {
  await scan(root);
}

if (failures.length) {
  console.error("RID residue scan failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("RID residue scan passed.");
