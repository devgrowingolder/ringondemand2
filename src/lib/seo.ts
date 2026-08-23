import type { Metadata, MetadataRoute } from "next";

export const SITE_NAME = "Ring On Demand";
export const SITE_ORIGIN = "https://ringondemand.com";
export const SITE_DESCRIPTION =
  "Choose inbound calls, real-time leads, or booked appointments, then set the service area, schedule, volume, customer criteria, and destination that fit your team.";

export type PublicSiteRoute = Readonly<{
  path: `/${string}` | "/";
  changeFrequency: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;
  priority: number;
}>;

export const publicSiteRoutes: readonly PublicSiteRoute[] = Object.freeze([
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/agents", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.65 },
  { path: "/brands", changeFrequency: "monthly", priority: 0.55 },
  { path: "/build-campaign", changeFrequency: "monthly", priority: 0.85 },
  { path: "/careers", changeFrequency: "weekly", priority: 0.65 },
  { path: "/careers/apply", changeFrequency: "monthly", priority: 0.45 },
  { path: "/community", changeFrequency: "monthly", priority: 0.55 },
  { path: "/company/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/company/contact", changeFrequency: "monthly", priority: 0.6 },
  { path: "/compare", changeFrequency: "monthly", priority: 0.7 },
  { path: "/compare/calls-vs-booked-appointments", changeFrequency: "monthly", priority: 0.6 },
  { path: "/compare/inbound-calls-vs-form-leads", changeFrequency: "monthly", priority: 0.6 },
  { path: "/compare/real-time-leads-vs-shared-leads", changeFrequency: "monthly", priority: 0.6 },
  { path: "/compare/ring-on-demand-vs-building-in-house", changeFrequency: "monthly", priority: 0.6 },
  { path: "/compare/ring-on-demand-vs-lead-marketplaces", changeFrequency: "monthly", priority: 0.6 },
  { path: "/connected-apps", changeFrequency: "monthly", priority: 0.65 },
  { path: "/customers", changeFrequency: "monthly", priority: 0.65 },
  { path: "/how-it-works", changeFrequency: "monthly", priority: 0.8 },
  { path: "/onboarding", changeFrequency: "monthly", priority: 0.6 },
  { path: "/partners", changeFrequency: "monthly", priority: 0.65 },
  { path: "/platform", changeFrequency: "monthly", priority: 0.75 },
  {
    path: "/platform/campaign-setup",
    changeFrequency: "monthly",
    priority: 0.65,
  },
  { path: "/platform/delivery", changeFrequency: "monthly", priority: 0.65 },
  {
    path: "/platform/quality-review",
    changeFrequency: "monthly",
    priority: 0.65,
  },
  { path: "/platform/reporting", changeFrequency: "monthly", priority: 0.65 },
  { path: "/products/booked-appointments", changeFrequency: "monthly", priority: 0.75 },
  { path: "/products/inbound-calls", changeFrequency: "monthly", priority: 0.75 },
  { path: "/products/real-time-leads", changeFrequency: "monthly", priority: 0.75 },
  { path: "/resources", changeFrequency: "weekly", priority: 0.7 },
  { path: "/resources/call-center-readiness-checklist", changeFrequency: "monthly", priority: 0.55 },
  { path: "/resources/campaign-planning-template", changeFrequency: "monthly", priority: 0.55 },
  { path: "/resources/glossary", changeFrequency: "monthly", priority: 0.55 },
  { path: "/resources/quality-and-credit-guide", changeFrequency: "monthly", priority: 0.55 },
  { path: "/legal/accessibility", changeFrequency: "yearly", priority: 0.35 },
  { path: "/legal/billable-call-guidelines", changeFrequency: "monthly", priority: 0.4 },
  { path: "/legal/consent-and-traffic-policy", changeFrequency: "monthly", priority: 0.4 },
  { path: "/legal/credit-and-refund-policy", changeFrequency: "monthly", priority: 0.4 },
  { path: "/legal/privacy", changeFrequency: "monthly", priority: 0.4 },
  { path: "/legal/terms", changeFrequency: "monthly", priority: 0.4 },
  { path: "/trust", changeFrequency: "monthly", priority: 0.7 },
  { path: "/verticals", changeFrequency: "weekly", priority: 0.85 },
]);

function siteUrl(path: string) {
  const url = new URL(path, SITE_ORIGIN);

  if (url.origin !== SITE_ORIGIN) {
    throw new Error("Canonical paths must stay on ringondemand.com.");
  }

  url.search = "";
  url.hash = "";
  return url;
}

export function absoluteSiteUrl(path = "/") {
  return siteUrl(path).toString();
}

export function canonicalSiteUrl(path = "/") {
  const url = siteUrl(path);
  return url.pathname === "/" ? SITE_ORIGIN : url.toString().replace(/\/$/, "");
}

type PageMetadataInput = Readonly<{
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  socialImage?: string;
}>;

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
  socialImage,
}: PageMetadataInput): Metadata {
  const canonical = canonicalSiteUrl(path);
  const socialTitle = `${title} | ${SITE_NAME}`;
  const images = socialImage
    ? [{ url: absoluteSiteUrl(socialImage), alt: socialTitle }]
    : undefined;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: socialTitle,
      description,
      siteName: SITE_NAME,
      type: "website",
      url: canonical,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: socialImage ? [absoluteSiteUrl(socialImage)] : undefined,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
          },
        }
      : undefined,
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  applicationName: SITE_NAME,
  title: {
    default: `${SITE_NAME} | Pay-Per-Call, Leads & Appointments`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  manifest: "/manifest.webmanifest",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: `${SITE_NAME} | Pay-Per-Call, Leads & Appointments`,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    type: "website",
    url: SITE_ORIGIN,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Pay-Per-Call, Leads & Appointments`,
    description: SITE_DESCRIPTION,
  },
};
