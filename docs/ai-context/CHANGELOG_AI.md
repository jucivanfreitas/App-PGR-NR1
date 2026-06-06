# AI Changelog

## v0.1.4 fork-installed home and harness engineering

- Turned the default `/` route into a fork-installed onboarding screen that confirms success, shows the stack version and leads the user through the next operational steps.
- Added Harness Engineering guidance to the stack as the control layer for context, validation, observability and release gates.
- Recut the README so the base repo explains the onboarding home and the same stack contract that fresh forks now see at runtime.

## v0.1.3 fork-first clone guide

- Rewrote the README clone instructions to require a GitHub fork first, then a clone from the user's fork.
- Clarified that `cd` must point to the local implementation folder on the machine and that the application folder name is chosen by the user.

## v0.1.2 fork-first clone guide

- Rewrote the README clone instructions to require a GitHub fork first, then a clone from the user's fork.
- Clarified that `cd` must point to the local implementation folder on the machine and that the application folder name is chosen by the user.

## v0.1.2 quick start clone and bootstrap helper

- Extended the README with a visible clone/open recipe for new users starting the stack in VS Code.
- Added `npm run stack:ia-firstengine` as a single-command bootstrap that installs dependencies, runs setup, doctor, typecheck, tests and build.
- The helper now ends with an explicit reminder to run `npm run dev`.

## v0.1.1 TypeScript 6 deprecation alignment

## v0.1.1 Tailwind v4 PostCSS alignment

- Migrated the default template to Tailwind CSS v4 with `@tailwindcss/postcss`.
- Updated `app/globals.css` to import Tailwind via `@import "tailwindcss";`.
- Removed the legacy `tailwind.config.ts` scaffold from the base template.
- This keeps fresh forks on the supported Tailwind/PostCSS contract and avoids the old plugin mismatch.

## v0.1.0 discipline reference and community license

- Added a short framework discipline reference in `docs/ai-context/IA1STENGINE_DISCIPLINE.md`.
- Recut the README and stack guide so the repo highlights the framework discipline as a research point for new contributors.
- Made the MIT community license explicit in the public-facing docs.

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
