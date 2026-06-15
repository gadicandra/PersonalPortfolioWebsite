import { Resend } from "resend";

/**
 * Single Resend client. Email is the only delivery path for contact messages,
 * so this must be configured in production. Kept null when no API key is set
 * (e.g. local dev) — submitContact then returns an error to the visitor.
 */
const apiKey = process.env.RESEND_API_KEY;

export const resend = apiKey ? new Resend(apiKey) : null;

/** Inbox that contact-form notifications land in. */
export const CONTACT_TO =
  process.env.CONTACT_TO_EMAIL ?? "garjitaadicandra@mail.ugm.ac.id";

/**
 * Verified sender. `onboarding@resend.dev` works out of the box but can only
 * deliver to the Resend account owner's own address — swap for an address on
 * your verified domain once deployed.
 */
export const CONTACT_FROM =
  process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>";
