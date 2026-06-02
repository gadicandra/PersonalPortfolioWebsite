"use client";

import { useActionState } from "react";
import { submitContact } from "@/app/actions/contact";
import { initialContactState } from "@/lib/validation";

const fieldClass =
  "w-full border-b border-line bg-transparent py-3 text-fg placeholder:text-fg-faint outline-none transition-colors focus:border-accent";

export function ContactForm() {
  const [state, action, pending] = useActionState(
    submitContact,
    initialContactState,
  );

  if (state.status === "success") {
    return (
      <div className="flex min-h-[18rem] flex-col items-start justify-center">
        <span className="text-accent">✦</span>
        <p className="mt-4 max-w-sm text-2xl leading-snug tracking-tight">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-7" noValidate>
      <div>
        <label htmlFor="name" className="label">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          defaultValue={state.values?.name}
          aria-invalid={!!state.errors?.name}
          className={`${fieldClass} mt-2`}
        />
        {state.errors?.name && (
          <p className="mt-2 text-sm text-red-400">{state.errors.name[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@email.com"
          defaultValue={state.values?.email}
          aria-invalid={!!state.errors?.email}
          className={`${fieldClass} mt-2`}
        />
        {state.errors?.email && (
          <p className="mt-2 text-sm text-red-400">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="label">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="What's on your mind?"
          defaultValue={state.values?.message}
          aria-invalid={!!state.errors?.message}
          className={`${fieldClass} mt-2 resize-none`}
        />
        {state.errors?.message && (
          <p className="mt-2 text-sm text-red-400">{state.errors.message[0]}</p>
        )}
      </div>

      {state.status === "error" && state.message && (
        <p className="text-sm text-red-400">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="group mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-fg px-7 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent disabled:opacity-60"
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
