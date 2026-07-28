import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const roots = ["src", "public"];
const execFileAsync = promisify(execFile);
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
const buyerVisibleForbidden = [
  /\bbuy box\b/i,
  /\bcanonical (?:brief|record)\b/i,
  /\bcampaign brief\b/i,
  /\bexclusive (?:lead|leads|only|inbound|pay per appointment)\b/i,
  /\b(?:inbound|live|define|accept|service|case-related|automotive)\s+demand\b/i,
  /\bbuild\b.{0,80}\bdemand\b/i,
  /\bdemand around\b/i,
  /\bhandoff\b/i,
];

const failures = [];

function isBuyerVisibleSource(file) {
  return (
    file.startsWith("src/app/") && !file.startsWith("src/app/api/")
  ) || file.startsWith("src/components/") || file === "src/lib/verticals.ts";
}

async function trackedFiles() {
  const { stdout } = await execFileAsync("git", ["ls-files", ...roots]);
  return stdout
    .split("\n")
    .map((file) => file.trim())
    .filter(Boolean)
    .filter((file) => extensions.has(path.extname(file)));
}

async function scan() {
  const files = await trackedFiles();
  for (const file of files) {
    const contents = await readFile(file, "utf8");
    forbidden.forEach((pattern) => {
      if (pattern.test(contents)) {
        failures.push(`${file}: ${pattern}`);
      }
    });
    if (isBuyerVisibleSource(file)) {
      buyerVisibleForbidden.forEach((pattern) => {
        if (pattern.test(contents)) {
          failures.push(`${file}: buyer-visible ${pattern}`);
        }
      });
    }
  }
}

await scan();

if (failures.length) {
  console.error("RID residue scan failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("RID residue scan passed.");
