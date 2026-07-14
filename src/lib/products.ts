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

export const epfaModels = [
  { model: "EPFA-24", cfm: "1,800", width: "24 in.", unitWeight: "250 lb", prefilters: "1", highEfficiencyFilters: "2", carbonAddedWeight: "72 lb" },
  { model: "EPFA-36", cfm: "2,700", width: "36 in.", unitWeight: "350 lb", prefilters: "2", highEfficiencyFilters: "4", carbonAddedWeight: "108 lb" },
  { model: "EPFA-48", cfm: "3,600", width: "48 in.", unitWeight: "450 lb", prefilters: "2", highEfficiencyFilters: "4", carbonAddedWeight: "144 lb" },
  { model: "EPFA-60", cfm: "4,500", width: "60 in.", unitWeight: "550 lb", prefilters: "3", highEfficiencyFilters: "6", carbonAddedWeight: "180 lb" },
  { model: "EPFA-72", cfm: "5,400", width: "72 in.", unitWeight: "650 lb", prefilters: "3", highEfficiencyFilters: "6", carbonAddedWeight: "216 lb" },
  { model: "EPFA-84", cfm: "6,300", width: "84 in.", unitWeight: "750 lb", prefilters: "4", highEfficiencyFilters: "8", carbonAddedWeight: "252 lb" },
  { model: "EPFA-96", cfm: "7,200", width: "96 in.", unitWeight: "850 lb", prefilters: "4", highEfficiencyFilters: "8", carbonAddedWeight: "288 lb" },
  { model: "EPFA-108", cfm: "8,100", width: "108 in.", unitWeight: "950 lb", prefilters: "5", highEfficiencyFilters: "10", carbonAddedWeight: "324 lb" },
  { model: "EPFA-120", cfm: "9,000", width: "120 in.", unitWeight: "1,050 lb", prefilters: "5", highEfficiencyFilters: "10", carbonAddedWeight: "360 lb" },
  { model: "EPFA-132", cfm: "9,900", width: "132 in.", unitWeight: "1,150 lb", prefilters: "6", highEfficiencyFilters: "12", carbonAddedWeight: "396 lb" },
  { model: "EPFA-144", cfm: "10,800", width: "144 in.", unitWeight: "1,250 lb", prefilters: "6", highEfficiencyFilters: "12", carbonAddedWeight: "432 lb" },
] as const;

export const products: Product[] = [
  {
    slug: "moas",
    name: "Molitron Odor Abatement System (MOAS)",
    shortName: "MOAS",
    tagline: "Commercial-kitchen exhaust odor abatement, planned for each application.",
    summary:
      "The Molitron Odor Abatement System (MOAS) atomizes Odor Neutralizer Solution through remote misting nozzles in commercial-kitchen exhaust. The self-contained, wall-mounted system can operate on its own or alongside EPFA filtration, with each application evaluated for its project conditions.",
    certifications: [
      "ETL Listed for the U.S. and Canada",
      "Intertek Report 101453585DEN-002",
      "UL 197 · CSA C22.2 No. 109",
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
      { label: "Project electrical requirement", value: "120 VAC, 15 A dedicated circuit" },
      { label: "Listed equipment rating", value: "120 V, 3.5 A, 60 Hz" },
      { label: "Water", value: '¼″ copper cold water supply, 80 PSI' },
      {
        label: "Listing",
        value: "ETL Listed for the U.S. and Canada · Intertek Report 101453585DEN-002 · UL 197 · CSA C22.2 No. 109",
      },
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
        title: "MOAS Engineering & Installation Planning Guide (Rev A)",
        description: "Published planning guide for cabinet, nozzle, utility, tubing, access, and exhaust-fan interlock coordination. Not for construction.",
        href: "/docs/moas-engineering-specs-installation-2026.pdf",
        kind: "specs",
      },
    ],
    hero: {
      src: "/images/moas/moas-closed-professional-gpt2.png",
      alt: "Molitron MOAS odor abatement system stainless steel cabinet, closed",
    },
    gallery: [
      {
        src: "/images/moas/moas-closed-professional-gpt2.png",
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
    tagline: "Three-stage dry filtration for light-duty commercial-kitchen exhaust.",
    summary:
      "The Molitron Enviro-Pak Filter Assembly (EPFA) is an in-line pollution control unit for filtering smoke particulate and grease vapor from light-duty commercial-kitchen exhaust. Its dry filter path uses a MERV 9 pre-filter, a MERV 14 high-efficiency stage, and either a MERV 14 final stage or an optional carbon final stage.",
    certifications: [
      "UL Listed under File MH45752",
      "Models EPFA-24 through EPFA-144",
      "Investigated to the UL 8782 Outline of Investigation for Pollution Control Units for Commercial Cooking Operations",
    ],
    highlights: [
      "Three-stage dry filtration: MERV 9 pre-filter, MERV 14 high-efficiency stage, and MERV 14 or optional carbon final stage",
      "Filtration requires no process water, circulation pumps, or chemical dosing",
      "Fully welded, single-wall, 18-gauge Type 304 stainless-steel enclosure with removable gasketed access doors",
      "Eleven models from EPFA-24 through EPFA-144, with owner-confirmed capacities from 1,800 to 10,800 CFM",
      "Remote operating and filter-service indication with owner-confirmed pressure thresholds",
      "Indoor or outdoor placement, subject to project-specific environmental, access, duct, support, drainage, electrical, fire-suppression, and AHJ requirements",
    ],
    specs: [
      {
        label: "Listing",
        value: "UL Listed under File MH45752 · Models EPFA-24 through EPFA-144 · Investigated to the UL 8782 Outline of Investigation for Pollution Control Units for Commercial Cooking Operations",
      },
      { label: "Filtration", value: "F1 MERV 9 pre-filter · F2 MERV 14 high-efficiency stage · F3 standard MERV 14 or optional carbon final stage" },
      { label: "Model range", value: "EPFA-24 through EPFA-144 · 24–144 in. widths · 1,800–10,800 CFM" },
      { label: "Construction", value: "18-gauge Type 304 stainless steel · fully welded, single-wall enclosure · removable gasketed access doors" },
      { label: "Footprint and access", value: "63 in. enclosure length · width W follows the model suffix · three left-side access doors · both-side access optional" },
      { label: "Monitoring", value: "120 VAC supply · green running indication at 1.5 in. w.g. · red service indication at the selected 2–5 in. w.g. setting" },
      { label: "Placement", value: "Indoor or outdoor within the exhaust path, subject to project-specific coordination and current installation requirements" },
      { label: "Minimum clearances", value: "30 in. on the service-access side · 18 in. air space to combustibles/building insulation · zero clearance to noncombustible materials" },
      { label: "Fan-selection input", value: "1.54 in. w.g. initial EPFA resistance; add hood, duct, and other system losses" },
      { label: "Service", value: "Inspect/service every four weeks and respond immediately to a red service indication" },
    ],
    useWhen: [
      "A light-duty commercial-kitchen exhaust project needs dry filtration for smoke particulate and grease vapor",
      "The project team can coordinate duct, support, service access, drains, fire suppression, electrical monitoring, fan selection, and AHJ review",
      "Indoor or outdoor equipment placement is being evaluated within the exhaust path",
      "A project-specific optional carbon stage is being evaluated for an odor-treatment objective",
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
        title: "EPFA Product & Planning Brochure (Rev A)",
        description: "Published brochure covering filter stages, model data, service clearances, monitoring, and project-interface planning. Not for construction.",
        href: "/docs/epfa-brochure-2026.pdf",
        kind: "brochure",
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
