import type { Metadata } from "next";
import { PublicFoundationPage } from "@/components/site/public-foundation-page";

export const metadata: Metadata = {
  title: "Real-Time Leads vs Shared Leads",
  description:
    "Compare lead-delivery timing with lead-distribution terms and learn which questions buyers should confirm before purchasing customer leads.",
};

export default function RealTimeLeadsVsSharedLeadsPage() {
  return (
    <PublicFoundationPage
      closing={{
        title: "Ask about timing and distribution separately.",
        copy: "Describe the lead workflow your team needs. The campaign terms should state delivery timing, distribution, customer criteria, destination, and review rules without relying on a label alone.",
        href: "/get-pricing?model=leads",
        label: "Plan my lead campaign",
      }}
      eyebrow="Comparison / Lead distribution"
      intro="Real-time describes when customer details are sent. Shared describes whether a lead may be distributed to more than one buyer. They answer different questions and should be confirmed separately."
      panelLabel="Terms to confirm"
      panelRows={[
        { label: "Timing", value: "When the record is sent after the customer action" },
        { label: "Distribution", value: "Whether one buyer or more than one may receive it" },
        { label: "Criteria", value: "Which customer details must match" },
        { label: "Review", value: "How delivery questions are evaluated" },
      ]}
      panelTitle="A timing label does not define distribution."
      primaryAction={{ href: "/get-pricing?model=leads", label: "Plan my lead campaign" }}
      questions={[
        {
          question: "Does real-time mean one buyer receives the lead?",
          answer:
            "Not necessarily. Real-time describes delivery timing. The agreement should separately state whether the lead may be sent to one buyer or more than one.",
        },
        {
          question: "Are shared leads always a poor fit?",
          answer:
            "No. Fit depends on price, customer journey, distribution, buyer response process, service, and campaign terms. Buyers should compare the complete workflow rather than one label.",
        },
        {
          question: "What if distribution is not stated?",
          answer:
            "Treat it as not verified. Ask for the exact distribution terms in writing before launch instead of making an assumption from marketing copy.",
        },
      ]}
      secondaryAction={{ href: "/products/leads", label: "Explore real-time leads" }}
      sections={[
        {
          code: "01",
          title: "Define delivery timing.",
          copy: "Ask what event starts the clock, which system sends the record, and what status confirms delivery. Avoid treating an undefined timing label as a service commitment.",
          points: [
            "Identify the customer action that creates the lead record.",
            "Confirm the delivery method, expected timing, timezone, and status definition.",
            "Document what happens when the selected destination is unavailable.",
          ],
        },
        {
          code: "02",
          title: "Define distribution terms.",
          copy: "Distribution should be a clear campaign term. If a seller does not disclose whether other buyers may receive a lead, the answer remains unknown.",
          points: [
            "Ask whether the same customer record may be delivered to additional buyers.",
            "Confirm whether distribution can vary by source, vertical, location, or campaign.",
            "Use the written agreement as the controlling definition.",
          ],
        },
        {
          code: "03",
          title: "Compare the full buyer workload.",
          copy: "Lead value depends partly on how well the buyer receives, assigns, contacts, and records outcomes for each customer record.",
          points: [
            "Confirm staffing and ownership for the requested delivery schedule.",
            "Track contact attempts and sales outcomes in the buyer workflow.",
            "Separate distribution questions from customer eligibility and sales results.",
          ],
          link: { href: "/resources/quality-and-credit-guide", label: "Read the quality and credit guide" },
        },
      ]}
      statement="Timing, distribution, customer criteria, and buyer follow-up are separate parts of the lead workflow."
      title="Real-time leads and shared leads are not opposite terms."
    />
  );
}
