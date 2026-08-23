import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import { signWebhookPayload } from "@/lib/campaign/webhook";

describe("webhook signatures", () => {
  it("signs timestamp and payload with HMAC SHA-256", () => {
    const secret = "test-secret";
    const timestamp = "1784928000";
    const payload = JSON.stringify({ campaign_id: "campaign-1" });
    const expected = createHmac("sha256", secret)
      .update(`${timestamp}.${payload}`)
      .digest("hex");

    expect(signWebhookPayload(secret, timestamp, payload)).toBe(expected);
  });
});
