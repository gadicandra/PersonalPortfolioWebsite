"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { projects, type Discipline } from "@/content/projects";
import { ScrollTrigger } from "@/lib/gsap";

const FILTERS: { key: Discipline | "all"; label: string }[] = [
  { key: "all", label: "Show all" },
  { key: "ai", label: "AI / ML" },
  { key: "web", label: "Websites" },
  { key: "iot", label: "AIoT" },
];

/**
 * Poulo's works: filter pills, then one showcase per project — media panel +
 * story panel, then a row of "what I did" cards.
 */
export function Work() {
  const [filter, setFilter] = useState<Discipline | "all">("all");
  const shown = projects.filter((p) => filter === "all" || p.discipline === filter);

  return (
    <section id="work" tabIndex={-1} aria-labelledby="work-title" className="frame mx-auto max-w-6xl px-4 py-24 md:px-8">
      <Reveal>
        <h2 id="work-title" className="text-h2 font-medium">
          Works.
        </h2>
      </Reveal>

      <div className="mt-6 flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            aria-pressed={filter === f.key}
            onClick={() => {
              setFilter(f.key);
              requestAnimationFrame(() => ScrollTrigger.refresh());
            }}
            className={`pill text-sm ${filter === f.key ? "pill-solid" : "pill-ghost"}`}
          >
            {f.label}
          </button>
        ))}
        <p className="ml-auto text-sm text-ink-muted" aria-live="polite">
          Showing {shown.length} of {projects.length} projects
        </p>
      </div>

      <div className="mt-16 flex flex-col gap-28">
        {shown.map((p) => (
          <article key={p.id} aria-labelledby={`${p.id}-title`}>
            <Reveal>
              <h3 id={`${p.id}-title`} className="max-w-3xl text-h3 font-medium">
                {p.title}. <span className="text-ink-muted">{p.hook}</span>
              </h3>
              <p className="mt-2 text-sm text-ink-muted">{p.tags.map((t) => `#${t.replace(/\s+/g, "")}`).join("  ")}</p>
            </Reveal>

            <div className="mt-8 grid gap-gap md:grid-cols-[1.15fr_1fr]">
              <Reveal className="relative flex min-h-80 flex-col justify-end overflow-hidden rounded-[1.75rem] bg-invert text-on-invert">
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={`${p.title} homepage`}
                    sizes="(min-width: 768px) 55vw, 100vw"
                    placeholder="blur"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                ) : (
                  <div aria-hidden className="absolute inset-0 bg-[radial-gradient(90%_70%_at_30%_20%,#3f3f46,transparent)]" />
                )}
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="relative flex items-end justify-between gap-4 p-6 text-white">
                  <div>
                    <p className="font-semibold">{p.category}</p>
                    <p className="text-sm text-white/80">{p.role}</p>
                  </div>
                  <p className="text-sm text-white/80">Year: {p.year}</p>
                </div>
              </Reveal>

              <Reveal delay={0.08} className="panel flex flex-col justify-between gap-8 p-6 md:p-8">
                <p className="rounded-3xl bg-bg p-6 text-lg leading-relaxed">{p.summary}</p>
                <div className="flex flex-col gap-4">
                  <p className="text-ink-muted">{p.detail}</p>
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/work/${p.id}`} className="pill pill-solid">
                      Learn more <span className="sr-only">about {p.title}</span>
                    </Link>
                    {p.href && (
                      <a href={p.href} target="_blank" rel="noopener noreferrer" className="pill pill-ghost">
                        {p.linkLabel ?? "Repository"} <span aria-hidden>↗</span>
                        <span className="sr-only">(opens in new tab)</span>
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            </div>

            <ul className="mt-gap grid gap-gap sm:grid-cols-2 lg:grid-cols-4">
              {p.highlights.map((h, i) => (
                <Reveal as="li" key={h.title} delay={i * 0.06} className="panel flex min-h-52 flex-col gap-2 p-6">
                  <span aria-hidden className="mb-auto pb-8 font-mono text-sm text-ink-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-medium">{h.title}</p>
                  <p className="text-ink-muted">{h.body}</p>
                </Reveal>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
