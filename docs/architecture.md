# Architecture

## Stack

- Next.js App Router
- TypeScript strict
- Better Auth
- Drizzle ORM
- PostgreSQL
- Vitest and Playwright
- Docker and Traefik
- GitHub Actions

## Build flow

1. Local install and setup.
2. Typecheck and unit tests.
3. Browser smoke validation.
4. Build the app.
5. Promote the same artifact through release tracks.

## Upgrade flow

1. Keep `upstream` configured in forks.
2. Review `docs/ai-context/CHANGELOG_AI.md`.
3. Use `npm run stack:status` and `npm run stack:sync`.
4. Merge or rebase base changes.
5. Rerun validation before releasing.
