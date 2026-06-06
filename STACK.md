# IA-1stEngine Stack

Versão operacional: `0.1.10`

## Propósito

Esta stack existe para reduzir atrito de desenvolvimento, organizar o uso de IA com governança e manter forks previsíveis da instalação à operação.

## Metodologia

O fluxo oficial é:

1. `Discovery`
2. `Planning`
3. `Implementation`
4. `Validation`
5. `Operations`
6. `Governance`

Cada etapa produz evidência para a seguinte. Nenhuma mudança deve pular o ciclo de descoberta antes de tocar o código.

## Stack principal

- Next.js App Router
- TypeScript strict
- Tailwind CSS
- Drizzle ORM
- Better Auth
- GitHub Actions
- Docker
- Traefik
- Playwright

## Entrada para um fork novo

1. Abrir o fork no GitHub.
2. Clonar o repositório localmente.
3. Rodar `npm install`.
4. Rodar `npm run setup`.
5. Rodar `npm run stack:status` e `npm run stack:sync` se houver `upstream` configurado.
6. Validar com `npm run typecheck`, `npm run test` e `npm run build`.
7. Iniciar com `npm run dev`.

## Agentes padrão

- `000-bootstrap.agent.md`
- `001-ia1st-orchestrator.agent.md`
- `002-environment-discovery.agent.md`
- `003-project-discovery.agent.md`
- `004-business-discovery.agent.md`
- `005-ui-discovery.agent.md`
- `006-architecture-discovery.agent.md`
- `007-data-model-discovery.agent.md`
- `008-integration-discovery.agent.md`
- `009-legacy-knowledge-discovery.agent.md`
- `010-security-discovery.agent.md`
- `011-infrastructure-discovery.agent.md`
- `012-quality-discovery.agent.md`
- `013-modernization-planning.agent.md`
- `014-target-architecture.agent.md`
- `015-implementation-orchestrator.agent.md`
- `016-backend-modernization.agent.md`
- `017-frontend-modernization.agent.md`
- `019-integration-modernization.agent.md`
- `020-test-architecture.agent.md`
- `021-automated-testing.agent.md`
- `022-code-review.agent.md`
- `023-security-review.agent.md`
- `024-deployment.agent.md`
- `025-observability.agent.md`
- `026-performance-optimization.agent.md`
- `028-governance.agent.md`
- `infrastructure.agent.md`
- `saas-base.agent.md`

## Skills padrão

- `ia-first-engine-discipline`
- `autonomous-delivery-engine`
- `failure-recovery-engine`
- `test-orchestration-engine`
- `browser-validation`
- `deployment-runtime-validation`
- `auth-security`

## Observação operacional

`/sign-in` foi descontinuado como entrada principal. A experiência inicial agora é a home e o dashboard da stack.
