import type { Metadata } from "next";
import { PublicFoundationPage } from "@/components/site/public-foundation-page";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "See how Ring On Demand turns your service, locations, hours, volume, customer criteria, and destination into campaign details you can review.",
};

export default function HowItWorksPage() {
  return (
    <PublicFoundationPage
      closing={{
        title: "Start with the answers you already know.",
        copy: "Choose help me decide for anything that is still unclear. You will review every campaign detail before submitting a pricing request.",
        href: "/get-pricing",
        label: "Start my campaign",
      }}
      eyebrow="How it works"
      intro="Choose what you want to receive, set the rules your team can support, select where each result should go, and review everything before you request pricing."
      panelLabel="Four clear steps"
      panelRows={[
        { label: "01 · Choose", value: "Calls, leads, appointments, or help deciding" },
        { label: "02 · Set", value: "Locations, schedule, volume, and customer criteria" },
        { label: "03 · Send", value: "Phone, CRM, calendar, or another approved destination" },
        { label: "04 · Review", value: "Confirm the campaign details and next action" },
      ]}
      panelTitle="From what you need to a setup you can approve."
      primaryAction={{ href: "/get-pricing", label: "Get pricing" }}
      questions={[
        {
          question: "Do I need every answer before I start?",
          answer:
            "No. Start with the details you know and mark the rest for review. Missing or unclear information stays visible so your team can confirm it before submission.",
        },
        {
          question: "When will I receive pricing?",
          answer:
            "Pricing depends on the selected product, vertical, locations, schedule, volume, customer criteria, destination, and current availability. The team reviews those details after submission.",
        },
        {
          question: "Can I book a call instead?",
          answer:
            "Yes. Save your campaign details first, then choose the booking option so the conversation begins with the information you already entered.",
        },
      ]}
      secondaryAction={{ href: "/products/calls", label: "Compare products" }}
      sections={[
        {
          code: "01",
          title: "Choose what your team wants to receive.",
          copy: "Start with the buying model that matches the way your team sells. If you are unsure, keep that decision open for review.",
          points: [
            "Inbound calls for teams ready to answer customer conversations.",
            "Real-time leads for teams with a fast follow-up process.",
            "Booked appointments for teams that sell through scheduled meetings.",
          ],
          link: { href: "/products/calls", label: "Explore the three products" },
        },
        {
          code: "02",
          title: "Set the campaign around your team.",
          copy: "Tell us where you work, when people can respond, how much volume the team can support, and which customer details matter.",
          points: [
            "Select a vertical and the states, service areas, or ZIP codes you serve.",
            "Add days, hours, timezone, and a daily, weekly, or monthly volume.",
            "Write customer criteria in plain language and flag anything that needs review.",
          ],
          link: { href: "/platform/campaign-setup", label: "See campaign setup" },
        },
        {
          code: "03",
          title: "Choose where each result should go.",
          copy: "Calls, leads, and appointments need different destinations. Choose the one your team already uses or ask for help deciding.",
          points: [
            "Send calls to an approved phone line during the selected schedule.",
            "Send lead details to a supported phone, CRM, or workflow.",
            "Send appointments to a supported calendar or scheduling process.",
          ],
          link: { href: "/platform/delivery", label: "See delivery options" },
        },
        {
          code: "04",
          title: "Review the details and choose the next step.",
          copy: "Your summary shows what is complete and what still needs an answer. Nothing is submitted until you approve the campaign details.",
          points: [
            "Check the product, vertical, locations, schedule, volume, criteria, and destination.",
            "Enter contact information once for pricing, booking, and setup.",
            "Request pricing or continue to book a call with the same saved details.",
          ],
        },
      ]}
      statement="One set of answers carries the work from pricing into setup and delivery."
      title="A clear path from campaign choices to your next customer conversation."
    />
  );
}
