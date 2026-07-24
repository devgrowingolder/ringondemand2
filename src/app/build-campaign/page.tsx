import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CampaignBuilder } from "@/components/campaign/campaign-builder";
import { AnnouncementBar } from "@/components/site/site-chrome";

export const metadata: Metadata = {
  title: "Build a campaign",
  description:
    "Describe, confirm, approve, and submit one canonical Ring On Demand campaign brief.",
};

type Props = {
  searchParams: Promise<{
    brief?: string;
    intent?: string;
  }>;
};

export default async function BuildCampaignPage({ searchParams }: Props) {
  const params = await searchParams;
  const initialBrief =
    typeof params.brief === "string" ? params.brief.slice(0, 2_000) : undefined;
  const initialIntent = params.intent === "demo" ? "demo" : "pricing";

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
      />
    </main>
  );
}
