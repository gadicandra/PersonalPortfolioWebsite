"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";

// Fixed widths (not Math.random) so SSR and client markup match.
const BARS = [3, 9, 2, 14, 5, 22, 4, 11, 2, 7, 18, 3, 6, 12, 2, 9];

/**
 * M7: Sonar's drifting "sound lines", re-themed as a token/signal stream.
 * Each bar yoyos to a random offset at its own pace; paused off-screen.
 */
export function SignalBars({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const tl = gsap.timeline({ paused: true });
        gsap.utils.toArray<HTMLElement>("[data-bar]").forEach((el) => {
          tl.to(
            el,
            {
              x: `${gsap.utils.random(-260, 260)}%`,
              duration: gsap.utils.random(1.2, 3.2),
              ease: "power3.inOut",
              repeat: -1,
              yoyo: true,
              repeatRefresh: true,
            },
            0,
          );
        });
        ScrollTrigger.create({
          trigger: root.current,
          onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={`flex h-full items-stretch justify-center gap-[6%] overflow-hidden ${className}`} aria-hidden>
      {BARS.map((w, i) => (
        <span key={i} data-bar className="block bg-current" style={{ width: `${w * 0.25}%` }} />
      ))}
    </div>
  );
}
