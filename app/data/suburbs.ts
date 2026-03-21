export type SuburbPage = {
  slug: string;
  name: string;
  intro: string;
  nearby: string[];
};

export const suburbs: SuburbPage[] = [
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