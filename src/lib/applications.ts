import { pageHeroes } from "./heroes";

export const applications = [
  {
    key: "restaurants",
    href: "/solutions/restaurants",
    title: "Restaurants",
    description:
      "New builds, remodels, and urban kitchens with demanding exhaust paths.",
    image: pageHeroes.restaurants.src,
    alt: "Illustrative restaurant rooftop setting with Molitron equipment",
  },
  {
    key: "airports",
    href: "/solutions/airports-hospitality",
    title: "Airports & hospitality",
    description:
      "Public-facing kitchens, shared buildings, and coordinated service access.",
    image: pageHeroes.airports.src,
    alt: "Illustrative airport rooftop setting with Molitron equipment",
  },
  {
    key: "cannabis",
    href: "/solutions/cannabis",
    title: "Cannabis facilities",
    description:
      "Odor-sensitive environments that begin with a review of the process and exhaust.",
    image: pageHeroes.cannabis.src,
    alt: "Illustrative cannabis-facility setting with a MOAS cabinet",
  },
  {
    key: "industrial",
    href: "/solutions/industrial",
    title: "Industrial & specialty",
    description:
      "A documented application review for a specific process and airstream.",
    image: pageHeroes.industrial.src,
    alt: "Illustrative commercial rooftop setting with Molitron equipment",
  },
] as const;

export const applicationDetails = {
  restaurants: {
    eyebrow: "Kitchen to discharge",
    title: "Consider the whole exhaust path.",
    intro:
      "The menu, cooking equipment, airflow, and discharge location shape the equipment decision.",
    considerations: [
      [
        "New construction",
        "Coordinate the hood layout, airflow, equipment location, and discharge path early, especially in mixed-use buildings.",
      ],
      [
        "Remodels & menu changes",
        "Review the cooking load and existing exhaust when equipment changes or smoke and odor concerns arise.",
      ],
      [
        "Urban & sidewall discharge",
        "Share the available exhaust route, nearby occupied areas, and project requirements. Filtration and odor abatement may both enter the discussion.",
      ],
      [
        "Filtration, odor, or both",
        "EPFA is documented for dry filtration of light-duty commercial-kitchen exhaust. MOAS addresses exhaust odor; the appropriate combination is project-specific.",
      ],
    ],
    inputs: [
      "City, state, and project stage",
      "Cooking equipment and hood arrangement",
      "Airflow (CFM), if known",
      "Duct, fan, and discharge location",
      "Smoke, grease-vapor, or odor concerns",
    ],
    contextTitle: "A useful first conversation.",
    context:
      "Start with what you know. Molitron can help identify which product information your design team needs next.",
    cta: "Planning a restaurant kitchen?",
  },
  airports: {
    eyebrow: "Foodservice in shared spaces",
    title: "Coordinate equipment with the building.",
    intro:
      "High-visibility kitchens bring multiple teams, neighboring spaces, and ongoing operations into the exhaust discussion.",
    considerations: [
      [
        "Neighboring spaces",
        "Review odor and visible-smoke concerns around tenants, public spaces, occupied areas, and outdoor-air intakes.",
      ],
      [
        "Access & operations",
        "Plan access, monitoring, and qualified service alongside ongoing foodservice operations.",
      ],
      [
        "Technical coordination",
        "Use the MOAS planning guide and EPFA operation and maintenance manual to clarify equipment interfaces and project responsibilities.",
      ],
    ],
    inputs: [
      "Facility and foodservice concept",
      "Cooking equipment and airflow",
      "Hood, duct, and fan arrangement",
      "Discharge location and nearby air intakes",
      "Access, service, and operating constraints",
    ],
    contextTitle: "Experience at Denver International Airport.",
    context:
      "Molitron equipment has installation history in multiple restaurant concepts at Denver International Airport. References identify experience and do not imply endorsement, sponsorship, or a current commercial relationship.",
    cta: "Planning an airport or hotel kitchen?",
  },
  cannabis: {
    eyebrow: "Application review",
    title: "Follow the odor to its source.",
    intro:
      "Molitron’s active product documentation centers on commercial-kitchen exhaust. Cannabis inquiries require a review of the actual process and application.",
    considerations: [
      [
        "Process & operating conditions",
        "Share the process, operating schedule, airflow, and odor concern so Molitron can evaluate the application.",
      ],
      [
        "Exhaust odor",
        "MOAS delivers atomized Odor Neutralizer Solution through remote nozzles. Application fit, configuration, and results remain project-specific.",
      ],
      [
        "Filtration scope",
        "EPFA may be discussed for documented light-duty foodservice exhaust, including co-located kitchens. Its scope should not be generalized to every cannabis process.",
      ],
    ],
    inputs: [
      "Facility location and process description",
      "Odor source and operating schedule",
      "Airflow and exhaust conditions",
      "Existing filters, duct, fan, and discharge",
      "Nearby occupied areas and local requirements",
    ],
    contextTitle: "Application history, with context.",
    context:
      "Molitron has cannabis-related installation and application history, including an EPFA reference for Greenmount Cannabis LLC in California. References identify experience and do not imply endorsement.",
    cta: "Have a cannabis exhaust inquiry?",
  },
  industrial: {
    eyebrow: "Start with the airstream",
    title: "Define the process before choosing equipment.",
    intro:
      "Molitron primarily serves commercial-kitchen exhaust. Other commercial and industrial inquiries begin with a documented application review.",
    considerations: [
      [
        "What is the source?",
        "Describe the process, materials, operating schedule, and specific odor or particulate concern. A facility category alone does not establish product fit.",
      ],
      [
        "What moves through the exhaust?",
        "Provide airflow, temperature, moisture, existing filtration, duct path, fan arrangement, and discharge location when known.",
      ],
      [
        "What must the project satisfy?",
        "Identify the site, design team, authority having jurisdiction, utilities, access constraints, and intended outcome.",
      ],
    ],
    inputs: [
      "Facility, city, and state",
      "Process, materials, and operating schedule",
      "Airflow, temperature, and moisture",
      "Contaminants or odor concern",
      "Existing exhaust arrangement and discharge",
      "Project requirements and access constraints",
    ],
    contextTitle: "Use the documented product scope.",
    context:
      "MOAS addresses commercial-kitchen exhaust odor. EPFA filters smoke particulate and grease vapor from light-duty commercial-kitchen exhaust. Fit and listing coverage for an unrelated industrial process must not be assumed.",
    cta: "Have a nonstandard exhaust problem?",
  },
} as const;
