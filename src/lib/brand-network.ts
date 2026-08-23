import { getRenderableProofById } from "@/lib/proof";

export type BrandRecord = {
  name: string;
  domain: string;
  publicTitle: string;
  availability: "verified_online" | "unresolved";
  ownership: "pending_documentation";
  checkedAt: string;
};

type RegisteredBrandRecord = BrandRecord & {
  proofId: string;
};

const registeredBrandNetwork: RegisteredBrandRecord[] = [
  {
    name: "Top 10 Rehab",
    domain: "https://www.top10rehab.com/",
    publicTitle: "Top Rehab Centers by City",
    availability: "verified_online",
    ownership: "pending_documentation",
    checkedAt: "2026-07-25",
    proofId: "brand-top10rehab-online",
  },
  {
    name: "American Addiction Hotline",
    domain: "https://americanaddictionhotline.org/",
    publicTitle: "American Addiction Hotline",
    availability: "verified_online",
    ownership: "pending_documentation",
    checkedAt: "2026-07-25",
    proofId: "brand-american-addiction-hotline-online",
  },
  {
    name: "GrowingOlder",
    domain: "https://growingolder.com/",
    publicTitle: "Senior Living & Care with Real Pricing",
    availability: "verified_online",
    ownership: "pending_documentation",
    checkedAt: "2026-07-25",
    proofId: "brand-growingolder-online",
  },
];

export function getBrandNetwork(now = new Date()): BrandRecord[] {
  return registeredBrandNetwork.flatMap(({ proofId, ...brand }) =>
    getRenderableProofById(proofId, "brand network", now) ? [brand] : [],
  );
}

export const brandNetwork = getBrandNetwork();

export const unresolvedBrandSubmissions = [
  "bestaddictioncenters.com",
  "to10seniorlivingw (incomplete domain)",
];
