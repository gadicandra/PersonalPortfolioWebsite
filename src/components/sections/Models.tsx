import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { models } from "@/content/models";

export function Models() {
  return (
    <Section id="models" className="py-28 md:py-40">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal>
            <Eyebrow index="02">Published Models</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 max-w-xl font-sans text-h2 font-medium leading-tight tracking-[-0.02em]">
              Fine-tuned and shipped to{" "}
              <span className="font-serif italic text-accent">Hugging Face</span>.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <a
            href="https://huggingface.co/Adicandra"
            target="_blank"
            rel="noreferrer"
            className="label inline-flex items-center gap-2 transition-colors hover:text-accent"
          >
            @Adicandra ↗
          </a>
        </Reveal>
      </div>

      <div className="mt-14 border-t border-line">
        {models.map((m, i) => (
          <Reveal key={m.id} delay={i * 0.06}>
            <a
              href={m.href}
              target="_blank"
              rel="noreferrer"
              className="group grid grid-cols-1 gap-6 border-b border-line py-8 transition-colors hover:bg-bg-raised/40 md:grid-cols-12 md:items-center md:gap-8 md:px-4"
            >
              <div className="md:col-span-1">
                <span className="font-mono text-sm text-fg-faint">
                  0{i + 1}
                </span>
              </div>

              <div className="md:col-span-5">
                <h3 className="font-sans text-xl font-medium tracking-tight transition-colors group-hover:text-accent md:text-2xl">
                  {m.name}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-fg-muted">
                  {m.summary}
                </p>
              </div>

              <div className="md:col-span-3">
                <p className="label normal-case tracking-normal text-fg-faint">
                  Base
                </p>
                <p className="mt-1 break-all font-mono text-xs text-fg-muted">
                  {m.base}
                </p>
              </div>

              <div className="flex items-center justify-between md:col-span-3 md:flex-col md:items-end md:justify-center md:gap-3">
                <ul className="flex flex-wrap gap-2 md:justify-end">
                  {m.technique.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-fg-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <span className="label whitespace-nowrap">
                  {m.downloads} downloads
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
