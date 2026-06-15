"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { scrollToSection } from "@/lib/lenis";
import { profile } from "@/content/profile";

export function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero='eyebrow']", { opacity: 0, y: 16, duration: 0.7 })
        .from(
          "[data-hero='line'] > span",
          { yPercent: 115, duration: 1.05, stagger: 0.12 },
          "-=0.35",
        )
        .from(
          "[data-hero='lede']",
          { opacity: 0, y: 20, duration: 0.8 },
          "-=0.55",
        )
        .from(
          "[data-hero='cta'] > *",
          { opacity: 0, y: 16, duration: 0.6, stagger: 0.1 },
          "-=0.45",
        )
        .from(
          "[data-hero='stat']",
          { opacity: 0, y: 16, duration: 0.6, stagger: 0.08 },
          "-=0.4",
        )
        .from(
          "[data-hero='scroll']",
          { opacity: 0, duration: 0.8 },
          "-=0.3",
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden px-6 pb-20 pt-28 md:px-10"
    >
      {/* faint grid + radial fade for depth */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.5] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />

      <div className="relative mx-auto w-full max-w-7xl">
        <p
          data-hero="eyebrow"
          className="label flex items-center gap-3"
        >
          <span className="inline-block h-px w-8 bg-accent-dim" />
          {profile.role}
        </p>

        <h1 className="mt-8 font-sans text-display font-medium leading-[0.92] tracking-[-0.03em]">
          <span data-hero="line" className="block overflow-hidden">
            <span className="block">{profile.heroLead}</span>
          </span>
          <span data-hero="line" className="block overflow-hidden">
            <span className="block font-serif font-normal italic text-accent">
              {profile.heroAccent}
            </span>
          </span>
          <span data-hero="line" className="block overflow-hidden">
            <span className="block text-fg-muted">{profile.heroTail}</span>
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <p
            data-hero="lede"
            className="max-w-md text-base leading-relaxed text-fg-muted"
          >
            {profile.education}. Currently fine-tuning vision-language models and
            shipping production web apps from {profile.location}.
          </p>

          <div data-hero="cta" className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollToSection("#work")}
              className="group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent"
            >
              View work
              <span className="transition-transform group-hover:translate-y-0.5">
                ↓
              </span>
            </button>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        <dl className="mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-line pt-8">
          {profile.stats.map((s) => (
            <div key={s.label} data-hero="stat">
              <dt className="font-sans text-3xl font-medium tracking-tight md:text-4xl">
                {s.value}
              </dt>
              <dd className="label mt-1 normal-case tracking-normal">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div
        data-hero="scroll"
        className="label absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 md:flex"
      >
        <span>Scroll</span>
        <span className="inline-block h-8 w-px animate-pulse bg-accent-dim" />
      </div>
    </div>
  );
}
