# 2026-06-05 - Runner to VPS mitigation decision

- Decision: the Runner -> VPS RCA is closed for the current incident class.
- Consolidated cause: failed GitHub-hosted runner IP `172.184.172.212` did not reach the VPS; no entry exists in `sshd`, `auth.log`, `syslog`, kernel logs, or general journal for the failed window.
- Decision: do not reopen SSH, Fail2Ban, firewall, key, or remote-script RCA for this class unless a future failing runner IP appears in server-side logs with different evidence.
- Decision: the lowest-impact mitigation for HM certification is to keep GitHub-hosted runners for build/test and move deploy/precheck jobs to a self-hosted runner with stable path to the VPS.
- Decision: preferred implementation is a self-hosted GitHub Actions runner on the VisioMilhas VPS or on a small auxiliary bastion VPS in the same provider/network, restricted to deploy jobs through labels such as `self-hosted`, `linux`, `x64`, `visiomilhas-deploy`.
- Implementation decision: the VisioMilhas deploy runner is installed on the `visiochat` VPS as user `github-runner`, under `/opt/actions-runner/visiomilhas-deploy`, with GitHub labels `self-hosted`, `Linux`, `X64`, and `visiomilhas-deploy`.
- Implementation decision: `build_once`, lint/typecheck/tests, Playwright smoke, integration tests, and release publishing remain on GitHub-hosted runners; only deploy jobs use the self-hosted deploy runner.
- Decision: pull-based deploy is a valid future hardening path, but it is higher impact than a deploy runner because it changes the release execution model and operational ownership.
- Decision: job-level retry remains useful as a temporary mitigation, but it does not remove the root path dependency and is insufficient as the main certification strategy.

# 2026-06-05 - Precheck infrastructure retry decision

- Decision: `PRECHECK_INFRASTRUCTURE` must remain the first gate before any HM or PROD build/deploy step.
- Decision: `ssh-keyscan` inside the precheck should retry on `${SSH_PORT}` and `22` to avoid rejecting a valid target on a single transient miss.
- Decision: the retry window must remain short enough to keep the failure fast and preserve the gate's purpose.
- Decision: if `ssh-keyscan` still misses after the short retry window, the precheck may validate the target with a real SSH handshake using `StrictHostKeyChecking=accept-new` instead of blocking a known-good host on the keyscan alone.
# 2026-06-04 - Release promotion SSH baseline decision

- Decision: `.github/workflows/release-promotion.yml` must preserve the same SSH bootstrap behavior proven by `.github/workflows/deploy-hm.yml`.
- Decision: release promotion must use the selected-port `ssh-keyscan` retry loop across `${SSH_PORT}` and `22`.
- Decision: release promotion must persist `SSH_PORT=${selected_port}` before `Ensure remote directory exists` or any other remote command.
- Decision: `~/.ssh/config` or `StrictHostKeyChecking accept-new` cannot replace the proven SSH bootstrap until validated by a successful release-promotion run.

# 2026-06-04 - Release promotion SSH preparation decision

- Decision: the release promotion pipeline must use the last known-good HM SSH preparation baseline from `deploy-hm.yml` until a replacement is proven in GitHub Actions.
- Decision: the incident from `release-promotion.yml` run `26984230889` is classified as `DEPLOY_FAILURE_CLASSIFICATION: PIPELINE_REGRESSION`, not as an application defect.
- Decision: when host, port, user, and secrets show no evidence of change, and the previous HM workflow passed the same remote step, the first recovery action is to restore the proven `ssh-keyscan` behavior.
- Decision: `StrictHostKeyChecking accept-new` must not replace explicit `ssh-keyscan` in the release promotion deploy jobs without a successful proof run.

# 2026-06-04 - PROD V2 cutover readiness decision

- Decision: the current release candidate is **NO-GO** for PROD V2 promotion until schema/bootstrap evidence is closed.
- Decision: purchases and session refresh warnings are tracked as medium-severity runtime/test instability, not as standalone blockers.
- Decision: production deploy readiness must include explicit evidence for the APP schema path before cutover to a fresh PROD V2 target.

## 2026-06-04 - Agent routing enforcement

- Decisao: task type must be routed through `.agents/AGENT_ROUTER.md` before selecting the active agent identity.
- Decisao: `.github/agents/` remains the canonical agent tree and `.agents/skills/` remains the canonical skill tree.
- Decisao: operational replies must not use generic agent identities when a routed agent exists for the task type.
- Decisao: `.agents/AGENT_ROUTER.md` is part of the mandatory consultation chain alongside `AGENTS.md` and the ai-context records.
## 2026-06-03 Ã¢â‚¬â€ Pipeline Hardening for Environment Segregation

- DecisÃƒÂ£o: `npm run typecheck` deve rodar em checkout limpo usando `tsconfig.typecheck.json` source-only, sem depender de `.next/types/**/*.ts`.
- DecisÃƒÂ£o: os workflows HM e PROD passam a validar explicitamente `<!DOCTYPE html>` nas rotas pÃƒÂºblicas e redirecionadas.
- DecisÃƒÂ£o: os workflows HM e PROD passam a validar bootstrap OAuth Google por resposta nÃƒÂ£o-503, sem `AUTH_BOOTSTRAP_FAILED` e com redirect para `accounts.google.com`.
- DecisÃƒÂ£o: os gates permanecem em ordem `lint -> typecheck -> build`, mas o `typecheck` agora ÃƒÂ© independente do artefato gerado pelo build.

## 2026-06-03 - OAuth matrix correction

- Decisao: DEV uses a local-only Google OAuth client in `.env.local`.
- Decisao: HM and PROD share the same Google OAuth client.
- Decisao: `BETTER_AUTH_SECRET` is shared across DEV, HM and PROD; `AUTH_SECRET` stays only as a legacy fallback for compatibility.

# DECISIONS - VisioMilhas

## 2026-06-03 â€” Environment Segregation Implementation

- DecisÃ£o: HM e PROD devem ter workflows prÃ³prios e progressÃ£o por branch (`develop` e `main`).
- DecisÃ£o: o workflow de produÃ§Ã£o passa a ser explicitado em `deploy-prod.yml`.
- DecisÃ£o: a preparaÃ§Ã£o do Production V2 exige migration explÃ­cita para Better Auth antes do primeiro bootstrap vazio.
- DecisÃ£o: a fase atual nÃ£o executa deploy, migrations nem seeds; apenas prepara o caminho de implementaÃ§Ã£o.

