import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

// Standalone script (run via tsx) — relative import + its own env load.
try {
  process.loadEnvFile();
} catch {
  // env provided by the runtime (Docker)
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const post = {
  slug: "fine-tuning-qwen3-5-for-indonesian-image-captioning",
  title: "Fine-tuning Qwen3.5-4B for Indonesian Image Captioning",
  excerpt:
    "How I adapted a 4B vision-language model to caption images in Bahasa Indonesia with clean, structured JSON output — and why judge-based evaluation mattered more than the loss curve.",
  tags: ["LLM", "Fine-tuning", "VLM", "LoRA"],
  content: `Most open vision-language models caption beautifully in English and fall apart in Bahasa Indonesia. For a recent project I set out to fix that for a 4B-parameter model — small enough to run cheaply, capable enough to be useful.

## Why LoRA, and why merged

Full fine-tuning a 4B VLM is overkill when the base already understands vision. LoRA adapters let me steer the language behaviour — Indonesian phrasing, structured output — without touching the visual backbone. I merged the adapter back into the base weights afterwards so inference has zero adapter overhead and the model ships as a single artifact on Hugging Face.

## Structured output is a training problem, not a prompting problem

I didn't want free-text captions; I wanted JSON the downstream app could trust. Rather than bolt on a parser and pray, I baked the JSON schema into the training targets. The model learns the shape of the answer, not just its content — far fewer malformed outputs than prompt-only approaches.

## The part everyone skips: evaluation

Here's where most captioning work goes wrong. BLEU against a single ground-truth caption rewards the model for matching one arbitrary phrasing and punishes correct-but-different captions. That's noise, not signal.

I leaned on stronger LLM judges to score captions for faithfulness and fluency, and watched for the failure mode where a model games a weak metric. Mitigating that bias — before it reaches users — did more for real-world quality than another epoch ever would.

## What I'd do next

Scale the judge panel, add adversarial captions to probe hallucination, and push the same recipe to a multitask setup. The model is live on Hugging Face as \`Adicandra/Qwen3.5-4B-ImageCaptioning-LoRA\` — feedback welcome.`,
};

async function main() {
  await prisma.post.upsert({
    where: { slug: post.slug },
    update: {
      title: post.title,
      excerpt: post.excerpt,
      tags: post.tags,
      content: post.content,
    },
    create: post,
  });
  console.log(`✓ Seeded post: ${post.slug}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
