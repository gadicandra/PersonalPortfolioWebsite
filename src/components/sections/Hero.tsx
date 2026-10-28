"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { SignalBars } from "@/components/ui/SignalBars";

/**
 * Full-bleed dark hero with the title set Sonar-style at the bottom.
 * Signature scroll moment (a): as you scroll, the hero shrinks into a
 * rounded card and the title drifts up — M1's grow-to-fullscreen, reversed
 * and scrubbed. Intro text rises after the loader (delay matches its length).
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const firstVisit = !document.documentElement.dataset.noloader;
        gsap.from("[data-hero-in]", {
          yPercent: 110,
          opacity: 0,
          duration: 1.1,
          stagger: 0.06,
          ease: "expo.out",
          delay: firstVisit ? 2.3 : 0.1,
        });

        gsap
          .timeline({
            scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
          })
          .to("[data-hero-frame]", { scale: 0.86, borderRadius: "1.5rem", ease: "none" }, 0)
          .to("[data-hero-title]", { yPercent: -40, ease: "none" }, 0)
          .to("[data-hero-bars]", { opacity: 0.15, ease: "none" }, 0);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative h-svh" aria-labelledby="hero-title">
      <div
        data-hero-frame
        className="on-dark relative flex h-full flex-col justify-end overflow-hidden bg-dark text-on-dark will-change-transform"
      >
        <div data-hero-bars className="absolute inset-x-0 top-[10%] h-[42%] text-on-dark/70 [mask-image:linear-gradient(to_bottom,black_40%,transparent)]">
          <SignalBars />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark" />

        <div data-hero-title className="relative px-4 pb-6 md:px-7 md:pb-8">
          <p className="overflow-hidden text-center">
            <span data-hero-in className="block text-lg font-medium text-on-dark md:text-xl">
              AI/ML &amp; full-stack engineer
            </span>
          </p>
          <h1 id="hero-title" className="display mt-3 text-center text-display">
            <span className="block overflow-hidden">
              <span data-hero-in className="block">Garjita</span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-in className="block">Adicandra</span>
            </span>
          </h1>

          <div className="mt-6 grid items-end gap-4 md:grid-cols-[1fr_2fr_1fr]">
            <p className="overflow-hidden">
              <span data-hero-in className="block">
                <span className="label block text-on-dark-muted">Now</span>
                <span className="mt-1 block font-medium">LLM engineering intern at AITF</span>
              </span>
            </p>
            <p className="overflow-hidden text-center text-lg text-on-dark-muted md:text-xl">
              <span data-hero-in className="mx-auto block max-w-xl">
                I fine-tune vision-language models and build production web apps.
                Information Engineering student at UGM, Yogyakarta.
              </span>
            </p>
            <p className="overflow-hidden md:text-right">
              <a data-hero-in href="#work" className="link-dash label">
                View work <span aria-hidden>↓</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
