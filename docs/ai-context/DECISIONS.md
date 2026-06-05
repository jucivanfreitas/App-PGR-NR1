# Decisions

- v0.1.0: Add a `doctor` command for first-fork diagnostics and a versioned release-notes workflow for tag-driven releases.
- v0.1.0: Keep demo data optional and explicitly opt-in to avoid accidental writes during first runs.
- v0.1.0: Add `npm run doctor` so fresh forks can inspect environment health, stack version and upstream setup in one command.
- v0.1.0: Provide optional local demo data and a short architecture overview to reduce the first-run learning curve.
- v0.1.0: Ship issue templates, Dependabot and automatic versioned release notes to keep the template visible and maintainable on GitHub.
- v0.1.0: Provide a one-command bootstrap (`npm run setup`) that creates a local env file for fresh forks.
- v0.1.0: Ship contributor hygiene by default with editor, license, contribution and PR template files.
- v0.1.0: Treat the DataVisio base stack as a versioned product, not as a live shared code copy.
- v0.1.0: Existing forks must configure an `upstream` remote if they want to consume future base changes.
- v0.1.0: Upgrade guidance must be documented in `STACK.md` and mirrored by a stack helper script.
- v0.1.0: Use IA-1stEngine/DataVisio as the default operating identity.
- v0.1.0: Keep SaaS access states server-side and minimal.
