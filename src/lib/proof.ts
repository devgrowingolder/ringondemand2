import proofRegister from "@/content/proof-register.json";

export type ProofStatus = "unverified" | "in_review" | "approved" | "expired";

export type ProofEntry = {
  id: string;
  claim: string;
  source: string;
  owner: string;
  status: ProofStatus;
  reviewDate: string | null;
  expirationDate: string | null;
  pagePlacement: string[];
};

export function getApprovedProof(
  page: string,
  now = new Date(),
): ProofEntry[] {
  return (proofRegister as ProofEntry[]).filter((entry) => {
    if (entry.status !== "approved") return false;
    if (!entry.pagePlacement.includes(page)) return false;
    if (!entry.expirationDate) return true;
    return new Date(entry.expirationDate) > now;
  });
}
