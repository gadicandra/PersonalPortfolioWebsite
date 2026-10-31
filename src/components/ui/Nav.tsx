"use client";

import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { useActiveSection } from "@/hooks/useActiveSection";
import { SECTIONS } from "@/lib/sections";
import { isDark, subscribeTheme, toggleTheme } from "@/lib/theme";
import { profile } from "@/content/profile";

/**
 * Poulo's floating glass pill: icon links (label shows on hover/focus as a
 * tooltip and is always the accessible name), active-section highlight,
 * theme toggle, and a solid contact CTA. Plain #hash links — Lenis
 * `anchors` handles the smooth scroll, so it works without JS too.
 */
export function Nav() {
  const pathname = usePathname();
  const active = useActiveSection();
  // Server snapshot = light; the pre-paint gate may flip it before hydration.
  const dark = useSyncExternalStore(subscribeTheme, isDark, () => false);

  const href = (id: string) => (pathname === "/" ? `#${id}` : `/#${id}`);

  return (
    <>
      {/* Poulo's top fade: content dissolves under the floating nav instead of colliding. */}
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-40 h-24 bg-gradient-to-b from-bg to-transparent" />
      <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-3 md:top-6">
        <nav aria-label="Primary" className="pointer-events-auto flex items-center gap-2">
          <ul className="glass flex items-center gap-0.5 rounded-full p-1.5">
            {SECTIONS.map((s) => {
              const current = pathname === "/" && active === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={href(s.id)}
                    aria-label={s.label}
                    aria-current={current ? "true" : undefined}
                    className={`group relative grid size-10 place-items-center rounded-full transition-colors ${
                      current ? "bg-panel text-ink" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    <Icon name={s.id as IconName} />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute top-full mt-2 rounded-full bg-invert px-2.5 py-1 text-xs whitespace-nowrap text-on-invert opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                    >
                      {s.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="glass grid size-[3.25rem] place-items-center rounded-full text-ink"
          >
            <Icon name={dark ? "sun" : "moon"} />
          </button>

          <a href={`mailto:${profile.email}`} className="pill pill-solid hidden h-[3.25rem] sm:inline-flex">
            <span className="grid size-8 place-items-center rounded-full bg-bg text-ink" aria-hidden>
              <Icon name="mail" className="size-4" />
            </span>
            Get in touch
          </a>
        </nav>
      </header>
    </>
  );
}
