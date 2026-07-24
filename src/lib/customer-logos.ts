export type CustomerLogoPresentation = "standard" | "wide" | "tall";

export type CustomerLogo = {
  companyName: string;
  src: string;
  width: number;
  height: number;
  presentation: CustomerLogoPresentation;
};

export const customerLogos = {
  "555-capitol-mall": {
    companyName: "555 Capitol Mall",
    src: "/images/previous-customers/optimized/555-capitol-mall.png",
    width: 142,
    height: 89,
    presentation: "standard",
  },
  "alexanders-steakhouse": {
    companyName: "Alexander's Steakhouse",
    src: "/images/previous-customers/optimized/alexanders-steakhouse.png",
    width: 332,
    height: 278,
    presentation: "standard",
  },
  "burger-king": {
    companyName: "Burger King",
    src: "/images/previous-customers/optimized/burger-king.png",
    width: 591,
    height: 600,
    presentation: "standard",
  },
  "chick-fil-a": {
    companyName: "Chick-fil-A",
    src: "/images/previous-customers/optimized/chick-fil-a.png",
    width: 1200,
    height: 541,
    presentation: "wide",
  },
  chipotle: {
    companyName: "Chipotle",
    src: "/images/previous-customers/optimized/chipotle.png",
    width: 600,
    height: 600,
    presentation: "standard",
  },
  "coopers-old-time-bbq": {
    companyName: "Cooper's Old Time Pit Bar-B-Que",
    src: "/images/previous-customers/optimized/coopers-old-time-bbq.png",
    width: 355,
    height: 285,
    presentation: "standard",
  },
  "denver-international-airport": {
    companyName: "Denver International Airport",
    src: "/images/previous-customers/optimized/denver-international-airport.png",
    width: 690,
    height: 600,
    presentation: "tall",
  },
  "district-taco": {
    companyName: "District Taco",
    src: "/images/previous-customers/optimized/district-taco.png",
    width: 591,
    height: 408,
    presentation: "standard",
  },
  "dong-lai-shun": {
    companyName: "Dong Lai Shun",
    src: "/images/previous-customers/optimized/dong-lai-shun.png",
    width: 225,
    height: 106,
    presentation: "wide",
  },
  garbanzo: {
    companyName: "Garbanzo Mediterranean Fresh",
    src: "/images/previous-customers/optimized/garbanzo.png",
    width: 344,
    height: 70,
    presentation: "wide",
  },
  greenmount: {
    companyName: "Greenmount",
    src: "/images/previous-customers/optimized/greenmount.png",
    width: 499,
    height: 27,
    presentation: "wide",
  },
  "habit-burger-and-grill": {
    companyName: "Habit Burger & Grill",
    src: "/images/previous-customers/optimized/habit-burger-and-grill.png",
    width: 900,
    height: 600,
    presentation: "standard",
  },
  haidilao: {
    companyName: "Haidilao",
    src: "/images/previous-customers/optimized/haidilao.png",
    width: 800,
    height: 302,
    presentation: "wide",
  },
  hyatt: {
    companyName: "Hyatt",
    src: "/images/previous-customers/optimized/hyatt.png",
    width: 468,
    height: 115,
    presentation: "wide",
  },
  "johnny-rockets": {
    companyName: "Johnny Rockets",
    src: "/images/previous-customers/optimized/johnny-rockets.png",
    width: 674,
    height: 600,
    presentation: "standard",
  },
  "lazy-dog": {
    companyName: "Lazy Dog",
    src: "/images/previous-customers/optimized/lazy-dog.png",
    width: 550,
    height: 182,
    presentation: "wide",
  },
  "luna-grill": {
    companyName: "Luna Grill",
    src: "/images/previous-customers/optimized/luna-grill.png",
    width: 598,
    height: 138,
    presentation: "wide",
  },
  "oyster-oyster": {
    companyName: "Oyster Oyster",
    src: "/images/previous-customers/optimized/oyster-oyster.png",
    width: 306,
    height: 196,
    presentation: "standard",
  },
  "plaza-premium-lounge": {
    companyName: "Plaza Premium Lounge",
    src: "/images/previous-customers/optimized/plaza-premium-lounge.png",
    width: 403,
    height: 217,
    presentation: "standard",
  },
  qdoba: {
    companyName: "Qdoba Mexican Eats",
    src: "/images/previous-customers/optimized/qdoba.png",
    width: 862,
    height: 170,
    presentation: "wide",
  },
  "ritz-carlton": {
    companyName: "The Ritz-Carlton",
    src: "/images/previous-customers/optimized/ritz-carlton.png",
    width: 324,
    height: 264,
    presentation: "standard",
  },
  "steins-beer-garden": {
    companyName: "Steins Beer Garden",
    src: "/images/previous-customers/optimized/steins-beer-garden.png",
    width: 284,
    height: 284,
    presentation: "standard",
  },
  "taco-connection": {
    companyName: "The Taco Connection",
    src: "/images/previous-customers/optimized/taco-connection.png",
    width: 947,
    height: 600,
    presentation: "standard",
  },
  "uc-san-diego": {
    companyName: "UC San Diego",
    src: "/images/previous-customers/optimized/uc-san-diego.png",
    width: 1200,
    height: 225,
    presentation: "wide",
  },
  "urban-egg": {
    companyName: "Urban Egg",
    src: "/images/previous-customers/optimized/urban-egg.png",
    width: 600,
    height: 600,
    presentation: "standard",
  },
} as const satisfies Record<string, CustomerLogo>;

type CustomerLogoKey = keyof typeof customerLogos;

const logoKeyByReference = {
  "555 Capital Mall, CA": "555-capitol-mall",
  "Alexander's Steak House": "alexanders-steakhouse",
  "Burger King": "burger-king",
  "Chick-fil-A": "chick-fil-a",
  Chipotle: "chipotle",
  "Cooper's Pit Bar-B-Que": "coopers-old-time-bbq",
  "Denver International Airport": "denver-international-airport",
  "District Taco": "district-taco",
  "Dong Lai Shun, CA": "dong-lai-shun",
  "Garbanzo, Denver International Airport": "garbanzo",
  "Greenmount Cannabis LLC, CA": "greenmount",
  "Habit Burger": "habit-burger-and-grill",
  Haidilao: "haidilao",
  Hyatt: "hyatt",
  "Hyatt Hotel, TX": "hyatt",
  "Johnny Rocket, CA": "johnny-rockets",
  "Lazy Dog": "lazy-dog",
  "Luna Grill": "luna-grill",
  "Oyster Oyster, DC": "oyster-oyster",
  "Plaza Premium Lounge, Denver International Airport": "plaza-premium-lounge",
  "Qdoba, Denver International Airport": "qdoba",
  "Ritz-Carlton": "ritz-carlton",
  "Stein Beer Garden, CA": "steins-beer-garden",
  "Taco Connection, CO": "taco-connection",
  "University of California SD, CA": "uc-san-diego",
  "Urban Egg, CO": "urban-egg",
} as const satisfies Record<string, CustomerLogoKey>;

export const featuredCustomerReferences = [
  "Ritz-Carlton",
  "Chick-fil-A",
  "Chipotle",
  "Burger King",
  "Hyatt",
  "Denver International Airport",
] as const;

export function getCustomerLogo(reference: string): CustomerLogo | undefined {
  const key = logoKeyByReference[reference as keyof typeof logoKeyByReference];
  return key ? customerLogos[key] : undefined;
}
