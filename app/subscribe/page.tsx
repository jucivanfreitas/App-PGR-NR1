import Link from "next/link";
import { ArrowRight, BadgeCheck, ShieldCheck } from "lucide-react";

const accessStates = [
  "NO_SUBSCRIPTION",
  "TRIAL",
  "ACTIVE",
  "CANCELED",
  "EXPIRED",
  "SUSPENDED",
];

export default function SubscribePage() {
  return (
    <main className="container page-shell">
      <section className="hero compact">
        <div className="hero-copy">
          <div className="status-pill">
            <BadgeCheck size={14} />
            Gate de acesso comercial
          </div>
          <h1>Assinatura é uma etapa controlada, não um bloqueio</h1>
          <p className="hero-text">
            Use esta rota quando o usuário precisar sair do onboarding e entrar
            em um estado comercial ou de trial. A decisão de acesso continua no
            servidor.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/app/dashboard">
              <ArrowRight size={16} />
              Abrir dashboard
            </Link>
            <Link className="button secondary" href="/">
              Voltar para a home
            </Link>
          </div>
        </div>

        <aside className="hero-panel card">
          <h2>Estados de acesso</h2>
          <ul className="stack-list">
            {accessStates.map((state) => (
              <li key={state}>{state}</li>
            ))}
          </ul>
          <p className="muted">
            A interface deve mostrar o estado com clareza e seguir o fluxo.
          </p>
        </aside>
      </section>

      <section className="content-grid">
        <article className="card">
          <h2>Regra de runtime</h2>
          <p className="muted">
            <ShieldCheck size={16} className="inline-icon" />
            O acesso comercial é aplicado no servidor e não deve ficar escondido
            atrás de uma landing genérica.
          </p>
        </article>
      </section>
    </main>
  );
}
