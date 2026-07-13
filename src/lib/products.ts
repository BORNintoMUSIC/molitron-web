export type ProductImage = {
  src: string;
  alt: string;
};

export type ProductDocument = {
  title: string;
  description: string;
  href: string;
  kind: "brochure" | "specs" | "manual";
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
  documents: ProductDocument[];
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
    tagline: "Commercial-kitchen exhaust odor abatement, planned for each application.",
    summary:
      "The Molitron Odor Abatement System (MOAS) atomizes Odor Neutralizer Solution through remote misting nozzles in commercial-kitchen exhaust. The self-contained, wall-mounted system can operate on its own or alongside EPFA filtration, with each application evaluated for its project conditions.",
    certifications: [
      "Active product",
      "Project-specific application review",
    ],
    highlights: [
      "Up to 95% odor reduction; results vary with the cooking process, exhaust configuration, installation, dwell time, and calibration",
      "Up to 50% smoke reduction; results vary with the cooking process, hood grease-removal performance, exhaust configuration, and calibration",
      "Up to 6,000 CFM per two-nozzle system; final configuration and calibration are project-specific",
      "Wall-mounted stainless cabinet; only the misting nozzles go in the duct",
      "Runs standalone or integrates with the Enviro-Pak Filter Assembly (EPFA)",
      "Optional 10-gallon solution container with low-level audible refill alert",
    ],
    specs: [
      { label: "Capacity", value: "Up to 6,000 CFM per system (two misting nozzles)" },
      { label: "Odor reduction", value: "Up to 95%; actual results vary by project conditions" },
      { label: "Smoke reduction", value: "Up to 50%; actual results vary by project conditions" },
      { label: "Method", value: "Atomizes Odor Neutralizer Solution through remote misting nozzles" },
      { label: "Cabinet", value: '18 Ga stainless steel — 24″ W × 32″ H × 8″ D, ~100 lbs' },
      { label: "Power", value: "120 VAC, 15 A dedicated circuit" },
      { label: "Water", value: '¼″ copper cold water supply, 80 PSI' },
      { label: "Application", value: "Project-specific evaluation, configuration, and calibration" },
    ],
    useWhen: [
      "Cooking odors affect neighboring properties or facility operations",
      "Sidewall, ground-level, or other sensitive discharge locations",
      "You need odor abatement with or without full PCU filtration",
      "Airports, hotels, dense urban restaurants, and mixed-use kitchens",
    ],
    installs: [
      "Ritz-Carlton",
      "Chick-fil-A",
      "Chipotle",
      "Burger King",
      "Haidilao",
      "Lazy Dog",
      "Alexander's Steak House",
      "Luna Grill",
      "District Taco",
      "Cooper's Pit Bar-B-Que",
      "Farmer's Table",
      "Plaza Premium Lounge, Denver International Airport",
      "University of California SD, CA",
      "Habit Burger",
      "UNO K Street, DC",
    ],
    documents: [
      {
        title: "MOAS Product Brochure (2026)",
        description: "Approved product brochure with qualified performance information, system operation, utilities, and project-planning considerations.",
        href: "/docs/moas-brochure-2026.pdf",
        kind: "brochure",
      },
      {
        title: "MOAS Engineering Specs & Installation (2026)",
        description: "Current draft engineering guidance for cabinet, nozzle, utility, and interlock planning.",
        href: "/docs/moas-engineering-specs-installation-2026.pdf",
        kind: "specs",
      },
    ],
    hero: {
      src: "/images/remastered/moas-closed-v2.webp",
      alt: "Molitron MOAS odor abatement system stainless steel cabinet, closed",
    },
    gallery: [
      {
        src: "/images/remastered/moas-closed-v2.webp",
        alt: "MOAS unit closed cabinet view",
      },
      {
        src: "/images/remastered/moas-open-v2.webp",
        alt: "MOAS unit with cabinet open showing internal components",
      },
      {
        src: "/images/remastered/moas-four-units-v2.webp",
        alt: "Four Molitron MOAS odor abatement systems",
      },
      {
        src: "/images/remastered/moas-wall-detail-v2.webp",
        alt: "MOAS wall installation close detail",
      },
      {
        src: "/images/remastered/moas-wall-installation-v2.webp",
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
    tagline: "Serious exhaust filtration. Zero plumbing.",
    summary:
      "The Enviro-Pak Filter Assembly (EPFA) is a UL 8782 listed pollution control unit with three stages of dry filtration for smoke particulate and grease vapor in light-duty commercial kitchen exhaust. Its welded stainless housing uses no water, pumps, or chemical dosing for filtration; an optional carbon final stage can support odor treatment.",
    certifications: ["UL 8782 Listed", "File MH45752", "Models EPFA-24 through EPFA-144"],
    highlights: [
      "Three-stage dry filtration: MERV 9 pre-filter, MERV 14 high-efficiency, and MERV 14 or optional carbon final stage",
      "Zero plumbing—no water supply, pumps, or solution dosing",
      "Fully welded 18 Ga Type 304 stainless steel housing with gasketed access doors",
      "Indoor or outdoor placement between hood and atmospheric discharge",
      "Remote lighted monitor panel: green = running, red = filters need service",
      "Fire-suppression ready—pre-piped for sprinkler or factory Ansul pre-piping",
    ],
    specs: [
      { label: "Listing", value: "UL 8782 Listed · File MH45752 · Models EPFA-24 through EPFA-144" },
      { label: "Construction", value: "18 Ga Type 304 stainless steel, fully welded; sloped full-width top" },
      { label: "Filtration", value: "F1 MERV 9 pre-filter · F2 MERV 14 · F3 MERV 14 or carbon (odor option)" },
      { label: "Footprint", value: 'Width “W” × 63″ long; twelve widths from 24″–144″' },
      { label: "Access", value: "Three removable gasketed doors (optional doors both sides)" },
      { label: "Utilities", value: "115 VAC for monitoring system only—no water or pumps for filtration" },
      { label: "Placement", value: "Any point between kitchen hood and atmospheric discharge" },
      { label: "Service", value: "Tool-free filter access; typical four-week filter check interval" },
    ],
    useWhen: [
      "Light-duty cooking with limited smoke/grease load needs listed filtration",
      "Visible smoke or grease emissions risk inspections or neighbor complaints",
      "You need a compact dry PCU without water, pumps, or chemistry",
      "Commercial kitchens, airports, hotels, and mixed-use projects",
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
    documents: [
      {
        title: "EPFA Product Brochure (2026)",
        description: "Current draft brochure covering filtration stages, operator benefits, and available technical data.",
        href: "/docs/epfa-brochure-2026.pdf",
        kind: "brochure",
      },
      {
        title: "EPFA Operation & Maintenance Manual (2026)",
        description: "Current draft guidance for installation, monitoring, fire suppression, start-up, and filter service.",
        href: "/docs/epfa-operation-maintenance-manual-2026.pdf",
        kind: "manual",
      },
    ],
    hero: {
      src: "/images/remastered/epfa-closed-v2.webp",
      alt: "Molitron EPFA Enviro-Pak Filter Assembly closed stainless steel unit",
    },
    gallery: [
      {
        src: "/images/remastered/epfa-closed-v2.webp",
        alt: "EPFA pollution control unit closed",
      },
      {
        src: "/images/remastered/epfa-open-v2.webp",
        alt: "EPFA open showing filter channels",
      },
      {
        src: "/images/remastered/epfa-inlet-open-v2.webp",
        alt: "EPFA entrance open view of filter assembly",
      },
      {
        src: "/images/remastered/epfa-stacked-closed-v2.webp",
        alt: "Stacked EPFA units closed",
      },
      {
        src: "/images/remastered/epfa-stacked-open-v2.webp",
        alt: "Stacked EPFA units open",
      },
      {
        src: "/images/remastered/epfa-rooftop-installation-v2.webp",
        alt: "EPFA rooftop commercial kitchen exhaust installation",
      },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
