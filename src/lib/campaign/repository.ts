import { randomUUID } from "node:crypto";
import { and, eq, lte } from "drizzle-orm";
import {
  campaignBriefs,
  campaignEvents,
  handoffDeliveries,
} from "@/db/schema";
import type {
  CampaignActionInput,
  CreateCampaignInput,
} from "@/lib/campaign/schema";
import { getDatabase } from "@/lib/db";

export type CampaignRecord = {
  id: string;
  schemaVersion: "CampaignDraftV1";
  status: string;
  createdAt: Date;
  expiresAt: Date;
} & CreateCampaignInput;

type MemoryState = {
  campaigns: Map<string, CampaignRecord>;
  idempotency: Map<string, { eventId: string; result: CampaignActionResult }>;
  handoffs: Map<string, HandoffRecord>;
};

export type HandoffRecord = {
  id: string;
  campaignId: string;
  eventId: string;
  idempotencyKey: string;
  status: "pending" | "delivered" | "failed" | "skipped";
  attempts: number;
  lastError?: string;
  nextAttemptAt?: Date;
};

export type CampaignActionResult = {
  eventId: string;
  action: CampaignActionInput["action"];
  bookingUrl?: string;
  alreadyProcessed: boolean;
};

declare global {
  var __ridMemoryState__: MemoryState | undefined;
}

function memoryState() {
  globalThis.__ridMemoryState__ ??= {
    campaigns: new Map(),
    idempotency: new Map(),
    handoffs: new Map(),
  };
  return globalThis.__ridMemoryState__;
}

function ensureRuntimeStorage() {
  const db = getDatabase();
  if (!db && process.env.NODE_ENV === "production") {
    throw new Error("DATABASE_URL is required in production.");
  }
  return db;
}

export async function createCampaign(input: CreateCampaignInput) {
  const db = ensureRuntimeStorage();
  const id = randomUUID();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);

  const record: CampaignRecord = {
    ...input,
    id,
    schemaVersion: "CampaignDraftV1",
    status: "submitted",
    createdAt: now,
    expiresAt,
  };

  if (!db) {
    memoryState().campaigns.set(id, record);
    return record;
  }

  await db.insert(campaignBriefs).values({
    id,
    schemaVersion: record.schemaVersion,
    status: record.status,
    intent: input.intent,
    rawBrief: input.rawBrief,
    approvedDraft: input.approvedDraft,
    buyerName: input.contact.buyerName,
    company: input.contact.company,
    workEmail: input.contact.workEmail,
    phone: input.contact.phone,
    attribution: input.attribution,
    consentAt: now,
    expiresAt,
  });

  await db.insert(campaignEvents).values({
    id: randomUUID(),
    campaignId: id,
    eventName: "campaign_submission",
    metadata: {
      intent: input.intent,
      deliveryModel: input.approvedDraft.deliveryModel,
      vertical: input.approvedDraft.vertical.name,
    },
  });

  return record;
}

export async function getCampaign(id: string): Promise<CampaignRecord | null> {
  const db = ensureRuntimeStorage();
  if (!db) return memoryState().campaigns.get(id) ?? null;

  const [row] = await db
    .select()
    .from(campaignBriefs)
    .where(eq(campaignBriefs.id, id))
    .limit(1);

  if (!row) return null;

  return {
    id: row.id,
    schemaVersion: "CampaignDraftV1",
    status: row.status,
    rawBrief: row.rawBrief,
    approvedDraft: row.approvedDraft,
    intent: row.intent as "pricing" | "demo",
    attribution: row.attribution,
    buyerApproved: true,
    contact: {
      buyerName: row.buyerName,
      company: row.company,
      workEmail: row.workEmail,
      phone: row.phone,
      consent: true,
    },
    createdAt: row.createdAt,
    expiresAt: row.expiresAt,
  };
}

