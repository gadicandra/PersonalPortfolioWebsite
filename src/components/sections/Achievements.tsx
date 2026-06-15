import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { achievements } from "@/content/achievements";
import { profile } from "@/content/profile";

export function Achievements() {
  return (
    <Section id="achievements" className="py-28 md:py-40">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Reveal>
            <Eyebrow index="04">Certifications & Achievements</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-xs font-sans text-h2 font-medium leading-tight tracking-[-0.02em]">
              Recognised, selected, and{" "}
              <span className="font-serif italic text-accent">certified</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="label mt-8 inline-flex items-center gap-2 transition-colors hover:text-accent"
            >
              See all on LinkedIn ↗
            </a>
          </Reveal>
        </div>

        <div className="space-y-12 md:col-span-8 md:space-y-14">
          {achievements.map((group) => (
            <div key={group.title}>
              <Reveal>
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  {group.title}
                </h3>
              </Reveal>
              <div className="mt-5 border-t border-line">
                {group.items.map((item, i) => (
                  <Reveal key={item.title} delay={i * 0.04}>
                    <div className="grid grid-cols-1 gap-2 border-b border-line py-6 md:grid-cols-12 md:gap-6">
                      <p className="label md:col-span-3 md:pt-1">{item.year}</p>
                      <div className="md:col-span-9">
                        <h4 className="font-sans text-base font-medium tracking-tight text-fg">
                          {item.title}
                        </h4>
                        <p className="mt-0.5 text-sm text-fg-muted">
                          {item.issuer}
                        </p>
                        {item.note && (
                          <p className="mt-2 max-w-xl text-sm leading-relaxed text-fg-muted">
                            {item.note}
                          </p>
                        )}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
