import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { experience } from "@/content/experience";

export function Experience() {
  return (
    <Section id="experience" className="py-28 md:py-40">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Reveal>
            <Eyebrow index="03">Experience & Leadership</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-xs font-sans text-h2 font-medium leading-tight tracking-[-0.02em]">
              Building teams, not just{" "}
              <span className="font-serif italic text-accent">code</span>.
            </h2>
          </Reveal>
        </div>

        <div className="md:col-span-8">
          <div className="border-t border-line">
            {experience.map((e, i) => (
              <Reveal key={e.org} delay={i * 0.05}>
                <div className="group grid grid-cols-1 gap-2 border-b border-line py-7 md:grid-cols-12 md:gap-6">
                  <p className="label md:col-span-3 md:pt-1">{e.period}</p>
                  <div className="md:col-span-9">
                    <h3 className="font-sans text-lg font-medium tracking-tight text-fg transition-colors group-hover:text-accent">
                      {e.org}
                    </h3>
                    <p className="mt-0.5 text-sm text-fg-muted">{e.role}</p>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-fg-muted">
                      {e.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
