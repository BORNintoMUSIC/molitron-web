import { pageHeroes } from "./heroes";
export const applications = [
  {
    key: "restaurants",
    href: "/solutions/restaurants",
    title: "Restaurants",
    description: "New kitchens, remodels, sensitive discharge locations.",
    image: "/images/moas/moas-commercial-kitchen-v1.webp",
    alt: "Illustrative wall-mounted MOAS cabinet and solution reservoir in a commercial kitchen",
  },
  {
    key: "airports",
    href: "/solutions/airports-hospitality",
    title: "Airports & hospitality",
    description: "Foodservice in shared buildings.",
    image: pageHeroes.airports.src,
    alt: "Illustrative airport rooftop setting with Molitron equipment",
  },
  {
    key: "cannabis",
    href: "/solutions/cannabis",
    title: "Cannabis facilities",
    description: "Start with the odor source and exhaust conditions.",
    image: pageHeroes.cannabis.src,
    alt: "Illustrative cannabis-facility setting with a MOAS cabinet",
  },
  {
    key: "industrial",
    href: "/solutions/industrial",
    title: "Industrial & specialty",
    description: "Review the process before selecting equipment.",
    image: pageHeroes.industrial.src,
    alt: "Illustrative commercial rooftop setting with Molitron equipment",
  },
] as const;
export const applicationDetails = {
  restaurants: {
    title: "Follow the exhaust path.",
    scope:
      "MOAS treats cooking odor. EPFA filters smoke particulate and grease vapor from light-duty kitchen exhaust. Some projects use both; selection is project-specific.",
    considerations: [
      [
        "Start at the hood",
        "Share the menu, cooking equipment and airflow in cubic feet per minute (CFM). Note changes to the cooking load during a remodel.",
      ],
      [
        "Trace the discharge",
        "Identify the duct, fan, discharge location and nearby occupied spaces, especially for sidewall or ground-level exhaust.",
      ],
      [
        "Plan the installation",
        "Review utilities, equipment space and service access with your design team.",
      ],
    ],
    context: "",
    cta: "Planning a restaurant kitchen?",
    ctaDescription:
      "Bring your location, project stage and available exhaust plans.",
  },
  airports: {
    title: "Plan for a shared building.",
    scope:
      "MOAS addresses cooking odor; EPFA provides dry filtration for light-duty kitchen exhaust. Selection and installation require project-specific coordination.",
    considerations: [
      [
        "Kitchen & building",
        "Share the foodservice concept, cooking equipment, airflow, and hood, duct and fan arrangement.",
      ],
      [
        "People nearby",
        "Identify neighboring tenants, public spaces, outdoor-air intakes and the discharge location.",
      ],
      [
        "Access & operations",
        "Plan access for qualified service and monitoring around foodservice hours.",
      ],
    ],
    context:
      "Molitron has installation history at Denver International Airport. This identifies experience, without implying endorsement, sponsorship or a current commercial relationship.",
    cta: "Planning an airport or hotel kitchen?",
    ctaDescription:
      "Share the facility, kitchen plans and operating constraints.",
  },
  cannabis: {
    title: "Define the source of the odor.",
    scope:
      "Molitron’s documented product scope centers on commercial kitchens. Cannabis processes require individual review; EPFA’s light-duty kitchen scope does not establish suitability for cultivation or processing.",
    considerations: [
      ["Process", "Describe the odor source, operating schedule and airflow."],
      [
        "Exhaust",
        "Share existing filtration, duct, fan, discharge conditions and nearby occupied areas.",
      ],
      [
        "Application review",
        "MOAS uses atomized Odor Neutralizer Solution. Fit, configuration and results remain project-specific.",
      ],
    ],
    context:
      "Molitron’s application history includes an EPFA reference for Greenmount Cannabis LLC, California. This identifies experience and does not imply endorsement.",
    cta: "Discuss your facility’s exhaust.",
    ctaDescription:
      "Share the location, process and local project requirements.",
  },
  industrial: {
    title: "Define the process first.",
    scope:
      "MOAS and EPFA are documented for commercial kitchen exhaust. Other processes need individual review of equipment suitability and listing coverage.",
    considerations: [
      [
        "Source",
        "Describe the process, materials, operating schedule, and odor or particulate concern.",
      ],
      [
        "Airstream",
        "Provide airflow, temperature, moisture, filtration, duct, fan and discharge details.",
      ],
      [
        "Site",
        "Identify the design team, authority having jurisdiction, utilities, access constraints and intended outcome.",
      ],
    ],
    context: "",
    cta: "Discuss a specialty application.",
    ctaDescription:
      "Share the facility location and available process information.",
  },
} as const;
