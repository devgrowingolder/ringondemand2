export type BrandRecord = {
  name: string;
  domain: string;
  publicTitle: string;
  availability: "verified_online" | "unresolved";
  ownership: "pending_documentation";
  checkedAt: string;
};

export const brandNetwork: BrandRecord[] = [
  {
    name: "Top 10 Rehab",
    domain: "https://www.top10rehab.com/",
    publicTitle: "Top Rehab Centers by City",
    availability: "verified_online",
    ownership: "pending_documentation",
    checkedAt: "2026-07-25",
  },
  {
    name: "American Addiction Hotline",
    domain: "https://americanaddictionhotline.org/",
    publicTitle: "American Addiction Hotline",
    availability: "verified_online",
    ownership: "pending_documentation",
    checkedAt: "2026-07-25",
  },
  {
    name: "GrowingOlder",
    domain: "https://growingolder.com/",
    publicTitle: "Senior Living & Care with Real Pricing",
    availability: "verified_online",
    ownership: "pending_documentation",
    checkedAt: "2026-07-25",
  },
];

export const unresolvedBrandSubmissions = [
  "bestaddictioncenters.com",
  "to10seniorlivingw (incomplete domain)",
];
