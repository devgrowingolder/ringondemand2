import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, CircleHelp } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site/site-chrome";
import { getCampaign } from "@/lib/campaign/repository";
import { verticalBySlug, verticals } from "@/lib/verticals";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const campaignIdPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeVerticalName(value: string) {
  return value.trim().toLocaleLowerCase("en-US").replace(/\s+/g, " ");
}

export function generateStaticParams() {
  return verticals.map(({ slug }) => ({ slug }));
}

export const metadata: Metadata = {
  title: "Campaign next step",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default async function VerticalThankYouPage({
  params,
  searchParams,
}: Props) {
  const vertical = verticalBySlug.get((await params).slug);
  if (!vertical) notFound();

  const query = await searchParams;
  const rawCampaignId = firstValue(query.campaign_id ?? query.campaignId)?.trim();
  const campaignId =
    rawCampaignId && campaignIdPattern.test(rawCampaignId)
      ? rawCampaignId
      : null;
  const campaign = campaignId
    ? await getCampaign(campaignId).catch(() => null)
    : null;
  const hasSubmittedCampaign =
    campaign?.status === "submitted" &&
    normalizeVerticalName(campaign.approvedDraft.vertical.name) ===
      normalizeVerticalName(vertical.name);

  if (!hasSubmittedCampaign) {
    const brief = `I want to check ${vertical.name} availability. I need to choose a delivery model, locations, hours, volume, customer criteria, and a destination.`;
    const pricingParams = new URLSearchParams({
      brief,
      vertical: vertical.slug,
    });

    return (
      <SiteShell>
        <main className="funnel-thank-you">
          <CircleHelp aria-hidden="true" />
          <p className="section-code">{vertical.name} / No confirmation</p>
          <h1>Finish your request before continuing.</h1>
          <p>
            This link does not include a submitted {vertical.name} campaign
            that we can confirm. Start with pricing so you can review and send
            the campaign details first.
          </p>
          <div>
            <Link
              className="button button-dark"
              href={`/get-pricing?${pricingParams.toString()}`}
            >
              Start a {vertical.name} request
            </Link>
            <Link
              className="text-link"
              href={`/verticals/${vertical.slug}`}
            >
              Return to {vertical.name}
              <ArrowRight aria-hidden="true" size={15} />
            </Link>
          </div>
        </main>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <main className="funnel-thank-you">
        <CheckCircle2 aria-hidden="true" />
        <p className="section-code">{vertical.name} / Campaign reference</p>
        <h1>Your submitted campaign reference is ready.</h1>
        <p>
          Keep campaign ID <strong>{campaign.id}</strong>. Our team can use it
          to continue with the {vertical.name} details you already reviewed.
          Current availability, pricing, and final terms still need to be
          confirmed.
        </p>
        <div>
          <Link
            className="button button-dark"
            href={`/verticals/${vertical.slug}`}
          >
            Review {vertical.name} information
          </Link>
          <Link className="text-link" href="/onboarding">
            See what happens next
            <ArrowRight aria-hidden="true" size={15} />
          </Link>
        </div>
      </main>
    </SiteShell>
  );
}
