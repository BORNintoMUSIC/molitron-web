export type PageHeroConfig = {
  src: string;
  alt: string;
  eyebrow?: string;
  title: string;
  description?: string;
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
  },
  moas: {
    src: "/images/heroes/molitron-moas-kitchen-hero-v1.webp",
    alt: "Molitron odor abatement system installed beside a commercial kitchen exhaust hood",
    eyebrow: "Product · ETL listed",
    title: "Molitron Odor Abatement System (MOAS)",
    description:
      "Odors neutralized at the molecular level—not masked. Gone. Up to 95% odor particle reduction in commercial kitchen exhaust.",
  },
  epfa: {
    src: "/images/heroes/molitron-epfa-rooftop-hero-v1.webp",
    alt: "Molitron EPFA commercial kitchen exhaust filtration system installed on a rooftop",
    eyebrow: "Product · UL 8782 listed",
    title: "Enviro-Pak Filter Assembly (EPFA)",
    description:
      "Three-stage dry filtration for smoke particulate and grease vapor in light-duty kitchen exhaust, with an optional carbon final stage for odor treatment.",
  },
  solutions: {
    src: "/images/heroes/molitron-solutions-mixed-use-rooftop-hero-v1.webp",
    alt: "Molitron EPFA and MOAS equipment in a mixed-use building rooftop setting",
    eyebrow: "Solutions",
    title: "Commercial kitchen exhaust control by application",
    description:
      "Match filtration and odor abatement to your vertical—then request a quote with CFM and equipment details.",
  },
  restaurants: {
    src: "/images/heroes/molitron-restaurants-rooftop-evening-hero-v1.webp",
    alt: "Molitron EPFA installed above an urban restaurant at dusk",
    eyebrow: "Solutions · Restaurants",
    title: "Restaurant pollution control & odor abatement",
    description:
      "Help owners and facility managers stop visible smoke and cooking odors before they become complaints—or code issues. Sold direct.",
  },
  airports: {
    src: "/images/heroes/molitron-airports-denver-rooftop-hero-v1.webp",
    alt: "Molitron EPFA and MOAS equipment in an airport rooftop setting",
    eyebrow: "Solutions · Airports & hospitality",
    title: "Exhaust control for airports, hotels, and high-visibility kitchens",
    description:
      "Listed filtration and odor abatement for shared buildings and public-facing foodservice—including multiple concepts at Denver International Airport.",
  },
  cannabis: {
    src: "/images/heroes/molitron-cannabis-moas-facility-hero-v1.webp",
    alt: "Molitron MOAS installed beside a controlled cultivation room",
    eyebrow: "Solutions · Cannabis",
    title: "Odor and exhaust control for cannabis facilities",
    description:
      "Apply the same molecular odor neutralization and exhaust filtration approach used for restaurants and airports to odor-sensitive cannabis environments.",
  },
  codes: {
    src: "/images/heroes/molitron-codes-rooftop-review-hero-v1.webp",
    alt: "Engineer reviewing a Molitron EPFA rooftop installation",
    eyebrow: "Education",
    title: "Codes & compliance for commercial kitchen exhaust",
    description:
      "Grease, smoke, odor, sidewall discharge, and listings—educational guidance for owners and project teams. Always verify with your AHJ.",
  },
  about: {
    src: "/images/heroes/molitron-about-denver-clean-air-hero-v1.webp",
    alt: "Denver skyline and the Colorado Front Range under clear blue skies",
    eyebrow: "About Molitron",
    title: "Built in Colorado. Specified for code.",
    description:
      "Since 1986, Molitron has manufactured commercial kitchen pollution control and odor abatement equipment in Colorado for projects nationwide.",
  },
  contact: {
    src: "/images/heroes/contact.jpg",
    alt: "Professional desk ready for a commercial kitchen project quote",
    eyebrow: "Contact",
    title: "Request a quote",
    description:
      "Molitron sells direct. Share CFM, cooking equipment, location, and discharge type for a useful first response.",
  },
  service: {
    src: "/images/heroes/molitron-service-epfa-maintenance-hero-v1.webp",
    alt: "Open Molitron EPFA prepared for organized filter maintenance",
    eyebrow: "Support",
    title: "Service & parts",
    description:
      "Technical guidance, filter direction, and parts support for installed MOAS and EPFA equipment—direct from the manufacturer.",
  },
} as const satisfies Record<string, PageHeroConfig>;
