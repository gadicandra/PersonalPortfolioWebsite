"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { scrollToSection } from "@/lib/lenis";

const LINKS = [
  { label: "Work", target: "#work" },
  { label: "Models", target: "#models" },
  { label: "Experience", target: "#experience" },
  { label: "Awards", target: "#achievements" },
  { label: "Contact", target: "#contact" },
];

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (target: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === "/") {
      scrollToSection(target);
    } else {
      router.push(`/${target}`);
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-line bg-bg/70 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="font-sans text-sm font-medium tracking-tight text-fg transition-colors hover:text-accent"
          aria-label="Home — Garjita Adicandra"
        >
          Garjita Adicandra<span className="text-accent">.</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.target}
                onClick={go(link.target)}
                className="label transition-colors hover:text-fg"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          onClick={go("#contact")}
          className="label rounded-full border border-line-strong px-4 py-2 text-fg transition-colors hover:border-accent hover:text-accent md:hidden"
        >
          Say hi
        </a>
      </nav>
    </header>
  );
}
