import { Reveal } from "@/components/ui/Reveal";
import { stack } from "@/content/stack";

/** Poulo's "Stack": grouped tools as quiet chips. */
export function Stack() {
  return (
    <section id="stack" tabIndex={-1} aria-labelledby="stack-title" className="frame mx-auto max-w-6xl px-4 py-24 md:px-8">
      <Reveal>
        <h2 id="stack-title" className="text-h2 font-medium">
          Stack.
        </h2>
        <p className="mt-2 text-ink-muted">What I reach for, grouped by where it gets used.</p>
      </Reveal>

      <div className="mt-12 grid gap-gap md:grid-cols-2">
        {stack.map((g, i) => (
          <Reveal key={g.title} delay={(i % 2) * 0.08} className="panel p-6 md:p-8">
            <h3 className="text-lg font-medium">{g.title}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((t) => (
                <li key={t} className="rounded-full bg-bg px-3.5 py-1.5 text-sm shadow-[inset_0_0_0_1px_var(--hair)]">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
