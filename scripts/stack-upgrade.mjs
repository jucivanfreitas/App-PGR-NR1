import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const repoRoot = path.dirname(fileURLToPath(new URL('../package.json', import.meta.url)));
const cwd = repoRoot;
const command = process.argv[2] ?? 'status';

function runGit(args) {
  const result = spawnSync('git', args, { cwd, encoding: 'utf8' });
  if (result.status !== 0) {
    const message = result.stderr?.trim() || `git ${args.join(' ')}`;
    const error = new Error(message);
    error.code = result.status ?? 1;
    throw error;
  }

  return (result.stdout ?? '').trim();
}

function readStackVersion() {
  const content = readFileSync(path.join(cwd, 'STACK.md'), 'utf8');
  const match = content.match(/Stack version:\s*`([^`]+)`/);
  return match?.[1] ?? 'unknown';
}

function hasUpstream() {
  const result = spawnSync('git', ['remote', 'get-url', 'upstream'], { cwd, encoding: 'utf8' });
  if (result.status !== 0) {
    return null;
  }

  return (result.stdout ?? '').trim();
}

function printStatus() {
  const branch = runGit(['branch', '--show-current']);
  const stackVersion = readStackVersion();
  const upstream = hasUpstream();

  console.log(`branch: ${branch}`);
  console.log(`stack_version: ${stackVersion}`);
  console.log(`upstream: ${upstream ?? 'not configured'}`);

  if (upstream) {
    try {
      runGit(['fetch', 'upstream', '--tags']);
      console.log('upstream_fetch: ok');
      console.log(`upstream_main: ${runGit(['rev-parse', 'upstream/main'])}`);
    } catch (error) {
      console.log(`upstream_fetch: failed (${error instanceof Error ? error.message : String(error)})`);
    }
  }
}

function syncUpstream() {
  const upstream = hasUpstream();
  if (!upstream) {
    console.error('upstream remote is not configured');
    process.exit(1);
  }

  runGit(['fetch', 'upstream', '--tags']);
  console.log('Fetched upstream updates.');
  console.log('Review the fetched changes, then merge or rebase them into the fork.');
}

switch (command) {
  case 'status':
    printStatus();
    break;
  case 'sync':
    syncUpstream();
    break;
  default:
    console.error('Usage: node scripts/stack-upgrade.mjs [status|sync]');
    process.exit(1);
}
