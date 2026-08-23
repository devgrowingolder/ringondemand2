import type { Metadata } from "next";
import { PublicFoundationPage } from "@/components/site/public-foundation-page";

export const metadata: Metadata = {
  title: "Campaign Setup",
  description:
    "Choose your Ring On Demand product, vertical, coverage, schedule, volume, customer criteria, and destination in one reviewable setup.",
};

export default function CampaignSetupPage() {
  return (
    <PublicFoundationPage
      closing={{
        title: "Build your campaign one clear answer at a time.",
        copy: "Start in plain language or use the guided questions. You will see every field that needs review before submission.",
        href: "/get-pricing",
        label: "Start campaign setup",
      }}
      eyebrow="Platform / Campaign setup"
      intro="Choose what you want to receive and the rules your team can support. One summary keeps your service, locations, hours, volume, customer criteria, and destination easy to review."
      panelLabel="Campaign details"
      panelRows={[
        { label: "Product", value: "Calls, leads, appointments, or help deciding" },
        { label: "Market", value: "Vertical and service area" },
        { label: "Capacity", value: "Schedule and volume" },
        { label: "Delivery", value: "Customer criteria and destination" },
      ]}
      panelTitle="A setup your team can understand before it starts."
      primaryAction={{ href: "/get-pricing", label: "Start campaign setup" }}
      questions={[
        {
          question: "Can I start with a written description?",
          answer:
            "Yes. Describe what you want in plain language. The guided flow can organize stated details into fields, while missing or unclear answers remain open for your review.",
        },
        {
          question: "What if my service area is complicated?",
          answer:
            "Add states, service areas, or ZIP codes and keep any exceptions in the customer criteria. The team can confirm availability during review.",
        },
        {
          question: "Can I change my answers before submitting?",
          answer:
            "Yes. The review step is designed for edits. Submission requires your approval of the campaign details and contact information.",
        },
      ]}
      secondaryAction={{ href: "/how-it-works", label: "See the full process" }}
      sections={[
        {
          code: "01",
          title: "Begin with the product and vertical.",
          copy: "Choose calls, leads, appointments, or help deciding. Then search for the service or market your team supports.",
          points: [
            "Use plain product names that describe what the team receives.",
            "Search the vertical directory instead of sorting through a wall of buttons.",
            "Confirm campaign availability before relying on a page listing.",
          ],
        },
        {
          code: "02",
          title: "Set the operating limits.",
          copy: "Locations, schedule, and volume should reflect what your sales team can actually serve and respond to.",
          points: [
            "Add states, service areas, or ZIP codes without losing partial entries.",
            "Set days, hours, timezone, and overnight windows when needed.",
            "Choose a daily, weekly, or monthly capacity your team can handle.",
          ],
        },
        {
          code: "03",
          title: "Review the customer criteria and destination.",
          copy: "Write the customer situation in plain language and select where the result should arrive. Keep unresolved details visible until a buyer confirms them.",
          points: [
            "List stated customer criteria without adding assumptions.",
            "Choose phone, CRM, calendar, another supported workflow, or not sure.",
            "Check one summary and contact record before submission.",
          ],
          link: { href: "/platform/delivery", label: "Continue to delivery" },
        },
      ]}
      statement="Good campaign setup turns expectations into choices everyone can review."
      title="Set up the campaign your sales team can support."
    />
  );
}
