import { MediaCard } from "@/components/ui/MediaCard";
import { Reveal } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { models } from "@/content/models";
import { projects } from "@/content/projects";

const CATEGORIES = [
  { label: "AI / ML", href: "#models" },
  { label: "Web", href: "#work" },
  { label: "AIoT", href: "#work" },
  { label: "Leadership", href: "#experience" },
  { label: "Awards", href: "#awards" },
];

/** Sonar's opening: category strip → featured bento → intro card. */
export function Featured() {
  const [lead, second, third] = projects.filter((p) => p.image);
  const latest = models[0];

  return (
    <section aria-labelledby="featured-title" className="flex flex-col gap-gap px-3 pt-gap md:px-7">
      <h2 id="featured-title" className="sr-only">Featured work</h2>
      <nav aria-label="Categories" className="no-scrollbar -mx-3 flex snap-x gap-gap overflow-x-auto px-3 md:mx-0 md:grid md:grid-cols-5 md:px-0">
        {CATEGORIES.map((c) => (
          <a
            key={c.label}
            href={c.href}
            className="card display flex min-h-14 min-w-36 shrink-0 snap-start items-center justify-center text-2xl transition-colors hover:bg-ink hover:text-bg"
          >
            {c.label}
          </a>
        ))}
      </nav>

      <div className="grid gap-gap md:h-[78vh] md:grid-cols-[2fr_1fr_1fr]">
        {[lead, second, third].map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08} className="h-[62vw] min-h-64 md:h-full">
            <MediaCard
              href={`/work/${p.id}`}
              title={p.title}
              meta={p.category}
              image={p.image}
              sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 100vw"}
              className="h-full"
            />
          </Reveal>
        ))}
      </div>

      <div className="grid gap-gap md:grid-cols-[1fr_2fr]">
        <Reveal className="card flex flex-col items-center justify-center gap-3 p-6 text-center">
          <p className="label text-ink-muted">Latest model</p>
          <p className="display text-6xl">Out<br />now</p>
          <p className="max-w-64 text-ink-muted">
            <span className="block break-all font-mono text-sm font-medium text-ink">{latest.name}</span>
            <span className="mt-2 block">{latest.summary}</span>
          </p>
          <a href={latest.href} target="_blank" rel="noopener noreferrer" className="link-dash label">
            On Hugging Face <span aria-hidden>↗</span>
          </a>
        </Reveal>

        <Reveal delay={0.08} className="card flex flex-col items-center px-6 py-14 text-center md:py-20">
          <p className="label text-ink-muted">The introduction</p>
          <SplitHeading className="display mt-4 text-h1">
            <em>the</em>Craft<em>of</em> AI &amp; Software
          </SplitHeading>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
            I&apos;m an Information Engineering student at UGM working at the seam between machine
            learning and the web — fine-tuning vision-language models one week, shipping a production
            Next.js app the next. Rigorous, honest ML: evaluate with strong judges, mitigate bias before
            it reaches users.
          </p>
          <a href="#contact" className="link-dash label mt-6">
            Contact me <span aria-hidden>→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
