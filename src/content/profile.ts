export const profile = {
  name: "Garjita Adicandra",
  shortName: "Adi",
  role: "AI/ML & Full-Stack Engineer",
  location: "Yogyakarta, Indonesia",
  education: "Information Engineering, Universitas Gadjah Mada",
  status: "4th Semester · 3.6 GPA",
  email: "g.adicandra0@gmail.com",

  // Hero rotator (poulo-style): short, scannable titles.
  roles: ["AI/ML Engineer", "LLM Fine-tuner", "Full-Stack Developer", "VLM Researcher"],
  intro: "I fine-tune vision-language models and build production web apps.",

  about: [
    "I'm an Information Engineering student at UGM working at the seam between machine learning and the web — fine-tuning vision-language models one week, shipping a production Next.js app the next.",
    "My focus is rigorous, honest ML: evaluating models with strong judges rather than trusting naive ground truth, and mitigating bias before it reaches users. Off the keyboard, I lead sponsorship and tech teams across student organizations.",
  ],

  socials: [
    { label: "GitHub", handle: "@gadicandra", href: "https://github.com/gadicandra" },
    { label: "Hugging Face", handle: "@Adicandra", href: "https://huggingface.co/Adicandra" },
    {
      label: "LinkedIn",
      handle: "in/garjita-adicandra",
      href: "https://www.linkedin.com/in/garjita-adicandra/",
    },
    { label: "Email", handle: "g.adicandra0@gmail.com", href: "mailto:g.adicandra0@gmail.com" },
  ],

  linkedin: "https://www.linkedin.com/in/garjita-adicandra/",

  stats: [
    { value: "3", label: "Published models" },
    { value: "20+", label: "Public repos" },
    { value: "5+", label: "Org leadership roles" },
  ],
} as const;
