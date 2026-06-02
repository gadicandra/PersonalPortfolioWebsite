export const profile = {
  name: "Garjita Adicandra",
  shortName: "Adi",
  role: "AI/ML & Full-Stack Engineer",
  location: "Yogyakarta, Indonesia",
  education: "Information Engineering, Universitas Gadjah Mada",
  status: "4th Semester · 3.6 GPA",
  email: "g.adicandra0@gmail.com",

  // Hero — split so the serif accent can be styled independently.
  heroLead: "I build",
  heroAccent: "intelligent systems",
  heroTail: "and the interfaces around them.",

  about: [
    "I'm an Information Engineering student at UGM working at the seam between machine learning and the web — fine-tuning vision-language models one week, shipping a production Next.js app the next.",
    "My focus is rigorous, honest ML: evaluating models with strong judges rather than trusting naive ground truth, and mitigating bias before it reaches users. Off the keyboard, I lead sponsorship and tech teams across student organizations.",
  ],

  socials: [
    { label: "GitHub", handle: "@gadicandra", href: "https://github.com/gadicandra" },
    { label: "Hugging Face", handle: "@Adicandra", href: "https://huggingface.co/Adicandra" },
    { label: "Email", handle: "g.adicandra0@gmail.com", href: "mailto:g.adicandra0@gmail.com" },
  ],

  stats: [
    { value: "3", label: "Published models" },
    { value: "23", label: "Public repos" },
    { value: "5+", label: "Org leadership roles" },
  ],
} as const;
