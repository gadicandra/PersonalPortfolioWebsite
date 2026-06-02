import type { ReactNode } from "react";

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-7xl scroll-mt-24 px-6 md:px-10 ${className}`}
    >
      {children}
    </section>
  );
}
