"use client";

import { usePathname } from "next/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { SECTIONS } from "@/lib/sections";

/** Poulo's left progress rail: one dash per section, active one long. Wide screens only. */
export function SectionRail() {
  const active = useActiveSection();
  const pathname = usePathname();
  if (pathname !== "/") return null;

  return (
    <nav aria-label="Sections on this page" className="fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col xl:flex">
      {SECTIONS.map((s) => (
        <a key={s.id} href={`#${s.id}`} aria-label={s.label} className="group flex h-6 items-center">
          <span
            className={`block h-px transition-all duration-500 ${
              active === s.id ? "w-12 bg-ink" : "w-5 bg-ink-faint group-hover:w-8"
            }`}
          />
        </a>
      ))}
    </nav>
  );
}
