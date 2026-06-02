export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  detail: string;
  tags: string[];
  href?: string;
};

export const projects: Project[] = [
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
  {
    id: "puskesmas",
    title: "Puskesmas Batulicin",
    category: "Freelance · Web",
    year: "2025",
    summary:
      "End-to-end design, build and deployment of a community health center's website.",
    detail:
      "Full ownership from design to production deployment — a real client engagement delivering a public-facing site for a regional health facility.",
    tags: ["Next.js", "TypeScript", "Design", "Deployment"],
    href: "https://github.com/gadicandra/puskesmas-batu-licin",
  },
  {
    id: "ai-research",
    title: "Comparative AI Research",
    category: "Research · ML",
    year: "2025",
    summary:
      "Evaluating image-captioning and content-summarization models with an emphasis on bias mitigation and judge-based scoring.",
    detail:
      "Conducted and presented research comparing captioning/summarization architectures, arguing for advanced LLM judges over naive ground-truth metrics.",
    tags: ["VLM", "Evaluation", "Research", "Transformers"],
    href: "https://github.com/gadicandra/Riset-Pretrain-ImCap-ConSum",
  },
  {
    id: "desk-bot",
    title: "AIoT Desk Bot",
    category: "Hardware · LLM",
    year: "2026",
    summary:
      "A hardware desk companion integrated with Large Language Models — design and development plan.",
    detail:
      "Bridges embedded control and conversational AI: a physical desk bot driven by an LLM backend for ambient, on-desk assistance.",
    tags: ["LLM", "STM32", "Embedded", "AIoT"],
  },
];
