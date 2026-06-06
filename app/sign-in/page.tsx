import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-6 py-16 text-slate-100">
      <section className="w-full rounded-2xl border border-slate-800 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/40">
        <p className="text-xs uppercase tracking-[0.3em] text-amber-300">Entrada descontinuada</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
          Página descontinuada
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
          A base IA-1stEngine não exige esta página como fluxo principal.
          O acesso inicial agora acontece pela home e pelo dashboard da stack,
          com a metodologia, os agentes e o fluxo de desenvolvimento já visíveis.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
          >
            Voltar para a home
          </Link>
          <Link
            href="/app/dashboard"
            className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-500/20"
          >
            Abrir dashboard
          </Link>
        </div>
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900/70 p-4 text-sm leading-7 text-slate-300">
          Se o fork precisar de autenticação depois, ela deve ser reinserida como
          módulo governado e documentado, sem voltar a ocupar a primeira tela.
        </div>
      </section>
    </main>
  );
}
