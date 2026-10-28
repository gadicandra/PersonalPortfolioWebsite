import { profile } from "@/content/profile";

const SPEC = [
  ["Name", profile.name],
  ["Role", "AI/ML & Full-Stack"],
  ["Based in", "Yogyakarta, ID"],
  ["Focus", "VLM fine-tuning · Next.js"],
  ["School", "Information Eng. · UGM"],
] as const;

/** Sonar's spec-sheet footer: dotted leaders, giant condensed values. */
export function Footer() {
  return (
    <footer className="px-3 pb-4 pt-gap md:px-7">
      <div className="card px-5 py-10 md:px-10 md:py-14">
        <p className="label text-center text-ink-muted">An AI/ML &amp; full-stack engineer</p>
        <dl className="mx-auto mt-6 flex max-w-5xl flex-col gap-1">
          {SPEC.map(([k, v]) => (
            <div key={k} className="flex items-end gap-3 border-b border-dotted border-hair pb-1">
              <dt className="label shrink-0 pb-[0.6em] text-ink-muted">{k}</dt>
              <dd className="display ml-auto text-right text-[clamp(1.5rem,4.5vw,3.75rem)]">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-gap flex flex-col justify-between gap-4 px-1 md:flex-row md:items-center">
        <ul className="dim-siblings flex flex-wrap gap-x-6">
          {profile.socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                {...(s.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                className="flex min-h-11 items-center font-medium"
              >
                {s.label} ↗
              </a>
            </li>
          ))}
        </ul>
        <p className="label text-ink-muted">
          © {new Date().getFullYear()} {profile.name} · Built with Next.js &amp; GSAP
        </p>
      </div>
    </footer>
  );
}
