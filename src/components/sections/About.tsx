import { Reveal } from "@/components/ui/Reveal";
import { achievements } from "@/content/achievements";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";

/** Poulo's "About me": one big statement, short bio, then roles and honours. */
export function About() {
  const [certs, honors] = achievements;

  return (
    <section id="about" tabIndex={-1} aria-labelledby="about-title" className="frame mx-auto max-w-6xl px-4 py-24 md:px-8">
      <Reveal>
        <p className="kicker">About me</p>
        <h2 id="about-title" className="mt-3 max-w-4xl text-h2 font-medium">
          I train models, ship web apps, and lead the teams around them.
        </h2>
        <div className="mt-6 max-w-3xl space-y-4 text-lg text-ink-muted">
          {profile.about.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
      </Reveal>

      <div className="mt-16 grid gap-gap lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="panel p-6 md:p-8">
          <h3 className="text-xl font-medium">Experience</h3>
          <ol className="mt-6">
            {experience.map((e) => (
              <li key={e.org} className="grid gap-1 border-t border-hair py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <p className="text-sm text-ink-muted">{e.period}</p>
                <div>
                  <p className="font-medium">{e.org}</p>
                  <p className="text-sm text-ink-muted">{e.role}</p>
                  <p className="mt-2 text-ink-muted">{e.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="flex flex-col gap-gap">
          <Reveal delay={0.08} className="panel p-6 md:p-8">
            <h3 className="text-xl font-medium">{honors.title}</h3>
            <ul className="mt-4 divide-y divide-hair">
              {honors.items.map((a) => (
                <li key={a.title} className="py-4">
                  <p className="font-medium">{a.title}</p>
                  <p className="text-sm text-ink-muted">
                    {a.issuer} · {a.year}
                  </p>
                  {a.note && <p className="mt-1 text-sm text-ink-muted">{a.note}</p>}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.12} className="panel p-6 md:p-8">
            <h3 className="text-xl font-medium">{certs.title}</h3>
            <ul className="mt-4 divide-y divide-hair">
              {certs.items.map((c) => (
                <li key={c.title} className="py-3">
                  <p className="font-medium">{c.title}</p>
                  <p className="text-sm text-ink-muted">
                    {c.issuer} · {c.year}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
