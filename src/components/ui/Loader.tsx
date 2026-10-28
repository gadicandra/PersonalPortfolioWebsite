"use client";

import { useRef } from "react";
import type Lenis from "lenis";
import { useLenis } from "lenis/react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Runs before paint (inlined in <head>): skip the loader on repeat visits / reduced motion. */
export const LOADER_GATE = `try{var s=sessionStorage;if(s.getItem('loaded')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.dataset.noloader='1';s.setItem('loaded','1')}catch(e){document.documentElement.dataset.noloader='1'}`;

/**
 * M1, condensed (~2.4s vs Sonar's ~5s): wordmark halves rise while a counter
 * runs 00→100, then they split apart and the panel wipes up. Without JS the
 * overlay never shows (it's display:none unless the gate leaves it on).
 */
export function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const loading = useRef(true);
  const lenisRef = useRef<Lenis>(undefined);

  // Lenis mounts after us; hold it stopped until the intro ends.
  useLenis((l) => {
    lenisRef.current = l;
    if (loading.current) l.stop();
  });

  useGSAP(
    () => {
      const el = root.current;
      const finish = () => {
        loading.current = false;
        lenisRef.current?.start();
        el?.remove();
      };
      if (!el || document.documentElement.dataset.noloader) return finish();

      const count = { v: 0 };
      const out = el.querySelector("[data-l-count]")!;
      gsap
        .timeline({ defaults: { ease: "load" }, onComplete: finish })
        .from("[data-l-word]", { yPercent: 110, duration: 0.8, stagger: 0.08 })
        .to(count, {
          v: 100,
          duration: 1.2,
          ease: "power2.inOut",
          onUpdate: () => void (out.textContent = String(Math.round(count.v)).padStart(2, "0")),
        }, 0)
        .to("[data-l-word='a']", { xPercent: -60, opacity: 0, duration: 0.7 }, ">")
        .to("[data-l-word='b']", { xPercent: 60, opacity: 0, duration: 0.7 }, "<")
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.9, ease: "expo.inOut" }, "<0.1");
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden
      className="on-dark fixed inset-0 z-[90] hidden flex-col justify-between bg-dark p-4 text-on-dark [html:not([data-noloader])_&]:flex md:p-7"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <span className="label text-on-dark-muted">AI/ML · Full-Stack · Yogyakarta</span>
      <div className="display flex flex-wrap justify-center gap-x-[0.15em] overflow-hidden text-[clamp(3.5rem,14vw,14rem)]">
        <span data-l-word="a" className="block">Garjita</span>
        <span data-l-word="b" className="block">Adicandra</span>
      </div>
      <span data-l-count className="display self-end text-6xl">00</span>
    </div>
  );
}
