import type { Metadata } from "next";
import { PublicFoundationPage } from "@/components/site/public-foundation-page";

export const metadata: Metadata = {
  title: "Inbound Calls vs Form Leads",
  description:
    "Compare inbound customer calls with form leads by customer action, buyer staffing, follow-up work, delivery, and campaign setup.",
};

export default function InboundCallsVsFormLeadsPage() {
  return (
    <PublicFoundationPage
      closing={{
        title: "Choose the customer action your team is ready to handle.",
        copy: "Tell us whether your team can answer calls as they arrive or follow up from customer details. Keep the choice open if you want help deciding.",
        href: "/get-pricing",
        label: "Compare my options",
      }}
      eyebrow="Comparison / Calls and form leads"
      intro="An inbound call begins with a live customer conversation. A form lead begins with customer details that your team still needs to assign and contact. The better fit depends on staffing and follow-up."
      panelLabel="Workflow comparison"
      panelRows={[
        { label: "Customer action", value: "Places a call or submits a form" },
        { label: "Buyer action", value: "Answers now or follows up after delivery" },
        { label: "Destination", value: "Phone line or supported lead workflow" },
        { label: "Capacity", value: "Live coverage or follow-up coverage" },
      ]}
      panelTitle="A conversation now or a record for later follow-up."
      primaryAction={{ href: "/get-pricing", label: "Compare my options" }}
      questions={[
        {
          question: "Are calls always a better customer experience?",
          answer:
            "No. The right experience depends on the customer situation, the information needed, and whether a trained team can answer. A well-run form process may fit cases that need research or scheduled follow-up.",
        },
        {
          question: "What should I verify about a form lead?",
          answer:
            "Confirm the customer action, fields collected, timing, distribution terms, source category, customer criteria, and the process for delivery and review.",
        },
        {
          question: "Can one campaign include both?",
          answer:
            "Availability and supported combinations are campaign-specific. Treat each product as a separate workflow with a clear schedule, destination, owner, and review process.",
        },
      ]}
      secondaryAction={{ href: "/products/calls", label: "Explore inbound calls" }}
      sections={[
        {
          code: "01",
          title: "Compare when your team must respond.",
          copy: "Calls require a person who can answer during the selected schedule. Form leads require a process that assigns and follows up on each record.",
          points: [
            "Choose calls when trained agents can cover the requested hours and volume.",
            "Choose form leads when the team can assign ownership and follow up consistently.",
            "Do not request more activity than the phone or follow-up team can support.",
          ],
        },
        {
          code: "02",
          title: "Compare what arrives.",
          copy: "A call delivers a conversation to a phone line. A form lead delivers the customer fields approved for the campaign to a supported destination.",
          points: [
            "For calls, confirm routing, schedule, billable terms, and recording availability.",
            "For form leads, confirm required fields, delivery timing, destination, and distribution terms.",
            "For both, define service area and customer criteria before launch.",
          ],
        },
        {
          code: "03",
          title: "Compare quality in context.",
          copy: "A missed sale does not by itself explain whether delivery matched the campaign. Review the relevant record against the agreed terms.",
          points: [
            "Use available call details or lead fields when reviewing a question.",
            "Keep buyer outcome notes separate from delivery eligibility.",
            "Follow the review window and evidence requirements in the campaign terms.",
          ],
          link: { href: "/platform/quality-review", label: "Explore quality review" },
        },
      ]}
      statement="Calls shift the work to live phone coverage. Form leads shift the work to assignment and follow-up."
      title="Inbound calls or form leads: which workflow fits your team?"
    />
  );
}
