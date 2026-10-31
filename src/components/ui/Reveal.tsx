"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  id?: string;
};

/**
 * Poulo's signature entrance: content resolves out of a blur while rising.
 * Fires once on enter; content stays visible under reduced motion / no JS.
 */
export function Reveal({ children, className, as: Tag = "div", delay = 0, id }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        gsap.from(ref.current, {
          y: 24,
          opacity: 0,
          filter: "blur(12px)",
          duration: 1.1,
          delay,
          ease: "power3.out",
          clearProps: "filter",
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
