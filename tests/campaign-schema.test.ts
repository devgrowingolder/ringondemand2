import { describe, expect, it } from "vitest";
import {
  campaignDraftV1Schema,
  createCampaignSchema,
} from "@/lib/campaign/schema";

const draft = {
  deliveryModel: "inbound_calls",
  vertical: { category: "Insurance", name: "Final Expense" },
  locations: { states: ["FL", "TX"], zipCodes: [] },
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
  volume: { count: 25, period: "day" },
  qualificationRules: ["Buyer-approved criteria"],
  destination: "phone",
  unresolvedFields: [],
} as const;

describe("campaign schemas", () => {
  it("accepts a schema-valid buyer-approved draft", () => {
    expect(campaignDraftV1Schema.parse(draft)).toEqual(draft);
  });

  it("rejects malformed state and ZIP values", () => {
    expect(() =>
      campaignDraftV1Schema.parse({
        ...draft,
        locations: { states: ["Florida"], zipCodes: ["123"] },
      }),
    ).toThrow();
  });

  it("requires explicit buyer approval and consent", () => {
    expect(() =>
      createCampaignSchema.parse({
        rawBrief:
          "Final Expense calls in Florida on weekdays with 25 calls per day.",
        approvedDraft: draft,
        contact: {
          buyerName: "Alex Buyer",
          company: "Buyer Co",
          workEmail: "alex@example.com",
          phone: "555-123-4567",
          consent: false,
        },
        intent: "pricing",
        attribution: {},
        buyerApproved: false,
      }),
    ).toThrow();
  });
});
