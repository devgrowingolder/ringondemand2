import proofRegisterSource from "@/content/proof-register.json";

export type ProofStatus = "unverified" | "in_review" | "approved" | "expired";

export type ProofEntry = Readonly<{
  id: string;
  claim: string;
  source: string;
  owner: string;
  status: ProofStatus;
  reviewDate: string | null;
  expirationDate: string | null;
  pagePlacement: readonly string[];
}>;

export type RenderableProofEntry = ProofEntry &
  Readonly<{
    status: "approved";
    reviewDate: string;
  }>;

const proofStatuses = new Set<ProofStatus>([
  "unverified",
  "in_review",
  "approved",
  "expired",
]);
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

function hasText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isIsoDate(value: unknown): value is string {
  if (typeof value !== "string" || !isoDatePattern.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

function parseProofEntry(value: unknown, index: number): ProofEntry {
  if (!value || typeof value !== "object") {
    throw new Error(`Proof register entry ${index} must be an object.`);
  }

  const candidate = value as Record<string, unknown>;
  const status = candidate.status;
  const reviewDate = candidate.reviewDate;
  const expirationDate = candidate.expirationDate;
  const pagePlacement = candidate.pagePlacement;

  if (!hasText(candidate.id)) {
    throw new Error(`Proof register entry ${index} is missing an id.`);
  }
  if (!hasText(candidate.claim)) {
    throw new Error(`Proof register entry ${candidate.id} is missing a claim.`);
  }
  if (!hasText(candidate.source)) {
    throw new Error(`Proof register entry ${candidate.id} is missing a source.`);
  }
  if (!hasText(candidate.owner)) {
    throw new Error(`Proof register entry ${candidate.id} is missing an owner.`);
  }
  if (typeof status !== "string" || !proofStatuses.has(status as ProofStatus)) {
    throw new Error(`Proof register entry ${candidate.id} has an invalid status.`);
  }
  if (reviewDate !== null && !isIsoDate(reviewDate)) {
    throw new Error(`Proof register entry ${candidate.id} has an invalid review date.`);
  }
  if (expirationDate !== null && !isIsoDate(expirationDate)) {
    throw new Error(
      `Proof register entry ${candidate.id} has an invalid expiration date.`,
    );
  }
  if (
    !Array.isArray(pagePlacement) ||
    pagePlacement.length === 0 ||
    !pagePlacement.every(hasText)
  ) {
    throw new Error(
      `Proof register entry ${candidate.id} must have at least one page placement.`,
    );
  }

  return Object.freeze({
    id: candidate.id.trim(),
    claim: candidate.claim.trim(),
    source: candidate.source.trim(),
    owner: candidate.owner.trim(),
    status: status as ProofStatus,
    reviewDate,
    expirationDate,
    pagePlacement: Object.freeze(pagePlacement.map((placement) => placement.trim())),
  });
}

function parseProofRegister(value: unknown): readonly ProofEntry[] {
  if (!Array.isArray(value)) {
    throw new Error("Proof register must be an array.");
  }

  const entries = value.map(parseProofEntry);
  const ids = new Set<string>();

  for (const entry of entries) {
    if (ids.has(entry.id)) {
      throw new Error(`Proof register contains duplicate id: ${entry.id}.`);
    }
    ids.add(entry.id);
  }

  return Object.freeze(entries);
}

const proofRegister = parseProofRegister(proofRegisterSource);

function normalizePlacement(value: string) {
  return value.trim().toLocaleLowerCase("en-US").replace(/\s+/g, " ");
}

function utcStartOfDay(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return Date.UTC(year, month - 1, day);
}

export function isRenderableProof(
  entry: ProofEntry,
  now = new Date(),
): entry is RenderableProofEntry {
  if (entry.status !== "approved" || !entry.reviewDate) return false;

  const nowTime = now.getTime();
  if (!Number.isFinite(nowTime)) return false;
  if (utcStartOfDay(entry.reviewDate) > nowTime) return false;
  if (!entry.expirationDate) return true;

  const expirationDay = utcStartOfDay(entry.expirationDate);
  const firstMomentAfterExpiration = expirationDay + 24 * 60 * 60 * 1000;
  return nowTime < firstMomentAfterExpiration;
}

export function filterRenderableProof(
  entries: readonly ProofEntry[],
  placements: string | readonly string[],
  now = new Date(),
): RenderableProofEntry[] {
  const placementList = typeof placements === "string" ? [placements] : placements;
  const requestedPlacements = new Set(
    placementList.filter(hasText).map(normalizePlacement),
  );

  if (requestedPlacements.size === 0) return [];

  return entries.filter((entry): entry is RenderableProofEntry => {
    if (!isRenderableProof(entry, now)) return false;

    return entry.pagePlacement.some((placement) =>
      requestedPlacements.has(normalizePlacement(placement)),
    );
  });
}

export function getRenderableProof(
  placements: string | readonly string[],
  now = new Date(),
): RenderableProofEntry[] {
  return filterRenderableProof(proofRegister, placements, now);
}

export function getRenderableProofById(
  id: string,
  placement: string,
  now = new Date(),
): RenderableProofEntry | null {
  return (
    getRenderableProof(placement, now).find((entry) => entry.id === id) ?? null
  );
}

export function getRenderableClaim(
  id: string,
  placement: string,
  now = new Date(),
): string | null {
  return getRenderableProofById(id, placement, now)?.claim ?? null;
}

export function hasRenderableProof(
  placement: string,
  now = new Date(),
): boolean {
  return getRenderableProof(placement, now).length > 0;
}

/**
 * Backward-compatible name for existing callers. New public UI should prefer
 * `getRenderableProof` so the fail-closed rendering contract is explicit.
 */
export function getApprovedProof(
  page: string,
  now = new Date(),
): RenderableProofEntry[] {
  return getRenderableProof(page, now);
}
