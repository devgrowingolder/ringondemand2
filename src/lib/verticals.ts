import { getRenderableClaim } from "@/lib/proof";

export type VerticalAvailabilityStatus =
  | "active"
  | "limited"
  | "paused"
  | "researching";

export type VerticalContentTier = 1 | 2 | 3;
export type VerticalDeliveryModel = "calls" | "leads" | "appointments";

export type VerticalFaqItem = Readonly<{
  question: string;
  answer: string;
}>;

export type VerticalDefinition = {
  slug: string;
  name: string;
  category: string;
  headline: string;
  description: string;
  contentTier: VerticalContentTier;
  status: VerticalAvailabilityStatus;
  availableModels: readonly VerticalDeliveryModel[];
  availabilitySourceId?: string;
  locations: "campaign_specific" | readonly string[];
  buyerTypes: readonly string[];
  customerIntent: string;
  commonUseCases: readonly string[];
  campaignInputs: readonly string[];
  customerCriteria: readonly string[];
  deliveryDestinations: readonly string[];
  qualificationPrompts: readonly string[];
  billableDefinitionId?: string;
  proofIds: readonly string[];
  faqIds: readonly string[];
  faqItems: readonly VerticalFaqItem[];
  relatedSlugs: readonly string[];
  owner: string;
  lastReviewedAt: string;
  statusNote: string;
  catalog?: boolean;
};

export type VerticalCategory = {
  name: string;
  slug: string;
  description: string;
};

type VerticalContentOverride = Partial<
  Pick<
    VerticalDefinition,
    | "headline"
    | "description"
    | "buyerTypes"
    | "customerIntent"
    | "commonUseCases"
    | "campaignInputs"
    | "customerCriteria"
    | "deliveryDestinations"
    | "qualificationPrompts"
    | "proofIds"
    | "faqItems"
    | "relatedSlugs"
    | "statusNote"
  >
> & {
  contentTier: VerticalContentTier;
};

/** Naming reference only. This URL is not proof of current availability. */
export const VERTICAL_CATALOG_SOURCE = "https://ringondemand.com/";
export const VERTICAL_REVIEW_DATE = "2026-08-21";

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
    description: "Debt, lending, credit, and retirement services.",
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

const categoryInputs: Record<string, readonly string[]> = {
  Insurance: [
    "States where your team is licensed",
    "Products and customer criteria your team approves",
    "Hours and volume your licensed team can support",
  ],
  "Home services": [
    "Service area and travel limits",
    "Requested job or service types",
    "Dispatch, estimate, or appointment capacity",
  ],
  Legal: [
    "Jurisdictions your firm serves",
    "Matter types your intake team reviews",
    "Intake hours and firm-approved screening questions",
  ],
  Financial: [
    "Geographic and program eligibility",
    "Buyer-approved financial criteria",
    "Contact hours, capacity, and delivery destination",
  ],
  "Addiction / rehab": [
    "Locations and programs your admissions team supports",
    "Admissions criteria approved by your organization",
    "Hours when a trained intake team is available",
  ],
  "Auto services": [
    "Covered locations",
    "Vehicle, product, or service criteria",
    "Hours, volume, and delivery destination",
  ],
  Moving: [
    "Pickup, destination, and service area",
    "Requested moving or towing service",
    "Dispatch dates and capacity",
  ],
  Telecom: [
    "Covered markets",
    "Requested service",
    "Customer criteria, hours, and delivery destination",
  ],
  "Real estate": [
    "Target markets",
    "Property and seller criteria",
    "Contact rules, hours, and team capacity",
  ],
};

