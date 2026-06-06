import Link from "next/link";

type AgentItem = {
  file: string;
  name: string;
  phase: string;
  role: string;
  dependsOn: string;
};

const agents: AgentItem[] = [
  {
    file: "000-bootstrap.agent.md",
    name: "Bootstrap",
    phase: "Governança inicial",
    role: "Liga a base, valida o contexto e prepara a execução do resto da stack.",
    dependsOn: "Nenhum",
  },
  {
    file: "001-ia1st-orchestrator.agent.md",
    name: "Orquestrador IA-1stEngine",
    phase: "Governança inicial",
    role: "Escolhe o agente certo, aplica as skills certas e mantém o ciclo de entrega.",
    dependsOn: "000-bootstrap",
  },
  {
    file: "002-environment-discovery.agent.md",
    name: "Environment Discovery",
    phase: "Discovery",
    role: "Identifica variáveis, runtime e condições reais do ambiente.",
    dependsOn: "000-bootstrap, 001-orchestrator",
  },
  {
    file: "003-project-discovery.agent.md",
    name: "Project Discovery",
    phase: "Discovery",
    role: "Entende o projeto, a estrutura e o que já existe no fork.",
    dependsOn: "Environment Discovery",
  },
  {
    file: "004-business-discovery.agent.md",
    name: "Business Discovery",
    phase: "Discovery",
    role: "Mapeia regras de negócio, metas e restrições do domínio.",
    dependsOn: "Project Discovery",
  },
  {
    file: "005-ui-discovery.agent.md",
    name: "UI Discovery",
    phase: "Discovery",
    role: "Lê a interface atual e os fluxos visuais existentes.",
    dependsOn: "Project Discovery",
  },
  {
    file: "006-architecture-discovery.agent.md",
    name: "Architecture Discovery",
    phase: "Discovery",
    role: "Identifica arquitetura, fronteiras e acoplamentos.",
    dependsOn: "Project Discovery",
  },
  {
    file: "007-data-model-discovery.agent.md",
    name: "Data Model Discovery",
    phase: "Discovery",
    role: "Levanta modelo de dados, tabelas e contratos persistidos.",
    dependsOn: "Architecture Discovery",
  },
  {
    file: "008-integration-discovery.agent.md",
    name: "Integration Discovery",
    phase: "Discovery",
    role: "Mapeia integrações externas e contratos ativos.",
    dependsOn: "Business Discovery",
  },
  {
    file: "009-legacy-knowledge-discovery.agent.md",
    name: "Legacy Knowledge Discovery",
    phase: "Discovery",
    role: "Preserva conhecimento histórico e evita regressão operacional.",
    dependsOn: "Project Discovery",
  },
  {
    file: "010-security-discovery.agent.md",
    name: "Security Discovery",
    phase: "Discovery",
    role: "Avalia fronteiras de acesso, riscos e autorização.",
    dependsOn: "Architecture Discovery",
  },
  {
    file: "011-infrastructure-discovery.agent.md",
    name: "Infrastructure Discovery",
    phase: "Discovery",
    role: "Entende VM, DNS, SSL, Actions, containers e runtime alvo.",
    dependsOn: "Environment Discovery",
  },
  {
    file: "012-quality-discovery.agent.md",
    name: "Quality Discovery",
    phase: "Discovery",
    role: "Avalia qualidade, cobertura, dívida técnica e saúde do stack.",
    dependsOn: "Project Discovery",
  },
  {
    file: "013-modernization-planning.agent.md",
    name: "Modernization Planning",
    phase: "Planning",
    role: "Converte discovery em plano de modernização e sequência segura.",
    dependsOn: "Discovery completo",
  },
  {
    file: "014-target-architecture.agent.md",
    name: "Target Architecture",
    phase: "Planning",
    role: "Define a arquitetura alvo e o estado esperado do fork.",
    dependsOn: "Modernization Planning",
  },
  {
    file: "015-implementation-orchestrator.agent.md",
    name: "Implementation Orchestrator",
    phase: "Planning / Execution",
    role: "Divide execução em passos menores e mantém foco em entrega e rollback.",
    dependsOn: "Target Architecture",
  },
  {
    file: "016-backend-modernization.agent.md",
    name: "Backend Modernization",
    phase: "Implementation",
    role: "Refatora backend preservando regra de negócio, contrato e dados.",
    dependsOn: "Implementation Orchestrator",
  },
  {
    file: "017-frontend-modernization.agent.md",
    name: "Frontend Modernization",
    phase: "Implementation",
    role: "Moderniza a interface e a experiência de entrada da stack.",
    dependsOn: "Implementation Orchestrator",
  },
  {
    file: "019-integration-modernization.agent.md",
    name: "Integration Modernization",
    phase: "Implementation",
    role: "Atualiza integrações e contratos externos com preservação de rollback.",
    dependsOn: "Backend Modernization, Security Discovery",
  },
  {
    file: "020-test-architecture.agent.md",
    name: "Test Architecture",
    phase: "Validation",
    role: "Organiza as camadas de teste e a estratégia de validação.",
    dependsOn: "Implementation Orchestrator",
  },
  {
    file: "021-automated-testing.agent.md",
    name: "Automated Testing",
    phase: "Validation",
    role: "Executa testes automáticos de unit, integration e browser.",
    dependsOn: "Test Architecture",
  },
  {
    file: "022-code-review.agent.md",
    name: "Code Review",
    phase: "Validation",
    role: "Revisa mudanças com foco em regressão, clareza e manutenção.",
    dependsOn: "Automated Testing",
  },
  {
    file: "023-security-review.agent.md",
    name: "Security Review",
    phase: "Validation",
    role: "Revisa segredos, acesso, exposição e superfície de ataque.",
    dependsOn: "Code Review",
  },
  {
    file: "024-deployment.agent.md",
    name: "Deployment",
    phase: "Operations",
    role: "Controla deploy, promoção e cutover com runtime validado.",
    dependsOn: "Security Review",
  },
  {
    file: "025-observability.agent.md",
    name: "Observability",
    phase: "Operations",
    role: "Garante logs, métricas e sinais para operação e diagnóstico.",
    dependsOn: "Deployment",
  },
  {
    file: "026-performance-optimization.agent.md",
    name: "Performance Optimization",
    phase: "Operations",
    role: "Ajusta performance quando há evidência de gargalo real.",
    dependsOn: "Observability",
  },
  {
    file: "028-governance.agent.md",
    name: "Governance",
    phase: "Governança",
    role: "Registra decisão, STATUS, limites e próximo passo.",
    dependsOn: "Todos os blocos anteriores",
  },
  {
    file: "infrastructure.agent.md",
    name: "Infrastructure",
    phase: "Infraestrutura",
    role: "Relaciona stack, runtime, deploy e convenções de operação.",
    dependsOn: "Governance e Infrastructure Discovery",
  },
  {
    file: "saas-base.agent.md",
    name: "SaaS Base",
    phase: "Produto base",
    role: "Define o comportamento padrão do template e a experiência inicial.",
    dependsOn: "Governance",
  },
];

