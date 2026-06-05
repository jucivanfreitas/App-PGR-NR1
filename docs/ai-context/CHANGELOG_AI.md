# AI Changelog

## v0.1.0 stack versioning and upgrade flow

- Defined the base stack as a versioned product instead of a live shared copy.
- Added an explicit fork upgrade workflow: configure `upstream`, review the changelog, fetch base updates, merge or rebase, and rerun validation.
- Added stack helper commands for status and sync so forks can inspect and pull updates without guessing the repository state.

## v0.1.0 bootstrap

- Created public IA-1stEngine SaaS base template.
