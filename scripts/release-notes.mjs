import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.dirname(fileURLToPath(new URL('../package.json', import.meta.url)));
const requestedTag = process.argv[2];

if (!requestedTag) {
  console.error('Usage: node scripts/release-notes.mjs <version-tag>');
  process.exit(1);
}

const changelog = readFileSync(path.join(repoRoot, 'docs/ai-context/CHANGELOG_AI.md'), 'utf8');
const normalizedTag = requestedTag.startsWith('v') ? requestedTag : `v${requestedTag}`;
const heading = `## ${normalizedTag}`;
const startIndex = changelog.indexOf(heading);

if (startIndex === -1) {
  console.log(`Release ${requestedTag}`);
  console.log('');
  console.log('No matching changelog entry was found.');
  process.exit(0);
}

const rest = changelog.slice(startIndex + heading.length);
const nextHeadingIndex = rest.search(/\n##\s+/);
const body = (nextHeadingIndex === -1 ? rest : rest.slice(0, nextHeadingIndex)).trim();

console.log(`Release ${requestedTag}`);
console.log('');
console.log(body || 'No release notes available.');