const skills = [
  {
    name: "ia-first-engine-discipline",
    purpose: "Resposta com STATUS, AGENT, SKILLS, fontes e fluxo operacional consistente.",
  },
  {
    name: "autonomous-delivery-engine",
    purpose: "Executar, testar, validar, corrigir, retestar e documentar sem travar cedo.",
  },
  {
    name: "failure-recovery-engine",
    purpose: "Consultar registro de falhas, aplicar playbook e retomar a execução.",
  },
  {
    name: "test-orchestration-engine",
    purpose: "Separar lanes de unit, integration, runtime e browser validation.",
  },
  {
    name: "browser-validation",
    purpose: "Abrir e validar o fluxo real no navegador.",
  },
  {
    name: "deployment-runtime-validation",
    purpose: "Validar o stack rodando, não só o build.",
  },
  {
    name: "auth-security",
    purpose: "Manter disciplina em autenticação, autorização e fronteiras de acesso.",
  },
];

const processFlow = [
  {
    title: "Discovery",
    detail: "Descobrir ambiente, projeto, negócio, UI, arquitetura, dados, integração, legado, segurança e qualidade.",
    agent: "002-012",
  },
  {
    title: "Planning",
    detail: "Converter a descoberta em target architecture e plano de implementação.",
    agent: "013-015",
  },
  {
    title: "Implementation",
    detail: "Executar mudanças pequenas e reversíveis em backend, frontend e integrações.",
    agent: "016-019",
  },
  {
    title: "Validation",
    detail: "Provar a mudança com testes, review e browser validation.",
    agent: "020-023",
  },
  {
    title: "Operations",
    detail: "Promover, observar e otimizar o que foi entregue.",
    agent: "024-026",
  },
  {
    title: "Governance",
    detail: "Fechar o ciclo com decisão clara e handover rastreável.",
    agent: "028-governance",
  },
];

