import type { Metadata } from "next";

export const siteUrl = "https://cleanprime.com.au";
export const siteName = "CleanPrime Melbourne";
export const businessName = "CleanPrime";
export const defaultOgImage = "/images/hero-1.jpg";

export const serviceKeywords = [
  "cleaning services Melbourne",
  "house cleaning Melbourne",
  "home cleaning Melbourne",
  "residential cleaning Melbourne",
  "regular house cleaning Melbourne",
  "deep cleaning Melbourne",
  "end of lease cleaning Melbourne",
  "apartment cleaning Melbourne",
  "move out cleaning Melbourne",
  "cleaner near me Melbourne",
  "Melbourne south east cleaning",
  "Melbourne eastern suburbs cleaning",
];

export const coreServices = [
  "House cleaning",
  "Regular cleaning",
  "Deep cleaning",
  "End of lease cleaning",
  "Apartment cleaning",
  "Move in cleaning",
  "Move out cleaning",
];

export const primaryServiceAreas = [
  "Melbourne",
  "Moorabbin",
  "Bentleigh",
  "Mentone",
  "Glen Waverley",
  "Glen Iris",
  "Clayton",
  "Mount Waverley",
  "Oakleigh",
  "Springvale",
  "Dandenong",
  "Berwick",
  "Narre Warren",
  "Cranbourne",
  "Officer",
  "Pakenham",
];

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function absoluteUrl(path = "/") {
  if (path === "/") return siteUrl;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
}: PageMetadata): Metadata {
  return {
    title,
    description,
    keywords: [...serviceKeywords, ...keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName,
      locale: "en_AU",
      type: "website",
      images: [
        {
          url: defaultOgImage,
          alt: `${siteName} professional cleaning services`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${siteUrl}/#business`,
    name: businessName,
    url: siteUrl,
    image: absoluteUrl(defaultOgImage),
    description:
      "Professional residential cleaning services across Melbourne, including regular cleaning, deep cleaning, end of lease cleaning, and move in or move out cleaning.",
    areaServed: primaryServiceAreas.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    makesOffer: coreServices.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service,
        areaServed: {
          "@type": "City",
          name: "Melbourne",
        },
      },
    })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: siteName,
    url: siteUrl,
    publisher: {
      "@id": `${siteUrl}/#business`,
    },
    inLanguage: "en-AU",
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
  area,
}: {
  name: string;
  description: string;
  path: string;
  area: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name,
    description,
    provider: {
      "@id": `${siteUrl}/#business`,
    },
    serviceType: "Residential cleaning",
    areaServed: {
      "@type": "Place",
      name: area,
    },
    url: absoluteUrl(path),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(
  items: Array<{
    question: string;
    answer: string;
  }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
