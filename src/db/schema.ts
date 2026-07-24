import {
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import type { CampaignDraftV1 } from "@/lib/campaign/schema";

export const campaignBriefs = pgTable(
  "campaign_briefs",
  {
    id: uuid("id").primaryKey(),
    schemaVersion: text("schema_version").notNull().default("CampaignDraftV1"),
    status: text("status").notNull().default("submitted"),
    intent: text("intent").notNull(),
    rawBrief: text("raw_brief").notNull(),
    approvedDraft: jsonb("approved_draft").$type<CampaignDraftV1>().notNull(),
    buyerName: text("buyer_name").notNull(),
    company: text("company").notNull(),
    workEmail: text("work_email").notNull(),
    phone: text("phone").notNull(),
    attribution: jsonb("attribution")
      .$type<Record<string, string | undefined>>()
      .notNull()
      .default({}),
    consentAt: timestamp("consent_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  },
  (table) => [
    index("campaign_briefs_status_idx").on(table.status),
    index("campaign_briefs_expires_at_idx").on(table.expiresAt),
  ],
);

export const campaignEvents = pgTable(
  "campaign_events",
  {
    id: uuid("id").primaryKey(),
    campaignId: uuid("campaign_id")
      .notNull()
      .references(() => campaignBriefs.id, { onDelete: "cascade" }),
    eventName: text("event_name").notNull(),
    idempotencyKey: text("idempotency_key"),
    metadata: jsonb("metadata")
      .$type<Record<string, string | number | boolean | null>>()
      .notNull()
      .default({}),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("campaign_events_campaign_idx").on(table.campaignId),
    uniqueIndex("campaign_events_idempotency_idx").on(table.idempotencyKey),
  ],
);

export const handoffDeliveries = pgTable(
  "handoff_deliveries",
  {
    id: uuid("id").primaryKey(),
    campaignId: uuid("campaign_id")
      .notNull()
      .references(() => campaignBriefs.id, { onDelete: "cascade" }),
    eventId: uuid("event_id").notNull(),
    idempotencyKey: text("idempotency_key").notNull(),
    status: text("status").notNull().default("pending"),
    attempts: integer("attempts").notNull().default(0),
    lastError: text("last_error"),
    nextAttemptAt: timestamp("next_attempt_at", { withTimezone: true }),
    deliveredAt: timestamp("delivered_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("handoff_deliveries_idempotency_idx").on(table.idempotencyKey),
    index("handoff_deliveries_retry_idx").on(table.status, table.nextAttemptAt),
  ],
);
