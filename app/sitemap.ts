import type { MetadataRoute } from "next";
import { suburbs } from "@/app/data/suburbs";
import { absoluteUrl } from "@/app/seo";

const lastModified = new Date("2026-07-25");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/service-areas"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/quote"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/about"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const suburbRoutes: MetadataRoute.Sitemap = suburbs.map((suburb) => ({
    url: absoluteUrl(`/cleaning/${suburb.slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...suburbRoutes];
}
