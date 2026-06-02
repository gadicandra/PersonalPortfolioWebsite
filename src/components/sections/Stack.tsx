import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { stack } from "@/content/stack";

export function Stack() {
  return (
    <Section id="stack" className="py-28 md:py-40">
      <Reveal>
        <Eyebrow index="04">Stack</Eyebrow>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-6 max-w-2xl font-sans text-h2 font-medium leading-tight tracking-[-0.02em]">
          The tools I reach for, from{" "}
          <span className="font-serif italic text-accent">tensors</span> to
          production.
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
        {stack.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.06} className="bg-bg">
            <div className="h-full p-7">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {group.title}
              </h3>
              <ul className="mt-5 space-y-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm leading-relaxed text-fg-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
