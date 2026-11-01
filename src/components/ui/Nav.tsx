"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { useActiveSection } from "@/hooks/useActiveSection";
import { SECTIONS, type SectionId } from "@/lib/sections";
import { isDark, subscribeTheme, toggleTheme } from "@/lib/theme";
import { profile } from "@/content/profile";

/**
 * Poulo's nav, measured on poulo.site:
 *  - icon-only glass pill; hovering (or tabbing into) it expands every label
 *    (width 0 → auto) so the bar grows sideways
 *  - one shared highlight pill slides to the hovered item, else the active section
 *  - CTA: on hover the light knob grows to fill the button and its icons fan out
 * Labels are the links' real text, so names stay accessible while collapsed.
 * Desktop pointer only for the expand; touch keeps the compact icon bar.
 */
export function Nav() {
  const pathname = usePathname();
  const active = useActiveSection();
  const dark = useSyncExternalStore(subscribeTheme, isDark, () => false);
  const [hovered, setHovered] = useState<SectionId | null>(null);
  const list = useRef<HTMLUListElement>(null);
  const pill = useRef<HTMLSpanElement>(null);

  const onHome = pathname === "/";
  const target = hovered ?? (onHome ? active : null);

  // Glue the highlight to its target link, re-measuring while labels animate.
  useEffect(() => {
    const ul = list.current;
    const el = pill.current;
    if (!ul || !el) return;
    const place = () => {
      const link = target && ul.querySelector<HTMLElement>(`[data-id="${target}"]`);
      el.style.opacity = link ? "1" : "0";
      if (!link) return;
      // Measure against the <ul> itself; each <li> is its own offsetParent.
      el.style.left = `${link.getBoundingClientRect().left - ul.getBoundingClientRect().left}px`;
      el.style.width = `${link.offsetWidth}px`;
    };
    place();
    const ro = new ResizeObserver(place);
    ul.querySelectorAll("[data-id]").forEach((a) => ro.observe(a));
    return () => ro.disconnect();
  }, [target]);

  return (
    <>
      {/* Content dissolves under the floating bar instead of colliding with it. */}
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-40 h-24 bg-gradient-to-b from-bg to-transparent" />
      <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-3 md:top-6">
        <div className="pointer-events-auto flex max-w-full items-center gap-2">
          <nav aria-label="Primary" className="min-w-0">
            <ul
              ref={list}
              onPointerLeave={() => setHovered(null)}
              onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHovered(null)}
              className="glass group/nav relative flex items-center rounded-full p-1"
            >
              <span
                ref={pill}
                aria-hidden
                className="absolute inset-y-1 rounded-full bg-panel opacity-0 transition-[left,width,opacity] duration-300 ease-[cubic-bezier(.2,.8,.2,1)]"
              />
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    data-id={s.id}
                    href={onHome ? `#${s.id}` : `/#${s.id}`}
                    aria-current={onHome && active === s.id ? "true" : undefined}
                    onPointerEnter={() => setHovered(s.id)}
                    onFocus={() => setHovered(s.id)}
                    className={`relative z-10 flex h-11 items-center rounded-full px-3.5 text-sm font-medium transition-colors duration-150 ${
                      target === s.id ? "text-ink" : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    <Icon name={s.id as IconName} className="size-4 shrink-0" />
                    {/* 0fr → 1fr animates width to auto; collapsed text stays readable to AT. */}
                    <span className="grid grid-cols-[0fr] opacity-0 transition-[grid-template-columns,opacity,margin] duration-300 ease-[cubic-bezier(.2,.8,.2,1)] md:group-hover/nav:ml-2 md:group-hover/nav:grid-cols-[1fr] md:group-hover/nav:opacity-100 md:group-focus-within/nav:ml-2 md:group-focus-within/nav:grid-cols-[1fr] md:group-focus-within/nav:opacity-100">
                      <span className="overflow-hidden whitespace-nowrap">{s.label}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="glass grid size-13 shrink-0 place-items-center rounded-full text-ink"
          >
            <Icon name={dark ? "sun" : "moon"} className="size-4" />
          </button>

          <a
            href={`mailto:${profile.email}`}
            className="group/cta relative inline-flex size-13 shrink-0 items-center overflow-hidden rounded-full bg-invert p-1.5 text-on-invert shadow-[0_10px_30px_-12px_rgb(0_0_0/0.45)] sm:w-auto"
          >
            <span
              aria-hidden
              className="absolute inset-y-1.5 left-1.5 z-10 w-10 overflow-hidden rounded-full bg-bg text-ink transition-[width] duration-500 ease-[cubic-bezier(.2,.8,.2,1)] sm:group-hover/cta:w-[calc(100%-12px)] sm:group-focus-visible/cta:w-[calc(100%-12px)]"
            >
              {/* At rest: one centred icon. On hover: it fades and a fanned row takes over. */}
              <span className="absolute inset-0 grid place-items-center transition-opacity duration-200 sm:group-hover/cta:opacity-0 sm:group-focus-visible/cta:opacity-0">
                <Icon name="mail" className="size-4" />
              </span>
              <span className="absolute inset-0 flex items-center justify-around px-3">
                {[1, 0.75, 0.5, 0.3, 0.15].map((o, i) => (
                  <span
                    key={o}
                    style={{ "--o": o, transitionDelay: `${i * 60}ms` } as React.CSSProperties}
                    className="shrink-0 opacity-0 transition-opacity duration-300 sm:group-hover/cta:opacity-(--o) sm:group-focus-visible/cta:opacity-(--o)"
                  >
                    <Icon name="mail" className="size-4" />
                  </span>
                ))}
              </span>
            </span>
            <span className="sr-only sm:not-sr-only sm:ml-[3.25rem] sm:mr-5 sm:whitespace-nowrap sm:font-medium">
              Get in touch
            </span>
          </a>
        </div>
      </header>
    </>
  );
}
