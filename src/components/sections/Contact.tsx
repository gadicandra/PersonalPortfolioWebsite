import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { profile } from "@/content/profile";

export function Contact() {
  return (
    <Section id="contact" className="py-28 md:py-40">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Reveal>
            <Eyebrow index="06">Contact</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-sans text-h1 font-medium leading-[0.95] tracking-[-0.02em]">
              Let&apos;s build something{" "}
              <span className="font-serif italic text-accent">together</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-sm leading-relaxed text-fg-muted">
              Research, freelance, or just to talk models — drop a line and it
              lands straight in my inbox.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-10 space-y-3">
              {profile.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group inline-flex items-baseline gap-3 transition-colors hover:text-accent"
                  >
                    <span className="label">{s.label}</span>
                    <span className="text-sm text-fg-muted group-hover:text-accent">
                      {s.handle}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
