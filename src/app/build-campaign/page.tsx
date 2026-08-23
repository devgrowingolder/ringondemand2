import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CampaignBuilder } from "@/components/campaign/campaign-builder";
import { AnnouncementBar } from "@/components/site/site-chrome";
import { verticalBySlug, verticals } from "@/lib/verticals";

export const metadata: Metadata = {
  title: "Build a campaign",
  description:
    "Describe, review, and submit the Ring On Demand campaign details your team wants priced.",
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function BuildCampaignPage({ searchParams }: Props) {
  const params = await searchParams;
  const briefParam = firstValue(params.brief);
  const intentParam = firstValue(params.intent);
  const verticalParam = firstValue(params.vertical)?.trim().toLowerCase();
  const initialBrief =
    typeof briefParam === "string" ? briefParam.slice(0, 2_000) : undefined;
  const initialIntent = intentParam === "demo" ? "demo" : "pricing";
  const initialVertical = verticalParam
    ? verticalBySlug.get(verticalParam) ??
      verticals.find((vertical) => vertical.name.toLowerCase() === verticalParam)
    : undefined;

  return (
    <main className="campaign-page">
      <AnnouncementBar />
      <div className="campaign-page-brand">
        <Link href="/" aria-label="Return to Ring On Demand">
          <Image
            alt="Ring On Demand"
            height="54"
            src="/brand/ring-on-demand-logo.png"
            width="250"
          />
        </Link>
        <a
          href="https://ring-on-demand.proaxis.ai/cx/buyer/login"
          rel="noreferrer"
          target="_blank"
        >
          Buyer sign in
        </a>
      </div>
      <CampaignBuilder
        initialBrief={initialBrief}
        initialIntent={initialIntent}
        initialVertical={
          initialVertical
            ? {
                category: initialVertical.category,
                name: initialVertical.name,
              }
            : undefined
        }
      />
    </main>
  );
}
