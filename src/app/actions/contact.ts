"use server";

import { randomUUID } from "node:crypto";
import { z } from "zod";
import { resend, CONTACT_TO, CONTACT_FROM } from "@/lib/resend";
import {
  contactSchema,
  looksLikeBot,
  type ContactInput,
  type ContactState,
} from "@/lib/validation";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

/**
 * Deliver the submission by email. Email is the source of truth now (no DB),
 * so a failure here surfaces to the visitor as an error and they can retry.
 * `replyTo` is the sender's address, so hitting Reply answers them directly.
 */
async function deliver({ name, email, message }: ContactInput) {
  if (!resend) {
    throw new Error("RESEND_API_KEY is not configured — cannot send message.");
  }

  const { error } = await resend.emails.send({
    from: CONTACT_FROM,
    to: [CONTACT_TO],
    replyTo: email,
    subject: `Portfolio · new message from ${name}`,
    // Unique ref stops Gmail collapsing separate submissions into one thread.
    headers: { "X-Entity-Ref-ID": randomUUID() },
    text: `From: ${name} <${email}>\n\n${message}`,
    html: `
      <div style="font-family:ui-sans-serif,system-ui,sans-serif;max-width:560px;margin:0 auto;color:#111">
        <p style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#888;margin:0 0 16px">
          New portfolio message
        </p>
        <p style="margin:0 0 4px"><strong>${esc(name)}</strong></p>
        <p style="margin:0 0 20px">
          <a href="mailto:${esc(email)}" style="color:#0a7d2c">${esc(email)}</a>
        </p>
        <div style="white-space:pre-wrap;line-height:1.6;border-left:3px solid #ccff00;padding:4px 0 4px 16px">
          ${esc(message)}
        </div>
        <p style="margin:24px 0 0;font-size:12px;color:#aaa">Reply directly to this email to respond.</p>
      </div>`,
  });

  if (error) throw error;
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const success: ContactState = {
    status: "success",
    message: "Thanks — your message landed. I'll get back to you soon.",
  };

  // Fake success so bots get no signal to adapt to.
  if (
    looksLikeBot(
      String(formData.get("company") ?? ""),
      String(formData.get("startedAt") ?? ""),
    )
  ) {
    return success;
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      errors: z.flattenError(parsed.error).fieldErrors,
      values: raw,
    };
  }

  try {
    await deliver(parsed.data);
  } catch (err) {
    console.error("[contact] failed to send message:", err);
    return {
      status: "error",
      message:
        "Something went wrong sending your message. Please try again, or email me directly.",
      values: raw,
    };
  }

  return success;
}
