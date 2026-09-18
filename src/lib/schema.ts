import {
  SITE_URL,
  capabilities,
  certifications,
  contactEmail,
  experience,
  knowsAbout,
  person,
  projects,
  socials,
} from "@/content/profile";

const PERSON_ID = `${SITE_URL}/#person`;
const SITE_ID = `${SITE_URL}/#website`;

export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        url: SITE_URL,
        name: person.name,
        description: person.summary,
        inLanguage: "en",
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile`,
        url: SITE_URL,
        name: `${person.name} — ${person.jobTitle}`,
        isPartOf: { "@id": SITE_ID },
        mainEntity: { "@id": PERSON_ID },
        dateModified: new Date().toISOString().slice(0, 10),
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: person.name,
        alternateName: person.legalName,
        url: SITE_URL,
        image: `${SITE_URL}/opengraph-image`,
        description: person.summary,
        jobTitle: person.jobTitle,
        worksFor: { "@type": "Organization", name: person.employer },
        homeLocation: { "@type": "Place", name: person.workLocation },
        workLocation: { "@type": "Place", name: person.workLocation },
        alumniOf: { "@type": "CollegeOrUniversity", name: person.alumniOf },
        knowsAbout,
        sameAs: socials.map((s) => s.href),
        hasCredential: certifications.map((c) => ({
          "@type": "EducationalOccupationalCredential",
          name: c.name,
          credentialCategory: "certification",
          recognizedBy: { "@type": "Organization", name: c.issuer },
          dateCreated: c.year,
        })),
        hasOccupation: {
          "@type": "Occupation",
          name: person.jobTitle,
          occupationLocation: { "@type": "Country", name: "India" },
          skills: capabilities.map((c) => c.term).join(", "),
        },
        makesOffer: capabilities.map((c) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: c.term,
            description: c.plain,
            provider: { "@id": PERSON_ID },
          },
        })),
      },
      ...experience.map((e, i) => ({
        "@type": "OrganizationRole",
        "@id": `${SITE_URL}/#role-${i}`,
        roleName: e.role,
        startDate: e.start,
        ...(e.end ? { endDate: e.end } : {}),
        description: e.summary,
        member: { "@id": PERSON_ID },
        memberOf: { "@type": "Organization", name: e.org },
      })),
    ],
  };
}

export function projectsGraph() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Selected work by ${person.name}`,
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": p.href ? "WebApplication" : "CreativeWork",
        "@id": `${SITE_URL}/work#${p.id}`,
        name: p.title,
        description: p.summary,
        genre: p.kind,
        creativeWorkStatus: p.status,
        keywords: p.tags.join(", "),
        author: { "@id": PERSON_ID },
        ...(p.href ? { url: p.href, applicationCategory: "LifestyleApplication", operatingSystem: "Web" } : {}),
      },
    })),
  };
}

export function contactGraph() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: `${SITE_URL}/contact`,
    name: `Contact ${person.name}`,
    mainEntity: {
      "@id": PERSON_ID,
      "@type": "Person",
      name: person.name,
      contactPoint: [
        { "@type": "ContactPoint", contactType: "professional enquiries", email: contactEmail },
        { "@type": "ContactPoint", contactType: "professional enquiries", url: socials[0].href },
      ],
    },
  };
}

/** Serialise safely for an inline <script> (see Next.js JSON-LD guide). */
export function toJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
