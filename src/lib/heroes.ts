export type PageHeroConfig = {
  src: string;
  alt: string;
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: readonly { label: string; href: string }[];
};

/** Interior page heroes (home uses its own full-bleed layout). */
export const pageHeroes = {
  products: {
    src: "/images/heroes/molitron-products-tandem-hero-v1.webp",
    alt: "Illustrative setting with Molitron EPFA filtration and MOAS odor abatement equipment",
    eyebrow: "Products",
    title: "Two systems. Distinct roles.",
    description:
      "MOAS for odor. EPFA for dry filtration. Compare their roles in commercial-kitchen exhaust.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
    ],
  },
  moas: {
    src: "/images/heroes/molitron-moas-kitchen-hero-v1.webp",
    alt: "Illustrative kitchen exhaust setting with a Molitron MOAS cabinet",
    eyebrow: "Product · ETL Listed",
    title: "Molitron Odor Abatement System (MOAS)",
    description:
      "MOAS atomizes Odor Neutralizer Solution through remote misting nozzles in commercial-kitchen exhaust. Product fit and results are project-specific.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "MOAS", href: "/products/moas" },
    ],
  },
  epfa: {
    src: "/images/heroes/molitron-epfa-rooftop-hero-v1.webp",
    alt: "Illustrative rooftop setting with Molitron EPFA filtration equipment",
    eyebrow: "Product · UL Listed",
    title: "Enviro-Pak Filter Assembly (EPFA)",
    description:
      "Three-stage dry filtration for smoke particulate and grease vapor in light-duty kitchen exhaust, with an optional carbon final stage for odor treatment.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "EPFA", href: "/products/epfa" },
    ],
  },
  solutions: {
    src: "/images/heroes/molitron-solutions-mixed-use-rooftop-hero-v1.webp",
    alt: "Illustrative mixed-use rooftop setting with Molitron equipment",
    eyebrow: "Applications",
    title: "Start with your kitchen or facility.",
    description:
      "Commercial kitchens are our focus. Other processes require individual application review.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Applications", href: "/solutions" },
    ],
  },
  restaurants: {
    src: "/images/heroes/molitron-restaurants-rooftop-evening-hero-v1.webp",
    alt: "Illustrative restaurant rooftop setting with Molitron equipment at dusk",
    eyebrow: "Applications · Restaurants",
    title: "Good exhaust planning starts in the kitchen.",
    description:
      "Cooking load and discharge location shape the filtration and odor-abatement plan.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Applications", href: "/solutions" },
      { label: "Restaurants", href: "/solutions/restaurants" },
    ],
  },
  airports: {
    src: "/images/heroes/molitron-airports-denver-rooftop-hero-v1.webp",
    alt: "Illustrative airport rooftop setting with Molitron EPFA and MOAS equipment",
    eyebrow: "Applications · Airports & hospitality",
    title: "Many kitchens. One shared building.",
    description:
      "Coordinate kitchen exhaust with neighboring tenants, public spaces and building operations.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Applications", href: "/solutions" },
      {
        label: "Airports & hospitality",
        href: "/solutions/airports-hospitality",
      },
    ],
  },
  cannabis: {
    src: "/images/heroes/molitron-cannabis-moas-facility-hero-v1.webp",
    alt: "Illustrative cannabis-facility setting with a MOAS cabinet",
    eyebrow: "Applications · Cannabis",
    title: "Understand the odor before choosing equipment.",
    description:
      "Review the process and exhaust conditions with Molitron before selecting equipment.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Applications", href: "/solutions" },
      { label: "Cannabis", href: "/solutions/cannabis" },
    ],
  },
  industrial: {
    src: "/images/heroes/molitron-solutions-mixed-use-rooftop-hero-v1.webp",
    alt: "Illustrative commercial rooftop setting with Molitron equipment",
    eyebrow: "Applications · Industrial & specialty",
    title: "Review your industrial exhaust application.",
    description:
      "Share the process, airflow and exhaust conditions so Molitron can review equipment suitability.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Applications", href: "/solutions" },
      { label: "Industrial & specialty", href: "/solutions/industrial" },
    ],
  },
  codes: {
    src: "/images/heroes/molitron-codes-rooftop-review-hero-v1.webp",
    alt: "Illustrative project review beside Molitron EPFA rooftop equipment",
    eyebrow: "Equipment listings",
    title: "Product listings & project review.",
    description:
      "Check the covered equipment, then coordinate requirements for your site.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Equipment listings", href: "/codes-compliance" },
    ],
  },
  about: {
    src: "/images/heroes/molitron-about-denver-clean-air-hero-v1.webp",
    alt: "Denver skyline and the Colorado Front Range under clear blue skies",
    eyebrow: "About Molitron",
    title: "A family business. Built in Colorado.",
    description:
      "Commercial-kitchen pollution control, fabricated in Colorado and sold direct.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
    ],
  },
  contact: {
    src: "/images/heroes/contact.jpg",
    alt: "Professional desk ready for a commercial kitchen project quote",
    eyebrow: "Contact",
    title: "Talk directly with Molitron.",
    description:
      "Equipment selection, project planning, or service for an installed system.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Contact", href: "/contact" },
    ],
  },
  service: {
    src: "/images/heroes/molitron-service-epfa-maintenance-hero-v1.webp",
    alt: "Illustrative view of an open EPFA prepared for filter maintenance",
    eyebrow: "Support",
    title: "Service & parts",
    description:
      "Support for installed MOAS and EPFA equipment, direct from Molitron.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Service & parts", href: "/service-parts" },
    ],
  },
  resources: {
    src: "/images/heroes/molitron-products-tandem-hero-v1.webp",
    alt: "Illustrative setting with Molitron MOAS and EPFA pollution-control equipment",
    eyebrow: "Resources",
    title: "Guides, brochures & manuals.",
    description:
      "Current MOAS and EPFA documents. Read online or download a PDF.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Resources", href: "/resources" },
    ],
  },
} as const satisfies Record<string, PageHeroConfig>;
