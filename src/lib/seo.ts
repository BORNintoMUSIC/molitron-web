import type { Metadata } from "next";
import { site } from "@/lib/site";

/** High-value industry keywords used across page copy & meta */
export const seoKeywords = {
  core: [
    "commercial kitchen pollution control",
    "kitchen pollution control unit",
    "pollution control unit restaurant",
    "commercial kitchen odor control",
    "kitchen odor abatement system",
    "restaurant exhaust odor control",
    "commercial kitchen exhaust scrubber",
    "grease smoke odor exhaust control",
    "UL listed kitchen exhaust",
    "sidewall discharge kitchen exhaust",
  ],
  moas: [
    "kitchen odor abatement system",
    "commercial kitchen odor control system",
    "restaurant odor neutralizer exhaust",
    "project-specific odor abatement",
    "cooking odor control commercial kitchen",
    "exhaust odor control system",
    "MOAS odor abatement",
    "ETL listed odor abatement system",
  ],
  epfa: [
    "kitchen pollution control unit",
    "commercial kitchen filter assembly",
    "grease filter kitchen exhaust",
    "UL listed pollution control unit",
    "restaurant PCU filter",
    "kitchen exhaust filtration system",
    "EPFA filter assembly",
    "grease particulate exhaust control",
  ],
} as const;

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  image: string;
  imageAlt: string;
  keywords?: string[];
  type?: "website" | "article";
  noIndex?: boolean;
};

function absUrl(path: string): string {
  if (path.startsWith("http")) return path;
  const base = site.url.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

function absImage(path: string): string {
  return absUrl(path);
}

/** Build Next.js Metadata with full Open Graph + Twitter cards */
export function buildMetadata(page: PageSeo): Metadata {
  const url = absUrl(page.path);
  const imageUrl = absImage(page.image);
  const keywords = page.keywords ?? [...seoKeywords.core];

  // Next title template is "%s | Molitron" — pass bare title unless it already brands
  const titleForTemplate = page.title.replace(/\s*\|\s*Molitron\s*$/i, "").trim();

  return {
    title: titleForTemplate,
    description: page.description,
    keywords: [...keywords],
    authors: [{ name: site.founder.name, url: site.url }],
    creator: site.legalName,
    publisher: site.legalName,
    robots: page.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: page.type ?? "website",
      locale: "en_US",
      url,
      siteName: site.legalName,
      title: page.title,
      description: page.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: page.imageAlt,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [imageUrl],
    },
  };
}

/**
 * Per-page SEO. Titles ≤60 chars, descriptions ≤160 chars (including brand where noted).
 * og:title uses the full page.title string.
 */
