import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on machine learning, model fine-tuning, and the web.",
};

export default async function BlogIndex() {
  const posts = await getAllPosts();

  return (
    <main className="mx-auto min-h-svh max-w-7xl px-6 pb-28 pt-36 md:px-10">
      <Eyebrow index="05">Writing</Eyebrow>
      <h1 className="mt-6 max-w-2xl font-sans text-h1 font-medium leading-[0.95] tracking-[-0.02em]">
        Notes on <span className="font-serif italic text-accent">ML</span> & the
        web.
      </h1>

      <div className="mt-16 border-t border-line">
        {posts.length === 0 ? (
          <p className="py-10 text-fg-muted">First post coming soon.</p>
        ) : (
          posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group grid grid-cols-1 gap-4 border-b border-line py-10 transition-colors hover:bg-bg-raised/40 md:grid-cols-12 md:gap-8 md:px-4"
            >
              <p className="label md:col-span-3 md:pt-1">
                {formatDate(post.publishedAt)}
              </p>
              <div className="md:col-span-9">
                <h2 className="text-balance font-sans text-2xl font-medium tracking-tight transition-colors group-hover:text-accent md:text-3xl">
                  {post.title}
                </h2>
                <p className="mt-3 max-w-2xl leading-relaxed text-fg-muted">
                  {post.excerpt}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-line px-3 py-1 font-mono text-xs text-fg-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))
        )}
      </div>

      <Link
        href="/"
        className="label mt-16 inline-flex items-center gap-2 transition-colors hover:text-accent"
      >
        ← Back home
      </Link>
    </main>
  );
}
