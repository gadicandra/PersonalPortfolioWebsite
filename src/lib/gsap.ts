"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Single registration point. Every client component imports GSAP from here.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/** gsap.matchMedia condition: wrap all non-essential motion in this. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, useGSAP };
