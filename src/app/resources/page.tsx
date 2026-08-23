import type { Metadata } from "next";
import { PublicFoundationPage } from "@/components/site/public-foundation-page";

export const metadata: Metadata = {
  title: "Buyer Resources",
  description:
    "Use Ring On Demand guides to choose calls, leads, or appointments and prepare campaign locations, hours, volume, customer criteria, delivery, and review steps.",
};

export default function ResourcesPage() {
  return (
    <PublicFoundationPage
      closing={{
        title: "Turn your planning notes into campaign details.",
        copy: "Start with the product, vertical, locations, schedule, volume, customer criteria, and destination your team already knows.",
        href: "/get-pricing",
        label: "Start my campaign",
      }}
      eyebrow="Buyer resources"
      intro="Practical guidance for choosing a product, planning team capacity, defining customer criteria, selecting a destination, and preparing for quality review."
      panelLabel="Planning checklist"
      panelRows={[
        { label: "Choose", value: "Calls, leads, appointments, or help deciding" },
        { label: "Prepare", value: "Locations, schedule, volume, and customer criteria" },
        { label: "Connect", value: "Phone, CRM, calendar, or supported workflow" },
        { label: "Review", value: "Campaign terms, delivery details, and next steps" },
      ]}
      panelTitle="Answers for the decisions buyers make before launch."
      primaryAction={{ href: "/blog", label: "Read buyer guides" }}
      questions={[
        {
          question: "Where should a first-time buyer start?",
          answer:
            "Start with the calls, leads, and appointments comparison. Then list your vertical, service area, response schedule, capacity, customer criteria, and preferred destination.",
        },
        {
          question: "Are page listings proof that a campaign is available?",
          answer:
            "No. Campaign availability depends on the product, vertical, locations, schedule, volume, criteria, and current operating conditions. Confirm availability during review.",
        },
        {
          question: "Can I use a guide without requesting pricing?",
          answer:
            "Yes. The resources are designed to help buyers plan and compare their options before deciding whether to submit campaign details.",
        },
      ]}
      secondaryAction={{ href: "/compare", label: "Compare options" }}
      sections={[
        {
          code: "01",
          title: "Choose the product that fits your sales process.",
          copy: "Calls, leads, and appointments place different responsibilities on your team. Compare the customer experience, destination, and staffing needed for each.",
          points: [
            "Use calls when trained agents can answer during the selected schedule.",
            "Use leads when your team can assign and follow up on customer details.",
            "Use appointments when your team sells through scheduled meetings.",
          ],
          link: { href: "/compare", label: "Compare calls, leads, and appointments" },
        },
        {
          code: "02",
          title: "Plan around your real capacity.",
          copy: "A useful campaign reflects where your team works, when it can respond, and how much activity it can handle without sacrificing follow-up.",
          points: [
            "List states, service areas, and ZIP codes the team can serve.",
            "Map response hours to the correct timezone and staffing schedule.",
            "Choose a starting volume that matches phone, CRM, or calendar capacity.",
          ],
          link: { href: "/onboarding", label: "Use the getting-started checklist" },
        },
        {
          code: "03",
          title: "Understand delivery and quality review.",
          copy: "Know where each result will arrive, what details are available, which team owns the next action, and how questions are reviewed under the campaign terms.",
          points: [
            "Confirm the supported phone, CRM, calendar, or workflow before launch.",
            "Define billable or eligible delivery in the applicable agreement.",
            "Use delivery details and buyer outcomes when requesting review.",
          ],
          link: { href: "/trust", label: "Visit the trust center" },
        },
      ]}
      statement="Better campaign decisions begin with clearer questions, not bigger promises."
      title="Practical answers for buying calls, leads, and appointments."
    />
  );
}
