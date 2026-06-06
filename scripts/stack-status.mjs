import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

function runGit(args) {
  try {
    return execFileSync("git", args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch (error) {
    return `unavailable (${error instanceof Error ? error.message : String(error)})`;
  }
}

function readStackVersion() {
  try {
    const stack = readFileSync("STACK.md", "utf8");
    const match = stack.match(/Versão operacional:\s*`([^`]+)`/);
    return match?.[1] ?? "unknown";
  } catch {
    return "unknown";
  }
}

const branch = runGit(["branch", "--show-current"]);
const status = runGit(["status", "--short"]);
const upstream = runGit(["remote", "get-url", "upstream"]);

console.log(`IA-1stEngine stack status`);
console.log(`version: ${readStackVersion()}`);
console.log(`branch: ${branch}`);
console.log(`upstream: ${upstream.startsWith("unavailable") ? "not configured" : upstream}`);
console.log(`working tree: ${status ? "has local changes" : "clean"}`);
console.log("");
console.log("next steps:");
console.log("1. Review STACK.md");
console.log("2. Review docs/ai-context/CHANGELOG_AI.md");
console.log("3. Run npm run typecheck");
console.log("4. Run npm run test");
console.log("5. Run npm run build");
