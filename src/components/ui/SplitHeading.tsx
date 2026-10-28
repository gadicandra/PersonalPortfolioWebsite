"use client";

import { useRef, type ReactNode } from "react";
import { gsap, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";

type Props = {
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
  children: ReactNode;
  /** Play on mount instead of on scroll-enter (hero). */
  immediate?: boolean;
  delay?: number;
};

/**
 * Masked line reveal: lines rise out of their own clip box. SplitText's
 * aria:"auto" keeps the full string readable to screen readers.
 */
export function SplitHeading({ as: Tag = "h2", id, className, children, immediate, delay = 0 }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        SplitText.create(ref.current, {
          type: "lines",
          mask: "lines",
          aria: "auto",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.2,
              stagger: 0.08,
              delay,
              ease: "expo.out",
              scrollTrigger: immediate
                ? undefined
                : { trigger: ref.current, start: "top 88%", once: true },
            }),
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
