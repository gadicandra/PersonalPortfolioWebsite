"use client";

import { useEffect, useRef, useState } from "react";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Lenis owns the scroll, driven by GSAP's ticker so ScrollTrigger stays in
 * lockstep (documented lenis/react + GSAP pattern). Off under reduced motion.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<LenisRef>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const tick = (time: number) => ref.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(tick);
  }, [enabled]);

  // The instance is created after mount, so subscribe via the root store.
  useLenis(ScrollTrigger.update);

  return (
    <>
      {enabled && <ReactLenis root ref={ref} options={{ autoRaf: false, lerp: 0.1, anchors: { offset: -24 } }} />}
      {children}
    </>
  );
}
