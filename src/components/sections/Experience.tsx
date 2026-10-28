import { Reveal } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { experience } from "@/content/experience";

/** Sonar's "craft" block + person-style cards, one per role. */
export function Experience() {
  return (
    <section id="experience" tabIndex={-1} aria-labelledby="exp-title" className="grid gap-gap px-3 md:grid-cols-3 md:px-7">
      <Reveal className="card flex flex-col items-center justify-center px-6 py-14 text-center md:row-span-2">
        <p className="label text-ink-muted">The work behind the work</p>
        <SplitHeading id="exp-title" className="display mt-4 text-h1">
          <em>the</em>Art<em>of</em> Leading Teams
        </SplitHeading>
        <p className="mt-6 max-w-sm text-ink-muted">
          Research internships, consulting tech, event platforms and sponsorship — the roles where I
          learned to ship with other people.
        </p>
      </Reveal>

      {experience.map((e, i) => (
        <Reveal
          key={e.org}
          delay={(i % 2) * 0.06}
          // 2×2 beside the intro, then the odd one out spans the row.
          className={`card flex flex-col justify-between gap-6 p-5 ${i === 4 ? "md:col-span-3" : ""}`}
        >
          <div className="flex items-start justify-between gap-4">
            <p className="label text-ink-muted">{e.role}</p>
            <p className="label shrink-0 text-ink-muted">{e.period}</p>
          </div>
          <div>
            <h3 className="display text-3xl">{e.org}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{e.description}</p>
          </div>
        </Reveal>
      ))}
    </section>
  );
}