# 2026-06-03 â€” Environment Segregation Architecture v1

- DecisÃ£o: DEV e HM compartilham `postgres_db` e `mongodb` neste momento para reduzir custo operacional e acelerar validaÃ§Ã£o.
- DecisÃ£o: HM passa a ser o ambiente de validaÃ§Ã£o funcional e pre-produÃ§Ã£o em `hm.visiomilhas.visiochat.cloud`.
- DecisÃ£o: PROD deve entrar com bootstrap limpo, sem herdar dados de DEV/HM e sem migraÃ§Ã£o de dados.
- DecisÃ£o: o contrato de produÃ§Ã£o permanece com os bancos lÃ³gicos `controle_adm_saas_datavisio` e `visiomilhas_app`, agora apontando para a nova infraestrutura PostgreSQL de produÃ§Ã£o.
- DecisÃ£o: `mongodb_prod_v2` fica como futuro e nao bloqueia o primeiro cutover se nÃ£o houver dependÃªncia runtime comprovada.
- DecisÃ£o: Google OAuth deve ser compartilhado entre HM e PROD, com redirecionamentos autorizados para ambos os domÃ­nios.
- DecisÃ£o: os workflows de deploy devem ser separados em `deploy-hm.yml` e `deploy-prod.yml`, ambos com gates obrigatÃ³rios de lint, typecheck, build e healthcheck.
- DecisÃ£o: o branch `develop` alimenta HM e o branch `main` alimenta PROD.
- DecisÃ£o: qualquer deploy deve falhar se lint, typecheck, build ou healthcheck falharem.

# 2026-06-01 â€” Subscription UX Refinement

- DecisÃ£o: a experiÃªncia `/subscribe` deve tratar o VisioMilhas como ERP operacional financeiro para milhas, nÃ£o apenas como gerenciador de milhas.
- DecisÃ£o: a pÃ¡gina pode exibir valores comerciais apenas via variÃ¡veis de ambiente `PLANO` e `PLANO_ANUAL`, mantendo a migraÃ§Ã£o futura para `controle_adm_saas_datavisio` aberta.
- DecisÃ£o: o refinamento Ã© estritamente de UX/copy; nÃ£o altera Better Auth, guards de assinatura, multi-tenancy, Stripe, checkout, billing real ou persistÃªncia de planos.
- DecisÃ£o: `NO_SUB` deve ser explicado ao usuÃ¡rio como modo somente leitura, preservando dados e removendo apenas permissÃµes de alteraÃ§Ã£o.

# 2026-05-31 â€” purchases-analytics-stabilization

- DecisÃ£o: o KPI de Purchases deve continuar agregado por `status` e filtrado por `organizationId` no server render.
- DecisÃ£o: a correÃ§Ã£o do `42803` deve permanecer mÃ­nima e localizada na query, sem criar novos fluxos de negÃ³cio.
- DecisÃ£o: `accountId` pode existir como filtro opcional no KPI, mas a pÃ¡gina atual segue operando no escopo por organizaÃ§Ã£o atÃ© haver UX explÃ­cita para seleÃ§Ã£o de conta.

# 2026-05-31 â€” purchases-journey-stabilization

- DecisÃ£o: a jornada de Purchases deve resolver a conta operacional real pelo runtime e nunca usar `accountId`/`programId` fixos na fixture.
- DecisÃ£o: o `programId` enviado para criaÃ§Ã£o de compra deve ser derivado da prÃ³pria conta operacional selecionada, e o backend continua sendo a fonte de verdade final.
- DecisÃ£o: se o seletor estiver vazio, a fixture pode preparar uma conta operacional de teste, mas sempre com o mesmo tenant e com dados consistentes entre conta e programa.

# 2026-05-31 â€” subscription-access-stabilization

- DecisÃ£o: o estado `NO_SUB` precisa ser auditado com um usuÃ¡rio fresco, sem ativar trial no mesmo fluxo de validaÃ§Ã£o.
- DecisÃ£o: o runner de auditoria pode preparar dados de teste, mas nÃ£o deve promover o caso `NO_SUB` antes da coleta de evidÃªncias read-only.
- DecisÃ£o: `NO_SUB` Ã© um estado real do domÃ­nio e deve permanecer observÃ¡vel como `NO_SUBSCRIPTION` com escrita bloqueada.
- DecisÃ£o: `TRIAL` e `ACTIVE` continuam sendo os Ãºnicos estados com escrita liberada nas rotas de Purchases.

# 2026-05-31 â€” alinhamento de origem do runtime MCP

- DecisÃ£o: a origem do runtime local precisa ser derivada do `PORT` em desenvolvimento para evitar `INVALID_ORIGIN` no Better Auth.
- DecisÃ£o: `BETTER_AUTH_URL`, `APP_URL`, `NEXT_PUBLIC_APP_URL` e `trustedOrigins` devem permanecer coerentes com o servidor Next ativo.
- DecisÃ£o: o runtime MCP deve continuar usando o comportamento real do produto, sem bypass, fake auth ou `allowFallback` como soluÃ§Ã£o definitiva.
- DecisÃ£o: o cenÃ¡rio `NO_SUB` continua sendo um gap de produto/runtime enquanto o primeiro acesso de subscription promove o usuÃ¡rio para `TRIAL`.

# 2026-05-30 â€” Campaign Catalog Engine 4.3-C

- DecisÃ£o: o catÃ¡logo de campanhas parceiras deve viver em `src/modules/campaigns`, separado dos mÃ³dulos operacionais de Purchases e Programs.
- DecisÃ£o: a primeira versÃ£o do motor serÃ¡ dirigida por seed JSON e providers vazios, sem scraping automÃ¡tico nesta release.
- DecisÃ£o: `partner_campaigns` deve guardar metadados de parceiro, programa, tipo, status e origem para servir de base ao autofill futuro da compra bonificada.
- DecisÃ£o: `campaign_snapshots` Ã© a tabela oficial para preservar histÃ³rico de observaÃ§Ãµes do catÃ¡logo sem misturar esse dado com o registro principal.

