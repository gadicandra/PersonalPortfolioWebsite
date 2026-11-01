export type Credential = {
  title: string;
  issuer: string;
  year: string;
  note?: string;
};

export type AchievementGroup = {
  title: string;
  items: Credential[];
};

// Curated from the LinkedIn profile — strongest, most relevant credentials.
// Full list lives at linkedin.com/in/garjita-adicandra.
export const achievements: AchievementGroup[] = [
  {
    title: "Certifications",
    items: [
      {
        title: "Rekayasa Aplikasi LLM Terapan — AITF",
        issuer: "Digital Talent Scholarship · Komdigi",
        year: "2026",
        note: "Applied LLM application engineering track of the AI Talent Factory program.",
      },
      {
        title: "LLM: Dari Teori Hingga Kode — AITF",
        issuer: "Digital Talent Scholarship · Komdigi",
        year: "2026",
      },
      {
        title: "Operasionalisasi LLM — AITF",
        issuer: "Digital Talent Scholarship · Komdigi",
        year: "2026",
      },
      {
        title: "Mastery in Deep Learning",
        issuer: "Kementerian Komunikasi dan Digital",
        year: "2026",
      },
      {
        title: "Deep Learning with PyTorch",
        issuer: "DataCamp",
        year: "2026",
        note: "Transformer Models, Deep Learning for Text, and Deep Learning for Images.",
      },
      {
        title: "Belajar Fundamental Deep Learning",
        issuer: "Dicoding Indonesia",
        year: "2026",
      },
      {
        title: "Back-End Developer Expert with JavaScript",
        issuer: "Dicoding Indonesia",
        year: "2025",
        note: "AWS Backend Academy 2025 — Expert. Jest, Clean Architecture, CI/CD.",
      },
      {
        title: "Supervised Machine Learning: Regression & Classification",
        issuer: "DeepLearning.AI",
        year: "2025",
      },
    ],
  },
  {
    title: "Honors & Awards",
    items: [
      {
        title: "1st Place · Artificial Intelligence",
        issuer: "KMTETI Bootcamp",
        year: "2025",
        note: "Cassava Leaf Disease Detection — later presented at the UGM × University of Malaya summer course.",
      },
      {
        title: "2nd Place · Internet of Things",
        issuer: "KMTETI Bootcamp",
        year: "2025",
        note: "Chili Hub, an AIoT platform for chili farming.",
      },
      {
        title: "Staff of the Year",
        issuer: "KMTETI FT UGM",
        year: "2025",
      },
      {
        title: "Cycle Star of IT Division",
        issuer: "180 Degrees Consulting UGM",
        year: "2026",
      },
      {
        title: "Samsung Innovation Campus — Batch 7",
        issuer: "Samsung",
        year: "2025",
        note: "Selected through to Final Mentoring with Chili Hub, an AIoT solution for chili farming.",
      },
      {
        title: "Kaltim Tuntas Scholarship (Stimulan)",
        issuer: "Dinas Pendidikan & Kebudayaan Kalimantan Timur",
        year: "2022 — 2024",
        note: "Three-time awardee.",
      },
      {
        title: "2nd Place · Olimpiade Sains Nasional (Mathematics, Regional)",
        issuer: "Kemendikbud RI",
        year: "2023",
      },
    ],
  },
];
