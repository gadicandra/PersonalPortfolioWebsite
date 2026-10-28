import { Fragment } from "react";
import { MediaCard } from "@/components/ui/MediaCard";
import { Reveal } from "@/components/ui/Reveal";
import { projects, type Discipline } from "@/content/projects";

const GROUPS: { key: Discipline; label: string }[] = [
  { key: "web", label: "Web" },
  { key: "iot", label: "AIoT" },
];

/** Sonar's numbered category tile (FILM ⁽¹²⁾ 01) interleaved with project cards. */
function IndexTile({ label, count, n }: { label: string; count: number; n: number }) {
  return (
    <div className="card flex h-full flex-col justify-between p-4">
      <p className="display text-2xl">
        {label}
        <sup className="ml-1 font-mono text-xs">({count})</sup>
      </p>
      <p className="display self-end text-[clamp(5rem,11vw,10rem)] leading-[0.75]" aria-hidden>
        {String(n).padStart(2, "0")}
      </p>
    </div>
  );
}

// ponytail: one grid for all groups so cells pack without orphans at 4 cols
// (5 web + 2 AIoT + GitHub = 8). Re-balance when projects are added.
export function Work() {
  return (
    <section
      id="work"
      tabIndex={-1}
      aria-label="Selected work"
      className="grid auto-rows-[minmax(14rem,auto)] gap-gap px-3 sm:auto-rows-[minmax(14rem,34vh)] sm:grid-cols-2 md:px-7 lg:grid-cols-4"
    >
      {GROUPS.map((g, gi) => {
        const items = projects.filter((p) => p.discipline === g.key);
        return (
          <Fragment key={g.key}>
            <Reveal className="h-full">
              <IndexTile label={g.label} count={items.length} n={gi + 1} />
            </Reveal>
            {items.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 0.06} className="h-full">
                <MediaCard
                  href={`/work/${p.id}`}
                  title={p.title}
                  meta={`${p.category} · ${p.year}`}
                  image={p.image}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="h-full"
                />
              </Reveal>
            ))}
          </Fragment>
        );
      })}

      <Reveal className="card flex h-full flex-col justify-between gap-6 p-5">
        <div>
          <p className="label text-ink-muted">Presenting</p>
          <p className="display mt-2 text-4xl">The rest, on GitHub</p>
          <p className="mt-2 text-ink-muted">Experiments, research code and side projects.</p>
        </div>
        <a href="https://github.com/gadicandra" target="_blank" rel="noopener noreferrer" className="link-dash label self-start">
          github.com/gadicandra <span aria-hidden>↗</span>
        </a>
      </Reveal>
    </section>
  );
}
