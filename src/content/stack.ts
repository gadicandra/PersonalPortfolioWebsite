export type StackGroup = {
  title: string;
  items: string[];
};

export const stack: StackGroup[] = [
  {
    title: "AI / Machine Learning",
    items: [
      "Fine-tuning (SFT, LoRA)",
      "VLM / LLM architectures",
      "Qwen-VL · Gemma · LLaVA · BART",
      "HuggingFace · Transformers · PEFT",
      "Unsloth · TRL",
      "Model evaluation & bias mitigation",
      "Image captioning",
    ],
  },
  {
    title: "Full-Stack Web",
    items: [
      "Next.js (App Router)",
      "TypeScript · React",
      "Tailwind CSS · GSAP",
      "Node.js · REST APIs",
      "Supabase · Prisma · Payload CMS",
      "PostgreSQL",
    ],
  },
  {
    title: "Embedded & Systems",
    items: [
      "C / C++",
      "STM32 · STM32CubeMonitor",
      "Interrupts · ADC · GPIO",
      "Hardware/software integration",
      "AIoT pipelines",
    ],
  },
  {
    title: "Data & Tooling",
    items: [
      "SQL (DDL / DML / complex joins)",
      "Database design",
      "Docker · AWS",
      "Git / GitHub",
      "Data-driven project management",
    ],
  },
];
