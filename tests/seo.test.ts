import { afterEach, describe, expect, it } from "vitest";
import manifest from "@/app/manifest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import {
  absoluteSiteUrl,
  canonicalSiteUrl,
  createPageMetadata,
  publicSiteRoutes,
  rootMetadata,
  SITE_ORIGIN,
} from "@/lib/seo";
import { isVerticalIndexable, verticals } from "@/lib/verticals";

const originalVercelEnvironment = process.env.VERCEL_ENV;

afterEach(() => {
  if (originalVercelEnvironment === undefined) {
    delete process.env.VERCEL_ENV;
  } else {
    process.env.VERCEL_ENV = originalVercelEnvironment;
  }
});

describe("SEO metadata", () => {
  it("builds a query-free canonical and complete social metadata", () => {
    const metadata = createPageMetadata({
      title: "Final Expense",
      description: "Plan a Final Expense campaign around your team.",
      path: "/verticals/final-expense?utm_source=test#pricing",
    });

    expect(metadata.alternates?.canonical).toBe(
      "https://ringondemand.com/verticals/final-expense",
    );
    expect(metadata.openGraph).toMatchObject({
      title: "Final Expense | Ring On Demand",
      type: "website",
      url: "https://ringondemand.com/verticals/final-expense",
    });
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
  });

  it("fails closed when a canonical attempts to leave the site", () => {
    expect(() => canonicalSiteUrl("https://example.com/claim")).toThrow(
      /must stay on ringondemand\.com/,
    );
  });

  it("keeps canonical paths out of root metadata so child pages cannot inherit home", () => {
    expect(rootMetadata.metadataBase?.toString()).toBe(`${SITE_ORIGIN}/`);
    expect(rootMetadata.alternates).toBeUndefined();
  });

  it("marks transactional metadata as noindex when requested", () => {
    const metadata = createPageMetadata({
      title: "Thank you",
      description: "Your next steps.",
      path: "/careers/thank-you",
      noIndex: true,
    });

    expect(metadata.robots).toMatchObject({
      index: false,
      follow: false,
      nocache: true,
    });
  });
});

describe("SEO discovery routes", () => {
  it("publishes every declared informational route and only proof-backed verticals once", () => {
    const entries = sitemap();
    const urls = entries.map(({ url }) => url);

    expect(new Set(urls).size).toBe(urls.length);
    publicSiteRoutes.forEach(({ path }) => {
      expect(urls).toContain(absoluteSiteUrl(path));
    });
    verticals.forEach((vertical) => {
      const url = absoluteSiteUrl(`/verticals/${vertical.slug}`);
      if (isVerticalIndexable(vertical)) {
        expect(urls).toContain(url);
      } else {
        expect(urls).not.toContain(url);
      }
    });
  });

  it("omits redirects, API routes, booking fallbacks, and thank-you pages", () => {
    const urls = sitemap().map(({ url }) => new URL(url).pathname);

    expect(urls).not.toContain("/get-pricing");
    expect(urls).not.toContain("/book-a-call");
    expect(urls).not.toContain("/login");
    expect(urls).not.toContain("/build-campaign/booking");
    expect(urls.some((url) => url.startsWith("/api/"))).toBe(false);
    expect(urls.some((url) => url.endsWith("/thank-you"))).toBe(false);
  });

  it("blocks preview deployments and protects transactional routes in production", () => {
    process.env.VERCEL_ENV = "preview";
    expect(robots()).toEqual({
      rules: { userAgent: "*", disallow: "/" },
    });

    process.env.VERCEL_ENV = "production";
    expect(robots()).toMatchObject({
      host: SITE_ORIGIN,
      sitemap: "https://ringondemand.com/sitemap.xml",
      rules: {
        userAgent: "*",
        allow: "/",
        disallow: expect.arrayContaining([
          "/api/",
          "/build-campaign/booking",
          "/careers/thank-you",
          "/verticals/*/thank-you",
        ]),
      },
    });
  });

  it("publishes a RID web manifest with the existing favicon", () => {
    expect(manifest()).toMatchObject({
      name: "Ring On Demand",
      short_name: "Ring On Demand",
      start_url: "/",
      theme_color: "#090720",
      icons: [
        {
          src: "/favicon.ico",
          sizes: "any",
          type: "image/x-icon",
        },
      ],
    });
  });
});
