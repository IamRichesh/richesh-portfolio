/**
 * Single source of truth for every fact on the site.
 * The UI, the JSON-LD graph and /llms.txt all read from here, so a human visitor,
 * a search crawler and an LLM agent always see the same, consistent claims.
 * Facts mirror the live richesh.top content — keep them conservative and verifiable.
 */

export const SITE_URL = "https://www.richesh.top";

export const person = {
  name: "Richesh Yadav",
  legalName: "Yadav Richesh Kumar",
  initials: "RY",
  jobTitle: "Security Operations Consultant",
  employer: "Atos Group (Eviden)",
  workLocation: "Pune, Maharashtra, India",
  careerStart: "2022-02",
  yearsInSecurityOps: "4+",
  /** One sentence an answer engine can quote verbatim. */
  summary:
    "Richesh Yadav is a security operations consultant at Atos Group (Eviden) who investigates security incidents, runs phishing response, coordinates endpoint containment, and turns findings into clear, decision-ready reports.",
  /** The machine-readable subtitle under the hero headline. */
  statement:
    "I investigate security incidents, lead phishing response, and coordinate endpoint containment — and I'm building toward AI and LLM security with hands-on AI development experience.",
  education: {
    name: "Swami Ramanand Teerth Marathwada University",
    location: "Nanded, Maharashtra",
    year: "2021",
  },
  alumniOf: "Swami Ramanand Teerth Marathwada University",
} as const;

export const contactEmail = "yadavricheshkumar@gmail.com";

export const socials = [
  {
    label: "LinkedIn",
    handle: "richeshkumaryadav",
    href: "https://www.linkedin.com/in/richeshkumaryadav/",
  },
  {
    label: "Instagram",
    handle: "@richesh_arya",
    href: "https://www.instagram.com/richesh_arya/",
  },
] as const;

/** Roles worth a conversation now, ordered by how directly they build on current SOC experience. */
export const targetRoles = [
  "Generative AI Security Consultant",
  "Prompt & LLM Security Architect",
  "Cloud AI Security Specialist",
  "AI Governance & Compliance Lead",
] as const;

