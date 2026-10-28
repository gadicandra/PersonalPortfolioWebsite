import type { StaticImageData } from "next/image";
import img180dc from "./media/180dc.webp";
import imgFindit from "./media/findit.webp";
import imgNgambis from "./media/ngambis.webp";

export type Discipline = "web" | "ai" | "iot";

export type Project = {
  /** URL slug for /work/[id]. */
  id: string;
  discipline: Discipline;
  image?: StaticImageData;
  title: string;
  category: string;
  year: string;
  summary: string;
  detail: string;
  tags: string[];
  href?: string;
  linkLabel?: string;
};

export const projects: Project[] = [
  {
    id: "180dc-ugm",
    discipline: "web",
    image: img180dc,
    title: "180DC UGM",
    category: "Web · AI RAG",
    year: "2025",
    summary:
      "Built Eighty, a RAG-based AI assistant that helps clients and visitors learn about 180 Degrees Consulting UGM.",
    detail:
      "Beyond Eighty, I shipped the event pages and their registration flows, a merch purchase form, and led the migration from JavaScript to TypeScript and from earlier Tailwind to Tailwind v4.",
    tags: ["Next.js", "TypeScript", "RAG", "Tailwind v4"],
    href: "https://www.180dcugm.com/",
    linkLabel: "Visit site",
  },
  {
    id: "find-it-ugm",
    discipline: "web",
    image: imgFindit,
    title: "Find IT UGM",
    category: "Web · Event Platform",
    year: "2025",
    summary:
      "Built the event platform end to end — a GSAP-driven homepage plus participant and admin dashboards.",
    detail:
      "From a motion-rich landing page to the participant-facing dashboard and the admin control surface behind it, covering the full registration and management experience.",
    tags: ["Next.js", "GSAP", "Dashboard", "TypeScript"],
    href: "https://www.find-it.id/",
    linkLabel: "Visit site",
  },
  {
    id: "ngambis",
    discipline: "web",
    image: imgNgambis,
    title: "Ngambis.id",
    category: "Freelance · EdTech",
    year: "2025",
    summary:
      "A freelance build helping students reach equal access to education and chase their ambitions.",
    detail:
      "An education platform aimed at leveling the playing field for school students — giving them the same access to opportunities and the resources to pursue their goals.",
    tags: ["Next.js", "TypeScript", "EdTech"],
    href: "https://ngambis.id/",
    linkLabel: "Visit site",
  },
  {
    id: "puskesmas",
    discipline: "web",
    title: "Puskesmas Batulicin",
    category: "Freelance · Web",
    year: "2026",
    summary:
      "An informational site for a community health center — emergency numbers, general info, service flow, and vaccine availability.",
    detail:
      "A public-facing information website for a regional health facility, currently in the design phase. Focused on giving the community quick access to emergency contacts, service procedures, and vaccine stock.",
    tags: ["Next.js", "Design", "In Progress"],
  },
  {
    id: "chili-hub",
    discipline: "iot",
    title: "Chili Hub",
    category: "AIoT · Agriculture",
    year: "2025",
    summary:
      "An AIoT platform for chili farming built for Samsung Innovation Campus Batch 7, taken through to final mentoring.",
    detail:
      "Sensor-driven monitoring and decision support focused on food agriculture, pairing embedded hardware with a web dashboard for growers.",
    tags: ["AIoT", "Next.js", "TypeScript", "Embedded"],
    href: "https://github.com/gadicandra/Chili-Hub-solusi-Pertanian-Cabai-Anda",
  },
];

export const getProject = (id: string) => projects.find((p) => p.id === id);
