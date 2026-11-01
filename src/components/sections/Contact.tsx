import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { profile } from "@/content/profile";

export function Contact() {
  return (
    <section id="contact" tabIndex={-1} aria-labelledby="contact-title" className="frame mx-auto max-w-6xl px-4 py-24 md:px-8">
      <div className="grid gap-gap md:grid-cols-2">
        <Reveal className="flex flex-col justify-center py-6">
          <p className="kicker">Contact</p>
          <h2 id="contact-title" className="mt-3 text-h2 font-medium">
            Let&apos;s build something together.
          </h2>
          <p className="mt-4 max-w-md text-lg text-ink-muted">
            Research, freelance, or just to talk models — it lands straight in my inbox.
          </p>
          <a href={`mailto:${profile.email}`} className="mt-6 self-start font-medium underline decoration-hair underline-offset-4 hover:decoration-ink">
            {profile.email}
          </a>
        </Reveal>
        <Reveal delay={0.08} className="panel p-6 md:p-8">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