# 2026-05-30 â€” Purchases como cockpit operacional 4.3-B.2.A

- DecisÃ£o: Purchases passa a ser tratado como cockpit operacional baseado em Kanban, nÃ£o como tabela primÃ¡ria.
- DecisÃ£o: o fluxo de status oficial Ã© `REGISTERED -> TRACKED -> PENDING_CREDIT -> RECEIVED` e qualquer etapa pode ir para `PROBLEM`.
- DecisÃ£o: `RECEIVED` deve criar `PURCHASE_BONUS` de maneira idempotente e refletir atualizaÃ§Ã£o contÃ¡bil no programa e na conta destino.
- DecisÃ£o: o `organizationId` do cockpit deve vir do servidor e ser repassado ao cliente para manter a UI e as mutaÃ§Ãµes no tenant correto.
- DecisÃ£o: o runtime MCP deve validar o fluxo completo no ambiente real, sem mocks, usando Chrome DevTools MCP.

# 2026-05-29 â€” Programs como cockpit operacional 4.2-B

- DecisÃ£o: `Programs` deixa de ser apenas uma visÃ£o contextual e passa a ser o cockpit operacional da conta.
- DecisÃ£o: `accountId`, `tab` e `period` devem ser persistidos na URL para permitir refresh e troca de conta sem perda de contexto.
- DecisÃ£o: a camada de Programs deve viver em `src/modules/programs`, separando domÃ­nio, aplicaÃ§Ã£o, infraestrutura e apresentaÃ§Ã£o.
- DecisÃ£o: quick actions devem reutilizar os formulÃ¡rios existentes de compra, venda e transferÃªncia, sem criar um segundo motor de mutaÃ§Ãµes.
- DecisÃ£o: o extrato operacional deve ser um contrato estruturado com saldo pÃ³s-movimento, CPM e valor financeiro por linha.

### 2026-05-29 â€” 4.2-B.1 Decisions (Programs UX Refinement)

- DecisÃ£o: reduzir a altura do header (~40%) para priorizar o conteÃºdo operacional sem perder a presenÃ§a de marca.
- DecisÃ£o: mover o seletor de conta para dentro do header e oferecer a aÃ§Ã£o explÃ­cita `Trocar conta` apontando para `/app/accounts`.
- DecisÃ£o: evitar duplicaÃ§Ã£o de KPIs â€” header contÃ©m visÃ£o executiva condensada; cards permanecem para indicadores operacionais detalhados.
- DecisÃ£o: o `Resumo` passa a priorizar `KPIs` â†’ `Extrato operacional resumido` â†’ `GrÃ¡ficos`; os grÃ¡ficos sÃ£o complementares.
- DecisÃ£o: substituir a `Timeline` por uma `TransactionTable` com colunas operacionais padronizadas (`Data`, `OperaÃ§Ã£o`, `Tipo`, `Pontos`, `Valor`, `CPM`, `Status`).
- DecisÃ£o: sidebar contextual fixa Ã  direita (sticky) com cards compactos para `Conta`, `PendÃªncias` e `Assinaturas`.
- DecisÃ£o: breadcrumb e controle de troca de conta devem existir no header para otimizar navegaÃ§Ã£o e reduzir camadas.
- DecisÃ£o: os cards operacionais do corpo devem priorizar resultado, pendÃªncias, compras do perÃ­odo, vendas do perÃ­odo e transferÃªncias abertas, deixando grÃ¡ficos como suporte visual.

# DECISIONS - VisioMilhas

# 2026-05-29 â€” separaÃ§Ã£o rÃ­gida de `/sign-in` 3.7-E

- DecisÃ£o: a coluna esquerda passa a ser exclusivamente de marketing/conversÃ£o, concentrando headline, preview e storytelling do produto.
- DecisÃ£o: a coluna direita passa a ser exclusivamente de autenticaÃ§Ã£o, sem qualquer conteÃºdo de produto ou prova social operacional.
- DecisÃ£o: o logo VisioMilhas, o tÃ­tulo, os botÃµes de login e os links de criaÃ§Ã£o/recuperaÃ§Ã£o devem permanecer na direita como os Ãºnicos elementos de interface do acesso.
- DecisÃ£o: a aparÃªncia da Ã¡rea direita deve permanecer clara, minimalista e neutra, reforÃ§ando confianÃ§a sem competir com a coluna de marketing.

# 2026-05-29 â€” refinamento premium de `/sign-in` 3.7-D

- DecisÃ£o: a headline `Controle suas milhas como um operador profissional.` Ã© a melhor escolha para o posicionamento premium atual, por comunicar domÃ­nio operacional sem soar genÃ©rica ou agressiva demais.
- DecisÃ£o: a separaÃ§Ã£o marketing/operaÃ§Ã£o deve ser suavizada com gradiente e glow central para evitar a sensaÃ§Ã£o de layout colado.
- DecisÃ£o: o preview de marketing pode usar KPIs e movimentaÃ§Ãµes fictÃ­cias como prova visual, desde que isso fique claramente sem dependÃªncia de backend.
- DecisÃ£o: o card operacional deve ganhar microcopy de confianÃ§a e hover sutil, mantendo o foco em autenticaÃ§Ã£o.

# 2026-05-29 â€” separaÃ§Ã£o visual de `/sign-in` 3.7-C

- DecisÃ£o: manter o comportamento atual de auth intacto e alterar apenas a composiÃ§Ã£o visual da tela `/sign-in`.
- DecisÃ£o: o desktop deve comunicar dois contextos distintos, com marketing escuro Ã  esquerda e operaÃ§Ã£o clara Ã  direita.
- DecisÃ£o: o lado operacional deve usar leitura mais leve, card branco e preview mockado para reforÃ§ar o contexto de acesso ao produto.
- DecisÃ£o: tablet e mobile devem empilhar com a autenticaÃ§Ã£o antes do conteÃºdo de marketing.

# 2026-05-28 â€” Hub de autenticaÃ§Ã£o unificado 3.7-B

