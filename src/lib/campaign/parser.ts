import type { CampaignDraftV1 } from "@/lib/campaign/schema";
import { verticals } from "@/lib/verticals";

const stateNames: Record<string, string> = {
  alabama: "AL",
  alaska: "AK",
  arizona: "AZ",
  arkansas: "AR",
  california: "CA",
  colorado: "CO",
  connecticut: "CT",
  delaware: "DE",
  florida: "FL",
  georgia: "GA",
  hawaii: "HI",
  idaho: "ID",
  illinois: "IL",
  indiana: "IN",
  iowa: "IA",
  kansas: "KS",
  kentucky: "KY",
  louisiana: "LA",
  maine: "ME",
  maryland: "MD",
  massachusetts: "MA",
  michigan: "MI",
  minnesota: "MN",
  mississippi: "MS",
  missouri: "MO",
  montana: "MT",
  nebraska: "NE",
  nevada: "NV",
  "new hampshire": "NH",
  "new jersey": "NJ",
  "new mexico": "NM",
  "new york": "NY",
  "north carolina": "NC",
  "north dakota": "ND",
  ohio: "OH",
  oklahoma: "OK",
  oregon: "OR",
  pennsylvania: "PA",
  "rhode island": "RI",
  "south carolina": "SC",
  "south dakota": "SD",
  tennessee: "TN",
  texas: "TX",
  utah: "UT",
  vermont: "VT",
  virginia: "VA",
  washington: "WA",
  "west virginia": "WV",
  wisconsin: "WI",
  wyoming: "WY",
};

const stateCodes = new Set(Object.values(stateNames));

export class BriefValidationError extends Error {}

export function sanitizeCampaignBrief(input: string) {
  const trimmed = input.trim().slice(0, 2_000);
  if (trimmed.length < 10) {
    throw new BriefValidationError(
      "Describe the campaign in at least a few words.",
    );
  }

  const redacted = trimmed
    .replace(
      /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
      "[email removed]",
    )
    .replace(
      /(?:\+?1[\s.-]?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}\b/g,
      "[phone removed]",
    );

  return {
    sanitizedBrief: redacted,
    containedContactData: redacted !== trimmed,
  };
}

function normalizeTime(hour: string, minute: string | undefined, meridiem: string) {
  let value = Number(hour);
  if (meridiem.toLowerCase() === "pm" && value < 12) value += 12;
  if (meridiem.toLowerCase() === "am" && value === 12) value = 0;
  return `${String(value).padStart(2, "0")}:${minute ?? "00"}`;
}

export function parseCampaignBrief(input: string): {
  draft: CampaignDraftV1;
  sanitizedBrief: string;
  containedContactData: boolean;
} {
  const { sanitizedBrief, containedContactData } = sanitizeCampaignBrief(input);
  const brief = sanitizedBrief.toLowerCase();
  const unresolvedFields: string[] = [];

  const deliveryModel: CampaignDraftV1["deliveryModel"] = /\bappointments?\b/.test(
    brief,
  )
    ? "appointments"
    : /\bexclusive(?:\s+\w+){0,3}\s+leads?\b/.test(brief)
      ? "exclusive_leads"
      : /\bcalls?|live transfers?\b/.test(brief)
        ? "inbound_calls"
        : "undecided";

  if (deliveryModel === "undecided") unresolvedFields.push("deliveryModel");

  const vertical = verticals.find(
    (item) =>
      brief.includes(item.name.toLowerCase()) ||
      brief.includes(item.slug.replaceAll("-", " ")),
  );

  if (!vertical) unresolvedFields.push("vertical");

  const states = new Set<string>();
  Object.entries(stateNames).forEach(([name, code]) => {
    if (new RegExp(`\\b${name}\\b`, "i").test(brief)) states.add(code);
  });
  sanitizedBrief.match(/\b[A-Z]{2}\b/g)?.forEach((match) => {
    const code = match.toUpperCase();
    if (stateCodes.has(code)) states.add(code);
  });

  const zipCodes = Array.from(
    new Set(brief.match(/\b\d{5}\b/g)?.filter(Boolean) ?? []),
  );

  if (!states.size && !zipCodes.length) unresolvedFields.push("locations");

  const timeRange = brief.match(
    /(\d{1,2})(?::(\d{2}))?\s*(am|pm)\s*(?:to|-|–)\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i,
  );
  const dayTokens = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ].filter((day) => brief.includes(day));
  const days = brief.includes("weekday")
    ? ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    : brief.includes("every day") || brief.includes("daily")
      ? [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ]
      : dayTokens.map((day) => day[0].toUpperCase() + day.slice(1));

  const windows =
    timeRange && days.length
      ? [
          {
            days,
            start: normalizeTime(timeRange[1], timeRange[2], timeRange[3]),
            end: normalizeTime(timeRange[4], timeRange[5], timeRange[6]),
          },
        ]
      : [];

  const timezone = /\b(?:eastern|et|est|edt)\b/.test(brief)
    ? "America/New_York"
    : /\b(?:central|ct|cst|cdt)\b/.test(brief)
      ? "America/Chicago"
      : /\b(?:mountain|mt|mst|mdt)\b/.test(brief)
        ? "America/Denver"
        : /\b(?:pacific|pt|pst|pdt)\b/.test(brief)
          ? "America/Los_Angeles"
          : "";

  const volumeMatch =
    brief.match(
      /(\d{1,6})(?:\s+\w+){0,4}\s+(?:calls?|leads?|appointments?)\s*(?:per|a|each|every|\/)?\s*(day|daily|week|weekly|month|monthly)\b/i,
    ) ??
    brief.match(
    /(?:limit|cap|volume|up to|of)?\s*(\d{1,6})\s*(?:calls?|leads?|appointments?)?(?:\s*per|\s*a|\s*\/)?\s*(day|daily|week|weekly|month|monthly)/i,
  );
  const volumeCount = volumeMatch ? Number(volumeMatch[1]) : null;
  const volumePeriod: CampaignDraftV1["volume"]["period"] =
    volumeMatch?.[2]?.toLowerCase().startsWith("week")
      ? "week"
      : volumeMatch?.[2]?.toLowerCase().startsWith("month")
        ? "month"
        : "day";

  if (!volumeCount) unresolvedFields.push("volume");

  if (!windows.length || !timezone) unresolvedFields.push("schedule");

  const destination: CampaignDraftV1["destination"] =
    /\bcalendar\b/.test(brief)
      ? "calendar"
      : /\bcrm\b/.test(brief)
        ? "crm"
        : /\bphone|call line|agents?\b/.test(brief)
          ? "phone"
          : "undecided";

  if (destination === "undecided") unresolvedFields.push("destination");
  unresolvedFields.push("qualificationRules");

  return {
    sanitizedBrief,
    containedContactData,
    draft: {
      deliveryModel,
      vertical: {
        category: vertical?.category ?? "",
        name: vertical?.name ?? "",
      },
      locations: {
        states: Array.from(states),
        zipCodes,
      },
      schedule: {
        timezone,
        windows,
      },
      volume: {
        count: volumeCount,
        period: volumePeriod,
      },
      qualificationRules: [],
      destination,
      unresolvedFields,
    },
  };
}
