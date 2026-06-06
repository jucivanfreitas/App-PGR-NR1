# AI Changelog

## v0.1.8 marketing-first pt-BR stack home

- Reworked the home page into a Portuguese marketing-first experience that explains the framework, the methodology and the value of the stack before the dashboard.
- Framed IA-1stEngine as a response to the shift from waterfall to agile and then to the AI cost-versus-efficiency problem.
- Translated the sign-in, subscription and dashboard entry pages to pt-BR so the full first-run path speaks the same product language.

## v0.1.7 marketing-first stack home

- Reframed the default home into a marketing-plus-onboarding experience that explains the framework, the methodology and the next operational steps in pt-BR.
- Positioned IA-1stEngine as a response to the shift from waterfall to agile and now to AI-driven development, with an explicit story about cost versus efficiency.
- Aligned the sign-in, subscription and dashboard entry pages to the same Portuguese language and product narrative.

## v0.1.6 frontend modernization

- Refreshed the default `/` route into a clearer onboarding experience with stack status, next steps, useful documentation links and a secondary dashboard action.
- Modernized the sign-in, subscription and dashboard entry pages so they match the same stack-first language and visual structure.
- Updated the global layout and shared styles to give the fork a more usable first-run interface on localhost.
- Allowed Next dev origins for `localhost` and `127.0.0.1` so browser validation can reach the local runtime consistently.

## v0.1.5 local runtime binding fix

- Bound `npm run dev` and `npm run start` explicitly to `0.0.0.0:3000` so the fork is reachable from Windows localhost without relying on an IPv6-only listener.
- Switched the healthcheck default target to `http://localhost:3000/api/health` to match the expected local runtime access path.

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
