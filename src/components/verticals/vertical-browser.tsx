"use client";

import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  categorySlug,
  type VerticalDefinition,
} from "@/lib/verticals";

export function VerticalBrowser({
  verticals,
}: {
  verticals: VerticalDefinition[];
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(
    () => Array.from(new Set(verticals.map((vertical) => vertical.category))),
    [verticals],
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return verticals.filter(
      (vertical) =>
        (activeCategory === "All" || vertical.category === activeCategory) &&
        (!normalized ||
          vertical.name.toLowerCase().includes(normalized) ||
          vertical.category.toLowerCase().includes(normalized)),
    );
  }, [activeCategory, query, verticals]);

  const grouped = useMemo(
    () =>
      categories
        .map((category) => ({
          category,
          items: filtered.filter((vertical) => vertical.category === category),
        }))
        .filter((group) => group.items.length > 0),
    [categories, filtered],
  );

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
      <div className="vertical-browser-toolbar">
        <p>
          <strong>{filtered.length}</strong>{" "}
          {filtered.length === 1 ? "vertical" : "verticals"}
        </p>
        <div aria-label="Filter verticals by market">
          {["All", ...categories].map((category) => (
            <button
              aria-pressed={activeCategory === category}
              className={activeCategory === category ? "is-active" : ""}
              key={category}
              onClick={() => setActiveCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="vertical-browser-results" aria-live="polite">
        {grouped.map((group) => (
          <section
            id={`category-${categorySlug(group.category)}`}
            key={group.category}
          >
            <header>
              <h3>{group.category}</h3>
              <span>{String(group.items.length).padStart(2, "0")}</span>
            </header>
            {group.items.map((vertical, index) => (
              <Link href={`/verticals/${vertical.slug}`} key={vertical.slug}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{vertical.name}</strong>
                <small>{vertical.category}</small>
                <ArrowRight aria-hidden="true" />
              </Link>
            ))}
          </section>
        ))}
        {!filtered.length && (
          <p>
            No vertical matches that search. Try another service name or choose
            All markets.
          </p>
        )}
      </div>
    </div>
  );
}
