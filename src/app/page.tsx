import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Work } from "@/components/sections/Work";
import { Models } from "@/components/sections/Models";
import { Experience } from "@/components/sections/Experience";
import { Stack } from "@/components/sections/Stack";
import { BlogTeaser } from "@/components/sections/BlogTeaser";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { getLatestPosts } from "@/lib/posts";

// Home queries Postgres for latest posts — render at request time.
export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await getLatestPosts(3);

  return (
    <>
      <main>
        <Hero />
        <About />
        <Work />
        <Models />
        <Experience />
        <Stack />
        <BlogTeaser posts={posts} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
