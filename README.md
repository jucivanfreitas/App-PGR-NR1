# VisioMilhas - MVP1

Projeto: VisioMilhas
Empresa: DataVisio
IA-1stEngine overlay:

- `STACK.md` descreve a metodologia, os agentes e o fluxo de desenvolvimento da stack.
- A home `/` agora funciona como onboarding da stack instalada.
- O dashboard `/app/dashboard` concentra a visão operacional da metodologia.
- A rota `/sign-in` foi descontinuada como entrada principal e permanece apenas como página de depreciação.

DescriÃ§Ã£o resumida:
Plataforma SaaS para gestÃ£o de milhas/pontos de fidelidade com multi-tenant por organizaÃ§Ã£o.

Release model:

- Official release flow: Build Once, Promote Many
- RC tags publish GitHub pre-releases after HM smoke and integration tests
- Production tags wait for `production` GitHub Environment approval, then deploy the same artifact to PROD and publish the final GitHub Release as latest
- Legacy `deploy-hm.yml` and `deploy-prod.yml` workflows remain manual fallback paths only
- Operational docs: `docs/ai-context/RELEASE_PROCESS.md`, `docs/ai-context/RELEASE_PIPELINE.md`, `docs/ai-context/CUTOVER_PROCESS.md`

Stack:

- Frontend: Next.js (App Router)
- Language: TypeScript
- UI: Tailwind CSS
- ORM: Drizzle ORM (Postgres)

Arquitetura de banco:

- ADM database: controle_adm_saas_datavisio
- APP database: visiomilhas_app
- ObservaÃ§Ã£o: usam-se duas databases separadas (ADM / APP) â€” nÃ£o consolidar em um Ãºnico DB com schemas.

VersÃ£o operacional atual: 1.3.21

Nota: integraÃ§Ã£o atÃ´mica da compra ao motor FIFO implementada localmente em 1.3.20 (feature flag, nÃ£o ativada por padrÃ£o). Testes unitÃ¡rios da compra com flag e rollback simulado adicionados em 1.3.21. Validar migration em staging antes de ativar a flag em ambientes de produÃ§Ã£o.

Status do MVP1:

- TÃ©cnico / base: 81%â€“85%
- UtilizÃ¡vel por usuÃ¡rio: 60%â€“68%

Comandos principais:

```
npm run dev
npm run build
npm run test
npm run lint
npm run typecheck
npm run db:check-env
npm run db:check-connections
npm run db:seed (exige autorizaÃ§Ã£o explÃ­cita)
npm run db:validate:staging:purchase-fifo (read-only; usar apÃ³s QA manual em staging)

Nota sobre skills locais:

- O repositÃ³rio pode conter skills locais em `.claude/skills` usadas para auxÃ­lio (code-review, frontend-patterns, security-review, test, saas-multi-tenant). Essas skills sÃ£o ferramentas de apoio: regras operacionais e decisÃµes finais residem no agente residente (`.github/agents/visiomilhas.agent.md`) e na documentaÃ§Ã£o em `docs/ai-context`.
```

Status das validaÃ§Ãµes (local):

- `npm run test`: OK (14 testes unitÃ¡rios do domÃ­nio)
- `npm run typecheck`: OK
- `npm run lint`: OK
- `npm run build`: OK

PrÃ³ximos passos (curto prazo):

Planejamento 1.3.22:

- Preparar staging/DB isolado e validar `db/app/migrations/0001_add_mile_point_lots.sql` usando o runbook em `docs/ai-context/STAGING_MIGRATION_RUNBOOK.md`.
- NÃ£o aplicar migration sem autorizaÃ§Ã£o explÃ­cita.

Nota operacional (2026-05-20):

- As bases `DATABASE_STAGING` e `DATABASE_TEST` foram criadas e estÃ£o disponÃ­veis; use `STAGING_DATABASE_URL` e `TEST_DATABASE_URL` explicitamente para preflights e validaÃ§Ãµes. NÃ£o usar `DATABASE_URL` como fallback quando houver risco de ambiguidade.
- O QA manual de compra FIFO em staging usa `USE_FIFO_MOVEMENTS_ENGINE=1` apenas em staging e o validador read-only `npm run db:validate:staging:purchase-fifo` com identificadores seguros da compra/conta.

Notas da versÃ£o 1.3.21:

- Testes unitÃ¡rios da compra com flag e rollback simulado adicionados em 1.3.21. Validar migration em staging antes de ativar a flag em ambientes de produÃ§Ã£o.
- Conectar compras/vendas/transferÃªncias e CRUDs (1.2.5+)
- Implementar autenticaÃ§Ã£o e deploy

PreparaÃ§Ã£o 1.3.15:

- Objetivo: alinhar `db/app/schema.ts` com a migration proposta (`0001_add_mile_point_lots.sql`) e preparar o contrato `MovementsRepo` para implementaÃ§Ã£o Drizzle (transaÃ§Ãµes). NÃ£o aplicar migration nesta etapa.

ImplementaÃ§Ã£o 1.3.16:

- Implementado `MovementsRepo` concreto com Drizzle em `lib/repositories/movements.drizzle-repo.ts`. O serviÃ§o de domÃ­nio (`lib/services/movements.ts`) permanece desacoplado e recebe o repo por injeÃ§Ã£o. NÃ£o aplicar migrations nem executar seeds como parte desta etapa.

