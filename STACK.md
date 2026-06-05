# STACK.md - IA-1stEngine SaaS Base

Stack version: `v0.1.0`
Template release: `bootstrap`

## Purpose

This repository is the default DataVisio IA-1stEngine SaaS base. It provides a minimal runnable product shell, governance context, agents, skills and operational rules for new projects.

This stack is treated as a versioned product. A fork does not receive updates automatically when the base repository changes.

## Technical stack

- Next.js App Router
- TypeScript strict
- React
- Better Auth as authentication adapter
- Drizzle ORM with PostgreSQL
- Vitest for unit and integration tests
- Playwright for browser smoke validation
- Docker for packaging
- Traefik-compatible labels and examples
- GitHub Actions for CI and release promotion

## Required workflow

ANALYZE -> SEARCH -> EXECUTE -> TEST -> VALIDATE -> FIX -> RETEST -> DOCUMENT -> CONTINUE

Agents must consult documentation before proposing changes, route through .agents/AGENT_ROUTER.md, and use the selected agent from .github/agents/.

## Environment model

- DEV: local development and isolated experimentation.
- HM: homologation for release-candidate validation.
- PROD: customer-facing production.

HM and PROD must remain isolated by compose project, runtime directory, secrets and public host.

## Safety rules

- Never commit real secrets, tokens, private keys or production env files.
- Do not run production deploys without explicit human approval.
- Migrations must be generated, reviewed and validated before production.
- Browser validation must inspect the live runtime, not only source code.
- New domain behavior must update specs, implementation plan, decisions or changelog when it changes operating contracts.

## Stack versioning

- The stack follows simple versioning: `MAJOR.MINOR.PATCH` for contract changes and template releases.
- Bump `MAJOR` for breaking stack changes, `MINOR` for compatible stack additions, and `PATCH` for documentation or non-breaking fixes.
- Every change that alters onboarding, upgrade flow, agent routing, env contracts, CI/CD or release behavior must record the reason in `docs/ai-context/CHANGELOG_AI.md`.
- The stack version in this file is the reference point for forks, changelog entries and upgrade guidance.

## Fork upgrade model

- New forks start from the current base version.
- Existing forks do not inherit changes automatically.
- Fork maintainers should configure an `upstream` remote that points to the DataVisio base repository.
- Upgrade workflow:
  1. Review `docs/ai-context/CHANGELOG_AI.md` for the latest stack release notes.
  2. Run `npm run stack:status` to confirm the local stack version and upstream configuration.
  3. Run `npm run stack:sync` to fetch the base repository updates.
  4. Merge or rebase the changes into the fork after reviewing breaking changes.
  5. Re-run `npm run typecheck`, `npm run test` and `npm run build`.
- The base repository should be treated as a versioned product, not a live shared code copy.

## First fork checklist

1. Rename package and app display name.
2. Replace placeholder domains, image names and GitHub environments.
3. Fill .env.local from .env.example.
4. Customize docs/specs/PROJECT_SPEC.spec.md.
5. Configure an `upstream` remote to the DataVisio base repository.
6. Run `npm install`, `npm run typecheck`, `npm run test`, `npm run build`.
7. Configure GitHub Environments for HM and production before enabling release promotion.
