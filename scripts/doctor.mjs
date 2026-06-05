import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.dirname(fileURLToPath(new URL('../package.json', import.meta.url)));

function run(command, args) {
  return spawnSync(command, args, { cwd: repoRoot, encoding: 'utf8' });
}

function readJson(file) {
  return JSON.parse(readFileSync(path.join(repoRoot, file), 'utf8'));
}

function line(label, value) {
  console.log(`${label}: ${value}`);
}

let failed = false;

const nodeVersionResult = run('node', ['--version']);
line('node', (nodeVersionResult.stdout ?? nodeVersionResult.stderr ?? '').trim() || 'unknown');

const npmVersionResult =
  process.platform === 'win32'
    ? run('cmd.exe', ['/d', '/s', '/c', 'npm --version'])
    : run('npm', ['--version']);
line('npm', (npmVersionResult.stdout ?? npmVersionResult.stderr ?? '').trim() || 'unknown');

const gitStatus = run('git', ['status', '--short']);
if (gitStatus.status === 0) {
  line('git_clean', gitStatus.stdout.trim() ? 'no' : 'yes');
  if (gitStatus.stdout.trim()) {
    console.log('git_status: working tree has uncommitted changes');
  }
} else {
  failed = true;
  console.log('git_status: unavailable');
}

try {
  const stack = readFileSync(path.join(repoRoot, 'STACK.md'), 'utf8');
  const match = stack.match(/Stack version:\s*`([^`]+)`/);
  line('stack_version', match?.[1] ?? 'unknown');
} catch {
  failed = true;
  console.log('stack_version: missing');
}

if (existsSync(path.join(repoRoot, '.env.local'))) {
  line('env_local', 'present');
} else {
  line('env_local', 'missing');
  console.log('hint: run npm run setup');
}

try {
  const pkg = readJson('package.json');
  line('package_name', pkg.name);
} catch {
  failed = true;
  console.log('package_name: missing');
}

const upstream = run('git', ['remote', 'get-url', 'upstream']);
if (upstream.status === 0) {
  line('upstream', upstream.stdout.trim());
} else {
  line('upstream', 'not configured');
}

console.log('status: ok');
process.exit(failed ? 1 : 0);
