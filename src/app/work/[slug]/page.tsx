import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
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
  const next = projects[(projects.indexOf(p) + 1) % projects.length];

  return (
    <>
      <main id="main" className="frame mx-auto max-w-5xl px-4 pb-24 pt-32 md:px-8">
        <Link href="/#work" className="pill pill-ghost text-sm">
          <span aria-hidden>←</span> All work
        </Link>

        <Reveal className="mt-10">
          <p className="text-ink-muted">
            {p.category} · {p.year}
          </p>
          <h1 className="mt-3 text-display font-semibold">{p.title}.</h1>
          <p className="mt-4 max-w-2xl text-h3 text-ink-muted">{p.hook}</p>
        </Reveal>

        {p.image && (
          <Reveal className="relative mt-12 aspect-[16/10] overflow-hidden rounded-[1.75rem] bg-panel">
            <Image
              src={p.image}
              alt={`${p.title} homepage screenshot`}
              sizes="(min-width: 1024px) 64rem, 100vw"
              priority
              placeholder="blur"
              className="h-full w-full object-cover object-top"
            />
          </Reveal>
        )}

        <div className="mt-gap grid gap-gap md:grid-cols-[1.6fr_1fr]">
          <Reveal className="panel p-6 md:p-8">
            <h2 className="text-xl font-medium">The project</h2>
            <p className="mt-4 text-lg">{p.summary}</p>
            <p className="mt-4 text-ink-muted">{p.detail}</p>
          </Reveal>
          <Reveal delay={0.06} className="panel flex flex-col gap-4 p-6 md:p-8">
            <div>
              <h2 className="text-sm text-ink-muted">Role</h2>
              <p className="font-medium">{p.role}</p>
            </div>
            <div>
              <h2 className="text-sm text-ink-muted">Stack</h2>
              <ul className="mt-2 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <li key={t} className="rounded-full bg-bg px-3 py-1 text-sm shadow-[inset_0_0_0_1px_var(--hair)]">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            {p.href && (
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="pill pill-solid mt-auto self-start">
                {p.linkLabel ?? "View repository"} <span aria-hidden>↗</span>
                <span className="sr-only">(opens in new tab)</span>
              </a>
            )}
          </Reveal>
        </div>

        <ul className="mt-gap grid gap-gap sm:grid-cols-2">
          {p.highlights.map((h, i) => (
            <Reveal as="li" key={h.title} delay={i * 0.05} className="panel p-6">
              <p className="font-medium">{h.title}</p>
              <p className="mt-2 text-ink-muted">{h.body}</p>
            </Reveal>
          ))}
        </ul>

        <Link
          href={`/work/${next.id}`}
          className="panel group mt-16 flex items-center justify-between gap-4 p-6 transition-colors hover:bg-hair md:p-8"
        >
          <span>
            <span className="block text-sm text-ink-muted">Next project</span>
            <span className="text-h3 font-medium">{next.title}</span>
          </span>
          <span aria-hidden className="text-2xl transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </main>
      <Footer />
    </>
  );
}