export const certifications = [
  { name: "CompTIA Security+ (SY0-601)", issuer: "CompTIA", year: "2023" },
  { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", year: "2024" },
] as const;

/** The four-stage SOC workflow every capability belongs to. */
export const stages = [
  { id: "monitor", verb: "Monitor", title: "Review the signal", line: "Review security events and platform signals with operational context." },
  { id: "investigate", verb: "Investigate", title: "Validate the activity", line: "Follow the available evidence from the first alert through investigation and escalation." },
  { id: "contain", verb: "Contain", title: "Coordinate the response", line: "Take or coordinate authorised containment and remediation actions." },
  { id: "report", verb: "Report", title: "Keep the record clear", line: "Document incidents and operational activity in a direct, decision-ready format." },
] as const;

/** Each capability pairs the technical term with a plain-language explanation. */
export const capabilities = [
  {
    id: "monitor",
    stage: "monitor",
    term: "Security monitoring (SIEM)",
    plain: "Watching security alerts and system logs to spot activity that needs a closer look.",
    tools: ["IBM QRadar", "Microsoft Sentinel", "Microsoft Defender", "Threat intelligence"],
  },
  {
    id: "investigate",
    stage: "investigate",
    term: "Incident investigation",
    plain: "Following the evidence behind an alert to decide whether it is a real threat.",
    tools: ["IOC analysis", "Endpoint investigation", "Recorded Future", "Escalation"],
  },
  {
    id: "phishing",
    stage: "investigate",
    term: "Phishing response",
    plain: "Confirming whether a suspicious email is malicious and containing the damage if it is.",
    tools: ["Email analysis", "Microsoft Defender", "User impact review"],
  },
  {
    id: "contain",
    stage: "contain",
    term: "Endpoint containment (EDR)",
    plain: "Isolating an affected computer so a threat cannot spread, with proper authorisation.",
    tools: ["CrowdStrike Falcon", "Carbon Black", "Host quarantine"],
  },
  {
    id: "dlp",
    stage: "contain",
    term: "Data loss prevention (DLP)",
    plain: "Reviewing and handling authorised requests around rules that stop sensitive data leaving.",
    tools: ["Trellix", "Policy exceptions", "Data-owner coordination"],
  },
  {
    id: "report",
    stage: "report",
    term: "Security reporting",
    plain: "Turning incidents and alert trends into clear reports that leaders can act on.",
    tools: ["Monthly matrix reporting", "Investigation write-ups", "Stakeholder updates"],
  },
] as const;

export const experience = [
  {
    role: "AI-assisted building & AI security foundations",
    org: "Independent",
    location: "Self-directed",
    start: "2026",
    end: null,
    summary:
      "Exploring how AI tools support practical problem-solving and product prototyping. Built the Orbit interactive prototype through an AI-assisted process and began a structured learning path toward AI automation and AI security.",
    stack: ["AI-assisted development", "Prototyping", "AI automation", "AI security foundations"],
  },
  {
    role: "Consultant — Security Operations",
    org: "Atos Group (Eviden)",
    location: "Pune, India",
    start: "2025-02",
    end: null,
    summary:
      "Phishing investigation, incident coordination, endpoint containment, authorised DLP-request handling, reporting and cross-team communication for a client security environment. Personally handles about 4–5 confirmed phishing cases per month.",
    stack: ["Microsoft Defender", "CrowdStrike Falcon", "Trellix"],
  },
  {
    role: "Information Security Analyst",
    org: "TSYS Card Tech",
    location: "Pune, India",
    start: "2022-08",
    end: "2025-02",
    summary:
      "Investigated and closed security alerts in a large payments environment, with peak personal queues of roughly 80–100 alerts a day, converting relevant findings into cases and tickets.",
    stack: ["Carbon Black", "Recorded Future", "Microsoft Sentinel", "IOC handling"],
  },
  {
    role: "SOC — SIEM Admin / Associate",
    org: "SecurityHQ",
    location: "India",
    start: "2022-02",
    end: "2022-08",
    summary:
      "24/7 rotational SIEM administration, platform monitoring, log-source troubleshooting and QRadar health reporting for a team supporting 100+ client environments.",
    stack: ["IBM QRadar", "SIEM administration", "Log sources", "Reporting"],
  },
] as const;

export const quickFacts = [
  { label: "Role", value: `${person.jobTitle} at ${person.employer}` },
  { label: "Experience", value: `${person.yearsInSecurityOps} years in security operations (since Feb 2022)` },
  { label: "Core work", value: "Incident investigation · Phishing response · Endpoint containment · SIEM · Reporting" },
  { label: "Platforms", value: "IBM QRadar · Microsoft Sentinel · Microsoft Defender · CrowdStrike Falcon · Carbon Black · Trellix" },
  { label: "Certifications", value: certifications.map((c) => `${c.name} (${c.year})`).join(" · ") },
  { label: "Location", value: "Pune, Maharashtra, India" },
  { label: "Current focus", value: "AI security — OWASP LLM guidance and MITRE ATLAS" },
] as const;

export const navItems = [
  { href: "/", label: "Home", index: "00" },
  { href: "/work", label: "Work", index: "01" },
  { href: "/services", label: "Services", index: "02" },
  { href: "/about", label: "About", index: "03" },
  { href: "/contact", label: "Contact", index: "04" },
] as const;

/** Facts mirror the live richesh.top write-ups — no invented metrics or features. */
export const projects = [
  {
    id: "orbit",
    title: "Orbit",
    kind: "Interactive prototype",
    status: "Live prototype",
    period: "2026",
    tagline: "Your life, connected.",
    summary:
      "A visual prototype for organising manually entered goals, habits, tasks, finance records, journal entries and daily wellbeing check-ins in one personal command center.",
    facts: [
      { k: "Built in", v: "10 days, AI-assisted" },
      { k: "Spaces", v: "Finance · Body · Journal · Habits & tasks" },
      { k: "Data", v: "Demonstration records with basic cloud persistence" },
      { k: "AI", v: "Not connected yet — intelligence and automation planned" },
    ],
    tags: ["AI-assisted development", "Product prototyping", "Privacy controls"],
    href: "https://orbit.richesh.top",
  },
  {
    id: "finance-intelligence-workspace",
    title: "Finance Intelligence Workspace",
    kind: "Personal finance",
    status: "In progress",
    period: "Ongoing",
    tagline: "Long-term financial visibility.",
    summary:
      "A developing workspace for daily expense tracking, categorisation, monthly ledgers, investment planning and long-term financial visibility. AI-assisted analysis remains a planned capability.",
    facts: [],
    tags: ["Expense tracking", "Monthly ledgers", "Investment planning"],
    href: null,
  },
  {
    id: "internal-workflow-automation",
    title: "Internal Workflow Automation",
    kind: "TSYS · Confidential",
    status: "Completed",
    period: "2022–2025",
    tagline: "One workflow, every dashboard.",
    summary:
      "An internal TSYS script that opened multiple operational dashboards through one workflow, reducing repetitive setup for analyst work. The implementation stays private because it belongs to an internal environment.",
    facts: [],
    tags: ["Scripting", "Analyst workflow", "SOC operations"],
    href: null,
  },
] as const;

/** Where the work is heading, stated without overstating the transition. */
export const focus = [
  { state: "Now", mode: "Operating", title: "Incident investigation & response", line: "Phishing analysis, alert validation, endpoint investigation, containment and coordination." },
  { state: "Now", mode: "Deepening", title: "Security operations workflows", line: "Task ownership, investigation handoffs, recurring reporting and decision clarity." },
  { state: "Active", mode: "Building", title: "AI-assisted prototyping", line: "Using AI tools to structure ideas, develop prototypes and explore repeatable automation." },
  { state: "Next", mode: "Specialising", title: "AI & LLM security", line: "Structured study of AI-system risks, OWASP guidance and MITRE ATLAS." },
] as const;

export const knowsAbout = [
  "Security Operations",
  "Security Operations Center (SOC)",
  "Incident Response",
  "Incident Investigation",
  "Phishing Response",
  "Endpoint Detection and Response (EDR)",
  "SIEM",
  "IBM QRadar",
  "Microsoft Sentinel",
  "Microsoft Defender",
  "CrowdStrike Falcon",
  "Carbon Black",
  "Data Loss Prevention",
  "Threat Intelligence",
  "Security Reporting",
  "AI Security",
  "LLM Security",
  "Prompt Injection",
  "Jailbreak Detection",
  "Adversarial Prompts",
  "LLM Red Teaming",
  "AI Threat Modeling",
  "Prompt Security",
  "AI Governance",
  "AI-Assisted Development",
];