- DecisÃ£o: manter Google OAuth como caminho principal em `/sign-in` e adicionar fallback por e-mail/senha via modais, sem criar pÃ¡ginas pÃºblicas extras.
- DecisÃ£o: login, cadastro e recuperaÃ§Ã£o de senha compartilham a mesma identidade visual premium e permanecem na mesma superfÃ­cie.
- DecisÃ£o: reset de senha ocorre em `/reset-password` com token temporÃ¡rio e expiraÃ§Ã£o controlada pelo Better Auth.
- DecisÃ£o: mensagem de recuperaÃ§Ã£o Ã© nÃ£o-disclosive (nÃ£o confirma existÃªncia de e-mail na base).
- DecisÃ£o: fallback por credenciais deve preservar compatibilidade com onboarding/ownership existentes.

# 2026-05-27 â€” Central operacional de contas 3.6-A

- DecisÃ£o: a tela `/app/accounts` deve ser tratada como central operacional de contas de milhas, nÃ£o como tabela administrativa genÃ©rica.
- DecisÃ£o: o mesmo programa pode ter mÃºltiplas contas e isso deve ser visÃ­vel na lista sem agrupar ou esconder registros.
- DecisÃ£o: `display_name` visual Ã© derivado do programa + apelido, mantendo a leitura imediata sem exigir preenchimento manual extra.
- DecisÃ£o: saldo inicial e CPM inicial sÃ£o opcionais no cadastro; quando o saldo inicial existir, a conta deve ganhar uma operaÃ§Ã£o seed `INITIAL_BALANCE`.
- DecisÃ£o: exclusÃ£o inicial Ã© soft delete/inactive, sem remoÃ§Ã£o fÃ­sica da linha.
- DecisÃ£o: a UI deve seguir linhas premium e limpas, com branding de programa simples e sem excesso de mÃ©tricas ou aparÃªncia enterprise pesada.

## 2026-05-22 â€” reindex do workflow manual de produÃ§Ã£o

- DecisÃ£o: renomear o workflow de produÃ§Ã£o para `production-deploy-manual.yml` com nome amigÃ¡vel `Production Deploy Manual - VisioMilhas`.
- Motivo: o GitHub Actions continuou retornando `HTTP 422: Workflow does not have 'workflow_dispatch' trigger` para o filename anterior, apesar do YAML local e do `gh workflow view` mostrarem `workflow_dispatch`.
- Efeito esperado: forÃ§ar nova indexaÃ§Ã£o do workflow manual sem introduzir gatilhos automÃ¡ticos.
- Regras preservadas: `workflow_dispatch` manual, `environment: production`, confirmaÃ§Ã£o textual `DEPLOY`, `USE_FIFO_MOVEMENTS_ENGINE=0`, sem migrations e sem seeds.

Principais decisÃµes tÃ©cnicas para o MVP1:

- Framework: Next.js (App Router) â€” por integraÃ§Ã£o com Server Components e rotas modernas.
- Linguagem: TypeScript com `strict` ativado â€” seguranÃ§a de tipos e maior robustez.
- UI: Tailwind CSS + shadcn/ui â€” produtividade e componentes acessÃ­veis.
- ORM: Drizzle ORM + drizzle-kit â€” tipagem forte para queries e compatibilidade com PostgreSQL.
- Banco: PostgreSQL para dados relacionais do MVP1.

AutenticaÃ§Ã£o (escolha e justificativa):

- Escolha: Auth.js (antigo NextAuth) / Auth.js â€” justificativa:
  - Madura e amplamente adotada em projetos Next.js;
  - Suporta providers (Google OAuth) e email/senha via adaptadores;
  - FÃ¡cil integraÃ§Ã£o com callbacks para criar organizaÃ§Ã£o, memberships e subscriptions no onboarding;
  - Comunidade e exemplos para integraÃ§Ã£o com Stripe e adaptadores de banco.

Billing:

- Stripe como provedor de billing. Implementar estrutura inicial (customers, subscriptions, webhooks).

Multi-tenant:

- Tenant por organizaÃ§Ã£o. `organizationId` presente em todas as tabelas de negÃ³cio.
- Dados administrativos globais separados em `control_adm_saas_datavisio`.

Outras decisÃµes:

- Tratar dinheiro em centavos (integers) em todas as tabelas/entradas.
- Tratar pontos como inteiros; evitar floats para cÃ¡lculos monetÃ¡rios.
- Centralizar validaÃ§Ãµes em `lib/validations` (Zod) e cÃ¡lculos em `lib/calculations`.

- DecisÃ£o adicional: usar `lib/domain` para funÃ§Ãµes puras de cÃ¡lculo relacionadas a milhas (CPM, impactos de compra/venda/transferÃªncia) e `lib/validations` (Zod) para validar entradas antes de chegar Ã  camada de domÃ­nio. Essa separaÃ§Ã£o facilita testes unitÃ¡rios e portabilidade.
  \
  DecisÃ£o adicional sobre testes:

- Adotar `Vitest` como framework de testes unitÃ¡rios para funÃ§Ãµes puras do domÃ­nio (rÃ¡pido e integrado com Vite/esbuild).
- Manter testes de domÃ­nio separados dos testes de UI e integraÃ§Ãµes; usar `tests/domain` como localizaÃ§Ã£o preferida.

DecisÃ£o sobre runtime:

- Padronizar runtime em Node 24 LTS para o projeto, garantindo compatibilidade com ferramentas modernas e reduzindo dÃ­vida tÃ©cnica.
- Evitar suporte a Node 21 (EOL) â€” forÃ§ar ambientes locais e CI para Node >=24.

Database migration & seeds decisions:

- Usar duas configuraÃ§Ãµes separadas do Drizzle: `drizzle.adm.config.ts` e `drizzle.app.config.ts` para separar a base administrativa (ADM) da base da aplicaÃ§Ã£o (APP).
- Fluxo principal de migraÃ§Ãµes: `generate` -> `migrate` (nÃ£o usar `push` como padrÃ£o). Gerar migraÃ§Ãµes para cada DB separadamente e aplicar com `drizzle-kit migrate`.
- Seeds idempotentes em `db/seed/` e execuÃ§Ã£o controlada via `npm run db:seed` (scripts usam `tsx` para rodar TypeScript diretamente).
- Introduzida variÃ¡vel `POSTGRES_ADMIN_DATABASE_URL` e script seguro `db:create-databases` para criar as bases necessÃ¡rias (`controle_adm_saas_datavisio`, `visiomilhas_app`) antes de aplicar migrations. O admin URL deve apontar para uma base existente (eg. `postgres`) e o usuÃ¡rio deve ter permissÃ£o `CREATE DATABASE`.

