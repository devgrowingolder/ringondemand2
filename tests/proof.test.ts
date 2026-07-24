import { describe, expect, it } from "vitest";
import { getApprovedProof } from "@/lib/proof";

describe("proof filtering", () => {
  it("renders approved claims and filters every unverified claim", () => {
    const approved = getApprovedProof("homepage");

    expect(approved).toHaveLength(1);
    expect(approved[0]).toMatchObject({
      id: "final-expense-headline",
      status: "approved",
    });
  });
});