const categoryBuyerTypes: Record<string, readonly string[]> = {
  Insurance: ["Licensed agencies", "Licensed sales teams", "Insurance call centers"],
  "Home services": ["Local operators", "Multi-location service teams", "Appointment teams"],
  Legal: ["Law firms", "Legal intake teams", "Authorized intake partners"],
  Financial: ["Financial service teams", "Contact centers", "Authorized program operators"],
  "Addiction / rehab": ["Treatment providers", "Admissions teams", "Authorized care navigators"],
  "Auto services": ["Automotive service teams", "Warranty programs", "Contact centers"],
  Moving: ["Moving companies", "Dispatch teams", "Towing operators"],
  Telecom: ["Telecom providers", "Authorized sales teams", "Contact centers"],
  "Real estate": ["Real-estate teams", "Home-buying teams", "Seller intake teams"],
};

const categoryIntent: Record<string, string> = {
  Insurance: "A person asking to speak with a licensed team about an insurance product.",
  "Home services": "A property owner or authorized contact asking about a specific home project or service.",
  Legal: "A person asking to speak with an intake team about a possible legal matter.",
  Financial: "A person asking to discuss a financial product or service with an authorized team.",
  "Addiction / rehab": "A person or authorized support contact asking to speak with an admissions team about treatment options.",
  "Auto services": "A vehicle owner asking about an automotive product or service.",
  Moving: "A person asking for help with a move, tow, or related service.",
  Telecom: "A person asking about an available telecommunications service.",
  "Real estate": "A property owner asking to discuss a sale or other real-estate service.",
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

function availabilityFaq(name: string, inputs: readonly string[]): VerticalFaqItem[] {
  return [
    {
      question: `Is ${name} available right now?`,
      answer:
        "Availability is confirmed for each request by location, delivery method, and current capacity. This page does not promise that a live program is available.",
    },
    {
      question: "What should I share to check availability?",
      answer: `Start with ${inputs.join(", ").toLowerCase()}. You can review every detail before sending the request.`,
    },
  ];
}

const deepContentBySlug: Record<string, VerticalContentOverride> = {
  "final-expense": {
    contentTier: 1,
    headline:
      getRenderableClaim("final-expense-headline", "final expense") ??
      "Plan a Final Expense campaign around your licensed team.",
    description:
      "Choose the states, staffed hours, daily capacity, customer questions, and call destination your team wants us to review. Current availability and commercial terms are confirmed before anything starts.",
    buyerTypes: ["Licensed final expense agencies", "Licensed agent teams", "Insurance call centers"],
    customerIntent:
      "A person asking to speak with a licensed team about final expense coverage.",
    commonUseCases: [
      "Match requested states to agent licensing",
      "Plan call coverage around staffed sales hours",
      "Set a daily volume the team can answer consistently",
    ],
    campaignInputs: [
      "Licensed states and ZIP-code preferences",
      "Days, hours, timezone, and agent capacity",
      "Final expense product and buyer-approved customer criteria",
      "Phone number or other approved delivery destination",
    ],
    customerCriteria: [
      "State and geographic eligibility",
      "Buyer-approved age or product criteria, when applicable",
      "A stated request to discuss final expense coverage",
      "Availability during the hours your licensed team is staffed",
    ],
    deliveryDestinations: ["Licensed phone team", "Buyer CRM after confirmation", "Approved follow-up workflow"],
    qualificationPrompts: [
      "States where your agents are licensed",
      "Hours your licensed phone team is staffed",
      "Buyer-approved product and customer criteria",
      "Daily call capacity and destination number",
    ],
    proofIds: ["final-expense-headline"],
    faqItems: [
      {
        question: "Can this page guarantee intent or a 90-second call?",
        answer:
          "No. Those statements are not displayed unless they have approved proof. Any intent standard, billable duration, and review remedy must be defined in the signed campaign terms.",
      },
      {
        question: "Can I request only states where my agents are licensed?",
        answer:
          "Yes. Include the states and ZIP codes you want reviewed. Your team remains responsible for confirming its licenses and sales permissions before receiving opportunities.",
      },
      {
        question: "What details should my phone team prepare?",
        answer:
          "Share staffed hours, timezone, daily capacity, destination number, and the customer questions your team wants included. The final delivery fields are confirmed before launch.",
      },
      {
        question: "Can I ask for calls, leads, or appointments?",
        answer:
          "You can tell us which model you prefer. We will confirm whether that model is currently supported for your locations before pricing.",
      },
    ],
    relatedSlugs: ["medicare", "life-insurance", "mortgage-protection"],
    statusNote:
      "Final Expense availability will be confirmed by licensed states, requested volume, delivery method, and current capacity. No volume, intent, or duration guarantee is published here.",
  },
  medicare: {
    contentTier: 1,
    headline: "Plan Medicare opportunities around your licensed coverage team.",
    description:
      "Tell us where your team is licensed, when licensed agents are available, which customer questions matter, and whether you prefer calls, leads, or appointments. We confirm current availability before pricing.",
    buyerTypes: ["Licensed Medicare agencies", "Licensed enrollment teams", "Insurance call centers"],
    customerIntent:
      "A person asking to speak with a licensed team about Medicare coverage options.",
    commonUseCases: [
      "Plan coverage by licensed state and staffed hours",
      "Route inquiries to the right licensed team",
      "Set volume around available enrollment capacity",
    ],
    campaignInputs: [
      "States where the receiving agents are licensed",
      "Products the team is authorized and prepared to discuss",
      "Staffed days, hours, timezone, and daily capacity",
      "Buyer-approved questions and destination workflow",
    ],
    customerCriteria: [
      "Requested state and geographic eligibility",
      "A stated request to discuss Medicare coverage",
      "Buyer-approved product criteria",
      "Availability to speak during staffed licensed-agent hours",
    ],
    deliveryDestinations: ["Licensed phone team", "Buyer CRM after confirmation", "Approved appointment workflow"],
    qualificationPrompts: [
      "Licensed states and agent availability",
      "Products your team is prepared to discuss",
      "Buyer-approved customer questions",
      "Preferred delivery model and daily capacity",
    ],
    faqItems: [
      {
        question: "Does Ring On Demand decide Medicare eligibility?",
        answer:
          "No. Your licensed team is responsible for product explanations, eligibility review, required disclosures, and enrollment activity.",
      },
      {
        question: "Can I limit a request to licensed states?",
        answer:
          "Yes. Add the states and ZIP codes you want reviewed. Availability is confirmed against the requested geography and delivery model.",
      },
      {
        question: "Can my request follow our licensed-agent schedule?",
        answer:
          "Yes. Share the days, hours, timezone, and volume your team can support, then review those details before submitting.",
      },
      {
        question: "Are calls, leads, and appointments all available?",
        answer:
          "Not necessarily. Select the model you prefer and we will confirm what is currently available for your markets.",
      },
    ],
    relatedSlugs: ["final-expense", "aca", "u65-health"],
    statusNote:
      "Medicare availability will be confirmed by licensed geography, requested delivery model, staffed hours, and current capacity.",
  },
  roofing: {
    contentTier: 1,
    headline: "Plan Roofing calls, leads, or appointments by service area.",
    description:
      "Define the ZIP codes you serve, the roofing jobs your team handles, estimate hours, crew capacity, and the customer questions you want reviewed. We confirm availability before pricing.",
    buyerTypes: ["Local roofing contractors", "Multi-location roofing companies", "Roofing estimate teams"],
    customerIntent:
      "A property owner or authorized contact asking to discuss a roof repair, replacement, inspection, or estimate.",
    commonUseCases: [
      "Keep requests inside practical service ZIP codes",
      "Separate repair, replacement, and inspection interest",
      "Match appointment requests to estimator capacity",
    ],
    campaignInputs: [
      "Service ZIP codes and travel limits",
      "Roofing services and property types your team accepts",
      "Estimate hours, response schedule, and daily capacity",
      "Phone, CRM, or calendar workflow to review",
    ],
    customerCriteria: [
      "Property is inside the requested service area",
      "Customer is the owner or authorized decision-maker",
      "Requested roofing job matches your accepted services",
      "Customer can speak or schedule during your staffed hours",
    ],
    deliveryDestinations: ["Dispatch or estimate phone line", "Buyer CRM after confirmation", "Approved estimate calendar"],
    qualificationPrompts: [
      "Service ZIP codes and maximum travel area",
      "Repair, replacement, inspection, or other accepted work",
      "Property and decision-maker criteria",
      "Estimator hours and daily appointment capacity",
    ],
    faqItems: [
      {
        question: "Can I limit requests to specific roofing services?",
        answer:
          "Yes. List the repair, replacement, inspection, or other work your team accepts. Those choices become part of the request we review with you.",
      },
      {
        question: "Can I target only my service ZIP codes?",
        answer:
          "Yes. Add the ZIP codes and any travel limits. Current availability is confirmed for that service area before pricing.",
      },
      {
        question: "Can appointments follow estimator availability?",
        answer:
          "You can share estimator hours, timezone, and capacity. We will confirm whether appointment delivery is available for the requested market.",
      },
      {
        question: "Are storm-related requests guaranteed?",
        answer:
          "No. This page does not promise a source, event, job type, volume, or outcome. Any accepted service criteria are written into the campaign terms.",
      },
    ],
    relatedSlugs: ["gutter-installation", "siding", "solar"],
    statusNote:
      "Roofing availability will be confirmed by service ZIP code, requested job type, delivery model, and current capacity.",
  },
  "personal-injury": {
    contentTier: 1,
    headline: "Plan Personal Injury intake around your firm’s criteria.",
    description:
      "Define the jurisdictions, matter types, intake hours, screening questions, and capacity your firm wants reviewed. Ring On Demand does not decide case value or legal eligibility.",
    buyerTypes: ["Personal injury law firms", "Authorized legal intake teams", "Multi-office firms"],
    customerIntent:
      "A person asking to speak with a legal intake team about a possible injury matter.",
    commonUseCases: [
      "Keep inquiries inside the firm’s jurisdictions",
      "Collect firm-approved intake answers for review",
      "Route inquiries during staffed intake hours",
    ],
    campaignInputs: [
      "Jurisdictions and office coverage",
      "Matter types the firm is prepared to review",
      "Firm-approved screening questions and exclusions",
      "Intake hours, capacity, and approved destination",
    ],
    customerCriteria: [
      "Incident location falls inside a served jurisdiction",
      "Matter type matches the firm’s stated intake scope",
      "Representation or conflict questions approved by the firm",
      "Customer is asking to speak with an intake professional",
    ],
    deliveryDestinations: ["Firm intake phone line", "Approved intake system", "Follow-up workflow after confirmation"],
    qualificationPrompts: [
      "Jurisdictions and office coverage",
      "Matter types and firm-approved exclusions",
      "Approved intake questions",
      "Staffed intake hours and team capacity",
    ],
    faqItems: [
      {
        question: "Does Ring On Demand decide whether a case qualifies?",
        answer:
          "No. Your firm controls intake criteria and makes every legal, conflict, representation, and case-acceptance decision.",
      },
      {
        question: "Can I request specific jurisdictions and matter types?",
        answer:
          "Yes. Include the jurisdictions and matter types your firm wants reviewed. Availability is confirmed before pricing.",
      },
      {
        question: "Can we use our own intake questions?",
        answer:
          "Share the questions and exclusions your firm has approved. The final intake details and delivery terms are reviewed before launch.",
      },
      {
        question: "Does this page provide legal advice?",
        answer:
          "No. It helps a buyer plan campaign and intake details. It does not provide legal advice or create an attorney-client relationship.",
      },
    ],
    relatedSlugs: ["mva-auto-accident", "pre-settlement-funding", "immigration-lawyer"],
    statusNote:
      "Personal Injury availability will be confirmed by jurisdiction, matter type, intake criteria, delivery model, and current capacity.",
  },
  "rehab-treatment": {
    contentTier: 1,
    headline: "Plan Addiction Treatment inquiries around your admissions team.",
    description:
      "Define the locations, programs, staffed intake hours, approved admissions questions, and capacity your organization wants reviewed. Keep clinical assessment and personal health details inside your own approved intake process.",
    buyerTypes: ["Treatment providers", "Facility admissions teams", "Authorized treatment navigators"],
    customerIntent:
      "A person or authorized support contact asking to speak with an admissions team about treatment options.",
    commonUseCases: [
      "Route requests to staffed admissions teams",
      "Match inquiries to locations and programs under review",
      "Plan response capacity without collecting patient details here",
    ],
    campaignInputs: [
      "Facility locations and programs under review",
      "Hours when trained admissions staff are available",
      "Organization-approved intake criteria",
      "Phone or approved intake destination",
    ],
    customerCriteria: [
      "Requested location or program matches the organization’s scope",
      "Person is asking to speak with an admissions team",
      "Organization-approved logistical or payment criteria",
      "A trained intake team is available to continue the conversation",
    ],
    deliveryDestinations: ["Admissions phone team", "Approved intake system", "Follow-up workflow after confirmation"],
    qualificationPrompts: [
      "Locations and programs your admissions team supports",
      "Hours when trained staff are available",
      "Organization-approved intake questions",
      "Capacity and approved delivery destination",
    ],
    faqItems: [
      {
        question: "Does this page collect patient or clinical details?",
        answer:
          "No. This page is for buyer campaign planning. Do not place personal health details in the campaign request; clinical assessment belongs in your organization’s approved intake process.",
      },
      {
        question: "Can I request specific facilities or programs?",
        answer:
          "Yes. Share the locations and program types your admissions team wants reviewed. Availability is confirmed before pricing.",
      },
      {
        question: "Can delivery follow admissions-team hours?",
        answer:
          "Yes. Add staffed days, hours, timezone, and capacity. We will confirm what delivery methods are currently supported.",
      },
      {
        question: "Is this page treatment or emergency support?",
        answer:
          "No. It is a campaign-planning page for organizations. Anyone seeking care or emergency help should contact an appropriate provider or emergency service directly.",
      },
    ],
    relatedSlugs: ["medicare", "personal-injury", "u65-health"],
    statusNote:
      "Addiction Treatment and Rehab availability will be confirmed by location, program scope, staffed admissions hours, delivery method, and current capacity.",
  },
};

const tierTwoContentBySlug: Record<string, VerticalContentOverride> = {
  "auto-insurance": {
    contentTier: 2,
    headline: "Plan Auto Insurance inquiries by licensed market.",
    description:
      "Share licensed states, product criteria, staffed hours, capacity, and preferred delivery. We will confirm current availability before pricing.",
    campaignInputs: ["Licensed states", "Auto insurance product criteria", "Licensed-agent hours", "Volume and destination"],
    customerCriteria: ["Geographic eligibility", "Buyer-approved driver or vehicle questions", "Request to discuss auto insurance"],
    qualificationPrompts: ["Licensed states", "Driver and vehicle questions", "Agent hours", "Daily capacity"],
    relatedSlugs: ["home-insurance", "business-insurance", "life-insurance"],
    statusNote: "Auto Insurance availability requires confirmation by state, delivery model, and current capacity.",
  },
  "home-insurance": {
    contentTier: 2,
    headline: "Plan Home Insurance inquiries around licensed states and property criteria.",
    description:
      "Share licensed states, property questions, staffed hours, capacity, and preferred delivery. We will confirm current availability before pricing.",
    campaignInputs: ["Licensed states", "Property and policy questions", "Licensed-agent hours", "Volume and destination"],
    customerCriteria: ["Geographic eligibility", "Buyer-approved property questions", "Request to discuss home insurance"],
    qualificationPrompts: ["Licensed states", "Property questions", "Agent hours", "Daily capacity"],
    relatedSlugs: ["auto-insurance", "business-insurance", "mortgage-protection"],
    statusNote: "Home Insurance availability requires confirmation by state, delivery model, and current capacity.",
  },
  plumbing: {
    contentTier: 2,
    headline: "Plan Plumbing opportunities inside your service area.",
    description:
      "Share service ZIP codes, accepted jobs, dispatch hours, and team capacity. We will confirm current availability before pricing.",
    campaignInputs: ["Service ZIP codes", "Accepted plumbing jobs", "Dispatch hours", "Daily capacity and destination"],
    customerCriteria: ["Property inside the service area", "Requested work matches accepted services", "Decision-maker availability"],
    qualificationPrompts: ["Service ZIP codes", "Accepted job types", "Dispatch hours", "Daily capacity"],
    relatedSlugs: ["water-damage", "hvac", "appliance-repair"],
    statusNote: "Plumbing availability requires confirmation by service ZIP code, job type, and current capacity.",
  },
  hvac: {
    contentTier: 2,
    headline: "Plan HVAC opportunities around service area and technician capacity.",
    description:
      "Share service ZIP codes, accepted HVAC work, dispatch or estimate hours, and capacity. We will confirm current availability before pricing.",
    campaignInputs: ["Service ZIP codes", "Accepted HVAC services", "Dispatch or estimate hours", "Daily capacity and destination"],
    customerCriteria: ["Property inside the service area", "Requested work matches accepted services", "Decision-maker availability"],
    qualificationPrompts: ["Service ZIP codes", "Accepted HVAC work", "Dispatch hours", "Daily capacity"],
    relatedSlugs: ["air-duct-cleaning", "plumbing", "electrician"],
    statusNote: "HVAC availability requires confirmation by service ZIP code, service type, and current capacity.",
  },
  "bathroom-remodel": {
    contentTier: 2,
    headline: "Plan Bathroom Remodel appointments around your estimate team.",
    description:
      "Share service ZIP codes, project scope, estimate hours, and appointment capacity. We will confirm current availability before pricing.",
    campaignInputs: ["Service ZIP codes", "Accepted project scope", "Estimate hours", "Appointment capacity and destination"],
    customerCriteria: ["Property inside the service area", "Project matches accepted scope", "Decision-maker can attend an estimate"],
    qualificationPrompts: ["Service ZIP codes", "Project scope", "Estimate hours", "Appointment capacity"],
    relatedSlugs: ["walk-in-tubs", "home-remodeling", "kitchen-remodeling"],
    statusNote: "Bathroom Remodel availability requires confirmation by service area, project type, and current capacity.",
  },
  "tax-debt": {
    contentTier: 2,
    headline: "Plan Tax Debt inquiries around your program criteria.",
    description:
      "Share covered locations, program-approved questions, contact hours, and team capacity. We will confirm current availability before pricing.",
    campaignInputs: ["Covered locations", "Program-approved tax questions", "Contact hours", "Volume and destination"],
    customerCriteria: ["Geographic eligibility", "Buyer-approved program criteria", "Request to discuss tax debt services"],
    qualificationPrompts: ["Covered locations", "Approved program questions", "Contact hours", "Daily capacity"],
    relatedSlugs: ["debt-settlement", "credit-repair", "personal-loans"],
    statusNote: "Tax Debt availability requires confirmation by location, program criteria, and current capacity.",
  },
  "debt-settlement": {
    contentTier: 2,
    headline: "Plan Debt Settlement inquiries around your program criteria.",
    description:
      "Share covered locations, buyer-approved questions, contact hours, and team capacity. We will confirm current availability before pricing.",
    campaignInputs: ["Covered locations", "Buyer-approved debt questions", "Contact hours", "Volume and destination"],
    customerCriteria: ["Geographic eligibility", "Buyer-approved program criteria", "Request to discuss debt settlement"],
    qualificationPrompts: ["Covered locations", "Approved program questions", "Contact hours", "Daily capacity"],
    relatedSlugs: ["tax-debt", "credit-repair", "personal-loans"],
    statusNote: "Debt Settlement availability requires confirmation by location, program criteria, and current capacity.",
  },
};

function createVertical(name: string, category: string): VerticalDefinition {
  const slug = slugify(name);
  const inputs = categoryInputs[category] ?? [
    "Target locations",
    "Buyer-approved customer criteria",
    "Hours, capacity, and destination",
  ];
  const override = deepContentBySlug[slug] ?? tierTwoContentBySlug[slug];
  const contentTier = override?.contentTier ?? 3;
  const faqItems = override?.faqItems ?? availabilityFaq(name, inputs);
  const statusNote =
    override?.statusNote ??
    `${name} availability has not been confirmed for a public offer. Share your locations, preferred delivery model, and capacity so our team can check it.`;

  return {
    slug,
    name,
    category,
    contentTier,
    status: "researching",
    availableModels: [],
    locations: "campaign_specific",
    buyerTypes:
      override?.buyerTypes ?? categoryBuyerTypes[category] ?? ["Buyer teams"],
    customerIntent:
      override?.customerIntent ??
      categoryIntent[category] ??
      `A person asking to discuss ${name} with an appropriate team.`,
    commonUseCases:
      override?.commonUseCases ?? [
        "Check whether the requested market is supported",
        "Define buyer-approved customer criteria",
        "Plan contact hours and team capacity",
      ],
    campaignInputs: override?.campaignInputs ?? inputs,
    customerCriteria:
      override?.customerCriteria ?? [
        "Requested location is inside the buyer’s market",
        "Request matches the buyer’s approved service criteria",
        "Customer can continue during the buyer’s staffed hours",
      ],
    deliveryDestinations:
      override?.deliveryDestinations ?? [
        "Phone after confirmation",
        "Buyer system after confirmation",
        "Approved follow-up workflow",
      ],
    qualificationPrompts: override?.qualificationPrompts ?? inputs,
    proofIds: override?.proofIds ?? [],
    faqIds: faqItems.map((_, index) => `${slug}-faq-${index + 1}`),
    faqItems,
    relatedSlugs: override?.relatedSlugs ?? [],
    owner: "Growth & Operations",
    lastReviewedAt: VERTICAL_REVIEW_DATE,
    statusNote,
    headline:
      override?.headline ??
      (contentTier === 2
        ? `Plan a ${name} campaign around your team.`
        : `Ask about ${name} campaign availability.`),
    description:
      override?.description ??
      `We have not published a live availability claim for ${name}. Tell us what you need and our team will confirm the market, delivery method, and current capacity before pricing.`,
  };
}

const catalogDefinitions = verticalSeeds.map(([name, category]) =>
  createVertical(name, category),
);

const homeServicesOverview: VerticalDefinition = {
  ...createVertical("Home Services", "Home services"),
  slug: "home-services",
  contentTier: 2,
  headline: "Plan Home Services opportunities by trade and service area.",
  description:
    "Choose the trade, locations, working hours, job criteria, capacity, and preferred delivery. We will confirm which programs are currently available before pricing.",
  statusNote:
    "Home Services availability will be confirmed by trade, service area, delivery model, and current capacity.",
  relatedSlugs: ["roofing", "plumbing", "hvac", "bathroom-remodel"],
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

export function isVerticalAvailabilityConfirmed(vertical: VerticalDefinition) {
  return (
    (vertical.status === "active" || vertical.status === "limited") &&
    vertical.availableModels.length > 0 &&
    Boolean(vertical.availabilitySourceId?.trim())
  );
}

export function verticalAvailabilityLabel(vertical: VerticalDefinition) {
  if (isVerticalAvailabilityConfirmed(vertical)) {
    return vertical.status === "limited" ? "Limited availability" : "Available";
  }
  if (vertical.status === "paused") return "Currently paused";
  return "Confirm availability";
}

export function isVerticalIndexable(vertical: VerticalDefinition) {
  return vertical.contentTier < 3 && isVerticalAvailabilityConfirmed(vertical);
}
