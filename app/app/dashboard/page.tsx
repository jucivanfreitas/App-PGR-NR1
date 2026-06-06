import { getAccessState } from "../../../lib/access";
import {
  ArrowRight,
  Database,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    label: "Runtime",
    value: "Saudável",
    detail: "A stack local está acessível e pronta para iteração.",
  },
  {
    label: "Acesso",
    value: "TRIAL",
    detail: "As regras de sessão e assinatura continuam no servidor.",
  },
  {
    label: "Próximo módulo",
    value: "Auth + billing",
    detail: "Personalize o próximo domínio depois que a base estiver estável.",
  },
];

export default function DashboardPage() {
  const access = getAccessState();

  return (
    <main className="container page-shell">
      <section className="hero compact dashboard-hero">
        <div className="hero-copy">
          <div className="status-pill">
            <LayoutDashboard size={14} />
            Dashboard operacional
          </div>
          <h1>Dashboard da stack</h1>
          <p className="hero-text">
            Este é o ponto de continuidade depois do onboarding. A tela é
            objetiva por design: estado de acesso, escopo do servidor e próximo
            passo aparecem com clareza.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/">
              <ArrowRight size={16} />
              Voltar para a home
            </Link>
            <Link className="button secondary" href="/sign-in">
              Fluxo de entrada
            </Link>
          </div>
        </div>

        <aside className="hero-panel card">
          <h2>Status atual</h2>
          <div className="module-list">
            <div className="module-item">
              <strong>Estado de acesso</strong>
              <p className="muted">{access}</p>
            </div>
            <div className="module-item">
              <strong>Escopo do owner</strong>
              <p className="muted">Resolvido no servidor</p>
            </div>
          </div>
        </aside>
      </section>

      <section className="content-grid stats-grid">
        {stats.map((stat) => (
          <article className="card stat-card" key={stat.label}>
            <p className="eyebrow">{stat.label}</p>
            <h2>{stat.value}</h2>
            <p className="muted">{stat.detail}</p>
          </article>
        ))}
      </section>

      <section className="content-grid">
        <article className="card">
          <h2>O que vem depois</h2>
          <p className="muted">
            <Sparkles size={16} className="inline-icon" />
            Personalize as especificações do projeto e depois conecte auth e
            billing às regras reais do produto.
          </p>
        </article>
        <article className="card">
          <h2>Fronteira de dados</h2>
          <p className="muted">
            <Database size={16} className="inline-icon" />
            Mantenha os dados de domínio separados da memória da stack e
            construa em cima dos contratos base.
          </p>
        </article>
        <article className="card">
          <h2>Fronteira de segurança</h2>
          <p className="muted">
            <ShieldCheck size={16} className="inline-icon" />
            Acesso, ownership e estado comercial devem continuar sendo decisões
            do servidor.
          </p>
        </article>
      </section>
    </main>
  );
}
