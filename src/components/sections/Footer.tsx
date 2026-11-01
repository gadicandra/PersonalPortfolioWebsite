import { profile } from "@/content/profile";
import { SECTIONS } from "@/lib/sections";

/** Poulo's footer: link columns, credit line, giant faded wordmark bleeding off the bottom. */
export function Footer() {
  return (
    <footer className="relative overflow-hidden pt-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 md:flex-row md:justify-between md:px-8">
        <p className="max-w-xs text-ink-muted">
          {profile.name} — {profile.role}. Open to research, internships and freelance builds.
        </p>
        <div className="grid grid-cols-2 gap-10 sm:gap-16">
          <nav aria-label="Footer">
            <p className="font-medium">Menu</p>
            <ul className="dim-siblings mt-3">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`/#${s.id}`} className="flex min-h-11 items-center border-b border-hair text-ink-muted hover:text-ink">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="font-medium">Contact</p>
            <ul className="dim-siblings mt-3">
              {profile.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    {...(s.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                    className="flex min-h-11 items-center border-b border-hair text-ink-muted hover:text-ink"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p className="mt-16 text-center text-sm text-ink-muted">
        © {new Date().getFullYear()} · Designed and built by {profile.shortName}
      </p>

      {/* Decorative wordmark as SVG: it's art, not text, so contrast rules don't apply. */}
      <svg aria-hidden viewBox="0 0 1000 260" className="pointer-events-none mt-6 block w-full select-none text-panel">
        <text x="500" y="250" textAnchor="middle" fill="currentColor" fontSize="330" fontWeight="600" letterSpacing="-16">
          garjita
        </text>
      </svg>
    </footer>
  );
}
