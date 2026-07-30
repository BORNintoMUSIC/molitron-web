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
    alt: "Molitron EPFA filtration and MOAS odor abatement systems installed together",
    eyebrow: "Products",
    title: "MOAS odor abatement & EPFA filtration",
    description:
      "Two focused systems for commercial kitchen exhaust: MOAS for odor abatement and EPFA for three-stage dry filtration. Use one—or combine them when the project calls for both.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
    ],
  },
  moas: {
    src: "/images/heroes/molitron-moas-kitchen-hero-v1.webp",
    alt: "Molitron odor abatement system installed beside a commercial kitchen exhaust hood",
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
    alt: "Molitron EPFA commercial kitchen exhaust filtration system installed on a rooftop",
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
    alt: "Molitron EPFA and MOAS equipment in a mixed-use building rooftop setting",
    eyebrow: "Solutions",
    title: "Commercial kitchen exhaust control by application",
    description:
      "Match filtration and odor abatement to your vertical—then request a quote with CFM and equipment details.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Solutions", href: "/solutions" },
    ],
  },
  restaurants: {
    src: "/images/heroes/molitron-restaurants-rooftop-evening-hero-v1.webp",
    alt: "Molitron EPFA installed above an urban restaurant at dusk",
    eyebrow: "Solutions · Restaurants",
    title: "Restaurant pollution control & odor abatement",
    description:
      "Plan filtration and odor abatement for visible smoke, grease vapor, and cooking-odor concerns in new builds, remodels, and constrained discharge locations.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Solutions", href: "/solutions" },
      { label: "Restaurants", href: "/solutions/restaurants" },
    ],
  },
  airports: {
    src: "/images/heroes/molitron-airports-denver-rooftop-hero-v1.webp",
    alt: "Molitron EPFA and MOAS equipment in an airport rooftop setting",
    eyebrow: "Solutions · Airports & hospitality",
    title: "Exhaust control for airports, hotels, and high-visibility kitchens",
    description:
      "Listed filtration and odor abatement for shared buildings and public-facing foodservice—including multiple concepts at Denver International Airport.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Solutions", href: "/solutions" },
      { label: "Airports & hospitality", href: "/solutions/airports-hospitality" },
    ],
  },
  cannabis: {
    src: "/images/heroes/molitron-cannabis-moas-facility-hero-v1.webp",
    alt: "Molitron MOAS installed beside a controlled cultivation room",
    eyebrow: "Solutions · Cannabis",
    title: "Odor and exhaust control for cannabis facilities",
    description:
      "Explore project-specific exhaust odor abatement and filtration for odor-sensitive cannabis environments, with application review based on process and exhaust-path details.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Solutions", href: "/solutions" },
      { label: "Cannabis", href: "/solutions/cannabis" },
    ],
  },
  industrial: {
    src: "/images/heroes/molitron-solutions-mixed-use-rooftop-hero-v1.webp",
    alt: "Molitron exhaust-control equipment in a mixed-use rooftop setting",
    eyebrow: "Solutions · Industrial & specialty",
    title: "Start industrial exhaust work with application review",
    description:
      "Molitron primarily serves commercial-kitchen exhaust. Cannabis and other odor-sensitive commercial or industrial applications begin with a documented review of the process, airstream, airflow, discharge path, and project requirements.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Solutions", href: "/solutions" },
      { label: "Industrial & specialty", href: "/solutions/industrial" },
    ],
  },
  codes: {
    src: "/images/heroes/molitron-codes-rooftop-review-hero-v1.webp",
    alt: "Engineer reviewing a Molitron EPFA rooftop installation",
    eyebrow: "Education",
    title: "Codes & compliance for commercial kitchen exhaust",
    description:
      "Grease, smoke, odor, sidewall discharge, and listings—educational guidance for owners and project teams. Always verify with your AHJ.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Codes & compliance", href: "/codes-compliance" },
    ],
  },
  about: {
    src: "/images/heroes/molitron-about-denver-clean-air-hero-v1.webp",
    alt: "Denver skyline and the Colorado Front Range under clear blue skies",
    eyebrow: "About Molitron",
    title: "Built in Colorado. Specified for code.",
    description:
      "Since 1986, Molitron has manufactured commercial kitchen pollution control and odor abatement equipment in Colorado for projects nationwide.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
    ],
  },
  contact: {
    src: "/images/heroes/contact.jpg",
    alt: "Professional desk ready for a commercial kitchen project quote",
    eyebrow: "Contact",
    title: "Request a quote",
    description:
      "Molitron sells direct. Share CFM, cooking equipment, location, and discharge type for a useful first response.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Contact", href: "/contact" },
    ],
  },
  service: {
    src: "/images/heroes/molitron-service-epfa-maintenance-hero-v1.webp",
    alt: "Open Molitron EPFA prepared for organized filter maintenance",
    eyebrow: "Support",
    title: "Service & parts",
    description:
      "Technical guidance, filter direction, and parts support for installed MOAS and EPFA equipment—direct from the manufacturer.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Service & parts", href: "/service-parts" },
    ],
  },
  resources: {
    src: "/images/heroes/molitron-products-tandem-hero-v1.webp",
    alt: "Molitron MOAS and EPFA pollution-control equipment",
    eyebrow: "Resources",
    title: "Current product documents, online guides, and listing context",
    description:
      "Use the current MOAS and EPFA brochures, planning references, and maintenance material. Legacy Enviro-Clean documents remain separated for existing-equipment service only.",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Resources", href: "/resources" },
    ],
  },
} as const satisfies Record<string, PageHeroConfig>;
