import { describe, expect, it } from "vitest";
import { getApprovedProof } from "@/lib/proof";

describe("proof filtering", () => {
  it("never renders unverified claims", () => {
    expect(getApprovedProof("homepage")).toEqual([]);
  });
});
