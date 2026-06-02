"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { projects } from "@/content/projects";

export function Work() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const sectionEl = section.current;
    const trackEl = track.current;
    if (!sectionEl || !trackEl) return;

    // Pinned horizontal slide — desktop + motion only. matchMedia reverts
    // cleanly when the query stops matching.
    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        const distance = () => trackEl.scrollWidth - window.innerWidth;

        const tween = gsap.to(trackEl, {
          x: () => -distance(),
          ease: "none",
        });

        ScrollTrigger.create({
          trigger: sectionEl,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          animation: tween,
          invalidateOnRefresh: true,
        });
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={section} id="work" className="relative md:h-svh md:overflow-hidden">
      <div
        ref={track}
        className="flex flex-col md:h-svh md:flex-row md:flex-nowrap md:items-center"
      >
        {/* Intro panel */}
        <div className="shrink-0 px-6 pt-28 md:flex md:h-svh md:w-[38vw] md:flex-col md:justify-center md:px-10 md:pt-0">
          <Eyebrow index="01">Selected Work</Eyebrow>
          <h2 className="mt-6 max-w-sm font-sans text-h1 font-medium leading-[0.95] tracking-[-0.02em]">
            Things I&apos;ve <span className="font-serif italic text-accent">shipped</span>.
          </h2>
          <p className="mt-6 max-w-xs text-fg-muted">
            From AIoT systems to client web builds and ML research. Scroll to move
            through them.
          </p>
          <span className="label mt-8 hidden items-center gap-2 md:inline-flex">
            Drag / scroll <span aria-hidden>→</span>
          </span>
        </div>

        {/* Project panels */}
        {projects.map((p, i) => (
          <article
            key={p.id}
            className="group shrink-0 border-t border-line px-6 py-12 md:flex md:h-svh md:w-[44vw] md:flex-col md:justify-center md:border-l md:border-t-0 md:px-12"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-sm text-fg-faint">
                0{i + 1}
              </span>
              <span className="label">{p.year}</span>
            </div>

            <p className="label mt-10 text-accent">{p.category}</p>
            <h3 className="mt-3 font-sans text-4xl font-medium tracking-tight md:text-5xl">
              {p.title}
            </h3>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-fg-muted">
              {p.summary}
            </p>

            <ul className="mt-7 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-line px-3 py-1 font-mono text-xs text-fg-muted"
                >
                  {t}
                </li>
              ))}
            </ul>

            {p.href && (
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="mt-9 inline-flex w-fit items-center gap-2 border-b border-line-strong pb-1 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
              >
                View repository
                <span className="transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            )}
          </article>
        ))}

        {/* trailing spacer so the last card clears the viewport edge */}
        <div className="hidden shrink-0 md:block md:w-[12vw]" aria-hidden />
      </div>
    </section>
  );
}
