import { execFileSync } from "node:child_process";

function runGit(args) {
  return execFileSync("git", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
}

let upstreamUrl = "";
try {
  upstreamUrl = runGit(["remote", "get-url", "upstream"]);
} catch {
  console.log("upstream remote is not configured. Configure it to use stack sync.");
  process.exit(0);
}

try {
  runGit(["fetch", "upstream"]);
  console.log(`fetched upstream from ${upstreamUrl}`);
  console.log("Review the fetched changes before merging or rebasing.");
} catch (error) {
  console.error(`stack sync failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}
