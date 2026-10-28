import { Reveal } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { ContactForm } from "@/components/sections/ContactForm";

export function Contact() {
  return (
    <section id="contact" tabIndex={-1} aria-labelledby="contact-title" className="grid gap-gap px-3 md:grid-cols-2 md:px-7">
      <Reveal className="card flex flex-col justify-center px-6 py-14 md:px-10">
        <p className="label text-ink-muted">Contact</p>
        <SplitHeading id="contact-title" className="display mt-4 text-h1">
          <em>let&apos;s</em>Build<em>something</em> Together
        </SplitHeading>
        <p className="mt-6 max-w-sm text-ink-muted">
          Research, freelance, or just to talk models — it lands straight in my inbox.
        </p>
      </Reveal>
      <Reveal delay={0.06} className="card px-6 py-10 md:px-10">
        <ContactForm />
      </Reveal>
    </section>
  );
}
