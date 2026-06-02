import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="font-sans text-2xl font-medium tracking-tight">
              {profile.name}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-2 max-w-xs text-sm text-fg-muted">
              {profile.role} — open to collaborations, research, and freelance
              builds.
            </p>
          </div>

          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="label transition-colors hover:text-accent"
                >
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-xs text-fg-faint md:flex-row md:items-center md:justify-between">
          <span className="font-mono">
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span className="font-mono">
            Built with Next.js · GSAP · PostgreSQL
          </span>
        </div>
      </div>
    </footer>
  );
}
