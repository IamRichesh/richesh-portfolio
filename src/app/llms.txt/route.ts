import {
  SITE_URL,
  capabilities,
  certifications,
  experience,
  navItems,
  person,
  projects,
  socials,
  focus,
} from "@/content/profile";

export const dynamic = "force-static";

const month = (ym: string | null) => {
  if (!ym) return "Present";
  const [y, m] = ym.split("-").map(Number);
  if (!m) return String(y);
  return new Date(Date.UTC(y, m - 1)).toLocaleString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });
};

/** llms.txt (llmstxt.org): a clean Markdown brief for LLM agents, built from the same content as the UI. */
export function GET() {
  const body = `# ${person.name}

> ${person.summary}

${person.name} (${person.legalName}) is a ${person.jobTitle} at ${person.employer}, based in ${person.workLocation}. In security operations since February 2022 (${person.yearsInSecurityOps} years). Currently extending SOC experience into AI security.

## Capabilities

${capabilities.map((c) => `- **${c.term}**: ${c.plain} Tools: ${c.tools.join(", ")}.`).join("\n")}

## Experience

${experience.map((e) => `- **${e.role}**, ${e.org} (${month(e.start)} – ${month(e.end)}): ${e.summary}`).join("\n")}

## Projects

${projects.map((p) => `- **${p.title}** (${p.kind}; ${p.status}, ${p.period})${p.href ? ` — ${p.href}` : ""}: ${p.summary}`).join("\n")}

## Current focus

${focus.map((f) => `- ${f.state} / ${f.mode}: **${f.title}** — ${f.line}`).join("\n")}

## Contact

No public email. Reach ${person.name} through LinkedIn messages: ${socials[0].href}

## Certifications

${certifications.map((c) => `- ${c.name} — ${c.issuer}, ${c.year}`).join("\n")}

## Education

- ${person.education.name}, ${person.education.location} (${person.education.year})

## Pages

${navItems.map((n) => `- [${n.label}](${SITE_URL}${n.href === "/" ? "" : n.href})`).join("\n")}

## Profiles

${socials.map((s) => `- [${s.label}](${s.href})`).join("\n")}

## Optional

- [Sitemap](${SITE_URL}/sitemap.xml)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
