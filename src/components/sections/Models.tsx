import { Reveal } from "@/components/ui/Reveal";
import { models } from "@/content/models";

/** Poulo's "Experiments" row: dark media tile, title, one line, pill CTA. */
export function Models() {
  return (
    <section id="models" tabIndex={-1} aria-labelledby="models-title" className="frame mx-auto max-w-6xl px-4 py-24 md:px-8">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="models-title" className="text-h2 font-medium">
            Models.
          </h2>
          <p className="mt-2 text-ink-muted">Fine-tuned and published on Hugging Face.</p>
        </div>
        <a href="https://huggingface.co/Adicandra" target="_blank" rel="noopener noreferrer" className="pill pill-ghost text-sm">
          @Adicandra <span aria-hidden>↗</span>
          <span className="sr-only">(opens in new tab)</span>
        </a>
      </Reveal>

      <ul className="mt-12 grid gap-10 md:grid-cols-3">
        {models.map((m, i) => (
          <Reveal as="li" key={m.id} delay={i * 0.08} className="flex flex-col">
            <div className="relative grid aspect-[16/9] place-items-center overflow-hidden rounded-[1.5rem] bg-invert text-on-invert">
              <span aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,color-mix(in_oklab,var(--invert-ink)_14%,transparent),transparent)]" />
              <span className="relative rounded-full border border-current/20 px-3 py-1 font-mono text-xs">{m.task}</span>
            </div>
            <h3 className="mt-5 break-all font-mono text-base font-medium">{m.name}</h3>
            <p className="mt-2 text-ink-muted">{m.summary}</p>
            <p className="mt-3 text-sm text-ink-muted">
              {m.technique.join(" · ")} · {m.language}
            </p>
            <a href={m.href} target="_blank" rel="noopener noreferrer" className="pill pill-ghost mt-5 self-end text-sm">
              View model <span aria-hidden>↗</span>
              <span className="sr-only">{m.name} on Hugging Face (opens in new tab)</span>
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
