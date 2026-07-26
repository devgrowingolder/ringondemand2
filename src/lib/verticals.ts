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
    headline:
      "We Provide High Volume Final Expense Calls That Have Guaranteed Intent & 90 Second Call Times.",
    description:
      "Buy final expense calls around the states, hours, daily volume, qualification rules, and call destination your team can support.",
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
    headline: "Buy Medicare calls, leads, or appointments around your capacity.",
    description:
      "Choose your states, schedule, volume, qualification rules, and delivery destination before requesting pricing.",
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
    headline: "Build an ACA campaign around your licensed markets.",
    description:
      "Set your states, contact hours, volume, qualification rules, and preferred delivery model.",
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
    headline: "Send Auto Insurance demand to the right team.",
    description:
      "Choose your states, hours, volume, qualification rules, and whether you want calls or leads.",
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
    headline: "Build a Mortgage Protection campaign around your sales team.",
    description:
      "Confirm your states, schedule, volume, qualification rules, and destination before requesting pricing.",
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
    headline: "Buy Home Services calls, leads, or appointments by service area.",
    description:
      "Choose your service areas, working hours, job criteria, expected volume, and delivery destination.",
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
    headline: "Get Roofing demand in the markets your team serves.",
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
    headline: "Buy HVAC demand around your dispatch hours and capacity.",
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
    headline: "Put qualified Solar opportunities in front of your team.",
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
    headline: "Build a Personal Injury campaign around your intake criteria.",
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
    headline: "Buy Tax Debt demand your intake team is ready to handle.",
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
    headline: "Build a Debt Settlement campaign around your qualification rules.",
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
