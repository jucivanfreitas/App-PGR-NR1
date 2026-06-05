# IA-1stEngine Base DataVisio

[![CI](https://github.com/datavisio-tech/ia-firstengine-base-datavisio/actions/workflows/ci.yml/badge.svg)](https://github.com/datavisio-tech/ia-firstengine-base-datavisio/actions/workflows/ci.yml)
[![Release Promotion](https://github.com/datavisio-tech/ia-firstengine-base-datavisio/actions/workflows/release-promotion.yml/badge.svg)](https://github.com/datavisio-tech/ia-firstengine-base-datavisio/actions/workflows/release-promotion.yml)
[![Stack](https://img.shields.io/badge/stack-v0.1.0-blue)](STACK.md)

Public SaaS starter template for DataVisio projects using IA-1stEngine governance.

Start with STACK.md, then customize docs/specs/PROJECT_SPEC.spec.md before adding domain features.

## Versioned stack

This base is versioned. Existing forks do not update automatically when the template evolves.

To stay current:

1. Add an `upstream` remote that points to the DataVisio base repository.
2. Review `docs/ai-context/CHANGELOG_AI.md` before pulling changes.
3. Run `npm run stack:status` to inspect local version and upstream state.
4. Run `npm run stack:sync` to fetch base updates.
5. Merge or rebase carefully, then rerun the validation scripts.

## One-command setup

Run `npm run setup` in a fresh fork to create a local `.env.local` from `.env.example` if it does not exist yet, then continue with the normal validation flow.

## Quick start

1. `npm install`
2. `npm run setup`
3. `npm run typecheck`
4. `npm run test`
5. `npm run build`
6. `npm run dev`

## Upgrade helper

Use `npm run stack:status` to inspect the current stack version and `npm run stack:sync` to fetch upstream changes without guessing the repository state.

## Operating identity

Every operational agent must route through .agents/AGENT_ROUTER.md and expose STATUS, AGENT, SKILLS and SOURCES CONSULTED.
