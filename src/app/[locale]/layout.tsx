import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { getContent, person } from "@/content";
import { htmlLang, isLocale, locales } from "@/i18n/config";
import "../globals.css";

const serif = Instrument_Serif({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-instrument-serif",
});

const sans = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-sans",
});

const mono = Geist_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-mono",
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Pick<LayoutProps<"/[locale]">, "params">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const { meta } = getContent(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    authors: [{ name: person.fullName }],
    alternates: {
      canonical: `/${locale}`,
      languages: { "pt-BR": "/pt", en: "/en", "x-default": "/en" },
    },
    openGraph: {
      type: "profile",
      title: meta.title,
      description: meta.description,
      url: `/${locale}`,
      locale: htmlLang[locale].replace("-", "_"),
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getContent(locale);

  return (
    <html lang={htmlLang[locale]} className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only z-50 bg-ink px-4 py-3 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {content.a11y.skipToContent}
        </a>
        <Header content={content} />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer content={content} />
      </body>
    </html>
  );
}
