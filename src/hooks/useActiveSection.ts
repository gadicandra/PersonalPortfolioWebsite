"use client";

import { useEffect, useState } from "react";
import { SECTIONS, type SectionId } from "@/lib/sections";

/** Section whose box crosses the viewport's middle line. */
export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id as SectionId);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return active;
}
