export type SuburbPage = {
  slug: string;
  name: string;
  intro: string;
  introZh: string;
  nearby: string[];
};

export const suburbs: SuburbPage[] = [
  {
    slug: "moorabbin",
    name: "Moorabbin",
    intro:
      "Reliable and detail-oriented cleaning services in Moorabbin for homes, apartments, and busy households.",
    introZh: "为 Moorabbin 的家庭、公寓和忙碌住户提供可靠、注重细节的清洁服务。",
    nearby: ["Bentleigh", "Highett", "Mentone", "Hampton East"],
  },
  {
    slug: "bentleigh",
    name: "Bentleigh",
    intro:
      "Professional house cleaning services in Bentleigh with a focus on quality, consistency, and attention to detail.",
    introZh: "在 Bentleigh 提供专业家庭清洁，重视质量稳定和细节处理。",
    nearby: ["Moorabbin", "McKinnon", "Ormond", "Brighton East"],
  },
  {
    slug: "mentone",
    name: "Mentone",
    intro:
      "Trusted cleaning services in Mentone for residential properties, including regular cleaning and end of lease cleaning.",
    introZh: "为 Mentone 住宅提供可信赖的清洁服务，包括定期清洁和退租清洁。",
    nearby: ["Moorabbin", "Parkdale", "Cheltenham", "Beaumaris"],
  },
  {
    slug: "glen-waverley",
    name: "Glen Waverley",
    intro:
      "High-quality cleaning services in Glen Waverley for families and property owners who value reliability and attention to detail.",
    introZh: "为 Glen Waverley 注重可靠性和细节的家庭及房主提供高质量清洁。",
    nearby: ["Mount Waverley", "Wheelers Hill", "Burwood East", "Vermont South"],
  },
  {
    slug: "glen-iris",
    name: "Glen Iris",
    intro:
      "Professional home cleaning services in Glen Iris tailored for busy households and rental properties.",
    introZh: "为 Glen Iris 的忙碌家庭和出租物业提供专业家庭清洁服务。",
    nearby: ["Malvern East", "Camberwell", "Ashburton", "Tooronga"],
  },
  {
    slug: "clayton",
    name: "Clayton",
    intro:
      "Reliable cleaning services in Clayton for apartments, shared homes, and family residences.",
    introZh: "为 Clayton 的公寓、合租房和家庭住宅提供可靠清洁服务。",
    nearby: ["Oakleigh", "Springvale", "Mulgrave", "Notting Hill"],
  },
  {
    slug: "mount-waverley",
    name: "Mount Waverley",
    intro:
      "Trusted cleaning services in Mount Waverley with a focus on consistency and high-quality results.",
    introZh: "在 Mount Waverley 提供可信赖清洁，重视稳定服务和高质量效果。",
    nearby: ["Glen Waverley", "Ashwood", "Burwood", "Chadstone"],
  },
  {
    slug: "oakleigh",
    name: "Oakleigh",
    intro:
      "Professional cleaning services in Oakleigh for homes and rental properties, including detailed and regular cleaning.",
    introZh: "为 Oakleigh 家庭和出租物业提供专业清洁，包括细致清洁和定期清洁。",
    nearby: ["Clayton", "Hughesdale", "Carnegie", "Chadstone"],
  },
  {
    slug: "springvale",
    name: "Springvale",
    intro:
      "Affordable and reliable cleaning services in Springvale for households and rental properties.",
    introZh: "为 Springvale 家庭和出租物业提供价格合理、可靠的清洁服务。",
    nearby: ["Clayton", "Dandenong", "Keysborough", "Noble Park"],
  },
  {
    slug: "dandenong",
    name: "Dandenong",
    intro:
      "Experienced cleaning services in Dandenong for residential properties, including deep cleaning and end of lease cleaning.",
    introZh: "为 Dandenong 住宅提供经验丰富的清洁服务，包括深度清洁和退租清洁。",
    nearby: ["Springvale", "Noble Park", "Endeavour Hills", "Keysborough"],
  },
  {
    slug: "berwick",
    name: "Berwick",
    intro:
      "We provide reliable and detail-focused house cleaning services in Berwick for busy households, renters, and property owners.",
    introZh: "为 Berwick 的忙碌家庭、租客和房主提供可靠、注重细节的家庭清洁服务。",
    nearby: ["Narre Warren", "Beaconsfield", "Officer", "Clyde North"],
  },
  {
    slug: "narre-warren",
    name: "Narre Warren",
    intro:
      "Professional cleaning services in Narre Warren with a focus on consistency, clear communication, and practical results.",
    introZh: "在 Narre Warren 提供专业清洁，重视稳定服务、清楚沟通和实际效果。",
    nearby: ["Berwick", "Hallam", "Endeavour Hills", "Cranbourne North"],
  },
  {
    slug: "cranbourne",
    name: "Cranbourne",
    intro:
      "Trusted cleaning services in Cranbourne for homes, apartments, and rental properties, including end of lease cleaning.",
    introZh: "为 Cranbourne 的家庭、公寓和出租物业提供可信赖清洁，包括退租清洁。",
    nearby: ["Clyde", "Cranbourne North", "Lyndhurst", "Botanic Ridge"],
  },
  {
    slug: "officer",
    name: "Officer",
    intro:
      "Reliable home cleaning in Officer for families and professionals who need consistent and high-quality cleaning support.",
    introZh: "为 Officer 需要稳定高质量清洁支持的家庭和上班族提供可靠服务。",
    nearby: ["Berwick", "Beaconsfield", "Pakenham", "Clyde North"],
  },
  {
    slug: "pakenham",
    name: "Pakenham",
    intro:
      "Professional cleaning services in Pakenham for regular cleaning, deep cleaning, and move in or move out cleaning.",
    introZh: "在 Pakenham 提供专业清洁，包括定期清洁、深度清洁和搬入/搬出清洁。",
    nearby: ["Officer", "Beaconsfield", "Narre Warren", "Clyde"],
  },
];

export function getSuburb(slug: string) {
  return suburbs.find((s) => s.slug === slug);
}