export async function createCampaignAction(
  campaignId: string,
  input: CampaignActionInput,
): Promise<CampaignActionResult> {
  const db = ensureRuntimeStorage();
  const bookingBase =
    process.env.RID_SCHEDULING_URL ?? "/build-campaign/booking";
  const bookingUrl = new URL(
    bookingBase,
    bookingBase.startsWith("http") ? undefined : "http://rid.local",
  );
  bookingUrl.searchParams.set("campaign_id", campaignId);

  if (!db) {
    const state = memoryState();
    const existing = state.idempotency.get(input.idempotencyKey);
    if (existing) return { ...existing.result, alreadyProcessed: true };

    const eventId = randomUUID();
    const result: CampaignActionResult = {
      eventId,
      action: input.action,
      bookingUrl:
        input.action === "start_demo_booking"
          ? bookingBase.startsWith("http")
            ? bookingUrl.toString()
            : `${bookingUrl.pathname}${bookingUrl.search}`
          : undefined,
      alreadyProcessed: false,
    };
    state.idempotency.set(input.idempotencyKey, { eventId, result });
    return result;
  }

  const [existing] = await db
    .select()
    .from(campaignEvents)
    .where(eq(campaignEvents.idempotencyKey, input.idempotencyKey))
    .limit(1);

  if (existing) {
    return {
      eventId: existing.id,
      action: input.action,
      bookingUrl:
        input.action === "start_demo_booking"
          ? bookingBase.startsWith("http")
            ? bookingUrl.toString()
            : `${bookingUrl.pathname}${bookingUrl.search}`
          : undefined,
      alreadyProcessed: true,
    };
  }

  const eventId = randomUUID();
  await db.insert(campaignEvents).values({
    id: eventId,
    campaignId,
    eventName: input.action,
    idempotencyKey: input.idempotencyKey,
    metadata: {},
  });

  return {
    eventId,
    action: input.action,
    bookingUrl:
      input.action === "start_demo_booking"
        ? bookingBase.startsWith("http")
          ? bookingUrl.toString()
          : `${bookingUrl.pathname}${bookingUrl.search}`
        : undefined,
    alreadyProcessed: false,
  };
}

export async function createHandoff(
  campaignId: string,
  eventId: string,
  idempotencyKey: string,
) {
  const db = ensureRuntimeStorage();
  const id = randomUUID();

  if (!db) {
    const handoff: HandoffRecord = {
      id,
      campaignId,
      eventId,
      idempotencyKey,
      status: "pending",
      attempts: 0,
    };
    memoryState().handoffs.set(id, handoff);
    return handoff;
  }

  const [row] = await db
    .insert(handoffDeliveries)
    .values({
      id,
      campaignId,
      eventId,
      idempotencyKey,
    })
    .onConflictDoNothing()
    .returning();

  return row;
}

export async function updateHandoff(
  id: string,
  values: Pick<HandoffRecord, "status" | "attempts"> &
    Partial<Pick<HandoffRecord, "lastError" | "nextAttemptAt">>,
) {
  const db = ensureRuntimeStorage();
  if (!db) {
    const state = memoryState();
    const existing = state.handoffs.get(id);
    if (existing) state.handoffs.set(id, { ...existing, ...values });
    return;
  }

  await db
    .update(handoffDeliveries)
    .set({
      status: values.status,
      attempts: values.attempts,
      lastError: values.lastError,
      nextAttemptAt: values.nextAttemptAt,
      deliveredAt: values.status === "delivered" ? new Date() : undefined,
      updatedAt: new Date(),
    })
    .where(eq(handoffDeliveries.id, id));
}

export async function getRetryableHandoffs(limit = 25) {
  const db = ensureRuntimeStorage();
  const now = new Date();
  if (!db) {
    return Array.from(memoryState().handoffs.values())
      .filter(
        (item) =>
          item.status === "failed" &&
          (!item.nextAttemptAt || item.nextAttemptAt <= now),
      )
      .slice(0, limit);
  }

  return db
    .select()
    .from(handoffDeliveries)
    .where(
      and(
        eq(handoffDeliveries.status, "failed"),
        lte(handoffDeliveries.nextAttemptAt, now),
      ),
    )
    .limit(limit);
}

export async function deleteExpiredCampaigns() {
  const db = ensureRuntimeStorage();
  const now = new Date();

  if (!db) {
    const state = memoryState();
    let deleted = 0;
    state.campaigns.forEach((campaign, id) => {
      if (campaign.expiresAt <= now) {
        state.campaigns.delete(id);
        deleted += 1;
      }
    });
    return deleted;
  }

  const rows = await db
    .delete(campaignBriefs)
    .where(lte(campaignBriefs.expiresAt, now))
    .returning({ id: campaignBriefs.id });
  return rows.length;
}
