# IA-1stEngine Base DataVisio

[![CI](https://github.com/datavisio-tech/ia-firstengine-base-datavisio/actions/workflows/ci.yml/badge.svg)](https://github.com/datavisio-tech/ia-firstengine-base-datavisio/actions/workflows/ci.yml)
[![Release Promotion](https://github.com/datavisio-tech/ia-firstengine-base-datavisio/actions/workflows/release-promotion.yml/badge.svg)](https://github.com/datavisio-tech/ia-firstengine-base-datavisio/actions/workflows/release-promotion.yml)
[![Stack](https://img.shields.io/badge/stack-v0.1.8-blue)](STACK.md)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Public SaaS starter template for DataVisio projects using IA-1stEngine governance and Harness Engineering.

License: MIT, open for community and commercial use.

Start with [STACK.md](STACK.md), then customize [docs/specs/PROJECT_SPEC.spec.md](docs/specs/PROJECT_SPEC.spec.md) before adding domain features.

## Clone and open

First create a fork of this repository on GitHub:

1. Open `https://github.com/datavisio-tech/ia-firstengine-base-datavisio`.
2. Click `Fork`.
3. Choose your account or organization.
4. Keep or edit the repository name for your new project.

Then clone your fork locally in PowerShell. `cd` must point to a local folder on your machine where the implementation will live:

```powershell
cd C:\Users\juciv\OneDrive\Devdatavisio\Saas
git clone https://github.com/<your-user-or-org>/<your-fork-repo>.git <your-app-folder>
cd <your-app-folder>
code .
```

Open the folder in VS Code, then use the terminal integrated in the editor.

Replace `<your-app-folder>` with the application name you want to use locally.

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

## Framework Discipline

IA-1stEngine is an engineering operating system, not a prompt pack.

Read [docs/ai-context/IA1STENGINE_DISCIPLINE.md](docs/ai-context/IA1STENGINE_DISCIPLINE.md) for the short discipline reference.

Core rules:

1. Treat context as a first-class asset.
2. Read `docs/ai-context/` and relevant `docs/specs/` before changing behavior.
3. Work incrementally and validate each slice.
4. Use routed agents and focused skills instead of improvised patterns.
5. Update changelog, decisions and plan records when stack contracts change.
6. Keep runtime governance, rollback and observability in the default path.

## Quick start

Run the full bootstrap and validation sequence with a single command:

```powershell
npm run stack:ia-firstengine
```

This runs `npm install`, `npm run setup`, `npm run doctor`, `npm run typecheck`, `npm run test` and `npm run build` in order.

Then start development mode:

```powershell
npm run dev
```

The dev and start scripts bind explicitly to `0.0.0.0` on port `3000` so the fork is reachable from the local machine on Windows.

## Home onboarding

The default `/` route is now a marketing and onboarding screen for fresh forks. It explains why the framework exists, shows the stack version, and keeps the dashboard as a secondary action.

## Upgrade helper

Use `npm run stack:status` to inspect the current stack version and `npm run stack:sync` to fetch upstream changes without guessing the repository state.

## Operating identity

Every operational agent must route through .agents/AGENT_ROUTER.md and expose STATUS, AGENT, SKILLS and SOURCES CONSULTED.
