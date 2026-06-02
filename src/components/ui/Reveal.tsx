"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Initial downward offset in px. */
  y?: number;
};

/**
 * Scroll-in reveal: subtle y-translate + fade, fired once when the element
 * enters the viewport. No-op under reduced motion (content stays visible).
 */
export function Reveal({
  children,
  className,
  as: Tag = "div",
  delay = 0,
  y = 28,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        y,
        opacity: 0,
        duration: 0.95,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, y]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
