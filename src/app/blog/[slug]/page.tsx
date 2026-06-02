import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, formatDate } from "@/lib/posts";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt };
}

// Minimal prose renderer: `## ` → heading, blank line → paragraph break.
function Prose({ content }: { content: string }) {
  const blocks = content.split("\n\n");
  return (
    <div className="mt-12 max-w-2xl space-y-6">
      {blocks.map((block, i) => {
        if (block.startsWith("## ")) {
          return (
            <h2
              key={i}
              className="pt-6 font-sans text-2xl font-medium tracking-tight text-fg"
            >
              {block.replace(/^##\s+/, "")}
            </h2>
          );
        }
        return (
          <p key={i} className="text-lg leading-relaxed text-fg-muted">
            {block}
          </p>
        );
      })}
    </div>
  );
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="mx-auto min-h-svh max-w-7xl px-6 pb-28 pt-36 md:px-10">
      <article className="mx-auto max-w-2xl">
        <Link
          href="/blog"
          className="label inline-flex items-center gap-2 transition-colors hover:text-accent"
        >
          ← Writing
        </Link>

        <p className="label mt-10">{formatDate(post.publishedAt)}</p>
        <h1 className="mt-4 text-balance font-sans text-h1 font-medium leading-[1.02] tracking-[-0.02em]">
          {post.title}
        </h1>

        <ul className="mt-7 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-line px-3 py-1 font-mono text-xs text-fg-muted"
            >
              {t}
            </li>
          ))}
        </ul>

        <Prose content={post.content} />
      </article>
    </main>
  );
}
