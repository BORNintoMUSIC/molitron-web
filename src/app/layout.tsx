import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { DeferredScrollProgress } from "@/components/DeferredScrollProgress";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { metadataFor, pagesSeo } from "@/lib/seo";
import { site } from "@/lib/site";
import { organizationLd } from "@/lib/structured-data";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  interactiveWidget: "resizes-content",
  themeColor: [{ color: "#173f35" }],
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
  ...metadataFor("home"),
  metadataBase: new URL(site.url),
  title: {
    default: `${home.title} | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  applicationName: site.legalName,
  other: {
    "format-detection": "telephone=yes",
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sourceSans.variable} h-full antialiased`}>
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
