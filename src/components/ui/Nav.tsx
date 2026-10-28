"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { gsap } from "@/lib/gsap";
import { reducedMotion } from "@/lib/curtain";
import { profile } from "@/content/profile";

const LINKS = [
  { label: "Work", target: "#work" },
  { label: "Models", target: "#models" },
  { label: "Experience", target: "#experience" },
  { label: "Awards", target: "#awards" },
  { label: "Contact", target: "#contact" },
];

/**
 * Wordmark + menu trigger as solid ink pills, legible over dark media, the
 * light canvas and body text alike (blend-mode text garbled over copy). The menu is a native modal <dialog>: focus trap, Esc,
 * inert background and focus return come free; GSAP only animates (M3).
 */
export function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis();
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  // Timelines only run from event handlers, so no useGSAP context is needed;
  // the selector scopes queries to the dialog.
  const show = () => {
    const d = dialog.current;
    if (!d) return;
    const q = gsap.utils.selector(d);
    d.showModal();
    setOpen(true);
    lenis?.stop();
    if (reducedMotion()) return;
    gsap
      .timeline({ defaults: { ease: "power4.out" } })
      .fromTo(q("[data-menu-bar]"), { yPercent: 100 }, { yPercent: 0, duration: 0.8, stagger: { amount: 0.3, from: "random" } })
      .fromTo(q("[data-menu-link]"), { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.05, ease: "expo.out" }, 0.35)
      .fromTo(q("[data-menu-meta]"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05 }, 0.5);
  };

  const hide = (then?: () => void) => {
    const d = dialog.current;
    if (!d) return;
    const q = gsap.utils.selector(d);
    const done = () => {
      d.close();
      setOpen(false);
      lenis?.start();
      then?.();
    };
    if (reducedMotion()) return done();
    gsap
      .timeline({ defaults: { ease: "expo.in" }, onComplete: done })
      .to(q("[data-menu-link]"), { yPercent: 110, duration: 0.45, stagger: { each: 0.03, from: "end" } })
      .to(q("[data-menu-meta]"), { opacity: 0, duration: 0.3 }, 0)
      .to(q("[data-menu-bar]"), { yPercent: -100, duration: 0.6, ease: "equalizerOut", stagger: { amount: 0.15, from: "random" } }, 0.15);
  };

  const go = (target: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    hide(() => {
      if (pathname !== "/") return router.push(`/${target}`);
      const el = document.querySelector<HTMLElement>(target);
      if (!el) return;
      if (lenis) lenis.scrollTo(el, { duration: 1.4 });
      else el.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth" });
      el.focus({ preventScroll: true });
    });
  };

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between px-4 py-3 md:px-7 md:py-5" aria-label="Primary">
          <Link href="/" className="display pointer-events-auto flex min-h-11 items-center rounded-full bg-ink px-4 text-xl text-bg" aria-label={`${profile.name}, home`}>
            Garjita<span className="font-serif text-lg normal-case italic">&nbsp;a.</span>
          </Link>
          <button
            type="button"
            onClick={() => (open ? hide() : show())}
            aria-expanded={open}
            aria-haspopup="dialog"
            className="label pointer-events-auto flex min-h-11 items-center gap-3 rounded-full bg-ink px-4 text-bg"
          >
            Menu
            <span aria-hidden className="flex flex-col gap-1">
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
            </span>
          </button>
        </nav>
      </header>

      <dialog
        ref={dialog}
        aria-label="Site menu"
        onCancel={(e) => {
          e.preventDefault();
          hide();
        }}
        className="on-dark fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-on-dark backdrop:bg-transparent"
      >
        <div aria-hidden className="absolute inset-0 flex">
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i} data-menu-bar className="-mx-px h-full flex-1 bg-dark" />
          ))}
        </div>

        <div className="relative flex h-full flex-col justify-between px-4 py-3 md:px-7 md:py-5">
          <div className="flex items-center justify-between">
            <span data-menu-meta className="label text-on-dark-muted">Index</span>
            <button
              type="button"
              autoFocus
              onClick={() => hide()}
              className="label flex min-h-11 items-center gap-3 rounded-full border border-current px-4"
            >
              Close <span aria-hidden>✕</span>
            </button>
          </div>

          <ul className="flex flex-col">
            {LINKS.map((l, i) => (
              <li key={l.target} className="overflow-hidden border-b border-dashed border-on-dark/25">
                <a
                  data-menu-link
                  href={pathname === "/" ? l.target : `/${l.target}`}
                  onClick={go(l.target)}
                  className="display flex items-baseline justify-between py-1 text-[clamp(3rem,11vh,8rem)] transition-colors hover:text-accent"
                >
                  {l.label}
                  <span className="label text-on-dark-muted">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>

          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {profile.socials.map((s) => (
              <li key={s.label} data-menu-meta>
                <a
                  href={s.href}
                  {...(s.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                  className="label flex min-h-11 items-center text-on-dark-muted hover:text-on-dark"
                >
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </>
  );
}
