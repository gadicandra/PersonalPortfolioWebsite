import type { Metadata } from "next";
import { Anton, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Nav } from "@/components/ui/Nav";
import { SITE_URL } from "@/lib/site";
import { Loader, LOADER_GATE } from "@/components/ui/Loader";
import { BarCurtain } from "@/components/ui/BarCurtain";
import { PageEnter } from "@/components/ui/PageEnter";
import { profile } from "@/content/profile";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

// Condensed display face — Sonar's heavy uppercase headlines.
const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Serif used only for editorial italic accents (the hero, pull-quotes).
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Garjita Adicandra — AI/ML & Full-Stack Engineer",
    template: "%s · Garjita Adicandra",
  },
  description:
    "Information Engineering student at UGM specializing in AI/ML and full-stack development. Fine-tuned vision-language models, AIoT systems, and production web apps.",
  keywords: [
    "Garjita Adicandra",
    "AI Engineer",
    "Machine Learning",
    "Full-Stack Developer",
    "UGM",
    "LLM Fine-tuning",
    "Next.js",
  ],
  authors: [{ name: "Garjita Adicandra" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Garjita Adicandra — AI/ML & Full-Stack Engineer",
    description:
      "Fine-tuned vision-language models, AIoT systems, and production web apps. Information Engineering @ UGM.",
    url: SITE_URL,
    siteName: "Garjita Adicandra",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Garjita Adicandra — AI/ML & Full-Stack Engineer",
    description:
      "Fine-tuned vision-language models, AIoT systems, and production web apps. Information Engineering @ UGM.",
  },
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: SITE_URL,
  email: `mailto:${profile.email}`,
  alumniOf: { "@type": "CollegeOrUniversity", name: "Universitas Gadjah Mada" },
  sameAs: profile.socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${anton.variable} ${geistMono.variable} ${instrument.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: LOADER_GATE }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>
        <a href="#main" className="label sr-only z-[100] rounded-full bg-ink px-4 py-3 text-bg focus:not-sr-only focus:fixed focus:left-3 focus:top-3">
          Skip to content
        </a>
        <SmoothScroll>
          <Loader />
          <Nav />
          <div data-page className="origin-top">{children}</div>
          <BarCurtain />
          <PageEnter />
        </SmoothScroll>
      </body>
    </html>
  );
}
