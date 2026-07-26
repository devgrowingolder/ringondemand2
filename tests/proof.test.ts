import { describe, expect, it } from "vitest";
import { getApprovedProof } from "@/lib/proof";

describe("proof filtering", () => {
  it("renders approved claims and filters every unverified claim", () => {
    const homepage = getApprovedProof("homepage");
    const finalExpense = getApprovedProof("final expense");

    expect(homepage).toHaveLength(0);
    expect(finalExpense).toHaveLength(1);
    expect(finalExpense[0]).toMatchObject({
      id: "final-expense-headline",
      status: "approved",
    });
  });
});
