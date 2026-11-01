"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitContact } from "@/app/actions/contact";
import { initialContactState } from "@/lib/validation";

const fieldBase =
  "w-full rounded-2xl border bg-bg px-4 py-3 text-ink placeholder:text-ink-faint outline-none transition-colors";
// Non-color cues (for color-vision safety): invalid fields also get a thicker
// ring, and errors are prefixed with a ⚠ glyph + bold weight — never colour alone.
const fieldOk =
  "border-hair hover:border-ink-faint focus:border-ink focus:ring-1 focus:ring-ink";
const fieldError =
  "border-danger border-2 focus:ring-1 focus:ring-danger";

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p
      id={id}
      role="alert"
      className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-danger"
    >
      <span aria-hidden>⚠</span>
      {message}
    </p>
  );
}

export function ContactForm() {
  const [state, action, pending] = useActionState(
    submitContact,
    initialContactState,
  );
  // Stamped after mount (not during render) to avoid a hydration mismatch.
  const startedAt = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (startedAt.current) startedAt.current.value = String(Date.now());
  }, []);

  if (state.status === "success") {
    return (
      <div className="flex min-h-[18rem] flex-col items-start justify-center">
        <span className="grid size-10 place-items-center rounded-full bg-invert text-on-invert" aria-hidden>✓</span>
        <p role="status" className="mt-4 max-w-sm text-h3 font-medium">
          {state.message}
        </p>
      </div>
    );
  }

  const cls = (invalid: boolean, extra = "") =>
    `${fieldBase} ${invalid ? fieldError : fieldOk} mt-2 ${extra}`;

  return (
    <form action={action} className="flex flex-col gap-7" noValidate>
      {/* Bot traps, see looksLikeBot. Hidden from people and screen readers. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedAt} type="hidden" name="startedAt" />

      <div>
        <label htmlFor="name" className="font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          defaultValue={state.values?.name}
          aria-invalid={!!state.errors?.name}
          aria-describedby={state.errors?.name ? "name-error" : undefined}
          className={cls(!!state.errors?.name)}
        />
        {state.errors?.name && (
          <FieldError id="name-error" message={state.errors.name[0]} />
        )}
      </div>

      <div>
        <label htmlFor="email" className="font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@email.com"
          defaultValue={state.values?.email}
          aria-invalid={!!state.errors?.email}
          aria-describedby={state.errors?.email ? "email-error" : undefined}
          className={cls(!!state.errors?.email)}
        />
        {state.errors?.email && (
          <FieldError id="email-error" message={state.errors.email[0]} />
        )}
      </div>

      <div>
        <label htmlFor="message" className="font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="What's on your mind?"
          defaultValue={state.values?.message}
          aria-invalid={!!state.errors?.message}
          aria-describedby={state.errors?.message ? "message-error" : undefined}
          className={cls(!!state.errors?.message, "resize-none")}
        />
        {state.errors?.message && (
          <FieldError id="message-error" message={state.errors.message[0]} />
        )}
      </div>

      {state.status === "error" && state.message && (
        <p
          role="alert"
          className="flex items-center gap-1.5 text-sm font-semibold text-danger"
        >
          <span aria-hidden>⚠</span>
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="pill pill-solid group mt-2 w-fit disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
        {!pending && (
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        )}
      </button>
    </form>
  );
}
