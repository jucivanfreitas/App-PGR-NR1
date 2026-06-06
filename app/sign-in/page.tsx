import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

const authSteps = [
  "conectar o provedor Better Auth configurado",
  "mapear a URL de callback de login para o fork",
  "validar a fronteira de sessão antes de liberar produção",
];

export default function SignInPage() {
  return (
    <main className="container page-shell">
      <section className="hero compact">
        <div className="hero-copy">
          <div className="status-pill">
            <Sparkles size={14} />
            Entrada de autenticação
          </div>
          <h1>Entrar é um módulo do stack, não o começo da conversa</h1>
          <p className="hero-text">
            Esta página existe para ligar a autenticação ao fork já instalado.
            Depois disso, a dashboard vira a continuidade protegida do fluxo.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/app/dashboard">
              <ArrowRight size={16} />
              Continuar para a dashboard
            </Link>
            <Link className="button secondary" href="/">
              Voltar para a home
            </Link>
          </div>
        </div>

        <aside className="hero-panel card">
          <h2>Checklist de auth</h2>
          <ul className="stack-list">
            {authSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
          <p className="muted">
            O stack mantém o wiring de identidade separado do restante do fork.
          </p>
        </aside>
      </section>

      <section className="content-grid">
        <article className="card">
          <h2>Fronteira de segurança</h2>
          <p className="muted">
            <ShieldCheck size={16} className="inline-icon" />
            A sessão permanece controlada no servidor. A interface não deve ser
            a fonte da verdade para estado de autenticação.
          </p>
        </article>
      </section>
    </main>
  );
}
