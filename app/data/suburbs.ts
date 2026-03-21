export type SuburbPage = {
  slug: string;
  name: string;
  intro: string;
  nearby: string[];
};

export const suburbs: SuburbPage[] = [
  {
    slug: "moorabbin",
    name: "Moorabbin",
    intro:
      "Reliable and detail-oriented cleaning services in Moorabbin for homes, apartments, and busy households.",
    nearby: ["Bentleigh", "Highett", "Mentone", "Hampton East"],
  },
  {
    slug: "bentleigh",
    name: "Bentleigh",
    intro:
      "Professional house cleaning services in Bentleigh with a focus on quality, consistency, and attention to detail.",
    nearby: ["Moorabbin", "McKinnon", "Ormond", "Brighton East"],
  },
  {
    slug: "mentone",
    name: "Mentone",
    intro:
      "Trusted cleaning services in Mentone for residential properties, including regular cleaning and end of lease cleaning.",
    nearby: ["Moorabbin", "Parkdale", "Cheltenham", "Beaumaris"],
  },
  {
    slug: "glen-waverley",
    name: "Glen Waverley",
    intro:
      "High-quality cleaning services in Glen Waverley for families and property owners who value reliability and attention to detail.",
    nearby: ["Mount Waverley", "Wheelers Hill", "Burwood East", "Vermont South"],
  },
  {
    slug: "glen-iris",
    name: "Glen Iris",
    intro:
      "Professional home cleaning services in Glen Iris tailored for busy households and rental properties.",
    nearby: ["Malvern East", "Camberwell", "Ashburton", "Tooronga"],
  },
  {
    slug: "clayton",
    name: "Clayton",
    intro:
      "Reliable cleaning services in Clayton for apartments, shared homes, and family residences.",
    nearby: ["Oakleigh", "Springvale", "Mulgrave", "Notting Hill"],
  },
  {
    slug: "mount-waverley",
    name: "Mount Waverley",
    intro:
      "Trusted cleaning services in Mount Waverley with a focus on consistency and high-quality results.",
    nearby: ["Glen Waverley", "Ashwood", "Burwood", "Chadstone"],
  },
  {
    slug: "oakleigh",
    name: "Oakleigh",
    intro:
      "Professional cleaning services in Oakleigh for homes and rental properties, including detailed and regular cleaning.",
    nearby: ["Clayton", "Hughesdale", "Carnegie", "Chadstone"],
  },
  {
    slug: "springvale",
    name: "Springvale",
    intro:
      "Affordable and reliable cleaning services in Springvale for households and rental properties.",
    nearby: ["Clayton", "Dandenong", "Keysborough", "Noble Park"],
  },
  {
    slug: "dandenong",
    name: "Dandenong",
    intro:
      "Experienced cleaning services in Dandenong for residential properties, including deep cleaning and end of lease cleaning.",
    nearby: ["Springvale", "Noble Park", "Endeavour Hills", "Keysborough"],
  },
  {
    slug: "berwick",
    name: "Berwick",
    intro:
      "We provide reliable and detail-focused house cleaning services in Berwick for busy households, renters, and property owners.",
    nearby: ["Narre Warren", "Beaconsfield", "Officer", "Clyde North"],
  },
  {
    slug: "narre-warren",
    name: "Narre Warren",
    intro:
      "Professional cleaning services in Narre Warren with a focus on consistency, clear communication, and practical results.",
    nearby: ["Berwick", "Hallam", "Endeavour Hills", "Cranbourne North"],
  },
  {
    slug: "cranbourne",
    name: "Cranbourne",
    intro:
      "Trusted cleaning services in Cranbourne for homes, apartments, and rental properties, including end of lease cleaning.",
    nearby: ["Clyde", "Cranbourne North", "Lyndhurst", "Botanic Ridge"],
  },
  {
    slug: "officer",
    name: "Officer",
    intro:
      "Reliable home cleaning in Officer for families and professionals who need consistent and high-quality cleaning support.",
    nearby: ["Berwick", "Beaconsfield", "Pakenham", "Clyde North"],
  },
  {
    slug: "pakenham",
    name: "Pakenham",
    intro:
      "Professional cleaning services in Pakenham for regular cleaning, deep cleaning, and move in or move out cleaning.",
    nearby: ["Officer", "Beaconsfield", "Narre Warren", "Clyde"],
  },
];

export function getSuburb(slug: string) {
  return suburbs.find((s) => s.slug === slug);
}