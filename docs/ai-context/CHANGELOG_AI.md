# AI Changelog

## v0.1.0 discoverability and developer tooling

- Added `npm run doctor` to report node/npm versions, stack version, env bootstrap status and upstream configuration.
- Added optional demo data tooling with explicit opt-in confirmation.
- Added Dependabot, issue templates, release notes automation, a short architecture guide and improved onboarding cues for new contributors.

## v0.1.0 developer adoption kit

- Added `npm run doctor` to inspect stack version, Git state, environment file presence and upstream configuration.
- Added optional local demo data support via `npm run demo:seed`.
- Added repository discoverability improvements: issue templates, dependabot, architecture summary, release notes workflow and a contributor-facing `CONTRIBUTING.md`.

## v0.1.0 onboarding and contributor kit

- Added a one-command `npm run setup` bootstrap that creates `.env.local` from `.env.example` when missing.
- Strengthened the README with badges, a shorter first-run path and explicit fork upgrade guidance.
- Added repository hygiene files for new contributors: `.editorconfig`, `LICENSE`, `CONTRIBUTING.md` and a pull request template.

## v0.1.0 stack versioning and upgrade flow

- Defined the base stack as a versioned product instead of a live shared copy.
- Added an explicit fork upgrade workflow: configure `upstream`, review the changelog, fetch base updates, merge or rebase, and rerun validation.
- Added stack helper commands for status and sync so forks can inspect and pull updates without guessing the repository state.

## v0.1.0 bootstrap

- Created public IA-1stEngine SaaS base template.
