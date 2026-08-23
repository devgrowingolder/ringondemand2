import type { CampaignDraftV1 } from "@/lib/campaign/schema";

export type CampaignEntrySearchParams = Record<
  string,
  string | string[] | undefined
>;

type ParsedLocationInput = {
  invalid: string[];
  values: string[];
};

const campaignEntryKeys = [
  "brief",
  "vertical",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
] as const;

const entryValueLimits: Partial<Record<(typeof campaignEntryKeys)[number], number>> = {
  brief: 2_000,
  vertical: 120,
};

function tokens(value: string) {
  return value
    .split(/[\s,]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function unique(values: string[]) {
  return Array.from(new Set(values));
}

export function parseStateCodeInput(value: string): ParsedLocationInput {
  const normalized = tokens(value).map((item) => item.toUpperCase());

  return {
    values: unique(normalized.filter((item) => /^[A-Z]{2}$/.test(item))),
    invalid: unique(normalized.filter((item) => !/^[A-Z]{2}$/.test(item))),
  };
}

export function parseZipCodeInput(value: string): ParsedLocationInput {
  const normalized = tokens(value);

  return {
    values: unique(normalized.filter((item) => /^\d{5}$/.test(item))),
    invalid: unique(normalized.filter((item) => !/^\d{5}$/.test(item))),
  };
}

export function deliveryLabel(model: CampaignDraftV1["deliveryModel"]) {
  return {
    inbound_calls: "Inbound calls",
    exclusive_leads: "Real-time leads",
    appointments: "Booked appointments",
    undecided: "Help me choose",
  }[model];
}

export function destinationLabel(destination: CampaignDraftV1["destination"]) {
  return {
    phone: "Phone",
    crm: "CRM",
    calendar: "Calendar",
    undecided: "Help me choose",
  }[destination];
}

export function timezoneLabel(timezone: string) {
  return (
    {
      "America/New_York": "Eastern",
      "America/Chicago": "Central",
      "America/Denver": "Mountain",
      "America/Los_Angeles": "Pacific",
    }[timezone] ?? timezone
  );
}

export function unresolvedFieldLabel(field: string) {
  return (
    {
      deliveryModel: "calls, leads, or appointments",
      vertical: "service",
      locations: "locations",
      schedule: "schedule",
      volume: "volume",
      qualificationRules: "customer criteria",
      destination: "delivery destination",
    }[field] ?? field
  );
}

function firstSearchValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export function buildCampaignEntryHref(
  searchParams: CampaignEntrySearchParams,
  intent: "pricing" | "demo",
) {
  const nextParams = new URLSearchParams({ intent });

  for (const key of campaignEntryKeys) {
    const value = firstSearchValue(searchParams[key])?.trim();
    if (!value) continue;

    nextParams.set(key, value.slice(0, entryValueLimits[key] ?? 500));
  }

  return `/build-campaign?${nextParams.toString()}`;
}
