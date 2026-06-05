import { copyFileSync, existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.dirname(fileURLToPath(new URL('../package.json', import.meta.url)));
const envExample = path.join(repoRoot, '.env.example');
const envLocal = path.join(repoRoot, '.env.local');

if (!existsSync(envExample)) {
  console.error('Missing .env.example');
  process.exit(1);
}

if (!existsSync(envLocal)) {
  copyFileSync(envExample, envLocal);
  console.log('Created .env.local from .env.example');
} else {
  console.log('.env.local already exists');
}

const stack = readFileSync(path.join(repoRoot, 'STACK.md'), 'utf8');
const versionLine = stack.split('\n').find((line) => line.startsWith('Stack version:')) ?? 'Stack version: unknown';

console.log(versionLine);
console.log('Next steps:');
console.log('1. Review docs/specs/PROJECT_SPEC.spec.md');
console.log('2. Configure the project name, domains and secrets');
console.log('3. Run npm run stack:status');
