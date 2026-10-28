import { Hero } from "@/components/sections/Hero";
import { Featured } from "@/components/sections/Featured";
import { Work } from "@/components/sections/Work";
import { Models } from "@/components/sections/Models";
import { Experience } from "@/components/sections/Experience";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Marquee } from "@/components/ui/Marquee";

export default function Home() {
  return (
    <>
      <main id="main" className="flex flex-col gap-gap">
        <Hero />
        <Featured />
        <div className="px-3 md:px-7">
          <Marquee word="Work" />
        </div>
        <Work />
        <Models />
        <Experience />
        <div className="px-3 md:px-7">
          <Marquee word="Awards" />
        </div>
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