export default function DashboardPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-10 px-6 py-10 text-slate-100">
      <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/40">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-300">
            Stack ativa
          </span>
          <span>IA-1stEngine</span>
          <span>Metodologia operacional</span>
        </div>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-5">
            <h1 className="text-4xl font-semibold tracking-tight text-white">
              Dashboard da stack, metodologia e fluxo de desenvolvimento
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-300">
              Esta tela mostra a stack como sistema de engenharia: o que ela resolve,
              quais agentes vêm por padrão, quais skills sustentam a operação e como a
              entrega deve acontecer em cada fork.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
              >
                Voltar para a home
              </Link>
              <Link
                href="/sign-in"
                className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-200 transition hover:bg-amber-500/20"
              >
                Página descontinuada
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <h2 className="text-lg font-semibold text-white">Leitura rápida</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              <li>1. Descobrir contexto antes de alterar código.</li>
              <li>2. Planejar antes de implementar.</li>
              <li>3. Validar com build, runtime e navegador.</li>
              <li>4. Registrar decisões e continuar com rastreabilidade.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
          <h2 className="text-lg font-semibold text-white">Propósito</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Reduzir custo de desenvolvimento, acelerar onboarding, usar IA com
            governança e manter cada fork previsível ao longo da vida útil.
          </p>
        </article>
        <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
          <h2 className="text-lg font-semibold text-white">Metodologia</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Discovery, planning, implementation, validation, operations e governance.
            O fluxo protege contrato, auditoria, rollback e operação.
          </p>
        </article>
        <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
          <h2 className="text-lg font-semibold text-white">Resultado esperado</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Um modelo de engenharia reutilizável, mais barato de manter e mais confiável
            para evoluir com múltiplos projetos.
          </p>
        </article>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
        <h2 className="text-2xl font-semibold text-white">Fluxo de desenvolvimento</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {processFlow.map((item) => (
            <article key={item.title} className="rounded-xl border border-slate-800 bg-slate-900/80 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">{item.title}</p>
              <h3 className="mt-3 text-base font-semibold text-white">{item.detail}</h3>
              <p className="mt-3 text-sm text-slate-400">Faixa principal: {item.agent}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
        <h2 className="text-2xl font-semibold text-white">Agentes padrão da stack</h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-300">
          A ordem abaixo reflete a dependência de processo e atuação. Cada agente
          recebe o resultado do bloco anterior e produz evidência para o próximo.
        </p>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {agents.map((agent) => (
            <article key={agent.file} className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5">
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-sky-300">
                <span>{agent.file}</span>
                <span className="text-slate-500">•</span>
                <span>{agent.phase}</span>
              </div>
              <h3 className="mt-3 text-xl font-semibold text-white">{agent.name}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{agent.role}</p>
              <p className="mt-4 text-sm text-slate-400">
                Depende de: <span className="text-slate-200">{agent.dependsOn}</span>
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
        <h2 className="text-2xl font-semibold text-white">Skills padrão</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skills.map((skill) => (
            <article key={skill.name} className="rounded-xl border border-slate-800 bg-slate-900/75 p-4">
              <h3 className="text-base font-semibold text-white">{skill.name}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{skill.purpose}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
          <h2 className="text-2xl font-semibold text-white">Dependências de processo e atuação</h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
            <p>
              1. <strong className="text-white">Bootstrap</strong> libera a base e valida o
              contexto mínimo.
            </p>
            <p>
              2. <strong className="text-white">Orquestrador</strong> escolhe o agente certo,
              aplica as skills corretas e mantém o fluxo.
            </p>
            <p>
              3. <strong className="text-white">Discovery</strong> alimenta o planejamento com
              fatos do código, docs, UI e runtime.
            </p>
            <p>
              4. <strong className="text-white">Implementation</strong> entrega em lotes
              pequenos e preserva rollback.
            </p>
            <p>
              5. <strong className="text-white">Validation</strong> confirma que a mudança
              funciona em execução real.
            </p>
            <p>
              6. <strong className="text-white">Governance</strong> registra a decisão e entrega
              o próximo passo sem ambiguidade.
            </p>
          </div>
        </article>
        <article className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
          <h2 className="text-2xl font-semibold text-white">Próximos módulos</h2>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
            <li>• Auth e autorização como módulo governado, não como primeiro foco.</li>
            <li>• Billing e operações comerciais quando o fork exigir monetização.</li>
            <li>• Dashboard de produto e observabilidade para evolução contínua.</li>
            <li>• Integrações externas com contratos explícitos e rollback definido.</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
