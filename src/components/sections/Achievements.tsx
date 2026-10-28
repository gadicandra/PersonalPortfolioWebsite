import { Reveal } from "@/components/ui/Reveal";
import { achievements } from "@/content/achievements";

/** Sonar's news cards: dark tile, blurred accent glow behind centered type. */
export function Achievements() {
  const [certs, honors] = achievements;

  return (
    <section id="awards" tabIndex={-1} aria-label="Awards and certifications" className="flex flex-col gap-gap px-3 md:px-7">
      <div className="grid gap-gap md:grid-cols-2">
        {honors.items.map((a, i) => (
          <Reveal
            key={a.title}
            delay={(i % 2) * 0.06}
            className={i === honors.items.length - 1 && i % 2 === 0 ? "md:col-span-2" : ""}
          >
            <article className="on-dark relative flex h-full min-h-72 flex-col items-center justify-center overflow-hidden rounded-card bg-dark p-8 text-center text-on-dark">
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 size-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-3xl"
              />
              <p className="label relative text-on-dark-muted">
                {a.issuer} · {a.year}
              </p>
              <h3 className="display relative mt-3 max-w-xl text-balance text-4xl">{a.title}</h3>
              {a.note && <p className="relative mt-3 max-w-sm text-sm text-on-dark-muted">{a.note}</p>}
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="card p-5 md:p-8">
        <h2 className="display text-h2">{certs.title}</h2>
        <ul className="mt-6 grid gap-x-8 md:grid-cols-2">
          {certs.items.map((c) => (
            <li key={c.title} className="flex flex-col gap-1 border-t border-dashed border-hair py-3 lg:flex-row lg:items-baseline lg:gap-3">
              <span className="font-medium">{c.title}</span>
              <span className="leader hidden lg:block" aria-hidden />
              <span className="label text-ink-muted lg:shrink-0">
                {c.issuer} · {c.year}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