DecisÃ£o sobre extrato (entries):

- Usar `mile_entries` como fonte inicial do extrato consolidado. Compras/vendas/transferÃªncias permanecem em suas tabelas e serÃ£o integradas ao extrato em etapas futuras; nÃ£o serÃ¡ feita uniÃ£o complexa nesta fase.

Versionamento operacional:

- Regra: `MVP.Funcionalidade.Commit` (ex.: `1.1.7`)
- MVP atual: `1` (MVP1)
- Etapa/Funcionalidade atual: `1.1` â€” FundaÃ§Ã£o tÃ©cnica, banco, migrations e seed inicial
- VersÃ£o operacional atual registrada: `1.1.6` â€” prÃ³xima incremental: `1.1.7`
- VersÃ£o operacional atual registrada: `1.2.1` â€” prÃ³xima incremental: `1.2.2`

## 2026-05-23 â€” direcao de produto e stack IA-First

- DecisÃ£o: VisioMilhas seguirÃ¡ como SaaS B2C de assinatura individual mensal recorrente, com foco em usuarios finais, milheiros e viajantes.
- DecisÃ£o: o produto nao sera white-label.
- DecisÃ£o: a experiencia principal sera de uma conta/pessoa, mantendo organization_id por compatibilidade tecnica e evolucao futura, sem multi-organizacao enterprise como prioridade.
- DecisÃ£o: permissÃµes simplificadas nesta fase, com usuario comum e admin interno.
- DecisÃ£o: a aplicacao administrativa global da DataVisio sera uma aplicacao separada, responsavel por billing consolidado, contratos, licencas e metricas do ecossistema.
- DecisÃ£o: observabilidade inicial sera minima, com logs basicos, healthcheck e diagnostico de erros criticos.
- DecisÃ£o: a IA dentro do produto nao e prioridade inicial; a stack IA-First e operacional/de desenvolvimento, focada em memoria persistente, specs, prompts, skills e agentes controlados.
- DecisÃ£o: a arquitetura inicial continua monolito modular, sem microservicos como meta de curto prazo.
- DecisÃ£o: o operating model oficial passa a ser `AI_OPERATING_MODEL.md`, que define quando usar Context, Specs, Skills, Agents e Prompts.
- DecisÃ£o: os fluxos de escrita nao devem aceitar `orgSlug` como boundary; `organizationId` deve ser derivado no servidor.
- DecisÃ£o: transferencias devem validar origem e destino sob a mesma ownership antes de atualizar saldos.

### 2026-05-24 â€” 2.2-D Better Auth Operational Consolidation

- DecisÃ£o: Better Auth Ã© o caminho operacional primÃ¡rio para os fluxos jÃ¡ migrados.
- DecisÃ£o: o fake auth adapter permanece transitional para desenvolvimento local, testes e recovery controlado.
- DecisÃ£o: fallback precisa ser observÃ¡vel com source, reason e timestamp para permitir reduÃ§Ã£o gradual segura.
- DecisÃ£o: nÃ£o introduzir middleware global nem RBAC novo nesta fase.

DecisÃ£o operacional recente (1.2.8):

- ReforÃ§ar separaÃ§Ã£o ADM/APP: resolver `organizations` apenas no ADM e ler dados do produto no APP.
- Erro `42P01` (relation does not exist) deve ser tratado explicitamente com `isMissingRelationError` e usado somente como fallback de desenvolvimento.

MudanÃ§as de lint:

- Remover export default anÃ´nimo em helpers (ex.: `lib/data/db-errors.ts`) para evitar warnings `import/no-anonymous-default-export`.

DecisÃ£o adicional (2026-05-18):

- NÃ£o importar Server Actions diretamente em API Routes. Em vez disso, extrair a lÃ³gica transacional e de domÃ­nio para um service compartilhado (`lib/services/movements.ts`) que possa ser chamado tanto por Server Actions quanto por handlers de rotas API. Essa separaÃ§Ã£o evita proxies/runtime issues (ex.: `TypeError: Cannot redefine property: $$id`) e mantÃ©m uma Ãºnica fonte de verdade para regras de negÃ³cio.

- A estratÃ©gia de migraÃ§Ã£o para essa decisÃ£o:
  1. Criar `lib/services/movements.ts` com contratos e implementaÃ§Ãµes transacionais.
  2. Atualizar Server Actions para delegarem ao service (sem alterar a assinatura pÃºblica das actions).
  3. Atualizar `app/api/*/route.ts` para usar o mesmo service e remover import estÃ¡tico de actions.
  4. Validar via testes unitÃ¡rios e manuais.

- 2026-05-18: PreparaÃ§Ã£o do schema 1.3.12 â€” `mile_point_lots` adicionada ao schema Drizzle e migration proposta criada (`db/app/migrations/0001_add_mile_point_lots.sql`). Migration nÃ£o foi aplicada; objetivo Ã© revisar e validar antes de aplicar em ambientes controlados.
- 2026-05-18: Refinamento da migration (1.3.13) â€” a migration proposta foi atualizada com FKs, Ã­ndices e checks propostos em `db/app/migrations/0001_add_mile_point_lots.sql`. A decisÃ£o foi incluir constraints que reforcem integridade, mantendo `ON DELETE RESTRICT` em relaÃ§Ãµes financeiras e `ON DELETE SET NULL` quando apropriado para origem de lotes. Migration estÃ¡ proposta para revisÃ£o e NÃƒO APLICADA.

- 2026-05-18: ConsolidaÃ§Ã£o do motor FIFO puro (1.3.14) â€” o motor de movimentaÃ§Ãµes (`lib/services/movements.ts`) foi consolidado como um service desacoplado da persistÃªncia, validado por testes unitÃ¡rios in-memory. A implementaÃ§Ã£o concreta do `MovementsRepo` com Drizzle e transaÃ§Ãµes fica para 1.3.15.
- 2026-05-18: ConsolidaÃ§Ã£o do motor FIFO puro (1.3.14) â€” o motor de movimentaÃ§Ãµes (`lib/services/movements.ts`) foi consolidado como um service desacoplado da persistÃªncia, validado por testes unitÃ¡rios in-memory. A implementaÃ§Ã£o concreta do `MovementsRepo` com Drizzle e transaÃ§Ãµes fica para 1.3.15.

