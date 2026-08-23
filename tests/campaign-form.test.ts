import { describe, expect, it } from "vitest";
import {
  buildCampaignEntryHref,
  deliveryLabel,
  destinationLabel,
  parseStateCodeInput,
  parseZipCodeInput,
} from "@/lib/campaign/form";

describe("campaign form helpers", () => {
  it("keeps incomplete location tokens available for step validation", () => {
    expect(parseStateCodeInput("F")).toEqual({
      values: [],
      invalid: ["F"],
    });
    expect(parseZipCodeInput("3310")).toEqual({
      values: [],
      invalid: ["3310"],
    });
  });

  it("normalizes and deduplicates complete state and ZIP values", () => {
    expect(parseStateCodeInput("fl, TX fl")).toEqual({
      values: ["FL", "TX"],
      invalid: [],
    });
    expect(parseZipCodeInput("33101, 75201 33101")).toEqual({
      values: ["33101", "75201"],
      invalid: [],
    });
  });

  it("uses buyer-readable delivery and destination labels", () => {
    expect(deliveryLabel("exclusive_leads")).toBe("Real-time leads");
    expect(destinationLabel("phone")).toBe("Phone");
    expect(destinationLabel("undecided")).toBe("Help me choose");
  });

  it("builds clean conversion entry links and preserves safe context", () => {
    expect(
      buildCampaignEntryHref(
        {
          intent: "demo",
          vertical: "final-expense",
          utm_source: "partner",
          ignored: "do-not-copy",
        },
        "pricing",
      ),
    ).toBe(
      "/build-campaign?intent=pricing&vertical=final-expense&utm_source=partner",
    );
  });

  it("uses only the first value for repeated entry parameters", () => {
    expect(
      buildCampaignEntryHref(
        { vertical: ["roofing", "plumbing"], brief: ["First brief", "Second"] },
        "demo",
      ),
    ).toBe(
      "/build-campaign?intent=demo&brief=First+brief&vertical=roofing",
    );
  });
});
