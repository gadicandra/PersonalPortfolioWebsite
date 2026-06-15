export type Model = {
  id: string;
  name: string;
  task: string;
  base: string;
  technique: string[];
  language: string;
  downloads: number;
  summary: string;
  href: string;
};

// Verified from the Hugging Face account @Adicandra. Download counts are a
// point-in-time snapshot (illustrative, not live-fetched).
export const models: Model[] = [
  {
    id: "imcap-connector",
    name: "Qwen3.5-4B-ImCap-LoRA-Connector",
    task: "Image → Text",
    base: "Qwen/Qwen3.5-4B-Base",
    technique: ["LoRA", "Connector", "VLM"],
    language: "Bahasa Indonesia",
    downloads: 31,
    summary:
      "Connector-tuned vision-language model for Bahasa Indonesia image captioning with structured JSON output.",
    href: "https://huggingface.co/Adicandra/Qwen3.5-4B-ImCap-LoRA-Connector",
  },
  {
    id: "imcap-lora",
    name: "Qwen3.5-4B-ImageCaptioning-LoRA",
    task: "Image → Text",
    base: "Qwen/Qwen3.5-4B-Base",
    technique: ["LoRA", "Merged", "VLM"],
    language: "Bahasa Indonesia",
    downloads: 46,
    summary:
      "Vision-language model fine-tuned for Bahasa Indonesia image captioning with structured JSON output.",
    href: "https://huggingface.co/Adicandra/Qwen3.5-4B-ImageCaptioning-LoRA",
  },
  {
    id: "multitask",
    name: "Qwen3-4B-Multitask",
    task: "Text Generation",
    base: "aitf-kpm-ugm/Qwen3-4B-CPT-Base",
    technique: ["SFT", "LoRA", "ChatML"],
    language: "Bahasa Indonesia",
    downloads: 11,
    summary:
      "LoRA-merged SFT of the aitf-kpm-ugm Qwen3-4B CPT base for multitask Bahasa Indonesia NLP — sentiment analysis and summarization in ChatML format.",
    href: "https://huggingface.co/Adicandra/Qwen3-4B-Multitask",
  },
];
