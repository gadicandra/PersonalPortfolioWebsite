"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { uncover } from "@/lib/curtain";
import { ScrollTrigger } from "@/lib/gsap";

/** Second half of M2: if we arrived via TransitionLink, drop the curtain. */
export function PageEnter() {
  const pathname = usePathname();

  useEffect(() => {
    ScrollTrigger.refresh();
    let arrived = false;
    try {
      arrived = sessionStorage.getItem("curtain") === "1";
      sessionStorage.removeItem("curtain");
    } catch {}
    if (!arrived) return;
    window.scrollTo(0, 0);
    uncover();
  }, [pathname]);

  return null;
}
