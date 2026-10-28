import { Reveal } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { models } from "@/content/models";

/** AI/ML index tile (03) + dark spec cards per published model. */
export function Models() {
  return (
    <section id="models" tabIndex={-1} aria-labelledby="models-title" className="grid gap-gap px-3 md:grid-cols-4 md:px-7">
      <Reveal className="card flex min-h-64 flex-col justify-between p-4 md:col-span-1">
        <p className="display text-2xl">
          AI / ML<sup className="ml-1 font-mono text-xs">({models.length})</sup>
        </p>
        <p className="display self-end text-[clamp(5rem,11vw,10rem)] leading-[0.75]" aria-hidden>
          03
        </p>
      </Reveal>

      <Reveal delay={0.06} className="card flex flex-col justify-center p-6 md:col-span-3 md:p-10">
        <p className="label text-ink-muted">Published models</p>
        <SplitHeading id="models-title" className="display mt-3 text-h1">
          <em>the</em>Models<em>on</em> Hugging Face
        </SplitHeading>
        <a href="https://huggingface.co/Adicandra" target="_blank" rel="noopener noreferrer" className="link-dash label mt-4 self-start">
          @Adicandra <span aria-hidden>↗</span>
        </a>
      </Reveal>

      {models.map((m, i) => (
        <Reveal key={m.id} delay={i * 0.06} className={i === 0 ? "md:col-span-2" : ""}>
          <a
            href={m.href}
            target="_blank"
            rel="noopener noreferrer"
            className="on-dark group relative flex h-full min-h-80 flex-col justify-between overflow-hidden rounded-card bg-dark p-5 text-on-dark"
          >
            <div className="relative flex items-start justify-between gap-4">
              <p className="label text-on-dark-muted">{m.task}</p>
              <span aria-hidden className="grid size-9 place-items-center rounded-full bg-accent text-ink">↗</span>
            </div>
            <div className="relative">
              <h3 className="break-all font-mono text-xl font-medium leading-snug md:text-2xl">{m.name}</h3>
              <p className="mt-3 max-w-md text-on-dark-muted">{m.summary}</p>
              <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 border-t border-dashed border-on-dark/25 pt-4 text-sm">
                <dt className="text-on-dark-muted">Base</dt>
                <dd className="break-all font-mono">{m.base}</dd>
                <dt className="text-on-dark-muted">Technique</dt>
                <dd>{m.technique.join(" · ")}</dd>
                <dt className="text-on-dark-muted">Language</dt>
                <dd>{m.language}</dd>
              </dl>
            </div>
            <span className="sr-only"> (opens Hugging Face in new tab)</span>
          </a>
        </Reveal>
      ))}
    </section>
  );
}
