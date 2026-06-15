import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Work } from "@/components/sections/Work";
import { Models } from "@/components/sections/Models";
import { Experience } from "@/components/sections/Experience";
import { Achievements } from "@/components/sections/Achievements";
import { Stack } from "@/components/sections/Stack";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Work />
        <Models />
        <Experience />
        <Achievements />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
