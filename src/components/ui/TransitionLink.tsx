"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";
import { cover, reducedMotion } from "@/lib/curtain";

/**
 * Internal link that plays the curtain before navigating (M2). The new page
 * uncovers itself via <PageEnter />. Modified clicks (new tab etc.) fall
 * through to the browser untouched.
 */
export function TransitionLink({ href, onClick, ...rest }: ComponentProps<typeof Link> & { href: string }) {
  const router = useRouter();

  return (
    <Link
      href={href}
      {...rest}
      onClick={async (e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || reducedMotion()) return;
        e.preventDefault();
        try {
          sessionStorage.setItem("curtain", "1");
        } catch {}
        await cover();
        router.push(href);
      }}
    />
  );
}
