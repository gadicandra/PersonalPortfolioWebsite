import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/content/profile";

export function About() {
  return (
    <Section id="about" className="py-28 md:py-40">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Reveal>
            <Eyebrow index="00">About</Eyebrow>
          </Reveal>
        </div>
        <div className="md:col-span-8">
          {profile.about.map((para, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p
                className={`text-balance text-2xl leading-snug tracking-tight md:text-[2.1rem] ${
                  i === 0 ? "text-fg" : "mt-8 text-fg-muted"
                }`}
              >
                {para}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
