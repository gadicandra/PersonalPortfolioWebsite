import { Rain } from "@/components/ui/Rain";
import { Reveal } from "@/components/ui/Reveal";
import { RoleRotator } from "@/components/ui/RoleRotator";
import { profile } from "@/content/profile";

/** Poulo's hero: rotating title left, monogram avatar centre, intro right, drizzle behind. */
export function Hero() {
  return (
    <section id="home" tabIndex={-1} aria-labelledby="hero-title" className="relative min-h-svh overflow-hidden">
      <Rain className="absolute inset-0 h-full w-full text-ink-faint/40" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-panel to-transparent" aria-hidden />

      <div className="relative mx-auto grid min-h-svh max-w-6xl items-center gap-10 px-6 pb-16 pt-32 md:grid-cols-[1.1fr_1fr_1fr] md:pt-24">
        <Reveal>
          <h1 id="hero-title" className="text-display font-semibold">
            <RoleRotator roles={profile.roles} />
          </h1>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#about" className="pill pill-ghost">
              About me
            </a>
            <a href="#work" className="pill pill-solid">
              See my work <span aria-hidden>↓</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="order-first mx-auto md:order-none">
          <div
            aria-hidden
            className="grid aspect-square w-48 place-items-center rounded-full bg-panel text-[4.5rem] font-semibold tracking-tighter shadow-[inset_0_0_0_1px_var(--hair)] md:w-64 md:text-[6rem]"
          >
            GA
          </div>
        </Reveal>

        <Reveal delay={0.2} className="flex flex-col gap-4 text-lg">
          <p className="text-ink-muted">Hi, I&apos;m {profile.name.split(" ")[0]}</p>
          <p className="font-medium">{profile.intro}</p>
          <p className="text-ink-muted">
            Information Engineering student at UGM, Yogyakarta — currently an LLM engineering intern at AITF.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
