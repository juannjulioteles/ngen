"use client";

import { site, pages } from "@/content/site";

const { invite } = pages;
const f = invite.fields;

const FIELDS = [
  { name: "name", label: f.name, type: "text", autoComplete: "name", required: true },
  { name: "email", label: f.email, type: "email", autoComplete: "email", required: true },
  { name: "school", label: f.school, type: "text", autoComplete: "organization", required: true },
  { name: "year", label: f.year, type: "text", inputMode: "numeric" as const, required: false },
  { name: "startup", label: f.startup, type: "text", required: false },
  { name: "link", label: f.link, type: "url", autoComplete: "url", required: false },
] as const;

/**
 * There is no backend: the form writes the request as an email and opens the
 * visitor's mail app, addressed to the team. Nothing leaves the page until
 * they press send there.
 */
export function InviteForm() {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    // Optional fields only appear in the email when filled in.
    const optional = (["year", "startup", "link"] as const)
      .filter((k) => get(k))
      .map((k) => `${f[k]}: ${get(k)}`);
    const lines = [
      `${f.name}: ${get("name")}`,
      `${f.email}: ${get("email")}`,
      `${f.school}: ${get("school")}`,
      ...optional,
      "",
      f.building,
      get("building"),
    ];

    const subject = `${invite.subject}: ${get("name")}, ${get("school")}`;
    window.location.href = `mailto:${site.links.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  }

  const input =
    "w-full rounded-lg border border-ink/15 bg-paper px-4 py-3 text-base text-ink outline-none transition-[border-color,box-shadow] placeholder:text-graphite/60 focus:border-ink focus:ring-2 focus:ring-ink/10";

  return (
    <form onSubmit={onSubmit} className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
      {FIELDS.map((field) => (
        <label key={field.name} className="flex flex-col gap-2">
          <span className="text-small">
            {field.label}
            {!field.required && <span className="ml-2 text-graphite">{invite.optional}</span>}
          </span>
          <input
            name={field.name}
            type={field.type}
            required={field.required}
            autoComplete={"autoComplete" in field ? field.autoComplete : undefined}
            inputMode={"inputMode" in field ? field.inputMode : undefined}
            className={input}
          />
        </label>
      ))}
      <label className="flex flex-col gap-2 sm:col-span-2">
        <span className="text-small">{f.building}</span>
        <textarea name="building" required rows={5} className={`${input} resize-y`} />
      </label>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:col-span-2">
        <button type="submit" className="btn btn-ink">
          {invite.submit}
        </button>
        <p className="text-small text-graphite">{invite.submitNote}</p>
      </div>
    </form>
  );
}