- 2026-05-18: IntegraÃ§Ã£o atÃ´mica da compra ao motor FIFO (1.3.20)

- DecisÃ£o: integrar o fluxo de compra/aquisiÃ§Ã£o ao motor FIFO como primeiro caso de uso atÃ´mico.
- Motivo: compra cria entry + lot de forma determinÃ­stica, Ã© o fluxo mais simples para validar transaÃ§Ã£o end-to-end.
- ImplementaÃ§Ã£o: `createPurchaseAction` delega ao `acquireMilesUseCase(..., txRepo)` quando `USE_FIFO_MOVEMENTS_ENGINE` estiver ativa; o `txRepo` Ã© criado por `createDrizzleMovementsRepoFromClient(client)` que usa o `pg` client corrente, evitando abertura de nova conexÃ£o/transaction.
- SeguranÃ§a: a feature flag permanece desligada por padrÃ£o; a integraÃ§Ã£o sÃ³ roda quando explicitamente ativada em staging apÃ³s validaÃ§Ã£o da migration.
- Garantia transacional: `acquireMilesUseCase` Ã© executado dentro da mesma transaÃ§Ã£o do `createPurchaseAction` (rollback Ãºnico em caso de falha).
- PrÃ³ximo: validar em staging com a migration `db/app/migrations/0001_add_mile_point_lots.sql` aplicada e testar rollback/rollback scenarios.
- Planejamento 1.3.15: implementar `MovementsRepo` usando Drizzle, garantir operaÃ§Ãµes transacionais (atomicidade/rollback) e alinhar migrations/constraints. Esta etapa requer validaÃ§Ã£o em DB de desenvolvimento isolado e backup antes de aplicar migrations em produÃ§Ã£o.
- 1.3.16: ImplementaÃ§Ã£o concreta do `MovementsRepo` com Drizzle realizada em `lib/repositories/movements.drizzle-repo.ts`. MantÃ©m-se a prÃ¡tica de aplicar constraints/Ã­ndices via migrations SQL; migratons nÃ£o foram aplicadas automaticamente nesta etapa.

Nota operacional (2026-05-20):

- As bases `DATABASE_STAGING` e `DATABASE_TEST` foram criadas pelo usuÃ¡rio e devem ser acessadas exclusivamente por `STAGING_DATABASE_URL` e `TEST_DATABASE_URL` (armazenadas em secrets/`.env.local` ou no cofre do CI). Nunca apontar `STAGING_DATABASE_URL`/`TEST_DATABASE_URL` para produÃ§Ã£o.

DecisÃµes recentes (1.3.21):

- A compra/aquisiÃ§Ã£o foi o primeiro fluxo real integrado ao motor FIFO e protegido por testes unitÃ¡rios.
- A feature flag `USE_FIFO_MOVEMENTS_ENGINE` permanece OFF por padrÃ£o; ativaÃ§Ã£o requer validaÃ§Ã£o em staging e decisÃ£o explÃ­cita.
- O rollback foi coberto por testes unitÃ¡rios com mocks (simulaÃ§Ã£o) â€” o rollback em produÃ§Ã£o precisa ser validado em DB isolado com a migration aplicada.
- As integraÃ§Ãµes de venda/consumo/transferÃªncia devem aguardar validaÃ§Ã£o bem-sucedida em staging (aplicaÃ§Ã£o da migration, testes de integraÃ§Ã£o e QA) antes de serem integradas ao motor FIFO.

### 2026-05-20 â€” decisÃ£o complementar 1.3.25.1

- Confirmar testes de integraÃ§Ã£o do `MovementsRepo` contra `TEST_DATABASE_URL` (rollback, FIFO, transfer) antes de qualquer ativaÃ§Ã£o de flag em ambientes compartilhados. Testes foram executados e validados localmente.
- Permanecer com `USE_FIFO_MOVEMENTS_ENGINE` OFF atÃ© validaÃ§Ã£o em staging/CI com evidÃªncias sanitizadas.

### 2026-05-20 â€” decisÃ£o operacional CI (1.3.25.2)

- Criar workflow manual (`workflow_dispatch`) para executar testes de integraÃ§Ã£o contra `TEST_DATABASE_URL` no GitHub Actions; o job valida a presenÃ§a do secret `TEST_DATABASE_URL`, aplica/valida migrations de teste e roda `npm run test:integration`.
- O workflow nÃ£o deve expor secrets, nÃ£o executa seeds e mantÃ©m `USE_FIFO_MOVEMENTS_ENGINE=0` durante a execuÃ§Ã£o.

### 2026-05-20 â€” decisÃ£o operacional 1.3.26.1

- A preparaÃ§Ã£o do QA manual da compra FIFO deve ser documentada primeiro e executada com ativaÃ§Ã£o explÃ­cita da flag apenas em staging.
- O validador read-only deve aceitar parÃ¢metros seguros para localizar a compra e a conta, sem fazer writes.
- Em caso de falha no QA, o rollback operacional Ã© desligar `USE_FIFO_MOVEMENTS_ENGINE` em staging e recarregar a aplicaÃ§Ã£o, sem tocar em produÃ§Ã£o.

### 2026-05-21 â€” diagnÃ³stico de runtime da compra FIFO

- O runtime local da compra usa `APP_DATABASE_URL` e, nesta mÃ¡quina, aponta para `visiomilhas_app`.
- Se `mile_point_lots` estiver ausente no runtime local, a falha deve ser tratada como desalinhamento de ambiente/schema, nÃ£o como correÃ§Ã£o funcional de compra.
- Para concluir QA staging, preferir o app staging real jÃ¡ validado, em vez de localhost.

### 2026-05-20 â€” Uso controlado de skills locais

