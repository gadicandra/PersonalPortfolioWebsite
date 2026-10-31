import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { Models } from "@/components/sections/Models";
import { About } from "@/components/sections/About";
import { Stack } from "@/components/sections/Stack";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero />
        <Work />
        <Models />
        <About />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
