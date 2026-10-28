"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

// Single registration point. Every client component imports GSAP from here.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, useGSAP);
  // Sonar's two signature curves (decoded from their scripts).
  CustomEase.create("load", "0.46, 0.03, 0, 1");
  CustomEase.create("equalizerOut", "M0,0 C0.64,0.05 0.35,1 1,1");
}

/** gsap.matchMedia condition: wrap all non-essential motion in this. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, SplitText, useGSAP };
