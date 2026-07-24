import { createHmac } from "node:crypto";
import type { CampaignRecord } from "@/lib/campaign/repository";
import {
  createHandoff,
  type HandoffRecord,
  updateHandoff,
} from "@/lib/campaign/repository";

export function signWebhookPayload(
  secret: string,
  timestamp: string,
  payload: string,
) {
  return createHmac("sha256", secret)
    .update(`${timestamp}.${payload}`)
    .digest("hex");
}

export async function deliverCampaignHandoff({
  campaign,
  eventId,
  idempotencyKey,
}: {
  campaign: CampaignRecord;
  eventId: string;
  idempotencyKey: string;
}) {
  const handoff = await createHandoff(campaign.id, eventId, idempotencyKey);
  if (!handoff) return { status: "duplicate" as const };
  return attemptCampaignHandoff(campaign, {
    id: handoff.id,
    campaignId: handoff.campaignId,
    eventId: handoff.eventId,
    idempotencyKey: handoff.idempotencyKey,
    attempts: handoff.attempts,
    status: handoff.status as HandoffRecord["status"],
  });
}

export async function retryCampaignHandoff(
  campaign: CampaignRecord,
  handoff: Pick<
    HandoffRecord,
    "id" | "campaignId" | "eventId" | "idempotencyKey" | "attempts" | "status"
  >,
) {
  return attemptCampaignHandoff(campaign, handoff);
}

async function attemptCampaignHandoff(
  campaign: CampaignRecord,
  handoff: Pick<
    HandoffRecord,
    "id" | "campaignId" | "eventId" | "idempotencyKey" | "attempts" | "status"
  >,
) {

  const url = process.env.RID_CAMPAIGN_WEBHOOK_URL;
  if (!url) {
    await updateHandoff(handoff.id, {
      status: "skipped",
      attempts: handoff.attempts,
    });
    return { status: "skipped" as const };
  }

  const secret = process.env.RID_CAMPAIGN_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error(
      "RID_CAMPAIGN_WEBHOOK_SECRET is required when a webhook URL is configured.",
    );
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const body = JSON.stringify({
    event_id: handoff.eventId,
    campaign_id: campaign.id,
    idempotency_key: handoff.idempotencyKey,
    schema_version: campaign.schemaVersion,
    intent: campaign.intent,
    campaign: campaign.approvedDraft,
    buyer: campaign.contact,
    attribution: campaign.attribution,
    submitted_at: campaign.createdAt.toISOString(),
  });
  const signature = signWebhookPayload(secret, timestamp, body);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-rid-event-id": handoff.eventId,
        "x-rid-campaign-id": campaign.id,
        "x-rid-idempotency-key": handoff.idempotencyKey,
        "x-rid-timestamp": timestamp,
        "x-rid-signature": `sha256=${signature}`,
      },
      body,
      signal: AbortSignal.timeout(12_000),
    });

    if (!response.ok) {
      throw new Error(`Webhook returned ${response.status}.`);
    }

    await updateHandoff(handoff.id, {
      status: "delivered",
      attempts: handoff.attempts + 1,
    });
    return { status: "delivered" as const };
  } catch (error) {
    const attempts = handoff.attempts + 1;
    const delayMinutes = Math.min(60, 2 ** attempts);
    await updateHandoff(handoff.id, {
      status: "failed",
      attempts,
      lastError: error instanceof Error ? error.message.slice(0, 500) : "Unknown",
      nextAttemptAt: new Date(Date.now() + delayMinutes * 60_000),
    });
    return { status: "failed" as const };
  }
}
