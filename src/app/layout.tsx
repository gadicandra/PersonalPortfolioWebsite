import type { Metadata } from "next";
import { IBM_Plex_Mono, TikTok_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Nav } from "@/components/ui/Nav";
import { SectionRail } from "@/components/ui/SectionRail";
import { SITE_URL } from "@/lib/site";
import { THEME_GATE } from "@/lib/theme";
import { profile } from "@/content/profile";

const tiktok = TikTok_Sans({
  variable: "--font-tiktok",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500"],
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
    <html lang="en" className={`${tiktok.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_GATE }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="pill pill-solid sr-only z-[100] focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Nav />
          <SectionRail />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
