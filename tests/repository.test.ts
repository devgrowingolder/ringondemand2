import { describe, expect, it } from "vitest";
import {
  createCampaign,
  createCampaignAction,
} from "@/lib/campaign/repository";

const campaignInput = {
  rawBrief:
    "Final Expense inbound calls in Florida on weekdays, 25 calls per day.",
  approvedDraft: {
    deliveryModel: "inbound_calls" as const,
    vertical: { category: "Insurance", name: "Final Expense" },
    locations: { states: ["FL"], zipCodes: [] },
    schedule: {
      timezone: "America/New_York",
      windows: [
        {
          days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          start: "09:00",
          end: "17:00",
        },
      ],
    },
    volume: { count: 25, period: "day" as const },
    qualificationRules: ["Buyer-approved criteria"],
    destination: "phone" as const,
    unresolvedFields: [],
  },
  contact: {
    buyerName: "Alex Buyer",
    company: "Buyer Co",
    workEmail: "alex@example.com",
    phone: "555-123-4567",
    consent: true as const,
  },
  intent: "pricing" as const,
  attribution: {},
  buyerApproved: true as const,
};

describe("campaign action idempotency", () => {
  it("returns the same event for a repeated action key", async () => {
    const campaign = await createCampaign(campaignInput);
    const request = {
      action: "request_pricing" as const,
      idempotencyKey: `rid:${campaign.id}:pricing`,
    };

    const first = await createCampaignAction(campaign.id, request);
    const second = await createCampaignAction(campaign.id, request);

    expect(second.eventId).toBe(first.eventId);
    expect(second.alreadyProcessed).toBe(true);
  });
});
