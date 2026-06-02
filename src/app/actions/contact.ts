"use server";

import { randomUUID } from "node:crypto";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { resend, CONTACT_TO, CONTACT_FROM } from "@/lib/resend";
import { contactSchema, type ContactInput, type ContactState } from "@/lib/validation";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

/**
 * Email me the submission. Best-effort: the DB row is the source of truth, so
 * a delivery failure is logged but never fails the visitor's submission.
 * `replyTo` is the sender's address, so hitting Reply answers them directly.
 */
async function notify({ name, email, message }: ContactInput) {
  if (!resend) {
    console.warn(
      "[contact] RESEND_API_KEY not set — message saved to DB only, no email sent.",
    );
    return;
  }

  try {
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

    if (error) console.error("[contact] resend send error:", error);
  } catch (err) {
    console.error("[contact] email send threw:", err);
  }
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
    await prisma.contactMessage.create({ data: parsed.data });
  } catch (err) {
    console.error("[contact] failed to persist message:", err);
    return {
      status: "error",
      message: "Something went wrong on my end. Please try again in a moment.",
      values: raw,
    };
  }

  // Notify by email (best-effort — never blocks the saved submission).
  await notify(parsed.data);

  return {
    status: "success",
    message: "Thanks — your message landed. I'll get back to you soon.",
  };
}
