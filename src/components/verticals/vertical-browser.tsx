"use client";

import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { VerticalDefinition } from "@/lib/verticals";

export function VerticalBrowser({
  verticals,
}: {
  verticals: VerticalDefinition[];
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return verticals;
    return verticals.filter(
      (vertical) =>
        vertical.name.toLowerCase().includes(normalized) ||
        vertical.category.toLowerCase().includes(normalized),
    );
  }, [query, verticals]);

  return (
    <div className="vertical-browser">
      <label htmlFor="vertical-search">
        <Search aria-hidden="true" />
        <span className="sr-only">Search verticals</span>
        <input
          id="vertical-search"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search insurance, home services, legal…"
          type="search"
          value={query}
        />
      </label>
      <div className="vertical-browser-results" aria-live="polite">
        {filtered.map((vertical, index) => (
          <Link href={`/verticals/${vertical.slug}`} key={vertical.slug}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{vertical.name}</strong>
            <small>{vertical.category}</small>
            <ArrowRight aria-hidden="true" />
          </Link>
        ))}
        {!filtered.length && (
          <p>
            No controlled vertical matches that search. You can still describe
            the campaign and confirm the vertical during review.
          </p>
        )}
      </div>
    </div>
  );
}
