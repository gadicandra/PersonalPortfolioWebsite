"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  href: string;
  title: string;
  meta: string;
  image?: StaticImageData;
  sizes: string;
  className?: string;
  priority?: boolean;
};

/**
 * M5/M6: Sonar's media card. On hover/focus the image zooms and an ↗ icon
 * spins in. Sonar scales the whole card (and counter-scales the text); we
 * scale only the image inside a clip, which reads the same without reflowing
 * the grid. Desktop pointer only — touch/keyboard see the static state.
 */
export function MediaCard({ href, title, meta, image, sizes, className = "", priority }: Props) {
  const root = useRef<HTMLAnchorElement>(null);
  const external = href.startsWith("http");
  const Tag = external ? Link : TransitionLink;

  const { contextSafe } = useGSAP({ scope: root });
  const enter = contextSafe(() => {
    gsap.to("[data-img]", { scale: 1.08, duration: 0.9, ease: "expo.out", overwrite: true });
    gsap.fromTo("[data-icon]", { scale: 0, rotate: -90 }, { scale: 1, rotate: 0, duration: 0.6, ease: "expo.out", overwrite: true });
  });
  const leave = contextSafe(() => {
    gsap.to("[data-img]", { scale: 1, duration: 0.9, ease: "expo.out", overwrite: true });
    gsap.to("[data-icon]", { scale: 0, rotate: -90, duration: 0.4, ease: "power3.in", overwrite: true });
  });

  return (
    <Tag
      ref={root}
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      onPointerEnter={(e) => e.pointerType === "mouse" && enter()}
      onPointerLeave={(e) => e.pointerType === "mouse" && leave()}
      onFocus={enter}
      onBlur={leave}
      className={`on-dark group relative block overflow-hidden rounded-card bg-dark text-on-dark ${className}`}
    >
      {image ? (
        <Image
          data-img
          src={image}
          alt=""
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          className="absolute inset-0 h-full w-full object-cover object-top will-change-transform"
        />
      ) : (
        <div data-img className="absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_10%,#3a3a35,transparent_60%)]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 via-30% to-transparent to-60%" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 md:p-5">
        <div>
          <h3 className="display text-2xl md:text-3xl">{title}</h3>
          <p className="mt-1 text-sm text-on-dark-muted">{meta}</p>
        </div>
        <span
          data-icon
          aria-hidden
          className="grid size-9 shrink-0 scale-0 place-items-center rounded-full bg-accent text-ink [@media(hover:none)]:scale-100"
        >
          ↗
        </span>
      </div>
      {external && <span className="sr-only"> (opens in new tab)</span>}
    </Tag>
  );
}