export const pagesSeo = {
  home: {
    title: "Kitchen Pollution Control & Odor Abatement",
    description:
      "Commercial kitchen pollution control and odor abatement from Molitron. Explore EPFA dry filtration and MOAS odor control for projects nationwide.",
    path: "/",
    image: "/images/heroes/home.jpg",
    imageAlt:
      "Commercial rooftop kitchen exhaust pollution control equipment at dawn",
    keywords: [
      ...seoKeywords.core,
      "commercial kitchen exhaust system",
      "restaurant pollution control unit",
      "kitchen exhaust odor control Colorado",
      "Denver kitchen exhaust filtration",
    ],
  },
  products: {
    title: "Kitchen Pollution Control Products",
    description:
      "Compare Molitron MOAS odor abatement and EPFA three-stage dry filtration for commercial kitchen exhaust. Work directly with the manufacturer.",
    path: "/products",
    image: "/images/heroes/products.jpg",
    imageAlt: "Molitron MOAS and EPFA commercial kitchen pollution control products",
    keywords: [...seoKeywords.core, ...seoKeywords.moas, ...seoKeywords.epfa],
  },
  moas: {
    title: "MOAS Kitchen Odor Abatement System",
    description:
      "Explore the ETL Listed MOAS for commercial-kitchen exhaust odor abatement, with qualified performance, utilities, and project-planning guidance.",
    path: "/products/moas",
    image: "/images/heroes/moas.jpg",
    imageAlt: "Molitron MOAS commercial kitchen odor abatement system cabinet",
    keywords: [...seoKeywords.moas, ...seoKeywords.core],
  },
  epfa: {
    title: "EPFA Dry Kitchen Exhaust Filtration",
    description:
      "Plan EPFA three-stage dry filtration for light-duty commercial-kitchen exhaust, including model data, service clearances, monitoring, and the optional carbon final stage.",
    path: "/products/epfa",
    image: "/images/heroes/epfa.jpg",
    imageAlt: "Molitron EPFA UL Listed kitchen pollution control filter assembly",
    keywords: [...seoKeywords.epfa, ...seoKeywords.core],
  },
  about: {
    title: "About Molitron Pollution Control",
    // 34 → 45
    description:
      "Molitron has manufactured commercial kitchen pollution control and odor abatement equipment since 1986. Built in Colorado with nationwide project support.",
    // 155
    path: "/about",
    image: "/images/heroes/about.jpg",
    imageAlt: "Molitron Colorado manufacturing facility for kitchen exhaust equipment",
    keywords: [
      ...seoKeywords.core,
      "Molitron Company Inc",
      "commercial kitchen exhaust manufacturer",
      "Denver kitchen pollution control",
    ],
  },
  contact: {
    title: "Request a Quote | Kitchen Exhaust",
    // 35 → use full as template strip: "Request a Quote | Kitchen Exhaust" = 35, + Molitron = 46
    description:
      "Request a quote for commercial kitchen pollution control or odor abatement. MOAS & EPFA—include CFM, equipment list & location. Call 303-969-8888.",
    // 150
    path: "/contact",
    image: "/images/heroes/contact.jpg",
    imageAlt: "Request a Molitron commercial kitchen exhaust control quote",
    keywords: [
      ...seoKeywords.core,
      "kitchen exhaust quote",
      "pollution control unit pricing",
      "commercial kitchen odor control quote",
    ],
  },
  solutions: {
    title: "Kitchen Exhaust Control Solutions",
    description:
      "Commercial kitchen exhaust filtration and odor-abatement guidance for restaurants, airports, hotels, and odor-sensitive facilities nationwide.",
    path: "/solutions",
    image: "/images/heroes/solutions.jpg",
    imageAlt: "Commercial kitchen exhaust pollution control solutions",
    keywords: [...seoKeywords.core, "restaurant exhaust solutions", "airport kitchen exhaust control"],
  },
  restaurants: {
    title: "Restaurant Pollution Control Units",
    description:
      "Restaurant kitchen pollution control units and odor abatement for new builds and remodels. Control grease, smoke, and cooking odors. Quote direct.",
    path: "/solutions/restaurants",
    image: "/images/heroes/restaurants.jpg",
    imageAlt: "Restaurant commercial kitchen exhaust pollution control",
    keywords: [
      ...seoKeywords.core,
      "restaurant pollution control unit",
      "restaurant kitchen exhaust odor",
      "commercial kitchen PCU restaurant",
    ],
  },
  airports: {
    title: "Airport & Hotel Kitchen Exhaust Control",
    description:
      "Pollution control and odor abatement for airport concessions and hotel kitchens. Proven installs including Denver International Airport foodservice.",
    path: "/solutions/airports-hospitality",
    image: "/images/heroes/airports-hospitality.jpg",
    imageAlt: "Airport hospitality kitchen exhaust pollution control",
    keywords: [
      ...seoKeywords.core,
      "airport kitchen exhaust control",
      "hotel kitchen pollution control",
      "hospitality exhaust odor control",
    ],
  },
  cannabis: {
    title: "Cannabis Facility Odor Control Exhaust",
    description:
      "Odor abatement and exhaust filtration for cannabis facilities. Explore Molitron MOAS & EPFA for odor-sensitive commercial applications. Talk to us.",
    path: "/solutions/cannabis",
    image: "/images/heroes/cannabis.jpg",
    imageAlt: "Cannabis facility odor control and exhaust treatment",
    keywords: [
      "cannabis odor control system",
      "cannabis facility exhaust filtration",
      "commercial odor abatement",
      ...seoKeywords.moas,
    ],
  },
  codes: {
    title: "Kitchen Exhaust Codes & Compliance",
    description:
      "Guide to commercial-kitchen exhaust codes: sidewall discharge, equipment listings, grease, smoke, odor control, and California air-district requirements.",
    path: "/codes-compliance",
    image: "/images/heroes/codes-compliance.jpg",
    imageAlt: "Commercial kitchen exhaust code compliance guidance",
    keywords: [
      ...seoKeywords.core,
      "kitchen exhaust code compliance",
      "sidewall discharge exhaust",
      "UL 8782 pollution control unit",
      "ETL listed odor abatement system",
      "SCAQMD kitchen exhaust",
    ],
  },
  service: {
    title: "Kitchen Exhaust Service & Parts",
    description:
      "Service and parts for Molitron MOAS odor abatement and EPFA pollution control units. Filters, neutralizer support, and technical help—direct manufacturer.",
    path: "/service-parts",
    image: "/images/heroes/service-parts.jpg",
    imageAlt: "Service and parts for commercial kitchen exhaust control equipment",
    keywords: [
      "kitchen exhaust filter replacement",
      "odor abatement system parts",
      "pollution control unit service",
      ...seoKeywords.core,
    ],
  },
} as const satisfies Record<string, PageSeo>;

/** Full social title including brand (for OG, often slightly longer OK) */
export function ogTitle(pageKey: keyof typeof pagesSeo): string {
  const t = pagesSeo[pageKey].title;
  if (/molitron/i.test(t)) return t;
  // Keep under ~60 when possible
  const withBrand = `${t} | Molitron`;
  return withBrand.length <= 60 ? withBrand : t;
}

export function metadataFor(pageKey: keyof typeof pagesSeo): Metadata {
  const page = pagesSeo[pageKey];
  return buildMetadata({
    ...page,
    title: ogTitle(pageKey),
  });
}
