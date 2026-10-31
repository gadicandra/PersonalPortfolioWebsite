"use client";

import { useEffect, useRef } from "react";

/**
 * Poulo's hero drizzle: thin slanted strokes on a canvas. Decorative only.
 * Pauses off-screen and when the tab is hidden; a single static frame under
 * reduced motion. ~80 lines per frame — negligible cost.
 */
export function Rain({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, visible = true;
    type Drop = { x: number; y: number; len: number; v: number };
    let drops: Drop[] = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drops = Array.from({ length: Math.round(w / 18) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        len: 10 + Math.random() * 18,
        v: 1.2 + Math.random() * 2.2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = getComputedStyle(canvas).color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (const d of drops) {
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - d.len * 0.12, d.y + d.len);
        if (!still) {
          d.y += d.v;
          d.x -= d.v * 0.12;
          if (d.y > h) Object.assign(d, { y: -d.len, x: Math.random() * (w + 40) });
        }
      }
      ctx.stroke();
      if (!still && visible) raf = requestAnimationFrame(draw);
    };

    let onScreen = true;
    const sync = () => {
      visible = onScreen && !document.hidden;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(draw);
    };
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      sync();
    });
    document.addEventListener("visibilitychange", sync);
    const ro = new ResizeObserver(() => {
      resize();
      cancelAnimationFrame(raf); // keep a single rAF loop
      draw();
    });
    io.observe(canvas);
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none ${className}`} />;
}
