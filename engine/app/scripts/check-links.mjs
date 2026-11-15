import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";

const dist = resolve("dist");

if (!existsSync(dist)) {
  console.error("dist/ is missing. Run `npm run build` before checking links.");
  process.exit(1);
}

function walk(directory) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const full = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

function targetFor(file, href) {
  const withoutQuery = href.split("?")[0].split("#")[0];
  if (!withoutQuery) return null;
  const clean = withoutQuery.startsWith("/")
    ? join(dist, withoutQuery)
    : resolve(dirname(file), withoutQuery);
  if (clean.endsWith("/")) return join(clean, "index.html");
  if (!extname(clean)) {
    const directoryIndex = join(clean, "index.html");
    if (existsSync(directoryIndex)) return directoryIndex;
  }
  return clean;
}

const missing = [];
let checked = 0;
const files = walk(dist);

for (const file of files) {
  const html = readFileSync(file, "utf8");
  for (const match of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const href = match[1];
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("//") ||
      /^(https?:|mailto:|tel:|javascript:|data:)/.test(href)
    ) {
      continue;
    }
    const target = targetFor(file, href);
    if (!target) continue;
    checked += 1;
    if (!existsSync(target) || !statSync(target).isFile()) {
      missing.push(`${relative(dist, file)} -> ${href}`);
    }
  }
}

for (const item of missing.sort()) console.error(`missing ${item}`);
console.log(`Checked ${checked} local links across ${files.length} HTML files.`);
if (missing.length) {
  console.error(`${missing.length} local link${missing.length === 1 ? "" : "s"} missing.`);
  process.exit(1);
}
