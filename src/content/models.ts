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
    id: "imcap-lora",
    name: "Qwen3.5-4B-ImageCaptioning-LoRA",
    task: "Image → Text",
    base: "Qwen/Qwen3.5-4B-Base",
    technique: ["LoRA", "Merged", "VLM"],
    language: "Bahasa Indonesia",
    downloads: 47,
    summary:
      "Vision-language model fine-tuned for Bahasa Indonesia image captioning with structured JSON output.",
    href: "https://huggingface.co/Adicandra/Qwen3.5-4B-ImageCaptioning-LoRA",
  },
  {
    id: "imcap",
    name: "qwen3.5-4b-imcap",
    task: "Image → Text",
    base: "unsloth/Qwen3.5-4B-Base",
    technique: ["Unsloth", "Multimodal"],
    language: "English",
    downloads: 44,
    summary:
      "Image-text-to-text Qwen3.5-4B variant trained with Unsloth for fast, memory-efficient fine-tuning.",
    href: "https://huggingface.co/Adicandra/qwen3.5-4b-imcap",
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
      "Multitask Indonesian LLM for sentiment analysis and summarization — fine-tuned on the AITF/Komdigi CPT base.",
    href: "https://huggingface.co/Adicandra/Qwen3-4B-Multitask",
  },
];
