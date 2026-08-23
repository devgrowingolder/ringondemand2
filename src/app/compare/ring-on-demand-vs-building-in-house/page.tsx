import type { Metadata } from "next";
import { PublicFoundationPage } from "@/components/site/public-foundation-page";

export const metadata: Metadata = {
  title: "Ring On Demand vs Building In House",
  description:
    "Compare a Ring On Demand campaign with an internally built customer-acquisition program by responsibilities, systems, staffing, control, cost, and review.",
};

export default function RingOnDemandVsBuildingInHousePage() {
  return (
    <PublicFoundationPage
      closing={{
        title: "Decide which responsibilities your team wants to own.",
        copy: "List the people, media, sites, systems, routing, review, and support required for an internal program. Then compare those responsibilities with the terms of a Ring On Demand campaign.",
        href: "/get-pricing",
        label: "Plan my campaign",
      }}
      eyebrow="Comparison / Build or buy"
      intro="An internal program offers direct control and also places sourcing, media, customer experience, technology, routing, staffing, data, quality review, and support on the buyer organization."
      panelLabel="Responsibility map"
      panelRows={[
        { label: "Acquire", value: "Media, sites, customer path, and source management" },
        { label: "Operate", value: "Forms, phones, calendars, routing, and monitoring" },
        { label: "Respond", value: "Agent coverage, follow-up, scheduling, and outcomes" },
        { label: "Review", value: "Data, quality questions, disputes, and improvement" },
      ]}
      panelTitle="The real choice is which system your team is prepared to run."
      primaryAction={{ href: "/get-pricing", label: "Plan my campaign" }}
      questions={[
        {
          question: "Is building internally always more expensive?",
          answer:
            "Not necessarily. Cost depends on media, people, technology, customer experience, data, vendors, management, volume, and time. Compare the same period and product definition.",
        },
        {
          question: "Does using Ring On Demand remove buyer responsibilities?",
          answer:
            "No. Buyers still need appropriate staffing, destinations, follow-up, outcome recording, review participation, data handling, and adherence to the applicable campaign terms.",
        },
        {
          question: "Can an internal program and managed campaign work together?",
          answer:
            "They can be evaluated as separate channels when responsibilities, customer sources, data, attribution, definitions, and reporting remain clear.",
        },
      ]}
      secondaryAction={{ href: "/resources/campaign-planning-template", label: "Use the planning template" }}
      sections={[
        {
          code: "01",
          title: "Map every responsibility.",
          copy: "An internal program is more than media buying. List the full customer journey and the person or system responsible for every step.",
          points: [
            "Plan sourcing, media, sites, forms, phone numbers, calendars, and routing.",
            "Assign consent, privacy, security, data, recording, and legal review responsibilities.",
            "Define monitoring, support, quality review, disputes, and partner management.",
          ],
        },
        {
          code: "02",
          title: "Compare control with operating effort.",
          copy: "Direct ownership can make changes easier to prioritize, while it also requires the buyer to build, maintain, and monitor the underlying systems and team processes.",
          points: [
            "Compare control over media, customer experience, distribution, data, and timing.",
            "Estimate the people and technology required to maintain that control.",
            "Include after-hours coverage, failures, vendor changes, and support ownership.",
          ],
        },
        {
          code: "03",
          title: "Compare cost using matched definitions.",
          copy: "Use the same product, customer criteria, service area, time period, and outcome definitions for both paths. Separate known costs from estimates.",
          points: [
            "Include media, creative, technology, data, vendors, people, and management time.",
            "Include buyer staffing, follow-up, scheduling, and quality-review effort in both paths.",
            "Mark future volume, conversion, and performance assumptions as estimates, not facts.",
          ],
          link: { href: "/resources/call-center-readiness-checklist", label: "Check team readiness" },
        },
      ]}
      statement="Building internally gives your team control only when it is prepared to own the entire operating system."
      title="Ring On Demand or building in house: decide what your team should own."
    />
  );
}
