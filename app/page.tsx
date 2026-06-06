import Link from "next/link";
import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  ArrowRight,
  BookOpen,
  GitFork,
  LayoutDashboard,
  Layers3,
  PlayCircle,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

async function readStackVersion(): Promise<string> {
  try {
    const stackPath = path.join(process.cwd(), "STACK.md");
    const contents = await readFile(stackPath, "utf8");
    const match = contents.match(/Stack version:\s*`([^`]+)`/);
    return match?.[1] ?? "unknown";
  } catch {
    return "unknown";
  }
}

const nextSteps = [
  "revisar STACK.md",
  "revisar docs/ai-context/CHANGELOG_AI.md",
  "rodar npm run stack:status",
  "rodar npm run stack:sync",
  "rodar npm run typecheck",
  "rodar npm run test",
  "rodar npm run build",
  "depois iniciar npm run dev",
];

const helpfulLinks = [
  {
    label: "STACK.md",
    href: "https://github.com/datavisio-tech/ia-firstengine-base-datavisio/blob/main/STACK.md",
    icon: BookOpen,
  },
  {
    label: "README.md",
    href: "https://github.com/datavisio-tech/ia-firstengine-base-datavisio/blob/main/README.md",
    icon: GitFork,
  },
  {
    label: "docs/ai-context/CHANGELOG_AI.md",
    href: "https://github.com/datavisio-tech/ia-firstengine-base-datavisio/blob/main/docs/ai-context/CHANGELOG_AI.md",
    icon: Layers3,
  },
  {
    label: "docs/specs/PROJECT_SPEC.spec.md",
    href: "https://github.com/datavisio-tech/ia-firstengine-base-datavisio/blob/main/docs/specs/PROJECT_SPEC.spec.md",
    icon: ShieldCheck,
  },
];

const stackModules = [
  {
    title: "Framework de engenharia",
    description:
      "A stack organiza contexto, agentes, validação e governança para o desenvolvimento com IA sair do improviso.",
  },
  {
    title: "Balanço entre custo e eficiência",
    description:
      "O objetivo é reduzir retrabalho, excesso de contexto e custo operacional sem sacrificar velocidade de entrega.",
  },
  {
    title: "Base pronta para fork",
    description:
      "Auth, billing, dashboard e operação entram como módulos, não como ponto de partida confuso.",
  },
];

const methodologyPillars = [
  {
    title: "Da crise do waterfall à disciplina ágil",
    description:
      "Quando o waterfall mostrou seus limites, frameworks ágeis surgiram para dar previsibilidade e cadência. Agora a IA cria um novo salto: desenvolvimento com contexto, validação e governança desde o primeiro commit.",
  },
  {
    title: "IA sem framework vira bolha cara",
    description:
      "Sem método, a IA acelera a produção de artefatos, mas também multiplica retrabalho, inconsistência e custo. O IA-1stEngine existe para corrigir essa equação.",
  },
  {
    title: "Engenharia antes da ferramenta",
    description:
      "A proposta é vender um novo modelo de engenharia, não só um template. Primeiro o método, depois o código, depois a expansão do produto.",
  },
];

export default async function HomePage() {
  const stackVersion = await readStackVersion();

  return (
    <main className="container page-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">IA-1stEngine SaaS Base</p>
          <strong>DataVisio stack marketing e onboarding</strong>
        </div>
        <div className="topbar-actions">
          <Link className="topbar-link" href="/app/dashboard">
            <LayoutDashboard size={16} />
            Dashboard
          </Link>
          <Link className="button secondary" href="/sign-in">
            Entrar
          </Link>
        </div>
      </header>

      <section className="hero marketing-hero">
        <div className="hero-copy">
          <div className="status-pill">
            <Sparkles size={14} />
            Framework pronto para a era da IA
          </div>
          <h1>Uma base de engenharia para vencer a bolha de IA com método</h1>
          <p className="hero-text">
            O waterfall expôs o custo de construir software sem cadência.
            Depois, o movimento ágil mostrou que processo é vantagem competitiva.
            Agora a IA trouxe um novo problema: velocidade sem disciplina gera
            muito código, pouco valor e uma conta alta. O IA-1stEngine nasce para
            resolver essa equação.
          </p>

          <div className="hero-metrics">
            <article className="metric-card">
              <span>Stack version</span>
              <strong>{stackVersion}</strong>
            </article>
            <article className="metric-card">
              <span>Foco</span>
              <strong>Eficiência com governança</strong>
            </article>
            <article className="metric-card">
              <span>Modelo</span>
              <strong>Engenharia antes da ferramenta</strong>
            </article>
          </div>

          <div className="hero-actions">
            <Link className="button" href="/app/dashboard">
              <LayoutDashboard size={16} />
              Ver a stack em operação
              <ArrowRight size={16} />
            </Link>
            <Link className="button secondary" href="/subscribe">
              Entender o fluxo de acesso
            </Link>
          </div>
        </div>

        <aside className="hero-panel card">
          <h2>Por que isso importa</h2>
          <ol className="stack-list">
            {nextSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="muted" style={{ marginTop: 16 }}>
            A primeira experiência do fork mostra o que a stack resolve, como
            operar o projeto e qual é a próxima ação segura.
          </p>
        </aside>
      </section>

      <section className="content-grid">
        {methodologyPillars.map((pillar) => (
          <article className="card" key={pillar.title}>
            <h2>{pillar.title}</h2>
            <p className="muted">{pillar.description}</p>
          </article>
        ))}
      </section>

      <section className="content-grid">
        <article className="card">
          <h2>O que a stack entrega</h2>
          <div className="module-list">
            {stackModules.map((module) => (
              <div className="module-item" key={module.title}>
                <strong>{module.title}</strong>
                <p className="muted">{module.description}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="card">
          <h2>Links úteis</h2>
          <ul className="stack-links">
            {helpfulLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <Link href={link.href} target="_blank" rel="noreferrer">
                    <Icon size={16} />
                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </article>

        <article className="card">
          <h2>Harness Engineering</h2>
          <p className="muted">
            O harness é a camada de controle que conecta contexto, validação,
            observabilidade e release gates. Ele mantém a stack previsível
            antes e depois do deploy.
          </p>
          <Link className="text-link" href="/app/dashboard">
            <PlayCircle size={16} />
            Continuar pela dashboard
          </Link>
        </article>
      </section>
    </main>
  );
}
