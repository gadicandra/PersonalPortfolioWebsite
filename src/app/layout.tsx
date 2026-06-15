import type { Metadata } from "next";
import { Geist_Mono, Instrument_Serif, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Nav } from "@/components/ui/Nav";
import { SITE_URL } from "@/lib/site";

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${grotesk.variable} ${geistMono.variable} ${instrument.variable}`}
    >
      <body>
        <SmoothScroll>
          <Nav />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
