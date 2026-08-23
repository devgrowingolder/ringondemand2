import type { MetadataRoute } from "next";
import { absoluteSiteUrl, SITE_ORIGIN } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV === "preview") {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/build-campaign/booking",
        "/careers/thank-you",
        "/verticals/*/thank-you",
      ],
    },
    sitemap: absoluteSiteUrl("/sitemap.xml"),
    host: SITE_ORIGIN,
  };
}
