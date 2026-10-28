import { z } from "zod";

export const contactSchema = z.object({
  // Name lands in the email subject — flatten CR/LF so it can't fake headers.
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(120)
    .transform((s) => s.replace(/[\r\n]+/g, " ")),
  email: z.email("Enter a valid email address"),
  message: z
    .string()
    .trim()
    .min(10, "Tell me a little more — at least 10 characters")
    .max(4000, "That's a bit long (max 4000 characters)"),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Humans don't fill a field they can't see, or submit in under 3 seconds. */
export const MIN_FILL_MS = 3000;

// ponytail: honeypot + fill timer stop dumb bots only. Add Vercel BotID or
// Turnstile when real spam shows up. A missing timer (no-JS visitor) passes.
export function looksLikeBot(
  honeypot: string,
  startedAt: string,
  now = Date.now(),
): boolean {
  if (honeypot.trim() !== "") return true;
  const t = Number(startedAt);
  return startedAt !== "" && Number.isFinite(t) && now - t < MIN_FILL_MS;
}

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<keyof ContactInput, string[]>>;
  values?: Partial<ContactInput>;
};

export const initialContactState: ContactState = { status: "idle" };
