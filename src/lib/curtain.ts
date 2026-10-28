"use client";

import { gsap } from "@/lib/gsap";

/**
 * M2/M3: Sonar's "equalizer" curtain. Vertical bars rise from a random
 * 100–125vh to cover the screen while the page shrinks to .92; `uncover`
 * drops them away. Bars live in <BarCurtain /> ([data-curtain-bar]).
 */
const bars = () => gsap.utils.toArray<HTMLElement>("[data-curtain-bar]");
const page = () => document.querySelector("[data-page]");

export function cover(): Promise<void> {
  return new Promise((resolve) => {
    gsap.set("[data-curtain]", { display: "flex" });
    gsap.set(bars(), { y: () => `${gsap.utils.random(100, 125)}vh` });
    gsap
      .timeline({ onComplete: resolve })
      .to(page(), { scale: 0.92, duration: 0.9, ease: "expo.out" }, 0)
      .to(bars(), { y: "0vh", duration: 0.8, ease: "power4.out", stagger: { amount: 0.4, from: "random" } }, 0);
  });
}

export function uncover(): Promise<void> {
  return new Promise((resolve) => {
    gsap
      .timeline({
        onComplete: () => {
          gsap.set("[data-curtain]", { display: "none" });
          resolve();
        },
      })
      .to(bars(), { y: "-100vh", duration: 0.7, ease: "equalizerOut", stagger: { amount: 0.15, from: "random" } }, 0)
      .to(page(), { scale: 1, duration: 1, ease: "expo.out", clearProps: "transform" }, 0);
  });
}

export const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
