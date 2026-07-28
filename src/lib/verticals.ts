export type VerticalDefinition = {
  slug: string;
  name: string;
  category: string;
  headline: string;
  description: string;
  qualificationPrompts: string[];
  catalog?: boolean;
};

export type VerticalCategory = {
  name: string;
  slug: string;
  description: string;
};

export const VERTICAL_CATALOG_SOURCE = "https://ringondemand.com/";

export const verticalCategories: VerticalCategory[] = [
  {
    name: "Insurance",
    slug: "insurance",
    description: "Health, life, property, auto, and protection products.",
  },
  {
    name: "Home services",
    slug: "home-services",
    description: "Repair, improvement, restoration, and local home services.",
  },
  {
    name: "Legal",
    slug: "legal",
    description: "Consumer legal intake and case-related inquiries.",
  },
  {
    name: "Financial",
    slug: "financial",
    description: "Debt, lending, credit, and retirement programs.",
  },
  {
    name: "Addiction / rehab",
    slug: "addiction-rehab",
    description: "Treatment and rehabilitation inquiries.",
  },
  {
    name: "Auto services",
    slug: "auto-services",
    description: "Automotive protection and service inquiries.",
  },
  {
    name: "Moving",
    slug: "moving",
    description: "Towing and long-distance moving inquiries.",
  },
  {
    name: "Telecom",
    slug: "telecom",
    description: "Telecommunications customer acquisition.",
  },
  {
    name: "Real estate",
    slug: "real-estate",
    description: "Home seller and real-estate opportunities.",
  },
];

const categoryPrompts: Record<string, string[]> = {
  Insurance: [
    "States where your team is licensed",
    "Buyer-approved product criteria",
    "Hours your team can receive calls, leads, or appointments",
  ],
  "Home services": [
    "Service area",
    "Requested job or service",
    "Dispatch or appointment availability",
  ],
  Legal: [
    "Geographic eligibility",
    "Case or inquiry type",
    "Buyer-approved intake criteria",
  ],
  Financial: [
    "Geographic eligibility",
    "Buyer-approved financial criteria",
    "Contact and delivery availability",
  ],
  "Addiction / rehab": [
    "Locations and program availability",
    "Buyer-approved intake criteria",
    "Hours the intake team is available",
  ],
  "Auto services": [
    "Covered locations",
    "Vehicle or product criteria",
    "Buyer-approved delivery rules",
  ],
  Moving: [
    "Pickup and service area",
    "Requested service",
    "Dispatch availability",
  ],
  Telecom: [
    "Covered markets",
    "Requested service",
    "Buyer-approved customer criteria",
  ],
  "Real estate": [
    "Target markets",
    "Property or seller criteria",
    "Buyer-approved contact rules",
  ],
};

const categoryDescriptions: Record<string, (name: string) => string> = {
  Insurance: (name) =>
    `Choose ${name} calls, leads, or appointments around your licensed states, hours, volume, and customer criteria.`,
  "Home services": (name) =>
    `Choose ${name} calls, leads, or appointments around your service areas, working hours, job types, and team capacity.`,
  Legal: (name) =>
    `Set the geography, intake hours, case criteria, volume, and destination for your ${name} calls, leads, or appointments.`,
  Financial: (name) =>
    `Choose locations, contact hours, volume, customer criteria, and delivery for your ${name} calls, leads, or appointments.`,
  "Addiction / rehab": (name) =>
    `Choose locations, intake hours, volume, intake criteria, and delivery for ${name} inquiries.`,
  "Auto services": (name) =>
    `Choose covered markets, hours, volume, vehicle criteria, and delivery for your ${name} campaign.`,
  Moving: (name) =>
    `Set the service area, operating hours, volume, job criteria, and destination for ${name} calls, leads, or appointments.`,
  Telecom: (name) =>
    `Choose markets, hours, volume, customer criteria, and delivery for your ${name} campaign.`,
  "Real estate": (name) =>
    `Choose markets, contact hours, property criteria, volume, and destination for your ${name} campaign.`,
};

