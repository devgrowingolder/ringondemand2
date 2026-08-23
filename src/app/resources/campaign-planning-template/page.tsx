import type { Metadata } from "next";
import { PublicFoundationPage } from "@/components/site/public-foundation-page";

export const metadata: Metadata = {
  title: "Campaign Planning Template",
  description:
    "Plan calls, leads, or appointments with a practical template for product, vertical, coverage, schedule, volume, customer criteria, destination, ownership, and review.",
};

export default function CampaignPlanningTemplatePage() {
  return (
    <PublicFoundationPage
      closing={{
        title: "Bring your planning answers into the pricing flow.",
        copy: "Start with what you know and leave unclear fields open for review. You will confirm the complete campaign details before submission.",
        href: "/get-pricing",
        label: "Start my campaign",
      }}
      eyebrow="Resources / Planning template"
      intro="Use this checklist before requesting pricing. It covers what your team wants to receive, where and when it can respond, how much it can handle, and what happens after delivery."
      panelLabel="Planning sections"
      panelRows={[
        { label: "Offer", value: "Product, vertical, and customer situation" },
        { label: "Capacity", value: "Coverage, schedule, and volume" },
        { label: "Workflow", value: "Criteria, destination, and buyer owner" },
        { label: "Terms", value: "Pricing unit, review, support, and next steps" },
      ]}
      panelTitle="Prepare one useful campaign plan before the sales call."
      primaryAction={{ href: "/get-pricing", label: "Start my campaign" }}
      questions={[
        {
          question: "Do I need to know every answer?",
          answer:
            "No. Mark unknown choices as unresolved. The goal is to expose missing decisions before launch, not to invent an answer for every field.",
        },
        {
          question: "Who should complete the template?",
          answer:
            "Include the people who own sales capacity, service area, phone or system access, calendar availability, customer criteria, data responsibilities, and final approval.",
        },
        {
          question: "Should I create a separate plan for each product?",
          answer:
            "Yes when calls, leads, or appointments use different schedules, destinations, owners, criteria, or review terms. Clear separation makes comparison and setup easier.",
        },
      ]}
      secondaryAction={{ href: "/resources/glossary", label: "Open the glossary" }}
      sections={[
        {
          code: "01",
          title: "Define what the team wants to receive.",
          copy: "Write the offer in terms a sales manager and agent can understand without internal platform language.",
          points: [
            "Product: inbound calls, real-time leads, booked appointments, or help deciding.",
            "Vertical: the product or service the buyer team sells.",
            "Customer situation: what the customer is trying to do or solve.",
            "Poor-fit conditions: situations the buyer team cannot serve.",
          ],
        },
        {
          code: "02",
          title: "Set coverage and capacity.",
          copy: "Use the team's actual service area and response capacity rather than a future target that is not staffed yet.",
          points: [
            "Coverage: approved states, service areas, or ZIP codes and any exceptions.",
            "Schedule: days, hours, timezone, overnight windows, and holiday rules.",
            "Volume: a starting daily, weekly, or monthly amount the team can handle.",
            "Capacity owner: the person who can request or approve a change.",
          ],
        },
        {
          code: "03",
          title: "Map delivery and follow-up.",
          copy: "Identify the destination, responsible team, response process, required customer details, and system access before testing the setup.",
          points: [
            "Customer criteria and the fields or questions needed for the product.",
            "Destination: phone, CRM, calendar, supported workflow, or help deciding.",
            "Buyer owner and backup owner for response, follow-up, or meeting attendance.",
            "Outcome fields the buyer team will record after delivery.",
          ],
        },
        {
          code: "04",
          title: "Confirm terms and next steps.",
          copy: "Complete the plan with the commercial and operating terms needed to understand pricing, delivery, review, support, and approval.",
          points: [
            "Pricing unit and contractually defined billable or eligible event.",
            "Distribution, timing, recording, data, and review terms that apply.",
            "Support contact, review window, evidence requirements, and possible outcomes.",
            "Buyer approver, requested next action, and unresolved questions.",
          ],
          link: { href: "/how-it-works", label: "See the full process" },
        },
      ]}
      statement="A strong campaign plan makes capacity, ownership, delivery, and unanswered questions visible."
      title="Plan the campaign your team can actually run."
    />
  );
}
