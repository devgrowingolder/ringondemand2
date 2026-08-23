import { z } from "zod";
import { verticals } from "@/lib/verticals";

export const deliveryModelSchema = z.enum([
  "inbound_calls",
  "exclusive_leads",
  "appointments",
  "undecided",
]);

export const destinationSchema = z.enum([
  "phone",
  "crm",
  "calendar",
  "undecided",
]);

export const campaignDraftV1Schema = z.object({
  deliveryModel: deliveryModelSchema,
  vertical: z.object({
    category: z.string().trim().max(80),
    name: z.string().trim().max(120),
  }),
  locations: z.object({
    states: z.array(z.string().trim().length(2)).max(50),
    zipCodes: z.array(z.string().regex(/^\d{5}$/)).max(250),
  }),
  schedule: z.object({
    timezone: z.string().trim().max(80),
    windows: z
      .array(
        z.object({
          days: z.array(z.string().trim().max(16)).min(1).max(7),
          start: z.string().regex(/^\d{2}:\d{2}$/),
          end: z.string().regex(/^\d{2}:\d{2}$/),
        }),
      )
      .max(7),
  }),
  volume: z.object({
    count: z.number().int().positive().max(100_000).nullable(),
    period: z.enum(["day", "week", "month"]),
  }),
  qualificationRules: z.array(z.string().trim().min(2).max(240)).max(25),
  destination: destinationSchema,
  unresolvedFields: z.array(z.string().trim().max(80)).max(30),
});

export type CampaignDraftV1 = z.infer<typeof campaignDraftV1Schema>;

export const campaignContactSchema = z.object({
  buyerName: z.string().trim().min(2).max(120),
  company: z.string().trim().min(2).max(160),
  workEmail: z.string().trim().email().max(180),
  phone: z
    .string()
    .trim()
    .min(7)
    .max(30)
    .regex(/^[+()\-\s.\d]+$/),
  consent: z.literal(true),
});

export const createCampaignSchema = z.object({
  rawBrief: z.string().trim().min(10).max(2_000),
  approvedDraft: campaignDraftV1Schema,
  contact: campaignContactSchema,
  intent: z.enum(["pricing", "demo"]).default("pricing"),
  attribution: z
    .object({
      source: z.string().trim().max(100).optional(),
      medium: z.string().trim().max(100).optional(),
      campaign: z.string().trim().max(160).optional(),
      landingPath: z.string().trim().max(500).optional(),
    })
    .default({}),
  buyerApproved: z.literal(true),
});

export const campaignActionSchema = z.object({
  action: z.enum(["request_pricing", "start_demo_booking"]),
  idempotencyKey: z.string().trim().min(12).max(200),
});

export type CreateCampaignInput = z.infer<typeof createCampaignSchema>;
export type CampaignActionInput = z.infer<typeof campaignActionSchema>;

export const controlledVerticalNames = new Set(
  verticals.map((vertical) => vertical.name.toLowerCase()),
);
