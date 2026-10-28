"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * M4 + signature (c): giant word band. Chars fly in from x:300% on first
 * enter, then the band loops forever, and scroll velocity pushes its speed
 * (and reverses it when you scroll up). Static under reduced motion.
 */
export function Marquee({ word, id }: { word: string; id?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const text = `${word}—`.repeat(4);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");
        const loop = gsap.to(panels, { xPercent: -100, duration: 40, ease: "none", repeat: -1, paused: true });

        const split = SplitText.create(panels[0], { type: "chars" });
        gsap.from(split.chars, {
          x: "300%",
          duration: 1.1,
          stagger: 0.035,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
        });

        const boost = gsap.quickTo(loop, "timeScale", { duration: 0.6, ease: "power3.out" });
        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
          onUpdate: (self) => {
            const v = self.getVelocity() / 250;
            boost(gsap.utils.clamp(-6, 6, Math.abs(v) < 1 ? Math.sign(v || 1) : v));
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      id={id}
      className="on-dark relative overflow-hidden rounded-card bg-dark py-[3vw] text-on-dark"
      aria-label={word}
      role="img"
    >
      <div className="flex w-max whitespace-nowrap" aria-hidden>
        {[0, 1].map((i) => (
          <span key={i} data-panel className="display block pr-[0.1em] text-mega leading-[0.8]">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
