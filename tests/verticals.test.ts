import { describe, expect, it } from "vitest";
import {
  catalogVerticals,
  isVerticalAvailabilityConfirmed,
  isVerticalIndexable,
  verticalBySlug,
  verticalCategories,
  verticalAvailabilityLabel,
  verticals,
} from "@/lib/verticals";

describe("vertical catalog", () => {
  it("contains the 64 sourced programs plus the Home Services overview", () => {
    expect(catalogVerticals).toHaveLength(64);
    expect(verticals).toHaveLength(65);
    expect(verticalBySlug.get("home-services")?.catalog).toBe(false);
  });

  it("has unique routes and complete category assignments", () => {
    expect(new Set(verticals.map((vertical) => vertical.slug)).size).toBe(
      verticals.length,
    );
    expect(new Set(catalogVerticals.map((vertical) => vertical.name)).size).toBe(
      catalogVerticals.length,
    );

    const knownCategories = new Set(
      verticalCategories.map((category) => category.name),
    );
    expect(
      catalogVerticals.every((vertical) =>
        knownCategories.has(vertical.category),
      ),
    ).toBe(true);
  });

  it("includes representative programs from every added market", () => {
    expect(
      [
        "u65-health",
        "auto-warranty",
        "rehab-treatment",
        "plumbing",
        "long-distance-moving",
        "telecom",
        "mva-auto-accident",
        "business-loan-mca",
        "home-seller-sell-my-home-fast",
      ].every((slug) => verticalBySlug.has(slug)),
    ).toBe(true);
  });

  it("fails closed when availability does not have an operational source", () => {
    const finalExpense = verticalBySlug.get("final-expense");
    expect(finalExpense).toBeDefined();
    if (!finalExpense) return;

    expect(isVerticalAvailabilityConfirmed(finalExpense)).toBe(false);
    expect(verticalAvailabilityLabel(finalExpense)).toBe(
      "Confirm availability",
    );

    const activeWithoutSource = {
      ...finalExpense,
      status: "active" as const,
      availableModels: ["calls"] as const,
    };
    expect(isVerticalAvailabilityConfirmed(activeWithoutSource)).toBe(false);

    expect(
      isVerticalAvailabilityConfirmed({
        ...activeWithoutSource,
        availabilitySourceId: "operations-availability-register",
      }),
    ).toBe(true);
    expect(isVerticalIndexable(finalExpense)).toBe(false);
  });

  it("gives the five priority markets genuinely deep, distinct content", () => {
    const prioritySlugs = [
      "final-expense",
      "medicare",
      "roofing",
      "personal-injury",
      "rehab-treatment",
    ];
    const priorityVerticals = prioritySlugs.map((slug) =>
      verticalBySlug.get(slug),
    );

    expect(priorityVerticals.every(Boolean)).toBe(true);
    priorityVerticals.forEach((vertical) => {
      expect(vertical?.contentTier).toBe(1);
      expect(vertical?.campaignInputs.length).toBeGreaterThanOrEqual(4);
      expect(vertical?.customerCriteria.length).toBeGreaterThanOrEqual(4);
      expect(vertical?.faqItems.length).toBeGreaterThanOrEqual(4);
      expect(vertical?.statusNote).toMatch(/availability/i);
    });

    expect(
      new Set(priorityVerticals.map((vertical) => vertical?.customerIntent))
        .size,
    ).toBe(prioritySlugs.length);
    expect(
      new Set(priorityVerticals.map((vertical) => vertical?.headline)).size,
    ).toBe(prioritySlugs.length);
  });

  it("keeps unverified Final Expense guarantees out of the rendered fallback", () => {
    const finalExpense = verticalBySlug.get("final-expense");

    expect(finalExpense?.headline).toBe(
      "Plan a Final Expense campaign around your licensed team.",
    );
    expect(finalExpense?.headline).not.toContain("Guaranteed Intent");
    expect(finalExpense?.proofIds).toContain("final-expense-headline");
  });

  it("labels remaining directory entries as availability checks", () => {
    const aca = verticalBySlug.get("aca");

    expect(aca?.contentTier).toBe(3);
    expect(aca?.description).toMatch(/not published a live availability claim/i);
    expect(aca?.status).toBe("researching");
    expect(aca?.availableModels).toEqual([]);
    expect(aca?.faqItems[0]?.answer).toMatch(/does not promise/i);

    if (aca) {
      expect(
        isVerticalIndexable({
          ...aca,
          status: "active" as const,
          availableModels: ["calls"] as const,
          availabilitySourceId: "operations-availability-register",
        }),
      ).toBe(false);
    }
  });

  it("keeps every structured record reviewable and internally linked", () => {
    const isoDate = /^\d{4}-\d{2}-\d{2}$/;

    verticals.forEach((vertical) => {
      expect(vertical.owner.length).toBeGreaterThan(0);
      expect(vertical.lastReviewedAt).toMatch(isoDate);
      expect(vertical.statusNote.length).toBeGreaterThan(30);
      expect(vertical.campaignInputs.length).toBeGreaterThanOrEqual(3);
      expect(vertical.faqItems.length).toBeGreaterThanOrEqual(2);
      expect(vertical.faqIds).toHaveLength(vertical.faqItems.length);
      expect(new Set(vertical.faqIds).size).toBe(vertical.faqIds.length);
      vertical.relatedSlugs.forEach((slug) => {
        expect(verticalBySlug.has(slug)).toBe(true);
        expect(slug).not.toBe(vertical.slug);
      });
    });
  });
});
