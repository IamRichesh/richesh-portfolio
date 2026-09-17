import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BackgroundScene } from "@/components/scene/BackgroundScene";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SpotlightRoot } from "@/components/ui/SpotlightRoot";
import { SITE_URL, knowsAbout, person } from "@/content/profile";
import { siteGraph, toJsonLd } from "@/lib/schema";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const title = `${person.name} — Security Operations Consultant`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s · ${person.name}` },
  description: person.summary,
  keywords: knowsAbout,
  authors: [{ name: person.name, url: SITE_URL }],
  creator: person.name,
  alternates: {
    canonical: "/",
    types: { "text/plain": [{ url: "/llms.txt", title: "LLM-readable profile" }] },
  },
  openGraph: {
    type: "profile",
    siteName: person.name,
    title,
    description: person.summary,
    url: "/",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title, description: person.summary },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
};

export const viewport: Viewport = {
  themeColor: "#05070a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="grain min-h-dvh overflow-x-clip">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLd(siteGraph()) }}
        />
        <a
          href="#main"
          className="fixed left-4 top-4 z-50 -translate-y-24 rounded-lg bg-signal px-4 py-2 text-sm font-semibold text-ink transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <BackgroundScene />
        <SiteHeader />
        <SpotlightRoot />
        <main id="main" className="relative z-10">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
