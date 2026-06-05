# Contributing

## Before changing code

1. Read `STACK.md`.
2. Read `docs/ai-context/CHANGELOG_AI.md` and `docs/ai-context/DECISIONS.md`.
3. Check `npm run stack:status` if the change touches stack behavior.
4. Keep changes small and verify them with `npm run lint`, `npm run typecheck`, `npm run test`, and `npm run build`.

## Pull requests

- Prefer one logical change per PR.
- Document any stack or workflow contract change in `docs/ai-context/CHANGELOG_AI.md`.
- Call out breaking changes in the PR description.
