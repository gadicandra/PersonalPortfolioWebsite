import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { MediaCard } from "@/components/ui/MediaCard";
import { Footer } from "@/components/sections/Footer";
import { getProject, projects } from "@/content/projects";

// Unknown slugs 404 instead of rendering on demand.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: `/work/${p.id}` },
    openGraph: { title: p.title, description: p.summary, ...(p.image && { images: [p.image.src] }) },
  };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];

  return (
    <>
      <main id="main" className="flex flex-col gap-gap px-3 pt-20 md:px-7 md:pt-24">
        <TransitionLink href="/#work" className="link-dash label self-start">
          <span aria-hidden>←</span> All work
        </TransitionLink>

        <header className="card flex flex-col items-center px-6 py-14 text-center md:py-20">
          <p className="label text-ink-muted">
            {p.category} · {p.year}
          </p>
          <SplitHeading as="h1" immediate delay={0.2} className="display mt-4 text-display">
            {p.title}
          </SplitHeading>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">{p.summary}</p>
        </header>

        {p.image && (
          <Reveal className="on-dark relative aspect-[16/10] overflow-hidden rounded-card bg-dark">
            <Image
              src={p.image}
              alt={`${p.title} homepage screenshot`}
              sizes="100vw"
              priority
              placeholder="blur"
              className="h-full w-full object-cover object-top"
            />
          </Reveal>
        )}

        <div className="grid gap-gap md:grid-cols-3">
          <Reveal className="card p-6 md:col-span-2 md:p-10">
            <h2 className="label text-ink-muted">About the project</h2>
            <p className="mt-4 text-xl leading-relaxed">{p.detail}</p>
          </Reveal>
          <Reveal delay={0.06} className="card flex flex-col gap-4 p-6">
            <h2 className="label text-ink-muted">Stack</h2>
            <ul className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <li key={t} className="rounded-full border border-dashed border-line px-3 py-1 font-mono text-xs">
                  {t}
                </li>
              ))}
            </ul>
            {p.href && (
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="link-dash label mt-auto">
                {p.linkLabel ?? "View repository"} <span aria-hidden>↗</span>
              </a>
            )}
          </Reveal>
        </div>

        <section aria-label="Next project" className="h-[50vh] min-h-72">
          <MediaCard
            href={`/work/${next.id}`}
            title={`Next: ${next.title}`}
            meta={next.category}
            image={next.image}
            sizes="100vw"
            className="h-full"
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