- Skills locais em `.claude/skills` sÃ£o consideradas ferramentas de apoio; o agente residente Ã© a autoridade final para decisÃµes operacionais.
- Skills podem ser consultadas para recomendaÃ§Ãµes, auditorias de cÃ³digo e sugestÃµes, mas NÃƒO podem autorizar aÃ§Ãµes operacionais (push, PR, merge, deploy, seed, migration) sem aprovaÃ§Ã£o humana explÃ­cita.
- Em caso de conflito entre a recomendaÃ§Ã£o de uma skill e a documentaÃ§Ã£o/decisÃµes do projeto, o agente deve registrar o conflito, documentar o risco e solicitar confirmaÃ§Ã£o do operador.

### 2026-05-21 â€” produÃ§Ã£o e deploy remoto

- GitHub Actions gera `.env.production` no servidor a partir das Environment Secrets de `production`.
- O GitHub Environment `production` e suas secrets jÃ¡ foram cadastrados manualmente pelo operador.
- O deploy final depende de auditoria prÃ©via do Docker, do modo Compose/Swarm, do Portainer e do Traefik existente.
- O deploy remoto usa o usuÃ¡rio SSH `gitdatavisiodeploy`, o diretÃ³rio `/opt/datavisio/visiomilhas` e nÃ£o utiliza root.
- A produÃ§Ã£o inicial mantÃ©m `USE_FIFO_MOVEMENTS_ENGINE=0`.

### 2026-05-21 â€” auditoria 1.3.30 e estratÃ©gia Swarm

- A auditoria read-only confirmou Docker Swarm ativo no host de produÃ§Ã£o.
- O Traefik jÃ¡ existe como serviÃ§o do stack `traefik`, com rede overlay `traefik_public`.
- EstratÃ©gia recomendada para o VisioMilhas: `docker stack deploy` em Swarm, evitando Compose standalone para o deploy final.

### 2026-05-21 â€” env example e secrets de produÃ§Ã£o

- `.env.example` deve usar apenas placeholders seguros e nÃ£o deve conter valores reais de produÃ§Ã£o.
- `.env.production` serÃ¡ gerado pelo workflow de deploy a partir das secrets do GitHub Environment `production`.
- O domÃ­nio pÃºblico real fica para documentaÃ§Ã£o e secrets, nunca como valor real em `.env.example`.

### 2026-05-21 â€” produÃ§Ã£o Swarm 1.3.31

- A produÃ§Ã£o do VisioMilhas usarÃ¡ Docker Swarm e o Traefik existente via rede `traefik_public`.
- O acesso externo nÃ£o deve expor a porta 3000 no host.
- O `certresolver` do Traefik identificado na auditoria Ã© `le`.
- O primeiro deploy pode construir a imagem no servidor antes do `docker stack deploy`, sem registry obrigatÃ³rio nesta etapa.

### 2026-05-21 â€” workflow manual de deploy 1.3.32

- O deploy de producao sera acionado manualmente via `workflow_dispatch`.
- O workflow sincroniza o repositorio para `/opt/datavisio/visiomilhas` e gera `.env.production` no host.
- A imagem e construida no servidor com tag `GITHUB_SHA` antes do `docker stack deploy`.
- O workflow nao executa migrations ou seeds.

Skills detectadas: `code-review`, `frontend-patterns`, `saas-multi-tenant`, `security-review`, `test`.

### 2026-05-24 â€” 2.2-I AI Knowledge & Skill Consolidation

- DecisÃ£o: `docs/ai-context`, `docs/specs` e `docs/ai-skills` formam a fonte de verdade estrategica da governanca IA-First.
- DecisÃ£o: `.claude/skills` e `.github/agents` pertencem a camada operacional IA e devem apenas operacionalizar o que os docs oficiais jÃ¡ definiram.
- DecisÃ£o: skills e agents nao podem redefinir arquitetura, auth, ownership, permissÃµes ou deploy.
- DecisÃ£o: qualquer drift entre docs, skills e agents deve ser registrado em `CHANGELOG_AI.md` e `DAILY_CHECKPOINT.md` antes de novas mudanÃ§as operacionais.
- DecisÃ£o: `AI_OPERATING_MODEL_VERSION=2.2-I` Ã© a baseline oficial ativa da governanÃ§a IA.
- DecisÃ£o: skills versionadas usam baseline `v1` e agents versionados usam baseline `v1`, ambos compatÃ­veis com `2.2-I`.
### 2026-06-02 - Docker Runtime Layout Collision Fix

- Decisao: o build containerizado do VisioMilhas nao deve usar `WORKDIR /app`, para evitar colisao com a arvore App Router `app/` e rotas internas `app/app/`.
- Decisao: o Dockerfile passa a usar `WORKDIR /workspace` e todos os caminhos absolutos derivados devem acompanhar esse diretorio.
- Motivo: producao apresentou HTML sem `<!DOCTYPE html>` e erros React de hidratacao apos o standalone build containerizado, enquanto local dev, build e standalone sem Docker permaneceram corretos.
- Escopo: nao alterar Subscribe, Auth, layouts fonte, providers, billing ou regras de subscription para este fix.

### 2026-06-02 - Runtime Forensics antes de investigacao frontend

- Decisao: incidentes com tela branca, hydration failure, React #418, React #423, `HierarchyRequestError`, `NotFoundError` ou `document.doctype = null` devem seguir primeiro o fluxo Runtime Forensics -> HTML Validation -> Container Validation -> Deploy Validation -> Proxy Routing Validation.
- Decisao: agentes so devem investigar componentes React depois de provar que o HTML bruto contem `<!DOCTYPE html>`, que `document.doctype` existe, que o container ativo usa a imagem esperada e que o proxy aponta para o backend correto.
- Motivo: o incidente `KB-0001` provou que sintomas de hidratacao React podem ser causados por artefato Docker/deploy, e nao por componente frontend.
- Artefatos oficiais: `docs/ai-context/knowledge-base/KB-0001-DOCKER-WORKDIR-APP-ROUTER-COLLISION.md` e `.agents/skills/runtime-deploy-forensics/SKILL.md`.

### 2026-06-02 - Auth bootstrap environment hardening

