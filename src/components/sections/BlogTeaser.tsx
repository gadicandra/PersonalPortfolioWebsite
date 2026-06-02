import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { formatDate, type PostMeta } from "@/lib/posts";

export function BlogTeaser({ posts }: { posts: PostMeta[] }) {
  return (
    <Section id="writing" className="py-28 md:py-40">
      <div className="flex items-end justify-between">
        <Reveal>
          <Eyebrow index="05">Writing</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <Link
            href="/blog"
            className="label transition-colors hover:text-accent"
          >
            All posts →
          </Link>
        </Reveal>
      </div>

      <Reveal delay={0.05}>
        <h2 className="mt-6 max-w-xl font-sans text-h2 font-medium leading-tight tracking-[-0.02em]">
          Notes on{" "}
          <span className="font-serif italic text-accent">ML & the web</span>.
        </h2>
      </Reveal>

      <div className="mt-14 border-t border-line">
        {posts.length === 0 ? (
          <p className="py-10 text-fg-muted">First post coming soon.</p>
        ) : (
          posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.06}>
              <Link
                href={`/blog/${post.slug}`}
                className="group grid grid-cols-1 gap-4 border-b border-line py-8 transition-colors hover:bg-bg-raised/40 md:grid-cols-12 md:gap-8 md:px-4"
              >
                <p className="label md:col-span-3 md:pt-1">
                  {formatDate(post.publishedAt)}
                </p>
                <div className="md:col-span-7">
                  <h3 className="text-balance font-sans text-xl font-medium tracking-tight transition-colors group-hover:text-accent md:text-2xl">
                    {post.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-fg-muted">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-start justify-end md:col-span-2">
                  <span className="font-mono text-fg-faint transition-all group-hover:translate-x-1 group-hover:text-accent">
                    ↗
                  </span>
                </div>
              </Link>
            </Reveal>
          ))
        )}
      </div>
    </Section>
  );
}
