import Link from "next/link";

const pillars = [
  {
    title: "Menos atrito",
    text: "O fork já entra com contexto, regras e fluxo definidos.",
  },
  {
    title: "Mais eficiência",
    text: "A IA passa a operar com disciplina e não como improviso solto.",
  },
  {
    title: "Menor custo",
    text: "Menos retrabalho, menos ambiguidade e menos manutenção desorganizada.",
  },
];

const steps = [
  "Revisar `STACK.md`",
  "Ler `docs/ai-context/CHANGELOG_AI.md`",
  "Consultar `docs/specs/PROJECT_SPEC.spec.md`",
  "Rodar `npm run stack:status`",
  "Rodar `npm run stack:sync`",
  "Validar com `npm run typecheck`, `npm run test` e `npm run build`",
  "Depois iniciar `npm run dev`",
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10 lg:px-8 lg:py-14">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-300">
            Fork instalado com sucesso
          </span>
          <span>IA-1stEngine</span>
          <span>Stack versionada</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.95fr] lg:items-start">
          <div className="space-y-6">
            <h1 className="text-5xl font-semibold tracking-tight text-white">
              Fork instalado com sucesso
            </h1>
            <p className="max-w-3xl text-xl leading-8 text-slate-200">
              Engenharia antes da IA virar custo invisível.
            </p>
            <p className="max-w-3xl text-lg leading-8 text-slate-300">
              A crise do waterfall levou o mercado a adotar frameworks ágeis. O momento
              da IA criou outro problema: muita promessa, pouco processo e custo alto
              para pouca eficiência. A IA-1stEngine existe para tratar isso como uma
              disciplina de engenharia, não como improviso.
            </p>
            <p className="max-w-3xl text-lg leading-8 text-slate-300">
              Esta base organiza agentes, skills, docs e fluxo operacional para que cada
              fork comece rápido, evolua com rastreabilidade e use IA com governança.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/app/dashboard"
                className="rounded-full border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
              >
                Abrir dashboard da stack
              </Link>
              <a
                href="https://github.com/datavisio-tech/visiomilhas/blob/main/STACK.md"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 text-sm font-medium text-emerald-200 transition hover:bg-emerald-500/20"
              >
                Ler STACK.md
              </a>
            </div>
          </div>

          <aside className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/40">
            <h2 className="text-lg font-semibold text-white">O que muda na prática</h2>
            <ul className="mt-4 space-y-4 text-sm leading-7 text-slate-300">
              <li>• Fork novo já nasce com regras e contexto.</li>
              <li>• A home explica a stack, não vende só aparência.</li>
              <li>• O dashboard mostra metodologia, agentes e skills padrão.</li>
              <li>• `/sign-in` foi descontinuado como entrada principal.</li>
            </ul>
          </aside>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <h2 className="text-xl font-semibold text-white">{pillar.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">{pillar.text}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-sky-300">Próximos passos</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Como começar depois da instalação</h2>
            <ol className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
              {steps.map((step) => (
                <li key={step} className="flex gap-3">
                  <span className="text-slate-500">•</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-amber-300">Referências</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Arquivos úteis para o fork</h2>
            <div className="mt-6 space-y-3 text-sm">
              <a href="https://github.com/datavisio-tech/visiomilhas/blob/main/STACK.md" target="_blank" rel="noreferrer" className="block rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-slate-200 transition hover:border-slate-600">
                STACK.md
              </a>
              <a href="https://github.com/datavisio-tech/visiomilhas/blob/main/README.md" target="_blank" rel="noreferrer" className="block rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-slate-200 transition hover:border-slate-600">
                README.md
              </a>
              <a href="https://github.com/datavisio-tech/visiomilhas/blob/main/docs/ai-context/CHANGELOG_AI.md" target="_blank" rel="noreferrer" className="block rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-slate-200 transition hover:border-slate-600">
                docs/ai-context/CHANGELOG_AI.md
              </a>
              <a href="https://github.com/datavisio-tech/visiomilhas/blob/main/docs/specs/PROJECT_SPEC.spec.md" target="_blank" rel="noreferrer" className="block rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-slate-200 transition hover:border-slate-600">
                docs/specs/PROJECT_SPEC.spec.md
              </a>
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
