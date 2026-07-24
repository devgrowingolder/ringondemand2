export type VerticalDefinition = {
  slug: string;
  name: string;
  category: string;
  headline: string;
  description: string;
  qualificationPrompts: string[];
};

export const verticals: VerticalDefinition[] = [
  {
    slug: "final-expense",
    name: "Final Expense",
    category: "Insurance",
    headline: "Turn Final Expense demand into live conversations.",
    description:
      "Define the states, hours, daily volume, qualification rules, and call destination your team can support.",
    qualificationPrompts: [
      "Age or product criteria",
      "State availability",
      "Buyer-approved call requirements",
    ],
  },
  {
    slug: "medicare",
    name: "Medicare",
    category: "Insurance",
    headline: "Build a Medicare campaign around your capacity.",
    description:
      "Set the geography, schedule, volume, qualification rules, and delivery destination before review.",
    qualificationPrompts: [
      "Geographic eligibility",
      "Campaign schedule",
      "Buyer-approved qualification criteria",
    ],
  },
  {
    slug: "aca",
    name: "ACA",
    category: "Insurance",
    headline: "Route ACA demand using one approved campaign.",
    description:
      "Keep delivery requirements visible from buyer intake through routing and quality review.",
    qualificationPrompts: [
      "State availability",
      "Contact window",
      "Buyer-approved eligibility criteria",
    ],
  },
  {
    slug: "auto-insurance",
    name: "Auto Insurance",
    category: "Insurance",
    headline: "Bring Auto Insurance demand to the right team.",
    description:
      "Use one brief for geography, hours, volume, qualification rules, and call or lead delivery.",
    qualificationPrompts: [
      "State availability",
      "Policy or vehicle criteria",
      "Buyer-approved routing conditions",
    ],
  },
  {
    slug: "mortgage-protection",
    name: "Mortgage Protection",
    category: "Insurance",
    headline: "Structure Mortgage Protection demand before launch.",
    description:
      "Confirm the buy box and destination once, then carry that same record into review and handoff.",
    qualificationPrompts: [
      "State availability",
      "Product criteria",
      "Buyer-approved qualification rules",
    ],
  },
  {
    slug: "home-services",
    name: "Home Services",
    category: "Home services",
    headline: "Send Home Services demand where your team can act.",
    description:
      "Define service areas, working hours, job criteria, expected volume, and delivery destination.",
    qualificationPrompts: [
      "Service area",
      "Requested service",
      "Buyer-approved job criteria",
    ],
  },
  {
    slug: "roofing",
    name: "Roofing",
    category: "Home services",
    headline: "Build a Roofing campaign around your service area.",
    description:
      "Set locations, hours, volume, job criteria, and whether demand should arrive as calls, leads, or appointments.",
    qualificationPrompts: [
      "Service area",
      "Property or project criteria",
      "Buyer-approved appointment requirements",
    ],
  },
  {
    slug: "hvac",
    name: "HVAC",
    category: "Home services",
    headline: "Route HVAC demand using your actual availability.",
    description:
      "Document service areas, dispatch hours, capacity, job criteria, and destination before campaign review.",
    qualificationPrompts: [
      "Service area",
      "Service type",
      "Buyer-approved scheduling criteria",
    ],
  },
  {
    slug: "solar",
    name: "Solar",
    category: "Home services",
    headline: "Turn Solar interest into a reviewable campaign.",
    description:
      "Choose markets, contact windows, expected volume, qualification rules, and appointment destination.",
    qualificationPrompts: [
      "Market availability",
      "Property criteria",
      "Buyer-approved appointment requirements",
    ],
  },
  {
    slug: "personal-injury",
    name: "Personal Injury",
    category: "Legal",
    headline: "Structure Personal Injury demand with clear rules.",
    description:
      "Set the eligible geography, delivery hours, volume, case criteria, and intake destination.",
    qualificationPrompts: [
      "Geographic eligibility",
      "Case type",
      "Buyer-approved intake criteria",
    ],
  },
  {
    slug: "tax-debt",
    name: "Tax Debt",
    category: "Financial",
    headline: "Build a Tax Debt campaign your intake team can review.",
    description:
      "Confirm geography, hours, capacity, qualification rules, and destination before any submission.",
    qualificationPrompts: [
      "Geographic eligibility",
      "Buyer-approved financial criteria",
      "Contact availability",
    ],
  },
  {
    slug: "debt-settlement",
    name: "Debt Settlement",
    category: "Financial",
    headline: "Route Debt Settlement demand from one approved brief.",
    description:
      "Keep qualification, schedule, volume, and destination requirements connected through the funnel.",
    qualificationPrompts: [
      "Geographic eligibility",
      "Buyer-approved qualification rules",
      "Contact availability",
    ],
  },
];

export const verticalBySlug = new Map(
  verticals.map((vertical) => [vertical.slug, vertical]),
);

export const verticalCategories = Array.from(
  new Set(verticals.map((vertical) => vertical.category)),
);
