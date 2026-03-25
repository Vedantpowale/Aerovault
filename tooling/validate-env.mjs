import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const envFiles = [".env.local", ".env"];

for (const file of envFiles) {
  const filePath = path.join(rootDir, file);
  if (!fs.existsSync(filePath)) continue;

  const content = fs.readFileSync(filePath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;

    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

const required = [
  "GEMINI_API_KEY",
  "AVIATION_STACK_KEY",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
];

const missing = required.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error(`[env] Missing required variables: ${missing.join(", ")}`);
  process.exit(1);
}

console.log("[env] Validation passed");
