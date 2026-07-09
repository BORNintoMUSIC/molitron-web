import type { Metadata, Viewport } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { DeferredScrollProgress } from "@/components/DeferredScrollProgress";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { pagesSeo, seoKeywords } from "@/lib/seo";
import { formatAddress, site } from "@/lib/site";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0c3340" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1418" },
  ],
  viewportFit: "cover",
  colorScheme: "light dark",
};

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  weight: ["400", "600", "700"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  adjustFontFallback: true,
  weight: ["600", "700"],
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
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: site.address.country,
  },
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

const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.legalName,
  image: `${site.url}/images/heroes/home.jpg`,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: site.address.country,
  },
  description: site.description,
  priceRange: "$$",
  areaServed: [
    { "@type": "State", name: "California" },
    { "@type": "City", name: "Denver" },
    { "@type": "Country", name: "United States" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeInitScript = `(function(){try{var t=localStorage.getItem('molitron-theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var dark=t==='dark'||(t!=='light'&&d);var r=document.documentElement;r.classList.toggle('dark',dark);r.style.colorScheme=dark?'dark':'light';}catch(e){}})();`;

  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${sourceSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <JsonLd data={[organizationLd, localBusinessLd]} />
        <DeferredScrollProgress />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-card focus:px-3 focus:py-2 focus:text-sm focus:text-primary focus:shadow"
        >
          Skip to content
        </a>
        <Header />
        <main id="content" className="flex-1">
          {children}
        </main>
        <Footer />
        <span className="sr-only">{formatAddress()}</span>
      </body>
    </html>
  );
}