Passos iniciais para rodar local:

1. Preencher `.env.local` com as variÃ¡veis em `.env.example` (NÃƒO commitar `.env.local`).
2. Rodar `npm ci`.
3. `npm run dev`.

ObservaÃ§Ãµes de seguranÃ§a:

- NÃ£o versionar `.env`.
- NÃ£o expor `APP_DATABASE_URL` / `ADM_DATABASE_URL` em logs.

ReferÃªncia de ambiente e deploy:

- Veja `docs/ai-context/ENVIRONMENT.md` para a convenÃ§Ã£o de variÃ¡veis e placeholders.
- Veja `docs/ai-context/PRODUCTION_DEPLOY_RUNBOOK.md` para o fluxo de `.env.production`, deploy remoto e validaÃ§Ã£o do workflow manual `workflow_dispatch`.
- A produÃ§Ã£o inicial deve manter `USE_FIFO_MOVEMENTS_ENGINE=0` atÃ© validaÃ§Ã£o explÃ­cita.
- Os artefatos de produÃ§Ã£o Swarm estÃ£o em `Dockerfile`, `.dockerignore` e `stack.visiomilhas.yml`.

Notas da versÃ£o 1.3.12 (preparaÃ§Ã£o do schema para ledger/FIFO):

- AÃ§Ã£o 1.3.12: adicionado `mile_point_lots` ao schema Drizzle (arquivo `db/app/schema.ts`) e migration proposta em `db/app/migrations/0001_add_mile_point_lots.sql`.
- ObservaÃ§Ã£o: a migration proposta NÃƒO foi aplicada â€” apenas commitada para revisÃ£o.
- PrÃ³ximo passo: 1.3.13 â€” implementar motor FIFO e serviÃ§os transacionais (`lib/services/movements.ts`).
- AÃ§Ã£o 1.3.12: adicionado `mile_point_lots` ao schema Drizzle e migration proposta criada.
- AÃ§Ã£o 1.3.13: migration refinada com FKs, Ã­ndices e checks propostos (arquivo `db/app/migrations/0001_add_mile_point_lots.sql`).
- ObservaÃ§Ã£o: a migration proposta continua NÃƒO APLICADA â€” apenas commitada para revisÃ£o.
- PrÃ³ximo passo: 1.3.14 â€” implementar motor FIFO e serviÃ§os transacionais (`lib/services/movements.ts`).
- AÃ§Ã£o 1.3.14: consolidaÃ§Ã£o do motor FIFO puro/in-memory e testes unitÃ¡rios (`lib/services/movements.ts`, `lib/services/__tests__/movements.test.ts`). Migration permanece proposta e NÃƒO APLICADA.

CI: para executar os testes de integraÃ§Ã£o no GitHub Actions, configure o secret `TEST_DATABASE_URL` apontando para um DB de teste isolado e use o workflow manual `.github/workflows/integration-tests.yml`.

ExecuÃ§Ã£o manual do workflow (resumo):

- Adicionar secret `TEST_DATABASE_URL` em Settings â†’ Secrets and variables â†’ Actions.
- Ir em Actions â†’ `Integration Tests - MovementsRepo` â†’ Run workflow â†’ selecionar branch `1.3.25.3-ci-manual-run-instructions` â†’ Run.
- Conferir passos: `db:preflight:test`, `db:migrate:test:base`, `db:validate:test:base`, `db:migrate:test:ledger`, `db:validate:test:ledger`, `test:integration`.

Checklist (operator):

- Add secret `TEST_DATABASE_URL` in repo Settings â†’ Secrets and variables â†’ Actions.
- Actions â†’ Integration Tests - MovementsRepo â†’ Run workflow â†’ branch `1.3.25.3-ci-manual-run-instructions` (or `1.3.25.4-ci-workflow-run-record`).
- Verify steps and collect sanitized logs.

Notas da versÃ£o 1.2.8:

- Corrigido warning ESLint em `lib/data/db-errors.ts` (remoÃ§Ã£o de export default anÃ´nimo).
- `/app/clubs` agora consulta `mile_clubs` no APP DB via `lib/data/clubs.ts` (Server Component, fallback seguro quando tabela ausente).
- `/app/settings` revisado para indicar tela preparatÃ³ria sem persistÃªncia.
- Mantida separaÃ§Ã£o: `organizations` resolvido via ADM; produto via APP.
- Recomenda-se remover fallbacks de desenvolvimento antes do deploy de produÃ§Ã£o.

MÃ³dulos conectados ao banco real:

- dashboard
- programs
- accounts
- entries
- purchases
- sales
- transfers
- clubs

## 2026-05-20 â€” 1.3.25.1

- Ampliados e validados localmente os testes de integraÃ§Ã£o do `MovementsRepo` contra `TEST_DATABASE_URL`, cobrindo rollback transacional, consumo FIFO por lotes e transferÃªncia entre contas. Testes e validaÃ§Ãµes locais passaram (`npm run test:integration`, `npm run test`, `npm run typecheck`, `npm run lint`, `npm run build`).
- ObservaÃ§Ã£o: staging/production/seed nÃ£o foram usados; `USE_FIFO_MOVEMENTS_ENGINE` permanece OFF.

