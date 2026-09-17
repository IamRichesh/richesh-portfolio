import type { MetadataRoute } from "next";
import { SITE_URL, navItems } from "@/content/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...navItems.map((item) => ({
      url: `${SITE_URL}${item.href === "/" ? "" : item.href}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: item.href === "/" ? 1 : 0.8,
    })),
    { url: `${SITE_URL}/llms.txt`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];
}
