# Cloud and Deploy

## Purpose

This file captures the deploy-facing part of the IA-1stEngine stack for Claude-based workflows.

## Included stack

- Docker
- Traefik examples
- GitHub Actions release promotion
- HM and PROD release flow
- local dev binding on Windows

## Operating rules

- HM and PROD must stay isolated.
- Promote the same build artifact forward.
- Use human approval for production cutover.
- Keep rollback documented and ready.
- Do not conflate local dev runtime with cloud runtime.

## Reference paths

- `STACK.md`
- `docs/ai-context/RELEASE_PROCESS.md`
- `docs/architecture.md`
- `release_policy.yaml`
- `stack.traefik.example.yml`
- `.github/workflows/release-promotion.yml`

