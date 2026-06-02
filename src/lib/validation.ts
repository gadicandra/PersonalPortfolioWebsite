import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.email("Enter a valid email address"),
  message: z
    .string()
    .trim()
    .min(10, "Tell me a little more — at least 10 characters")
    .max(4000, "That's a bit long (max 4000 characters)"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<keyof ContactInput, string[]>>;
  values?: Partial<ContactInput>;
};

export const initialContactState: ContactState = { status: "idle" };