const verticalSeeds: Array<[name: string, category: string]> = [
  ["Final Expense", "Insurance"],
  ["Medicare", "Insurance"],
  ["ACA", "Insurance"],
  ["U65 Health", "Insurance"],
  ["Home Insurance", "Insurance"],
  ["Auto Insurance", "Insurance"],
  ["SSDI", "Insurance"],
  ["Mortgage Protection", "Insurance"],
  ["Life Insurance", "Insurance"],
  ["Business Insurance", "Insurance"],
  ["IUL", "Insurance"],
  ["Auto Warranty", "Auto services"],
  ["Rehab Treatment", "Addiction / rehab"],
  ["Plumbing", "Home services"],
  ["Water Damage", "Home services"],
  ["Mold Removal", "Home services"],
  ["Pest Control", "Home services"],
  ["Electrician", "Home services"],
  ["Appliance Repair", "Home services"],
  ["Locksmith", "Home services"],
  ["Home Security", "Home services"],
  ["Towing", "Moving"],
  ["Deck Building and Repair", "Home services"],
  ["Telecom", "Telecom"],
  ["Fire Damage Restoration", "Home services"],
  ["Long Distance Moving", "Moving"],
  ["Driveway and Paving", "Home services"],
  ["Carpentry", "Home services"],
  ["Pool Services", "Home services"],
  ["Handyman", "Home services"],
  ["Home Remodeling", "Home services"],
  ["Junk Removal", "Home services"],
  ["Landscaping", "Home services"],
  ["Fence", "Home services"],
  ["Carpet Cleaning", "Home services"],
  ["Fireplace Repair", "Home services"],
  ["Chimney Cleaning", "Home services"],
  ["Dryer Vent Cleaning", "Home services"],
  ["Exterior Paint", "Home services"],
  ["Sliding Door Repair", "Home services"],
  ["Bathroom Remodel", "Home services"],
  ["Walk In Tubs", "Home services"],
  ["HVAC", "Home services"],
  ["Roofing", "Home services"],
  ["Gutter Installation", "Home services"],
  ["Windows", "Home services"],
  ["Garage", "Home services"],
  ["Concrete", "Home services"],
  ["Air Duct Cleaning", "Home services"],
  ["Kitchen Remodeling", "Home services"],
  ["Flooring", "Home services"],
  ["Solar", "Home services"],
  ["Siding", "Home services"],
  ["MVA / Auto Accident", "Legal"],
  ["Personal Injury", "Legal"],
  ["Immigration Lawyer", "Legal"],
  ["Credit Repair", "Financial"],
  ["Tax Debt", "Financial"],
  ["Debt Settlement", "Financial"],
  ["Annuity", "Financial"],
  ["Business Loan / MCA", "Financial"],
  ["Personal Loans", "Financial"],
  ["Home Seller / Sell My Home Fast", "Real estate"],
  ["Pre-Settlement Funding", "Legal"],
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function createVertical(
  name: string,
  category: string,
): VerticalDefinition {
  const description =
    categoryDescriptions[category]?.(name) ??
    `Choose the locations, hours, volume, customer criteria, and delivery for your ${name} campaign.`;

  return {
    slug: slugify(name),
    name,
    category,
    headline: `Build a ${name} campaign around your team.`,
    description,
    qualificationPrompts: categoryPrompts[category] ?? [
      "Target locations",
      "Buyer-approved customer criteria",
      "Delivery hours and destination",
    ],
  };
}

const catalogDefinitions = verticalSeeds.map(([name, category]) =>
  createVertical(name, category),
);

const finalExpense = catalogDefinitions.find(
  (vertical) => vertical.slug === "final-expense",
);

if (finalExpense) {
  finalExpense.headline =
    "We Provide High Volume Final Expense Calls That Have Guaranteed Intent & 90 Second Call Times.";
  finalExpense.description =
    "Buy final expense calls around the states, hours, daily volume, customer criteria, and call destination your team can support.";
}

const homeServicesOverview: VerticalDefinition = {
  slug: "home-services",
  name: "Home Services",
  category: "Home services",
  headline: "Buy Home Services calls, leads, or appointments by service area.",
  description:
    "Choose the service, locations, working hours, job criteria, expected volume, and delivery destination.",
  qualificationPrompts: categoryPrompts["Home services"],
  catalog: false,
};

export const verticals: VerticalDefinition[] = [
  homeServicesOverview,
  ...catalogDefinitions,
];

export const catalogVerticals = verticals.filter(
  (vertical) => vertical.catalog !== false,
);

export const verticalBySlug = new Map(
  verticals.map((vertical) => [vertical.slug, vertical]),
);

export function categorySlug(category: string) {
  return (
    verticalCategories.find((item) => item.name === category)?.slug ??
    slugify(category)
  );
}
