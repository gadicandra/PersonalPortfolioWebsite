export type Project = {
  id: string;
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