- Decisao: o deploy de producao deve falhar imediatamente se `BETTER_AUTH_SECRET` e `AUTH_SECRET` estiverem ambos vazios.
- Decisao: `BETTER_AUTH_SECRET` passa a ser o segredo primario do Better Auth em producao; `AUTH_SECRET` continua como fallback tecnico, nao como substituto silencioso de um env vazio.
- Motivo: a producao retornou `AUTH_BOOTSTRAP_FAILED` porque o processo Node recebeu `BETTER_AUTH_SECRET` vazio, apesar de outros segredos estarem presentes.
- Resultado esperado: o provider Google so inicializa com um segredo valido e nao vazio.
# 2026-06-03

## Final discovery decisions before implementation

- Better Auth must be treated as requiring provisioning before an empty production database can be considered ready.
- MongoDB is not part of the current required runtime path.
- The production deploy pipeline must be validated end-to-end through GitHub Actions -> SSH -> Docker -> Traefik -> container -> public URL.
- Healthcheck, auth runtime events, and post-deploy smoke tests are mandatory gates for readiness.
# 2026-06-04

- Adopted a Failure Recovery Layer as part of the delivery workflow.
- Agents must consult the failure registry and run the matching recovery playbook before returning `FAIL`.
- Local execution/runtime failures should be reclassified to `WARNING` when the issue is agent-side or environment-side rather than a SaaS defect.
- Playwright browser automation is available and must run in an isolated lane from Vitest/unit automation.
- Adopted an Autonomous Delivery Engine flow for HM/PROD delivery: implement, test, validate, fix, retest, document, classify, continue, and only escalate to humans for credentials, business decisions, or destructive actions.
- Standardized `DEPLOY_CONFIDENCE_SCORE` across Infrastructure, Authentication, Smoke, Functional, and Runtime categories for HM and PROD.
- Formalized the test suite organization contract: `tests/domain` for pure unit rules, `tests/integration` for persistence/service checks, `tests/runtime` for browser-like journeys, `tests-e2e` only for a future dedicated browser lane, and `test-results` for artifacts only.
## 2026-06-04 - VisioMilhas Project Operating System

- Decision: `AGENTS.md` at the repository root is the canonical operating-system document for all DataVisio work on VisioMilhas.
- Decision: the official agent set is `autonomous-delivery-engine`, `failure-recovery-engine`, `browser-validation`, `test-orchestration-engine`, and `deployment-runtime-validation`.
- Decision: browser validation uses visible Chromium for DEV/HM and headless mode for PROD.
- Decision: QA identities must come from the official synthetic test-user discovery layer and must never be human or personal accounts.
- Decision: every handover must use the standard `DE / PARA / MOTIVO / SKILLS / DOCUMENTOS CONSULTADOS / AÃ‡ÃƒO EXECUTADA / PRÃ“XIMO PASSO` structure.
## 2026-06-04 - IA-1stEngine discipline enforcement

- Decision: every operational reply must expose `AGENT`, `SKILLS`, `SOURCES CONSULTED`, and `STATUS`.
- Decision: missing mandatory response fields are treated as `PROCESS_VIOLATION` and must be corrected internally before the final answer is emitted.
- Decision: `FAIL` requires consulting the failure registry first, and `HUMAN_ACTION_REQUIRED` requires consulting the relevant recovery playbook first.
## 2026-06-04 - Agent / skill governance alignment

- Decision: `.github/agents/` is the official agent tree.
- Decision: `.agents/skills/` is the official skill tree.
- Decision: the agent tree and skill tree are separate on purpose; agent definitions must declare the skills they depend on.

## 2026-06-04 - Release promotion pipeline

- Decision: the official release model for VisioMilhas is Build Once, Promote Many.
- Decision: release promotion is the primary process; independent HM and PROD deploys are legacy fallback workflows only.
- Decision: RC tags use semantic pre-release forms and publish GitHub pre-releases after HM smoke and integration tests pass.
- Decision: production tags use semantic final releases, pause on the `production` GitHub Environment approval rule, and publish GitHub Releases marked latest only after PROD smoke passes.
- Decision: the same Docker image artifact must be promoted from HM to PROD for a given release tag.
- Decision: `release-promotion.yml` is the official release pipeline entrypoint.

## 2026-06-05 - HM release smoke stabilization

- Decision: HM browser-smoke jobs in `release-promotion.yml` must install Chromium explicitly before `npx playwright test`.
- Decision: headless Playwright runs in HM certification should not inherit the visible-mode slowMo setting.
- Decision: HM smoke navigation should use a retry-capable helper so transient page navigation stalls do not block certification of the homepage and adjacent routes.
- Decision: the HM smoke suite may use a wider navigation/request retry window in CI (45s timeout, 4 attempts) to absorb transient runner/network latency while preserving the same assertions.

## 2026-06-05 - PRECHECK_INFRASTRUCTURE hard gate

- Decision: every HM and PROD deploy entrypoint must run `PRECHECK_INFRASTRUCTURE` before starting build, sync, deploy, or smoke stages.
- Decision: the gate must validate target resolution, `ssh-keyscan`, SSH handshake, remote directory access, minimum disk space, and Docker availability.
- Decision: if the gate fails, the workflow must stop immediately and emit the failure evidence without continuing to build or deploy.

# 2026-06-04 - PROD V2 migration validation decision

- Decision: `db/app/migrations/0001_add_mile_point_lots.sql` is operationally validated in HM through read-only SQL metadata checks.
- Decision: production remains **NO-GO** because the same validation was not executed against PROD V2; `/opt/datavisio/visiomilhas/.env.production` was not present on the host.
- Decision: production can move to GO only after applying the migration to PROD V2 APP DB and confirming every required object returns `FOUND`.
- Decision: the migration blocker is not a code blocker anymore; it is an operational PROD V2 evidence blocker.

## 2026-06-05 - Stack onboarding and sign-in deprecation

- Decision: the installed fork must expose STACK.md as the first operational reference.
- Decision: / is the onboarding surface for the stack and /app/dashboard is the operational methodology surface.
- Decision: /sign-in remains deprecated and must not return to the primary entry flow.
- Decision: the dashboard should enumerate the default agents, skills, and process dependencies for the stack.


## 2026-06-06 - Base stack onboarding release

- Decision: the base repository release must advertise the stack as a governed engineering framework rather than only a product shell.
- Decision: / is the onboarding entry point, /app/dashboard is the methodology surface, and /sign-in remains deprecated.
- Decision: stack sync and status helpers are part of the default developer experience.

