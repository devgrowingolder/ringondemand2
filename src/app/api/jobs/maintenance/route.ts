import { NextResponse } from "next/server";
import {
  deleteExpiredCampaigns,
  getCampaign,
  getRetryableHandoffs,
} from "@/lib/campaign/repository";
import { retryCampaignHandoff } from "@/lib/campaign/webhook";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const retryable = await getRetryableHandoffs();
  const results = [];

  for (const handoff of retryable) {
    const campaign = await getCampaign(handoff.campaignId);
    if (!campaign) {
      results.push({ id: handoff.id, status: "campaign_missing" });
      continue;
    }
    const result = await retryCampaignHandoff(campaign, {
      id: handoff.id,
      campaignId: handoff.campaignId,
      eventId: handoff.eventId,
      idempotencyKey: handoff.idempotencyKey,
      attempts: handoff.attempts,
      status: handoff.status as "failed",
    });
    results.push({ id: handoff.id, status: result.status });
  }

  const expiredDeleted = await deleteExpiredCampaigns();
  return NextResponse.json({
    retryCount: results.length,
    retries: results,
    expiredDeleted,
  });
}
