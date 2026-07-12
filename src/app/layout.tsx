import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { DeferredScrollProgress } from "@/components/DeferredScrollProgress";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { pagesSeo, seoKeywords } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { color: "#123f49" },
  ],
  viewportFit: "cover",
  colorScheme: "light",
};

const sourceSans = localFont({
  src: "../../node_modules/@fontsource-variable/source-sans-3/files/source-sans-3-latin-wght-normal.woff2",
  variable: "--font-source-sans",
  display: "swap",
  preload: true,
  adjustFontFallback: "Arial",
  weight: "400 700",
});

const home = pagesSeo.home;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${home.title} | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: home.description,
  applicationName: site.legalName,
  keywords: [...seoKeywords.core, ...seoKeywords.moas, ...seoKeywords.epfa],
  authors: [{ name: site.founder.name }],
  creator: site.legalName,
  publisher: site.legalName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.legalName,
    title: `${home.title} | ${site.name}`,
    description: home.description,
    images: [
      {
        url: home.image,
        width: 1200,
        height: 630,
        alt: home.imageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${home.title} | ${site.name}`,
    description: home.description,
    images: [home.image],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: site.url,
  },
  other: {
    "format-detection": "telephone=yes",
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/images/heroes/home.jpg", type: "image/jpeg" }],
  },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  foundingDate: String(site.founded),
  areaServed: { "@type": "Country", name: "United States" },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: site.phone,
    email: site.email,
    contactType: "sales",
    areaServed: "US",
    availableLanguage: "English",
  },
  founder: {
    "@type": "Person",
    name: site.founder.name,
    jobTitle: site.founder.title,
  },
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <JsonLd data={organizationLd} />
        <DeferredScrollProgress />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-card focus:px-3 focus:py-2 focus:text-sm focus:text-primary focus:shadow"
        >
          Skip to content
        </a>
        <Header />
        <main id="content" className="min-w-0 flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
