import type { Metadata } from "next";
import { PublicFoundationPage } from "@/components/site/public-foundation-page";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "Explore how Ring On Demand keeps campaign setup, delivery, quality review, and reporting connected for buyers.",
};

export default function PlatformPage() {
  return (
    <PublicFoundationPage
      closing={{
        title: "See how your campaign would work.",
        copy: "Tell us what you want to receive and how your team operates. Review the full setup before requesting pricing or booking a call.",
        href: "/get-pricing",
        label: "Get pricing",
      }}
      eyebrow="Platform"
      intro="Keep your campaign settings, delivery destinations, review details, and next steps connected. The platform is organized around what buyers need to choose, receive, and review."
      panelLabel="Buyer workflow"
      panelRows={[
        { label: "Set up", value: "Service, coverage, hours, volume, and customer criteria" },
        { label: "Deliver", value: "Phone, CRM, calendar, or approved workflow" },
        { label: "Review", value: "Delivery details, recordings when available, and outcomes" },
        { label: "Understand", value: "Campaign activity and follow-up status" },
      ]}
      panelTitle="One place to understand every campaign."
      primaryAction={{ href: "/get-pricing", label: "Get pricing" }}
      questions={[
        {
          question: "Is the platform a replacement for my CRM?",
          answer:
            "No. Ring On Demand keeps campaign and delivery context together, while supported destinations can send results into the phone, CRM, calendar, or workflow selected for the campaign.",
        },
        {
          question: "Which destinations are supported?",
          answer:
            "Support depends on the delivery model and campaign setup. Choose a preferred destination and the team will confirm what is available before launch.",
        },
        {
          question: "Can my team change campaign settings?",
          answer:
            "The available controls depend on the campaign and buyer workspace. Confirm who can request changes and how those changes take effect during setup.",
        },
      ]}
      secondaryAction={{ href: "/how-it-works", label: "See how it works" }}
      sections={[
        {
          code: "01",
          title: "Campaign setup in plain language.",
          copy: "Choose calls, leads, or appointments, then define the locations, schedule, volume, customer criteria, and destination your team can support.",
          points: [
            "Keep unanswered or unclear fields visible for review.",
            "Confirm one summary before sending a pricing request.",
            "Reuse the saved details during booking and setup.",
          ],
          link: { href: "/platform/campaign-setup", label: "Explore campaign setup" },
        },
        {
          code: "02",
          title: "Delivery to the right place.",
          copy: "Select a phone, CRM, calendar, or another approved destination based on what your team wants to receive.",
          points: [
            "Match the destination to calls, leads, or appointments.",
            "Keep the campaign ID and available context with each result.",
            "Confirm the delivery status and the action your team should take.",
          ],
          link: { href: "/platform/delivery", label: "Explore delivery" },
        },
        {
          code: "03",
          title: "Quality review with the campaign terms nearby.",
          copy: "Use the available delivery details and agreed campaign terms to understand what happened and whether a review request is eligible.",
          points: [
            "Review the result against the selected customer criteria.",
            "Use recordings only when recording is enabled and available.",
            "Keep outcome notes and review status connected to the delivery.",
          ],
          link: { href: "/platform/quality-review", label: "Explore quality review" },
        },
        {
          code: "04",
          title: "Reporting your team can act on.",
          copy: "See campaign activity, delivery details, and recorded outcomes without turning the website into a wall of unexplained numbers.",
          points: [
            "Filter activity by campaign, product, date, and available status.",
            "Separate delivery information from sales outcomes.",
            "Use complete records when reviewing trends or requesting help.",
          ],
          link: { href: "/platform/reporting", label: "Explore reporting" },
        },
      ]}
      statement="The campaign choices you approve stay connected to what your team receives and reviews."
      title="Campaign controls built for the way buyers work."
    />
  );
}
