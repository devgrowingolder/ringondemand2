import { redirect } from "next/navigation";
import {
  buildCampaignEntryHref,
  type CampaignEntrySearchParams,
} from "@/lib/campaign/form";

type Props = {
  searchParams: Promise<CampaignEntrySearchParams>;
};

export default async function GetPricingPage({ searchParams }: Props) {
  redirect(buildCampaignEntryHref(await searchParams, "pricing"));
}
