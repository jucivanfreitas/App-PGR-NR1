import Link from "next/link";
import { readFile } from "node:fs/promises";
import path from "node:path";

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

const sourceBaseUrl =
  "https://github.com/datavisio-tech/ia-firstengine-base-datavisio/blob/main";

const helpfulLinks = [
  { label: "STACK.md", href: `${sourceBaseUrl}/STACK.md` },
  { label: "README.md", href: `${sourceBaseUrl}/README.md` },
  {
    label: "docs/ai-context/CHANGELOG_AI.md",
    href: `${sourceBaseUrl}/docs/ai-context/CHANGELOG_AI.md`,
  },
  {
    label: "docs/specs/PROJECT_SPEC.spec.md",
    href: `${sourceBaseUrl}/docs/specs/PROJECT_SPEC.spec.md`,
  },
];

export default async function HomePage() {
  const stackVersion = await readStackVersion();

  return (
    <main className="container">
      <nav className="nav">
        <strong>IA-1stEngine SaaS Base</strong>
        <div className="nav">
          <Link href="/app/dashboard">Dashboard</Link>
          <Link className="button" href="/sign-in">Sign in</Link>
        </div>
      </nav>

      <section style={{ padding: "72px 0 36px" }}>
        <p className="muted">Fork instalado com sucesso</p>
        <h1>Seu fork está pronto para uso local</h1>
        <p className="muted">
          Stack atual: {stackVersion}. Esta tela é o ponto inicial do fork e
          mostra a sequência recomendada depois da instalação.
        </p>
        <div className="nav" style={{ justifyContent: "flex-start", flexWrap: "wrap", marginTop: 24 }}>
          <Link className="button" href="/app/dashboard">Abrir dashboard</Link>
          <Link href="/subscribe">Ver acesso e assinatura</Link>
        </div>
      </section>

      <section className="grid">
        <article className="card">
          <h2>Próximos passos</h2>
          <ol className="stack-list">
            {nextSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </article>

        <article className="card">
          <h2>Links úteis</h2>
          <ul className="stack-links">
            {helpfulLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </article>

        <article className="card">
          <h2>Harness Engineering</h2>
          <p className="muted">
            A stack usa Harness Engineering como a camada de controle entre o
            modelo, os agentes e o runtime: contexto, validação, observabilidade
            e gates de release mantêm o fork seguro para evoluir e implantar.
          </p>
        </article>
      </section>
    </main>
  );
}
