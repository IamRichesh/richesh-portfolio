"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy, LinkedinLogo, WarningCircle } from "@phosphor-icons/react";
import { socials } from "@/content/profile";

const topics = [
  "Security operations",
  "Incident investigation",
  "SIEM",
  "Phishing response",
  "Endpoint security",
  "AI-assisted workflows",
  "AI security",
];

const linkedin = socials[0].href;
const ease = [0.23, 1, 0.32, 1] as const;

type Errors = Partial<Record<"name" | "message", string>>;

/**
 * There is no public inbox, so this drafts a tidy LinkedIn message, copies it,
 * and opens the profile. Nothing is sent to or stored by this site.
 */
export function MessageComposer() {
  const id = useId();
  const [picked, setPicked] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "copied" | "manual">("idle");

  const draft = [
    `Hi Richesh, I'm ${name.trim() || "…"}${org.trim() ? ` from ${org.trim()}` : ""}.`,
    picked.length ? `I'd like to talk about ${picked.join(", ").toLowerCase()}.` : "",
    message.trim(),
  ]
    .filter(Boolean)
    .join("\n\n");

  const toggle = (t: string) => setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!name.trim()) next.name = "Add your name so Richesh knows who is writing.";
    if (message.trim().length < 12) next.message = "Write at least a sentence about what you have in mind.";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(`${id}-${next.name ? "name" : "message"}`)?.focus();
      return;
    }
    const win = window.open(linkedin, "_blank", "noopener,noreferrer");
    try {
      await navigator.clipboard.writeText(draft);
      setStatus("copied");
    } catch {
      setStatus("manual");
    }
    if (!win) window.location.href = linkedin;
  };

  const field =
    "mt-2 w-full rounded-xl border bg-ink/70 px-4 py-3 text-paper placeholder:text-paper/35 transition-[border-color,box-shadow] duration-200 focus:border-signal/70 focus:shadow-[0_0_0_4px_rgb(114_243_223/0.12)] focus:outline-none";

  return (
    <form onSubmit={submit} noValidate className="grid gap-7">
      <fieldset>
        <legend className="text-sm font-medium text-paper">What is it about?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {topics.map((t) => {
            const on = picked.includes(t);
            return (
              <button
                key={t}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(t)}
                className={`inline-flex min-h-11 items-center gap-1.5 rounded-full border px-3.5 py-2.5 text-sm transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.96] ${
                  on ? "border-signal bg-signal text-ink" : "border-line-strong text-paper/75 hover:border-signal/50 hover:text-paper"
                }`}
              >
                {on && <Check size={13} weight="bold" aria-hidden="true" />}
                {t}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium" htmlFor={`${id}-name`}>
          Your name
          <input
            id={`${id}-name`}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((x) => ({ ...x, name: undefined }));
            }}
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${id}-name-err` : undefined}
            className={`${field} ${errors.name ? "border-red-400/70" : "border-line"}`}
            placeholder="Aarav Mehta"
          />
          {errors.name && (
            <span id={`${id}-name-err`} className="mt-2 flex items-center gap-1.5 text-sm font-normal text-red-300">
              <WarningCircle size={15} aria-hidden="true" /> {errors.name}
            </span>
          )}
        </label>
        <label className="block text-sm font-medium" htmlFor={`${id}-org`}>
          Organisation <span className="font-normal text-paper/45">(optional)</span>
          <input
            id={`${id}-org`}
            value={org}
            onChange={(e) => setOrg(e.target.value)}
            autoComplete="organization"
            className={`${field} border-line`}
            placeholder="Where you work"
          />
        </label>
      </div>

      <label className="block text-sm font-medium" htmlFor={`${id}-message`}>
        Message
        <textarea
          id={`${id}-message`}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message) setErrors((x) => ({ ...x, message: undefined }));
          }}
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${id}-message-err` : undefined}
          className={`${field} resize-y ${errors.message ? "border-red-400/70" : "border-line"}`}
          placeholder="A line or two on the problem, the team, or the question."
        />
        {errors.message && (
          <span id={`${id}-message-err`} className="mt-2 flex items-center gap-1.5 text-sm font-normal text-red-300">
            <WarningCircle size={15} aria-hidden="true" /> {errors.message}
          </span>
        )}
      </label>

      <div className="rounded-2xl border border-dashed border-line-strong bg-ink/40 p-5">
        <p className="flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-muted">
          <span>DRAFT PREVIEW</span>
          <span className="tabular">{draft.length} CHARS</span>
        </p>
        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-paper/75">{draft}</p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="group inline-flex items-center gap-3 rounded-full bg-signal py-1.5 pl-5 pr-1.5 text-sm font-semibold text-ink transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-[0_10px_40px_-8px_rgb(114_243_223/0.55)] active:scale-[0.97]"
        >
          Copy draft &amp; open LinkedIn
          <span className="grid size-8 place-items-center rounded-full bg-ink/10 transition-transform duration-300 group-hover:scale-105" aria-hidden="true">
            <LinkedinLogo size={16} weight="fill" />
          </span>
        </button>
        <p className="text-sm text-paper/50">Nothing is sent or stored by this site.</p>
      </div>

      <div aria-live="polite" className="min-h-6">
        <AnimatePresence mode="wait">
          {status !== "idle" && (
            <motion.p
              key={status}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease }}
              className="flex items-center gap-2 text-sm text-signal"
            >
              {status === "copied" ? <Check size={16} weight="bold" aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
              {status === "copied"
                ? "Draft copied. Paste it into a LinkedIn message to Richesh."
                : "Your browser blocked copying. Select the draft preview above and copy it manually."}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
