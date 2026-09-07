import type { Metadata } from "next";
import { pageHeroes } from "./heroes";
import { isPreviewDeployment, site } from "./site";

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  image: string;
  imageAlt: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

/** Use the same branded title for the page, search and social sharing. */
export function buildMetadata(page: PageSeo): Metadata {
  const title = page.title.replace(/\s*\|\s*Molitron\s*$/i, "").trim() + " | " + site.name;
  const url = new URL(page.path, site.url).toString();
  const image = new URL(page.image, site.url).toString();

  return {
    // A layout template does not apply to its own page (including the homepage).
    title: { absolute: title },
    description: page.description,
    authors: [{ name: site.legalName, url: site.url }],
    creator: site.legalName,
    publisher: site.legalName,
    robots:
      page.noIndex || isPreviewDeployment
        ? { index: false, follow: false }
        : { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: { canonical: url },
    openGraph: {
      type: page.type ?? "website",
      locale: "en_US",
      url,
      siteName: site.legalName,
      title,
      description: page.description,
      images: [{ url: image, alt: page.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: page.description,
      images: [{ url: image, alt: page.imageAlt }],
    },
  };
}

/** Each page answers a distinct visitor need; descriptions reflect its content. */
export const pagesSeo = {
  home: {
    title: "Commercial Kitchen Pollution Control",
    description:
      "Colorado-built equipment for commercial kitchen exhaust. Explore MOAS odor abatement and EPFA dry filtration, with support directly from Molitron.",
    path: "/",
    image: pageHeroes.products.src,
    imageAlt: pageHeroes.products.alt,
  },
  products: {
    title: "MOAS vs. EPFA: Compare Exhaust Control",
    description:
      "Compare MOAS cooking-odor treatment with EPFA dry filtration for light-duty kitchen exhaust. Review their roles and discuss your application with Molitron.",
    path: "/products",
    image: pageHeroes.products.src,
    imageAlt: pageHeroes.products.alt,
  },
  moas: {
    title: "MOAS Kitchen Odor Abatement System",
    description:
      "Explore how MOAS treats cooking odor in commercial kitchen exhaust. Review its operation, performance limits, ETL listing and installation planning guide.",
    path: "/products/moas",
    image: "/images/moas/moas-closed-professional-gpt2.png",
    imageAlt: "Molitron MOAS odor abatement system with its stainless steel cabinet closed",
  },
  epfa: {
    title: "EPFA Kitchen Exhaust Filtration",
    description:
      "Explore EPFA dry filtration for light-duty commercial kitchen exhaust. Review filter stages, model data, optional carbon and installation requirements.",
    path: "/products/epfa",
    image: "/images/remastered/epfa-closed-v2.webp",
    imageAlt: "Molitron EPFA dry filter assembly with its access doors closed",
  },
  solutions: {
    title: "Kitchen Exhaust Applications",
    description:
      "Explore exhaust planning for restaurants, airport concessions and hotel kitchens. Other facility processes require individual application review.",
    path: "/solutions",
    image: pageHeroes.solutions.src,
    imageAlt: pageHeroes.solutions.alt,
  },
  restaurants: {
    title: "Restaurant Exhaust Filtration & Odor Control",
    description:
      "Plan restaurant exhaust filtration and odor abatement around cooking equipment, airflow and discharge location. Discuss MOAS and EPFA with Molitron.",
    path: "/solutions/restaurants",
    image: pageHeroes.restaurants.src,
    imageAlt: pageHeroes.restaurants.alt,
  },
  airports: {
    title: "Airport & Hotel Kitchen Exhaust Control",
    description:
      "Plan filtration and odor abatement for airport concessions and hotel kitchens, including shared-building exhaust conditions and service access.",
    path: "/solutions/airports-hospitality",
    image: pageHeroes.airports.src,
    imageAlt: pageHeroes.airports.alt,
  },
  cannabis: {
    title: "Cannabis Odor Concerns & Application Review",
    description:
      "Discuss cannabis facility odor concerns with Molitron. Equipment suitability requires review of the process, exhaust conditions and project requirements.",
    path: "/solutions/cannabis",
    image: pageHeroes.cannabis.src,
    imageAlt: pageHeroes.cannabis.alt,
  },
  industrial: {
    title: "Industrial & Specialty Exhaust Review",
    description:
      "Discuss industrial or specialty exhaust concerns with Molitron. Review the process, airstream and site requirements before considering equipment.",
    path: "/solutions/industrial",
    image: pageHeroes.industrial.src,
    imageAlt: pageHeroes.industrial.alt,
  },
  about: {
    title: "About Our Family Business",
    description:
      "Meet the family business behind MOAS and EPFA. Molitron has manufactured commercial kitchen pollution control equipment in Colorado since 1986.",
    path: "/about",
    image: pageHeroes.about.src,
    imageAlt: pageHeroes.about.alt,
  },
  resources: {
    title: "MOAS & EPFA Manuals & Brochures",
    description:
      "Find MOAS and EPFA brochures, installation planning guides and maintenance information. Read online or open the current product PDFs.",
    path: "/resources",
    image: pageHeroes.resources.src,
    imageAlt: pageHeroes.resources.alt,
  },
  codes: {
    title: "MOAS & EPFA Equipment Listings",
    description:
      "Review the MOAS ETL listing, the UL listing for covered EPFA models, and the distinction between equipment listings and project approval.",
    path: "/codes-compliance",
    image: pageHeroes.codes.src,
    imageAlt: pageHeroes.codes.alt,
  },
  service: {
    title: "MOAS & EPFA Service, Parts & Filters",
    description:
      "Contact Molitron about MOAS Odor Neutralizer Solution, EPFA filter media and installed-equipment support. Have the model and serial number ready.",
    path: "/service-parts",
    image: pageHeroes.service.src,
    imageAlt: pageHeroes.service.alt,
  },
  contact: {
    title: "Contact & Product Support",
    description:
      "Talk directly with Molitron about a quote, equipment selection or service for an installed MOAS or EPFA. Call 303-969-8888 or send an inquiry.",
    path: "/contact",
    image: pageHeroes.contact.src,
    imageAlt: pageHeroes.contact.alt,
  },
} as const satisfies Record<string, PageSeo>;

export function metadataFor(pageKey: keyof typeof pagesSeo): Metadata {
  return buildMetadata(pagesSeo[pageKey]);
}
