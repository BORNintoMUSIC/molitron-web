export type ProductImage = {
  src: string;
  alt: string;
};

export type Product = {
  slug: "moas" | "epfa";
  name: string;
  shortName: string;
  tagline: string;
  summary: string;
  certifications: string[];
  highlights: string[];
  specs: { label: string; value: string }[];
  useWhen: string[];
  installs: string[];
  /** Primary card / hero image */
  hero: ProductImage;
  /** Additional gallery images (product + installs) */
  gallery: ProductImage[];
  discontinued?: boolean;
};

export const products: Product[] = [
  {
    slug: "moas",
    name: "Molitron Odor Abatement System (MOAS)",
    shortName: "MOAS",
    tagline: "Neutralize smoke and odor in commercial exhaust streams",
    summary:
      "The Molitron Odor and Smoke Abatement System (MOAS) is a self-contained system for neutralizing offensive odors and smoke from commercial exhaust. It can operate independently or with the Enviro-Pak Filter Assembly (EPFA).",
    certifications: ["ETL Listed", "Tested to UL 197 and UL 710 Clause 43"],
    highlights: [
      "Reduces odor particles by approximately 95%",
      "Reduces smoke particles by approximately 50%",
      "Chemical neutralization—not masking or perfume",
      "Stainless steel cabinet with integrated controls",
      "Works standalone or with EPFA filtration",
    ],
    specs: [
      { label: "Cabinet", value: 'Stainless steel — 32" H × 24" W × 8" D' },
      { label: "Controller", value: "UL listed IDEC time controller" },
      { label: "Components", value: "Liquid pump, air compressor, solenoid valve, liquid injector, mixing tank" },
      { label: "Power", value: "115 VAC, 15 amp circuit" },
      { label: "Water", value: 'One 1/4" cold water supply' },
      { label: "Weight", value: "Approx. 100 lbs" },
    ],
    useWhen: [
      "Cooking odors risk neighbor complaints or code issues",
      "Sidewall or sensitive discharge locations",
      "You need odor control with or without full PCU filtration",
      "Airports, hotels, dense urban restaurants",
    ],
    installs: [
      "Hiro Nori Rest, CA",
      "Hyatt Houston, TX",
      "Maple & Ash, AZ",
      "Shoreline & Barca, DC",
      "Momo Kebab, CA",
      "ROOH, CA",
      "Von’s Chicken, CA",
      "Chicken Meet Rice, CA",
      "Habit Burger, NJ",
      "University of California SD, CA",
      "Plaza Premium Lounge, Denver International Airport",
      "Specialty Café, CA",
      "Habit Burger, CA",
      "UNO K Street, DC",
      "Pizza My Heart, CA",
    ],
    hero: {
      src: "/images/moas/moas-closed.png",
      alt: "Molitron MOAS odor abatement system stainless steel cabinet, closed",
    },
    gallery: [
      {
        src: "/images/moas/moas-closed.png",
        alt: "MOAS unit closed cabinet view",
      },
      {
        src: "/images/moas/moas-open.png",
        alt: "MOAS unit with cabinet open showing internal components",
      },
      {
        src: "/images/moas/moas-four-units.png",
        alt: "Four Molitron MOAS odor abatement systems",
      },
      {
        src: "/images/moas/moas-wall-install.png",
        alt: "MOAS wall-mounted installation",
      },
      {
        src: "/images/moas/moas-wall-install-r1.png",
        alt: "MOAS wall installation close detail",
      },
      {
        src: "/images/moas/moas-wall-install-full.png",
        alt: "Full view of MOAS wall installation",
      },
      {
        src: "/images/moas/moas-install-1.jpg",
        alt: "MOAS field installation",
      },
      {
        src: "/images/moas/moas-install-2.jpg",
        alt: "MOAS installation on commercial kitchen exhaust",
      },
      {
        src: "/images/moas/moas-kitchen-odor.jpg",
        alt: "Commercial kitchen odor abatement installation context",
      },
    ],
  },
  {
    slug: "epfa",
    name: "Enviro-Pak Filter Assembly (EPFA)",
    shortName: "EPFA",
    tagline: "UL listed filtration for grease, particulate, and kitchen exhaust",
    summary:
      "The Molitron UL Listed Enviro-Pak Filter Assembly (EPFA) removes particulate matter and grease vapors from kitchen exhaust air. The stainless steel assembly can be located indoor or outdoor between the kitchen hood and the point of discharge.",
    certifications: ["UL Listed"],
    highlights: [
      "18 gauge, type 304 stainless steel enclosure",
      "Holds pre-filters and high-efficiency filters",
      "Indoor or outdoor installation between hood and discharge",
      "Helps control visible smoke and grease emissions",
      "Pairs with MOAS when odor neutralization is also required",
    ],
    specs: [
      { label: "Construction", value: "18 ga type 304 stainless steel" },
      { label: "Channels", value: "Top, bottom, and end channels for filter media" },
      { label: "Placement", value: "Any point between hood and atmospheric discharge" },
      { label: "Listing", value: "UL Listed filter assembly" },
    ],
    useWhen: [
      "Grease and particulate control is required for compliance",
      "Visible smoke is a risk for inspections or neighbors",
      "You need a compact filtration assembly in the exhaust path",
      "Commercial kitchens, airports, mixed-use projects",
    ],
    installs: [
      "Urban Egg, CO",
      "Hyatt Hotel, TX",
      "Plaza Premium Lounge, Denver International Airport",
      "UNO K Street, DC",
      "Taco Connection, CO",
      "Oyster Oyster, DC",
      "Garbanzo, Denver International Airport",
      "Greenmount Cannabis LLC, CA",
      "Qdoba, Denver International Airport",
      "Apron Kitchen, Denver International Airport",
      "555 Capital Mall, CA",
      "Dong Lai Shun, CA",
      "Stein Beer Garden, CA",
      "Sheraton Hotel, CO",
      "Johnny Rocket, CA",
    ],
    hero: {
      src: "/images/epfa/epfa-closed.png",
      alt: "Molitron EPFA Enviro-Pak Filter Assembly closed stainless steel unit",
    },
    gallery: [
      {
        src: "/images/epfa/epfa-closed.png",
        alt: "EPFA pollution control unit closed",
      },
      {
        src: "/images/epfa/epfa-open.png",
        alt: "EPFA open showing filter channels",
      },
      {
        src: "/images/epfa/epfa-entrance-open.png",
        alt: "EPFA entrance open view of filter assembly",
      },
      {
        src: "/images/epfa/epfa-stacked-closed.png",
        alt: "Stacked EPFA units closed",
      },
      {
        src: "/images/epfa/epfa-stacked-open.png",
        alt: "Stacked EPFA units open",
      },
      {
        src: "/images/epfa/epfa-rooftop-1.jpg",
        alt: "EPFA rooftop installation",
      },
      {
        src: "/images/epfa/epfa-rooftop-2.jpg",
        alt: "EPFA rooftop commercial kitchen exhaust installation",
      },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
