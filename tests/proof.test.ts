import { describe, expect, it } from "vitest";
import { getBrandNetwork } from "@/lib/brand-network";
import {
  filterRenderableProof,
  getApprovedProof,
  getRenderableClaim,
  getRenderableProof,
  getRenderableProofById,
  isRenderableProof,
  type ProofEntry,
} from "@/lib/proof";

const now = new Date("2026-08-21T12:00:00.000Z");

function proof(overrides: Partial<ProofEntry> = {}): ProofEntry {
  return {
    id: "approved-proof",
    claim: "A sourced public claim.",
    source: "A dated source record.",
    owner: "Operations",
    status: "approved",
    reviewDate: "2026-08-01",
    expirationDate: null,
    pagePlacement: ["homepage"],
    ...overrides,
  };
}

describe("proof rendering contract", () => {
  it("renders only approved, reviewed, current proof for the requested placement", () => {
    const entries = [
      proof(),
      proof({ id: "unverified", status: "unverified" }),
      proof({ id: "in-review", status: "in_review" }),
      proof({ id: "expired-status", status: "expired" }),
      proof({ id: "missing-review", reviewDate: null }),
      proof({ id: "future-review", reviewDate: "2026-08-22" }),
      proof({
        id: "expired-by-date",
        expirationDate: "2026-08-20",
      }),
      proof({ id: "other-page", pagePlacement: ["brand network"] }),
    ];

    expect(filterRenderableProof(entries, "homepage", now).map(({ id }) => id)).toEqual([
      "approved-proof",
    ]);
  });

  it("treats an expiration date as valid through the end of that UTC day", () => {
    const entry = proof({ expirationDate: "2026-08-21" });

    expect(isRenderableProof(entry, now)).toBe(true);
    expect(isRenderableProof(entry, new Date("2026-08-22T00:00:00.000Z"))).toBe(
      false,
    );
  });

  it("normalizes placement casing and whitespace without leaking across pages", () => {
    const entries = [
      proof({ pagePlacement: ["Customer Experience"] }),
      proof({ id: "homepage", pagePlacement: ["homepage"] }),
    ];

    expect(
      filterRenderableProof(entries, "  customer   experience ", now).map(
        ({ id }) => id,
      ),
    ).toEqual(["approved-proof"]);
    expect(filterRenderableProof(entries, [], now)).toEqual([]);
  });

  it("keeps the unverified Final Expense guarantee out of public output", () => {
    expect(getApprovedProof("homepage", now)).toEqual([]);
    expect(getRenderableProof("final expense", now)).toEqual([]);
    expect(
      getRenderableClaim("final-expense-headline", "final expense", now),
    ).toBeNull();
    expect(
      getRenderableProofById(
        "brand-top10rehab-online",
        "customer experience",
        now,
      ),
    ).toBeNull();
  });

  it("removes approved brand availability when its register evidence expires", () => {
    expect(getBrandNetwork(now)).toHaveLength(3);
    expect(getBrandNetwork(new Date("2026-10-26T00:00:00.000Z"))).toEqual([]);
  });
});
