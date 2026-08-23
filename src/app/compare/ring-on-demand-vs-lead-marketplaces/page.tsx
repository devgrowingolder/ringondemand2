import type { Metadata } from "next";
import { PublicFoundationPage } from "@/components/site/public-foundation-page";

export const metadata: Metadata = {
  title: "Ring On Demand vs Lead Marketplaces",
  description:
    "Compare a campaign built around calls, leads, or appointments with a general lead-marketplace buying workflow using neutral buyer questions.",
};

export default function RingOnDemandVsLeadMarketplacesPage() {
  return (
    <PublicFoundationPage
      closing={{
        title: "Compare the actual terms, not the category label.",
        copy: "Tell us what your team wants to receive and how it should work. Compare those details with the product, distribution, pricing, data, support, and review terms of any alternative.",
        href: "/get-pricing",
        label: "Plan my campaign",
      }}
      eyebrow="Comparison / Buying workflows"
      intro="Lead marketplaces vary widely. Compare the exact customer product, distribution terms, buyer controls, destination, pricing unit, data access, review process, and support offered by each option."
      panelLabel="Questions for both options"
      panelRows={[
        { label: "Product", value: "What exactly does the buyer receive?" },
        { label: "Control", value: "Which locations, hours, volume, and criteria can change?" },
        { label: "Terms", value: "How are pricing, distribution, and eligible delivery defined?" },
        { label: "Review", value: "Which records, timing, and support process apply?" },
      ]}
      panelTitle="A useful comparison starts with the same questions."
      primaryAction={{ href: "/get-pricing", label: "Plan my campaign" }}
      questions={[
        {
          question: "Are all lead marketplaces the same?",
          answer:
            "No. Products, customer sources, distribution, pricing, controls, data, support, and review terms vary. Verify each fact with the provider's current agreement and source material.",
        },
        {
          question: "Does this page claim another provider lacks a feature?",
          answer:
            "No. Unknown competitor facts remain not verified. Buyers should request current documentation and compare it with the applicable Ring On Demand campaign terms.",
        },
        {
          question: "What should I compare beyond price?",
          answer:
            "Compare the billable event, distribution, customer criteria, fields, timing, destination, buyer workload, quality review, credits, data access, support, and contract terms.",
        },
      ]}
      secondaryAction={{ href: "/trust", label: "Review trust questions" }}
      sections={[
        {
          code: "01",
          title: "Compare the product definition.",
          copy: "A lead marketplace may offer different products and distribution models. Ring On Demand campaign availability also varies. Compare the exact written definition for the option being considered.",
          points: [
            "Identify whether the buyer receives a call, customer record, appointment, click, or another result.",
            "Confirm customer action, fields, timing, distribution, and destination.",
            "Mark anything without a current source or agreement as not verified.",
          ],
        },
        {
          code: "02",
          title: "Compare buyer control and workload.",
          copy: "Understand which choices the buyer can set and which tasks the buyer team still owns after delivery.",
          points: [
            "Compare vertical, service area, schedule, volume, customer criteria, and destination controls.",
            "Compare phone coverage, lead follow-up, calendar management, and outcome tracking.",
            "Confirm how changes are requested, approved, and put into effect.",
          ],
        },
        {
          code: "03",
          title: "Compare pricing and review terms.",
          copy: "A lower displayed unit price may not represent the same product or workload. Use matched definitions and include the buyer's operating effort.",
          points: [
            "Compare the billable or eligible event and any distribution terms.",
            "Compare the review window, required evidence, credit process, and support path.",
            "Include internal staffing, systems, follow-up, and scheduling effort.",
          ],
          link: { href: "/resources/quality-and-credit-guide", label: "Read the quality and credit guide" },
        },
      ]}
      statement="Compare customer products and operating terms line by line; category names alone are not enough."
      title="Ring On Demand or a lead marketplace: compare the workflow behind the offer."
    />
  );
}
