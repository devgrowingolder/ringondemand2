import type { MetadataRoute } from "next";
import { publicSiteRoutes, absoluteSiteUrl } from "@/lib/seo";
import { isVerticalIndexable, verticals } from "@/lib/verticals";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = publicSiteRoutes.map((route) => ({
    url: absoluteSiteUrl(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
  const verticalRoutes: MetadataRoute.Sitemap = verticals
    .filter(isVerticalIndexable)
    .map((vertical) => ({
      url: absoluteSiteUrl(`/verticals/${vertical.slug}`),
      changeFrequency: "monthly",
      priority: vertical.slug === "final-expense" ? 0.7 : 0.5,
    }));

  return [...staticRoutes, ...verticalRoutes].sort((a, b) =>
    a.url.localeCompare(b.url),
  );
}
