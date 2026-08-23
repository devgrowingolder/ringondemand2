import type { Metadata } from "next";
import { PublicFoundationPage } from "@/components/site/public-foundation-page";

export const metadata: Metadata = {
  title: "Calls, Leads, and Appointments Glossary",
  description:
    "Plain-language definitions for common campaign, delivery, quality-review, pricing, and buyer-workflow terms.",
};

export default function GlossaryPage() {
  return (
    <PublicFoundationPage
      closing={{
        title: "Put the definitions that matter into your campaign terms.",
        copy: "Use this glossary to ask clearer questions. The applicable agreement and approved campaign details control when a general definition differs from your setup.",
        href: "/get-pricing",
        label: "Plan my campaign",
      }}
      eyebrow="Resources / Glossary"
      intro="Plain-language definitions for buyers planning calls, leads, and appointments. Product, pricing, eligibility, and review terms can vary by campaign, so confirm the exact wording in your agreement."
      panelLabel="Core terms"
      panelRows={[
        { label: "Product", value: "Calls, leads, or appointments" },
        { label: "Controls", value: "Coverage, schedule, volume, and customer criteria" },
        { label: "Destination", value: "Phone, CRM, calendar, or supported workflow" },
        { label: "Review", value: "The process used to evaluate a delivery question" },
      ]}
      panelTitle="Understand the words before comparing the offer."
      primaryAction={{ href: "/compare", label: "Compare products" }}
      questions={[
        {
          question: "Do these definitions replace my agreement?",
          answer:
            "No. This is general buyer education. The applicable agreement and approved campaign details control the product, pricing, eligibility, delivery, review, and credit terms for a campaign.",
        },
        {
          question: "What should I do when a term is unclear?",
          answer:
            "Ask for a written definition and a concrete example before launch. Keep the field unresolved until the buyer and campaign owner agree on the meaning.",
        },
        {
          question: "Why can the same term vary by campaign?",
          answer:
            "Products, verticals, locations, customer paths, destinations, pricing units, buyer requirements, and applicable terms can differ. Confirm the exact campaign-specific definition.",
        },
      ]}
      secondaryAction={{ href: "/resources", label: "All buyer resources" }}
      sections={[
        {
          code: "01",
          title: "Products and customer actions.",
          copy: "These terms describe what the customer does and what the buyer team receives.",
          points: [
            "Inbound call — a customer phone conversation routed to an approved buyer number during the selected schedule.",
            "Lead — customer details delivered to a supported buyer destination for follow-up.",
            "Booked appointment — a customer conversation placed into an approved calendar or scheduling process.",
            "Customer action — the call, form submission, scheduling step, or other approved event that creates the result.",
          ],
        },
        {
          code: "02",
          title: "Campaign settings.",
          copy: "These choices describe what the buyer can support and what needs to be confirmed before launch.",
          points: [
            "Service area — the states, regions, or ZIP codes the buyer team can serve.",
            "Schedule — the approved days, times, and timezone for delivery or appointment availability.",
            "Volume — the requested number of results per day, week, or month.",
            "Customer criteria — the agreed characteristics or answers used to define the requested customer situation.",
            "Destination — the phone, CRM, calendar, or supported workflow selected to receive the result.",
          ],
        },
        {
          code: "03",
          title: "Pricing, delivery, and review.",
          copy: "These terms require campaign-specific wording. Ask for the exact definition rather than relying on a general label.",
          points: [
            "Billable event — the contractually defined result that creates a charge under the campaign terms.",
            "Eligible delivery — a result that meets the applicable product and campaign requirements.",
            "Quality review — evaluation of a delivery question using the agreed criteria and available evidence.",
            "Credit request — a request to review whether a delivery qualifies for an account credit under the campaign terms.",
            "Unresolved field — a campaign detail that still requires an explicit buyer answer or confirmation.",
          ],
          link: { href: "/resources/quality-and-credit-guide", label: "Read the quality and credit guide" },
        },
      ]}
      statement="A clear definition is one a buyer, operator, and reviewer can apply to the same example."
      title="The buyer’s plain-language campaign glossary."
    />
  );
}
