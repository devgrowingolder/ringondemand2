import { describe, expect, it } from "vitest";
import {
  catalogVerticals,
  verticalBySlug,
  verticalCategories,
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
});
