"use client";

import { Fragment, useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * Poulo's hero rotator: roles cross-fade through a blur, letter by letter.
 * All roles are in the DOM (stacked in one grid cell) so the box never
 * resizes; screen readers get the full list once, not a live-changing line.
 * Reduced motion: shows the first role only.
 */
export function RoleRotator({ roles }: { roles: readonly string[] }) {
  const root = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION_OK, () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-role]");
        const chars = (el: HTMLElement) => el.querySelectorAll("[data-c]");
        gsap.set(items.slice(1), { autoAlpha: 0 });

        const tl = gsap.timeline({ repeat: -1 });
        items.forEach((el, i) => {
          const next = items[(i + 1) % items.length];
          tl.to(chars(el), { opacity: 0, filter: "blur(8px)", y: -6, duration: 0.5, stagger: 0.02, ease: "power2.in" }, "+=2.2")
            .set(el, { autoAlpha: 0 })
            .set(next, { autoAlpha: 1 })
            .fromTo(
              chars(next),
              { opacity: 0, filter: "blur(8px)", y: 8 },
              // immediateRender:false — otherwise every fromTo zeroes its role (incl. the first) at build time.
              { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.6, stagger: 0.025, ease: "power3.out", immediateRender: false },
            );
        });
      });
    },
    { scope: root },
  );

  return (
    <span ref={root} className="grid">
      <span className="sr-only">{roles.join(", ")}</span>
      {roles.map((r, i) => (
        <span key={r} data-role aria-hidden className={`col-start-1 row-start-1 ${i ? "invisible" : ""}`}>
          {/* Letters grouped per word (nowrap) so lines only break between words. */}
          {r.split(" ").map((word, w) => (
            <Fragment key={w}>
              {w > 0 && " "}
              <span className="inline-block whitespace-nowrap">
                {[...word].map((c, j) => (
                  <span key={j} data-c className="inline-block">
                    {c}
                  </span>
                ))}
              </span>
            </Fragment>
          ))}
        </span>
      ))}
    </span>
  );
}
