import type { ReactNode } from "react";

/** Mono section label, e.g. `01 — Selected Work`. */
export function Eyebrow({
  index,
  children,
  className = "",
}: {
  index?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`label inline-flex items-center gap-3 ${className}`}>
      {index && <span className="text-accent">{index}</span>}
      {index && <span className="text-fg-faint">—</span>}
      <span>{children}</span>
    </span>
  );
}
