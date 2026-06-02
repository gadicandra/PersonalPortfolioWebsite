import { Resend } from "resend";

/**
 * Single Resend client. Kept null when no API key is configured so the app
 * still runs (contact messages persist to Postgres) — email is additive, not
 * a hard dependency. See submitContact for the graceful-degradation path.
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
