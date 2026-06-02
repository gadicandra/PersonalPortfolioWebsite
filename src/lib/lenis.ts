import type Lenis from "lenis";

// Module-level handle to the active Lenis instance so non-provider components
// (e.g. the nav) can trigger smooth programmatic scrolls.
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export const scrollToSection = (selector: string) => {
  if (instance) {
    instance.scrollTo(selector, { offset: 0, duration: 1.2 });
    return;
  }
  // Fallback when smooth scroll is disabled (reduced motion / not yet mounted).
  document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
};
